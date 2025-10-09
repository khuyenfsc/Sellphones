package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.admin.AdminCommentFilterRequest;
import com.sellphones.dto.product.admin.AdminCommentRequest;
import com.sellphones.dto.product.admin.AdminCommentResponse;
import com.sellphones.dto.product.admin.AdminEditingCommentRequest;
import com.sellphones.dto.product.request.NewCommentRequest;
import com.sellphones.service.product.admin.AdminCommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/comments")
public class AdminCommentController {

    private final AdminCommentService adminCommentService;

    @GetMapping
    public ResponseEntity<CommonResponse> getComments(AdminCommentFilterRequest request){
        List<AdminCommentResponse> response = adminCommentService.getComments(request);
        Map<String, Object> map = new HashMap<>();
        map.put("results", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/{commentId}/reply-comment")
    public ResponseEntity<CommonResponse> replyComment(@RequestBody @Valid AdminCommentRequest request, @PathVariable Long commentId){
        adminCommentService.replyComment(request, commentId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Replied comment successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-comment/{commentId}")
    public ResponseEntity<CommonResponse> editComment(@RequestBody @Valid AdminEditingCommentRequest request, @PathVariable Long commentId){
        adminCommentService.editComment(request, commentId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited comment successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-comment/{commentId}")
    public ResponseEntity<CommonResponse> deleteComment(@PathVariable Long commentId){
        adminCommentService.deleteComment(commentId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted comment successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
