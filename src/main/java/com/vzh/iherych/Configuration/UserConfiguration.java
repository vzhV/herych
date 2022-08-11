package com.vzh.iherych.Configuration;


import com.vzh.iherych.Service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfiguration {
    private final UserService userService;

    public UserConfiguration(UserService userService) {
        this.userService = userService;
    }

    @Bean
    public void createUsers(){
        /*userService.save(new User("vzh", "vzh@gmail.com", "fuckmyfps1", "Vlad", "Zh", UserRole.ADMIN));
        userService.save(new User("vzh2", "vzh2@gmail.com", "fuckmyfps2", "Vlad2", "Zh2", UserRole.USER));
        userService.save(new User("vzh3", "vzh3@gmail.com", "fuckmyfps3", "Vlad3", "Zh3", UserRole.USER));*/
    }
}
