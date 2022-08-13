package com.vzh.iherych.Filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request){
        String uri = request.getRequestURI();
        return uri.equals("/login") || uri.equals("/api/user/login")
                || uri.equals("/api/user/sign-up") || uri.equals("/sign-up")
                || request.getRequestURI().matches(".*(css|jpg|png|gif|js|html|svg|ico)");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(shouldNotFilter(request)) {
            filterChain.doFilter(request, response);
        }
        else{
            Cookie accessTokenCookie = WebUtils.getCookie(request, "access_token");
            if(accessTokenCookie != null){
                String accessToken = accessTokenCookie.getValue();
                try {
                    DecodedJWT jwt = JWT.require(Algorithm.HMAC256("secret")).build().verify(accessToken);
                    String username = jwt.getSubject();
                    String[] roles = jwt.getClaim("roles").asArray(String.class);
                    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    stream(roles).forEach(role ->
                            authorities.add(new SimpleGrantedAuthority(role))
                    );
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    if(e instanceof TokenExpiredException){
                        log.error("Access token expired");
                        response.sendError(FORBIDDEN.value(), "Access token expired");
                        response.sendRedirect("/login");
                    }
                    else{
                        log.error("Access token invalid");
                        response.sendError(FORBIDDEN.value(), "Access token invalid");
                        response.sendRedirect("/login");
                    }
                }
            }
            else{
                log.error("Access token is null");
                response.sendRedirect("/login");
            }
        }
    }
}
