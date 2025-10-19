package com.sellphones.service.user;

import com.sellphones.configuration.CustomUserDetails;
import com.sellphones.entity.user.Permission;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Set<GrantedAuthority> authorities = new HashSet<>(Set.of(new SimpleGrantedAuthority(user.getRole().getRoleName().toString())));
//        authorities.addAll(flatten(user.getRole().getPermissions()));
        authorities.addAll(user.getRole().getPermissions().stream()
                .map(p -> new SimpleGrantedAuthority(p.getCode()))
                .collect(Collectors.toSet()));
        return new CustomUserDetails(user.getRole().getRoleName().toString(),
                user.getEmail(),
                user.getPassword(),
                user.getProvider(),
                user.getStatus(),
                authorities);
    }

//    private Set<GrantedAuthority> flatten(Set<Permission> permissions){
//        Set<GrantedAuthority> authorities = new HashSet<>();
//        for(Permission root : permissions){
//            if(root.getChildPermissions() == null || root.getChildPermissions().isEmpty()){
//                authorities.add(new SimpleGrantedAuthority(root.getCode()));
//                continue;
//            }
//
//            authorities.add(new SimpleGrantedAuthority(root.getCode()));
//            Deque<Permission> deque = new ArrayDeque<>(root.getChildPermissions());
//            while(!deque.isEmpty()){
//                Permission permission = deque.pop();
//                authorities.add(new SimpleGrantedAuthority(permission.getCode()));
//                if(permission.getChildPermissions() != null && !permission.getChildPermissions().isEmpty()){
//                    deque.addAll(permission.getChildPermissions());
//                }
//            }
//        }
//
//        return authorities;
//    }
}
