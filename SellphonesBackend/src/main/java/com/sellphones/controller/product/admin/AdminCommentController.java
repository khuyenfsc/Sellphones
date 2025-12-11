package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminComment_FilterRequest;
import com.sellphones.dto.product.admin.AdminCommentRequest;
import com.sellphones.dto.product.admin.AdminCommentResponse;
import com.sellphones.dto.product.admin.AdminUpdateCommentRequest;
import com.sellphones.service.product.admin.AdminCommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/comments")
public class AdminCommentController {

    private final AdminCommentService adminCommentService;

    @GetMapping
    public ResponseEntity<CommonResponse> getComments(@Valid AdminComment_FilterRequest request){
        PageResponse<AdminCommentResponse> response = adminCommentService.getComments(request);
        Map<String, Object> map = new HashMap<>();
        map.put("comments", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/{commentId}/reply")
    public ResponseEntity<CommonResponse> replyComment(@RequestBody @Valid AdminCommentRequest request, @PathVariable Long commentId){
        adminCommentService.replyComment(request, commentId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Replied comment successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommonResponse> editComment(@RequestBody @Valid AdminUpdateCommentRequest request, @PathVariable Long id){
        adminCommentService.updateComment(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated comment successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CommonResponse> deleteComment(@PathVariable Long id){
        adminCommentService.deleteComment(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted comment successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

}
