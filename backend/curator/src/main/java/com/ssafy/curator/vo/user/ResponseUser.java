package com.ssafy.curator.vo.user;

import lombok.Data;

import java.io.Serializable;

@Data
public class ResponseUser implements Serializable {
    private String email;
    private String name;
}
