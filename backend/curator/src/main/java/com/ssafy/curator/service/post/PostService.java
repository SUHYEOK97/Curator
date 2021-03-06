package com.ssafy.curator.service.post;

import com.ssafy.curator.dto.post.PostWithImageDto;
import com.ssafy.curator.entity.post.PostEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public interface PostService {
    List<PostWithImageDto> getAllLists() throws IOException;
    String createPost(HttpServletRequest request, MultipartHttpServletRequest mtfRequest) throws Exception;
    PostWithImageDto getPostById(@PathVariable("post_id") Long postId) throws IOException;
    PostWithImageDto updatePost(@PathVariable("id") Long postId, PostEntity postDetails, MultipartHttpServletRequest mtfRequest) throws Exception;
    ResponseEntity deletePost(@PathVariable("post_id") Long postId) throws Exception;

}
