package com.sellphones.configuration;

import com.sellphones.constant.AppConstants;
import com.sellphones.filter.JwtValidatorFilter;
import com.sellphones.service.authentication.AuthenticationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

    @Bean
    public JwtValidatorFilter jwtValidatorFilter(AuthenticationService authenticationService){
        return new JwtValidatorFilter(authenticationService);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtValidatorFilter jwtValidatorFilter) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(AppConstants.ADMIN_ENDPOINTS).hasAuthority("ADMIN")
                        .requestMatchers(AppConstants.CUSTOMER_ENDPOINTS).hasAnyAuthority("CUSTOMER", "ADMIN")
                        .requestMatchers(AppConstants.PUBLIC_ENDPOINTS).permitAll()
                        .anyRequest().authenticated()
                )
                .csrf(csrfConfig -> csrfConfig.disable())
                .addFilterBefore(jwtValidatorFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(UsernamePasswordAuthenticationProvider authenticationProvider){
        return new ProviderManager(authenticationProvider);
    }

}
