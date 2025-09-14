package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.response.CommentResponse;
import com.sellphones.entity.product.Comment;
import com.sellphones.repository.product.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    private final ModelMapper modelMapper;

    @Override
    public PageResponse<CommentResponse> getCommentByProduct(Long productId, Integer page, Integer size) {
        Sort.Direction direction = Sort.Direction.DESC;
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Comment> commentPage = commentRepository.findByProductId(productId, pageable);
        List<Comment> comments = flatten(commentPage.getContent());
        List<CommentResponse> responses = comments.stream()
                .map(c -> modelMapper.map(c, CommentResponse.class))
                .toList();

        return PageResponse.<CommentResponse>builder()
                .result(responses)
                .total(commentPage.getTotalElements())
                .build();
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
