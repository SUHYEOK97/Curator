package com.ssafy.curator.service.user;


import com.ssafy.curator.dto.post.MyPagePostDto;
import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.dto.user.UserPageDto;
import com.ssafy.curator.entity.follow.FollowingsEntity;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.post.PostImageEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.entity.user.UserPageEntity;
import com.ssafy.curator.repository.post.PostImageRepository;
import com.ssafy.curator.repository.post.PostRepository;
import com.ssafy.curator.repository.user.UserPageRepository;
import com.ssafy.curator.repository.user.UserRepository;
import com.ssafy.curator.service.CommonService;
import org.apache.commons.io.IOUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class UserPageServiceImpl implements UserPageService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserPageRepository userPageRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommonService commonService;

    @Autowired
    PostImageRepository postImageRepository;

    @Override
    public UserPageDto createUserInfo(String nickname, String introduction, MultipartHttpServletRequest multipartHttpServletRequest) {
        UserPageEntity userPageEntity = new UserPageEntity();
        UserEntity userEntity = userRepository.findByNickname(nickname);

        userPageEntity.setUser(userEntity);
        userPageEntity.setNickname(nickname);
        userPageEntity.setIntroduction(introduction);
        userPageEntity.setProfileImg(null);
        userPageEntity.setBgImg(null);

        userPageRepository.save(userPageEntity);

        UserPageDto userPageDto = new ModelMapper().map(userPageEntity, UserPageDto.class);

        List<UserDto> userDtos = new ArrayList<>();
        for (FollowingsEntity userEntity1 : userEntity.getFollowers()) {
            UserDto o = new ModelMapper().map(userEntity1.getFollower(), UserDto.class);
            userDtos.add(o);
        }
        userPageDto.setFollowers(userDtos);

        List<UserDto> userDtos2 = new ArrayList<>();
        for (FollowingsEntity userEntity1 : userEntity.getFollowings()) {
            UserDto o = new ModelMapper().map(userEntity1.getFollowing(), UserDto.class);
            userDtos2.add(o);
        }
        userPageDto.setFollowings(userDtos2);

        return userPageDto;
    }

    @Override
    public UserPageDto getUserInfo(String nickname) throws IOException {

        UserEntity userEntity = userRepository.findByNickname(nickname);
        UserPageEntity userPageEntity = userPageRepository.findByUser(userEntity);

        UserPageDto userPageDto = new UserPageDto();

        userPageDto.setIntroduction(userPageEntity.getIntroduction());
        userPageDto.setNickname(userPageEntity.getNickname());

        List<UserDto> userDtos = new ArrayList<>();
        for (FollowingsEntity userEntity1 : userEntity.getFollowers()) {
            UserDto o = new ModelMapper().map(userEntity1.getFollower(), UserDto.class);
            userDtos.add(o);
        }
        userPageDto.setFollowers(userDtos);

        List<UserDto> userDtos2 = new ArrayList<>();
        for (FollowingsEntity userEntity1 : userEntity.getFollowings()) {
            UserDto o = new ModelMapper().map(userEntity1.getFollowing(), UserDto.class);
            userDtos2.add(o);
        }
        userPageDto.setFollowings(userDtos2);

        String curProfile = userPageEntity.getProfileImg();
        if (curProfile != null) {
            userPageDto.setProfileImg(commonService.imageEncoding(curProfile));
        } else {
            userPageDto.setProfileImg(null);
        }

        String curBg = userPageEntity.getBgImg();
        if (curBg != null){
            userPageDto.setBgImg(commonService.imageEncoding(curBg));
        } else {
            userPageDto.setBgImg(null);
        }

        // ?????????
        List<MyPagePostDto> myPagePostDtos = new ArrayList<>();
        for (PostEntity postEntity : postRepository.findByUserOrderByCreateDateDesc(userEntity)) {

            MyPagePostDto myPagePostDto = new MyPagePostDto();
            myPagePostDto.setTitle(postEntity.getTitle());
            myPagePostDto.setDescription(postEntity.getDescription());
            myPagePostDto.setIngredients(postEntity.getIngredients());
            myPagePostDto.setCreateDate(postEntity.getCreateDate());

            List<PostImageEntity> Images = postImageRepository.findByPostId(postEntity.getId());
            List<String> imagePaths = new ArrayList();
            for (PostImageEntity i : Images) {
                imagePaths.add(i.getFilePath());
            }
            if (imagePaths.size() >= 1) {
                String firstImage = imagePaths.get(0);
                myPagePostDto.setImagePaths(Collections.singletonList(commonService.imageEncoding(firstImage)));
            } else {
                myPagePostDto.setImagePaths(imagePaths);
            }

            myPagePostDtos.add(myPagePostDto);
        }

        userPageDto.setMyPagePostDtos(myPagePostDtos);
        return userPageDto;
    }


    @Override
    public String updateUserInfo(String nickName, String introduction, MultipartHttpServletRequest multipartHttpServletRequest) throws Exception {
        UserEntity userEntity = userRepository.findByNickname(nickName);
        if (userEntity == null) {
            return "????????? ???????????? ????????????.";
        }
        UserPageEntity userPageEntity = userPageRepository.findByUser(userEntity);


        if (nickName == "") {
            userPageEntity.setNickname(userPageEntity.getNickname());
        } else {
            userPageEntity.setNickname(nickName);
        }

        if (introduction == "") {
            userPageEntity.setIntroduction(userPageEntity.getIntroduction());
        } else {
            userPageEntity.setIntroduction(introduction);
        }

        MultipartFile multipartFile1 = multipartHttpServletRequest.getFile("profileImg");
        if (!multipartFile1.isEmpty()) {
            if (userPageEntity.getProfileImg() != null) {
                File pre = new File(userPageEntity.getProfileImg());
                pre.delete();
            }
//            String path = "src/main/resources/static/images/";
            String path = "/usr/local/images/";
            String newFileName = commonService.rnd(multipartFile1.getBytes(), path);
            String newPath = path+newFileName;
            userPageEntity.setProfileImg(newPath);

        }

        MultipartFile multipartFile2 = multipartHttpServletRequest.getFile("bgImg");
        if (!multipartFile2.isEmpty()) {
            if (userPageEntity.getBgImg() != null) {
                File pre = new File(userPageEntity.getBgImg());
                pre.delete();
            }
//            String path = "src/main/resources/static/images/";
            String path = "/usr/local/images/";
            String newFileName = commonService.rnd(multipartFile2.getBytes(), path);
            String newPath = path+newFileName;
            userPageEntity.setBgImg(newPath);
        }

        userPageRepository.save(userPageEntity);
        return "success";
    }

    @Override
    public boolean existsByNickname(String nickname) {
        return userPageRepository.existsByNickname(nickname);
    }

}
