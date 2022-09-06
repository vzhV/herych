package com.vzh.iherych;

import com.vzh.iherych.Model.User;
import com.vzh.iherych.Model.UserRole;
import com.vzh.iherych.Service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

@SpringBootApplication
public class IherychApplication {

	public static void main(String[] args) {
		SpringApplication.run(IherychApplication.class, args);
	}
	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {

		};
	}
}
