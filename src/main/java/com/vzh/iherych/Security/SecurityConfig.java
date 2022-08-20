package com.vzh.iherych.Security;

import com.auth0.jwt.algorithms.Algorithm;
import com.vzh.iherych.Filter.CustomAuthenticationFilter;
import com.vzh.iherych.Filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.*;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter authenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean(), algorithm());
        authenticationFilter.setFilterProcessesUrl("/api/user/login");
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers("/login","/api/login/**").permitAll();
        http.authorizeRequests().antMatchers(GET, "/api/user/email/**","/api/user/username/**","/api/user/id/**", "/api/user/all", "/api/role").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers(DELETE, "/api/fact/**").hasAnyAuthority("ADMIN");
        http.authorizeRequests().antMatchers(POST, "/api/role","/api/user/role", "/api/user/role/delete").hasAnyAuthority("ADMIN");

        http.formLogin()
                .loginPage("/login")
                .usernameParameter("username")
                .permitAll();

        http.logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login")
                .deleteCookies("access_token")
                .deleteCookies("refresh_token");

        http.addFilter(authenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(algorithm()), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public Algorithm algorithm() {
        return Algorithm.HMAC256("secret");
    }
}
