package com.sellphones.controller.product;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.NewCommentRequest;
import com.sellphones.dto.product.ReplyCommentRequest;
import com.sellphones.dto.product.CommentResponse;
import com.sellphones.service.product.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<CommonResponse> getCommentByProduct(
            @RequestParam("productId") Long productId,
            @RequestParam("page") Integer page,
            @RequestParam("size") Integer size
    ){
        PageResponse<CommentResponse> response = commentService.getCommentByProduct(productId, page, size);
        Map<String, Object> map = new HashMap<>();
        map.put("comments", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/product/add-comment")
    public ResponseEntity<CommonResponse> addComment(@RequestBody NewCommentRequest newCommentRequest){
        commentService.addNewComment(newCommentRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added new comment successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/product/reply-comment")
    public ResponseEntity<CommonResponse> replyComment(@RequestBody ReplyCommentRequest replyCommentRequest){
        commentService.replyComment(replyCommentRequest);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Replied comment successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
