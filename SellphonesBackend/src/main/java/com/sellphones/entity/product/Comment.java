package com.sellphones.entity.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sellphones.entity.BaseEntity;
import com.sellphones.entity.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "comment")
public class Comment extends BaseEntity<Long> {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private CommentStatus status;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "is_replied")
    private Boolean isReplied = false;

    @ManyToOne
    @JoinColumn(name = "parent_comment_id")
//    @JsonBackReference
    private Comment parentComment;

    @OneToMany(mappedBy = "parentComment", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
//    @JsonManagedReference
    private List<Comment> childComments = new ArrayList<>();
}
