package com.sellphones.service.product;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.RatingStatsResponse;
import com.sellphones.dto.product.ReviewFilterRequest;
import com.sellphones.dto.product.ReviewRequest;
import com.sellphones.dto.product.ReviewResponse;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.RatingStats;
import com.sellphones.entity.product.Review;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.repository.product.ReviewRepository;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.service.file.FileStorageService;
import com.sellphones.specification.ReviewSpecificationBuilder;
import com.sellphones.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;

    private final ProductVariantRepository productVariantRepository;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    private final ObjectMapper objectMapper;

    private final FileStorageService fileStorageService;

    private final String reviewFolderName = "reviews";

    @Override
    public PageResponse<ReviewResponse> getReviewsByConditions(ReviewFilterRequest request) {
        System.out.println("page " + request.getPage() + " size " + request.getSize());
        Specification<Review> spec = ReviewSpecificationBuilder.build(request);
        Sort.Direction direction = Sort.Direction.DESC;
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt")
                .and(Sort.by(Sort.Direction.DESC, "id"));        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);
        Page<Review> reviewPage = reviewRepository.findAll(spec, pageable);
        List<Review> reviews = reviewPage.getContent();
        System.out.println("reviews " + reviews.getFirst().getId());
        List<ReviewResponse> response = reviews.stream().map(r -> modelMapper.map(r, ReviewResponse.class)).toList();
        System.out.println("response " + response);
        return PageResponse.<ReviewResponse>builder()
                .result(response)
                .total(reviewPage.getTotalElements())
                .totalPages(reviewPage.getTotalPages())
                .build();
    }

    @Override
    public Map<Integer, Long> getRatingStatsByProductVariantId(Long id) {
        List<RatingStats> stats = reviewRepository.findRatingStatsByVariantId(id);
        Map<Integer, Long> statsMap = stats.stream()
                .collect(Collectors.toMap(
                        RatingStats::getRatingScore,
                        RatingStats::getTotal
                ));

        for(int i = 1; i <= 5; i++){
            statsMap.putIfAbsent(i, 0L);
        }
        return statsMap;
    }

    @Override
    @Transactional
    public ReviewResponse addReview(String reviewJson, MultipartFile[] files) {
        ReviewRequest reviewRequest;
        try {
            reviewRequest = objectMapper.readValue(reviewJson, ReviewRequest.class);
        } catch (JsonProcessingException e) {
            throw new AppException(ErrorCode.INVALID_REVIEW_REQUEST_FORMAT);
        }

        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        ProductVariant productVariant =productVariantRepository.findById(reviewRequest.getProductVariantId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));

        Map<MultipartFile, String> fileMap = (files == null)?Map.of():
                Arrays.stream(files).collect(Collectors.toMap(
                f -> f,
                        fileStorageService::generateFileName
        ));

        Review review = Review.builder()
                .ratingScore(reviewRequest.getRatingScore())
                .user(user)
                .productVariant(productVariant)
                .content(reviewRequest.getContent())
                .createdAt(LocalDateTime.now())
                .imageNames(fileMap.values().stream().toList())
                .build();
        review = reviewRepository.save(review);

        List<String> storedFiles = new ArrayList<>();
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if(status == STATUS_ROLLED_BACK){
                    storedFiles.forEach(fileName -> {
                        try {
                            fileStorageService.delete(fileName, reviewFolderName);
                        } catch (Exception ex) {
                            log.error("Failed to cleanup file {} after rollback", fileName, ex);
                        }
                    });                }
            }
        });

        if(files != null){
            Arrays.asList(files).forEach(f -> {
                String storedName = fileMap.get(f);
                fileStorageService.store(f, reviewFolderName);
                storedFiles.add(storedName);
            });
        }


        return modelMapper.map(review, ReviewResponse.class);
    }


}
