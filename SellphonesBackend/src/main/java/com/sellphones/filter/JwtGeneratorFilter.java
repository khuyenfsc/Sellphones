//package com.sellphones.filter;
//
//import com.sellphones.constant.AppConstants;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.crypto.SecretKey;
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.util.Date;
//import java.util.stream.Collectors;
//
//public class JwtGeneratorFilter extends OncePerRequestFilter {
//
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if(authentication != null){
//            String secret = AppConstants.SECRET_KEY;
//            SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
//            String jwt = Jwts.builder().issuer("khuyen").subject("jwt")
//                    .claim("username", authentication.getName())
//                    .claim("authorities", authentication
//                            .getAuthorities().stream()
//                            .map(a -> a.getAuthority())
//                            .collect(Collectors.joining("'"))
//                    )
//                    .issuedAt(new Date())
//                    .expiration(new Date(new Date().getTime() + 900000))
//                    .signWith(secretKey)
//                    .compact();
//        }
//    }
//}
