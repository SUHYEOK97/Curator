package com.ssafy.curator.service.post;

import com.ssafy.curator.dto.post.CommentDto;
import com.ssafy.curator.entity.post.CommentEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;

public interface CommentService {
    String createComment(HttpServletRequest request) throws Exception;
    CommentEntity updateComment(@PathVariable("post_id") Long postId, @PathVariable("comment_id") Long commentId, CommentEntity commentDetails) throws Exception;
    CommentDto getCommentById(@PathVariable("post_id") Long postId, @PathVariable("comment_id") Long commentId) throws Exception;
    ResponseEntity deleteComment(@PathVariable("post_id") Long postId, @PathVariable("comment_id") Long commentId) throws Exception;
}