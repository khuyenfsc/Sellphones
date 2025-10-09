package com.sellphones.configuration;

import com.sellphones.constant.AppConstants;
import com.sellphones.filter.JwtValidatorFilter;
import com.sellphones.oauth2.CustomOAuth2UserService;
import com.sellphones.service.authentication.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

    private final CustomOAuth2UserService oAuth2UserService;

    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    private final JwtValidatorFilter jwtValidatorFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtValidatorFilter jwtValidatorFilter) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(AppConstants.ADMIN_ENDPOINTS).hasAuthority("ADMIN")
                        .requestMatchers(AppConstants.CUSTOMER_ENDPOINTS).hasAuthority("CUSTOMER")
                        .requestMatchers(AppConstants.PUBLIC_ENDPOINTS).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(sessionConfig -> sessionConfig
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .csrf(csrfConfig -> csrfConfig.disable())
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(u -> u.userService(oAuth2UserService))
                        .successHandler(oAuth2SuccessHandler)
                )
                .addFilterBefore(jwtValidatorFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                        .accessDeniedHandler(new CustomAccessDeniedHandler())
                );

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
