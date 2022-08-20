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
			userService.saveUserRole(new UserRole(null, "USER", "#BAACB3", "#fff"));
			userService.saveUserRole(new UserRole(null, "ADMIN", "#E6E056", "#781E0B"));


			userService.save(new User(null, "vzh", "vzh@gmail.com", "fuckmyfps1", "Vlad", "Zh", new ArrayList<>()));
			userService.save(new User(null, "vzh1", "vzh1@gmail.com", "fuckmyfps1", "Vlad1", "Zh1", new ArrayList<>()));
			userService.save(new User(null, "vzh2", "vzh2@gmail.com", "fuckmyfps1", "Vlad2", "Zh2", new ArrayList<>()));

			userService.addRoleToUser("vzh", "USER");
			userService.addRoleToUser("vzh1", "USER");
			userService.addRoleToUser("vzh2", "USER");
			userService.addRoleToUser("vzh", "ADMIN");
			userService.addRoleToUser("vzh1", "ADMIN");

		};
	}
}
