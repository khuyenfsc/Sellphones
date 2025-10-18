package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.request.NewCommentRequest;
import com.sellphones.dto.product.request.ReplyCommentRequest;
import com.sellphones.dto.product.response.CommentResponse;
import com.sellphones.entity.product.Comment;
import com.sellphones.entity.product.Product;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.CommentRepository;
import com.sellphones.repository.product.ProductRepository;
import com.sellphones.repository.user.UserRepository;
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

    private final ModelMapper modelMapper;

    @Override
    public PageResponse<CommentResponse> getCommentByProduct(Long productId, Integer page, Integer size) {
        Sort.Direction direction = Sort.Direction.DESC;
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Comment> commentPage = commentRepository.findByProductId(productId, pageable);
        List<CommentResponse> response = commentPage.getContent().stream()
                .map(c -> modelMapper.map(c, CommentResponse.class))
                .toList();

        return PageResponse.<CommentResponse>builder()
                .result(response)
                .total(commentPage.getTotalElements())
                .build();
    }

    @Override
    public void addNewComment(NewCommentRequest newCommentRequest) {
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Product product = productRepository.findById(newCommentRequest.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        Comment comment = Comment.builder()
                .user(user)
                .product(product)
                .content(newCommentRequest.getContent())
                .createdAt(LocalDateTime.now())
                .build();

        commentRepository.save(comment);
    }

    @Override
    @Transactional
    public void replyComment(ReplyCommentRequest replyCommentRequest) {
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Comment parentComment = commentRepository.findById(replyCommentRequest.getParentId()).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));
        Product product = productRepository.findById(parentComment.getProduct().getId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        Comment comment = Comment.builder()
                .user(user)
                .product(product)
                .content(replyCommentRequest.getContent())
                .parentComment(parentComment)
                .createdAt(LocalDateTime.now())
                .build();
        commentRepository.save(comment);

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
