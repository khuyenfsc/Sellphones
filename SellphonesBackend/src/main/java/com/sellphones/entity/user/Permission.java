package com.sellphones.entity.user;

import com.sellphones.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "permission")
public class Permission extends BaseEntity<Long> {

    private String name;

    private String code;

//    @OneToMany
//    @JoinColumn(name = "parent_permission_id")
//    private Set<Permission> childPermissions = new HashSet<>();

}
