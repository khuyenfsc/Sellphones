package com.sellphones.configuration;

import com.sellphones.entity.user.Provider;
import com.sellphones.entity.user.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@AllArgsConstructor
@Data
@Builder
public class CustomUserDetails implements UserDetails {

    private final String role;
    private final String username;
    private final String password;
    private final Provider provider;
    private final UserStatus status;
    private final Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities.stream().toList();
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }
}
