package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.entity.product.Comment;
import com.sellphones.entity.product.CommentStatus;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.CommentRepository;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.specification.admin.AdminCommentSpecificationBuilder;
import com.sellphones.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminCommentServiceImpl implements AdminCommentService{

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.COMMENTS.VIEW')")
    public PageResponse<AdminCommentResponse> getComments(AdminCommentFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt", "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Comment> spec = AdminCommentSpecificationBuilder.build(request);

        Page<Comment> commentPage = commentRepository.findAll(spec, pageable);
        List<Comment> comments = commentPage.getContent();
        List<AdminCommentResponse> response = comments.stream()
                .map(c -> modelMapper.map(c, AdminCommentResponse.class))
                .toList();

        return PageResponse.<AdminCommentResponse>builder()
                .result(response)
                .total(commentPage.getTotalElements())
                .totalPages(commentPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.COMMENTS.REPLY')")
    public void replyComment(AdminCommentRequest request, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));
        comment.setIsReplied(true);
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Comment replyComment = Comment.builder()
                .user(user)
                .product(comment.getProduct())
                .status(CommentStatus.APPROVED)
                .isReplied(false)
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .build();

        if(comment.getParentComment() == null){
//            comment.getChildComments().add(replyComment);
            replyComment.setParentComment(comment);
        }else{
            Comment parentComment = comment.getParentComment();
//            parentComment.getChildComments().add(replyComment);
            replyComment.setParentComment(parentComment);
        }

        commentRepository.saveAll(Arrays.asList(comment, replyComment));
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CUSTOMER.COMMENTS.EDIT')")
    public void editComment(AdminUpdateCommentRequest request, Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));
        comment.setStatus(request.getStatus());
    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.COMMENTS.DELETE')")
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
