package com.ssafy.curator.entity.post;

import com.ssafy.curator.entity.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "comment")
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    UserEntity user;

    @ManyToOne
    @JoinColumn(name = "postId")
    PostEntity post;

    @NotNull
    String content;

    @CreationTimestamp
    Timestamp createDate;

    @UpdateTimestamp
    Timestamp updateDate;


}
