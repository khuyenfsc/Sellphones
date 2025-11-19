package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.NewCommentRequest;
import com.sellphones.dto.product.ReplyCommentRequest;
import com.sellphones.dto.product.CommentResponse;
import com.sellphones.entity.product.Comment;
import com.sellphones.entity.product.CommentStatus;
import com.sellphones.entity.product.Product;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.CommentRepository;
import com.sellphones.repository.product.ProductRepository;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.utils.ProductUtils;
import com.sellphones.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final ProductUtils productUtils;

    private final ModelMapper modelMapper;

    @Override
    public PageResponse<CommentResponse> getCommentByProduct(Long productId, Integer page, Integer size) {
        if(!productUtils.isActiveProduct(productId)){
            throw new AppException(ErrorCode.PRODUCT_INACTIVE);
        }

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt", "id");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Comment> commentPage = commentRepository.findStatusByProductId(
                CommentStatus.APPROVED, productId, pageable);
        List<CommentResponse> response = commentPage.getContent().stream()
                .map(c -> modelMapper.map(c, CommentResponse.class))
                .toList();

        return PageResponse.<CommentResponse>builder()
                .result(response)
                .total(commentPage.getTotalElements())
                .totalPages(commentPage.getTotalPages())
                .build();
    }

    @Override
    public PageResponse<CommentResponse> getCommentsByParentCommentId(Long parentId, Integer page, Integer size) {
        Comment parentComment = commentRepository.findById(parentId)
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));
        if(!productUtils.isActiveProduct(parentComment.getProduct())){
            throw new AppException(ErrorCode.PRODUCT_INACTIVE);
        }

        Sort.Direction direction = Sort.Direction.ASC
                ;
        Sort sort = Sort.by(direction, "createdAt", "id");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Comment> commentPage = commentRepository.findByStatusAndParentComment_Id(CommentStatus.APPROVED, parentId, pageable);
        List<CommentResponse> response = commentPage.getContent().stream()
                .map(c -> modelMapper.map(c, CommentResponse.class))
                .toList();

        return PageResponse.<CommentResponse>builder()
                .result(response)
                .total(commentPage.getTotalElements())
                .build();
    }

    @Override
    public CommentResponse addNewComment(NewCommentRequest newCommentRequest) {
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Product product = productRepository.findById(newCommentRequest.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        if(!productUtils.isActiveProduct(product)){
            throw new AppException(ErrorCode.PRODUCT_INACTIVE);
        }

        Comment comment = Comment.builder()
                .user(user)
                .product(product)
                .content(newCommentRequest.getContent())
                .status(CommentStatus.APPROVED)
                .createdAt(LocalDateTime.now())
                .build();

        Comment newComment = commentRepository.save(comment);

        return modelMapper.map(newComment, CommentResponse.class);
    }

    @Override
    @Transactional
    public CommentResponse replyComment(ReplyCommentRequest replyCommentRequest) {
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Comment parentComment = commentRepository.findById(replyCommentRequest.getParentId()).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));
        Product product = productRepository.findById(parentComment.getProduct().getId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        if(!productUtils.isActiveProduct(product)){
            throw new AppException(ErrorCode.PRODUCT_INACTIVE);
        }

        Comment comment = Comment.builder()
                .user(user)
                .product(product)
                .content(replyCommentRequest.getContent())
                .parentComment(parentComment)
                .status(CommentStatus.APPROVED)
                .createdAt(LocalDateTime.now())
                .build();
        Comment replyComment = commentRepository.save(comment);

        return modelMapper.map(replyComment, CommentResponse.class);
    }

    private List<Comment> flatten(List<Comment> comments){
        for(Comment root : comments){
            if(root.getChildComments() == null || root.getChildComments().isEmpty()){
                root.setChildComments(Collections.emptyList());
                continue;
            }

            Deque<Comment> stack = new ArrayDeque<>(root.getChildComments());
            List<Comment> flatChild = new ArrayList<>();
            while(!stack.isEmpty()){
                Comment child = stack.pop();
                if(child.getChildComments() != null && !child.getChildComments().isEmpty()){
                    stack.addAll(child.getChildComments());
                }
                child.setChildComments(null);
                flatChild.add(child);
            }

            root.setChildComments(flatChild);
        }

        return comments;
    }
}
