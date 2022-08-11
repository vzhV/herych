package com.vzh.iherych.Controller;

import com.vzh.iherych.Model.User;
import com.vzh.iherych.Model.UserRole;
import com.vzh.iherych.Service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/user/email/{email}")
    public ResponseEntity<User> findByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        return user == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(user);
    }

    @GetMapping("/user/username/{username}")
    public ResponseEntity<User> findByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        return user == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(user);
    }

    @PostMapping("/user")
    public ResponseEntity<User> save(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role").toUriString());
        User savedUser = userService.save(user);
        return savedUser == null ? ResponseEntity.badRequest().build() : ResponseEntity.created(uri).body(savedUser);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Long id,@RequestBody User user) {
        User updated = userService.updateUserById(id, user);
        return updated == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(updated);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Long id) {
        User updated = userService.findById(id);
        return updated == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(updated);
    }

    @PostMapping("/role")
    public ResponseEntity<UserRole> saveRole(@RequestBody UserRole userRole) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role").toUriString());
        UserRole savedUserRole = userService.saveUserRole(userRole);
        return savedUserRole == null ? ResponseEntity.badRequest().build() : ResponseEntity.created(uri).body(savedUserRole);
    }

    @PostMapping("/user/role")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUser form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

}
@Data
class RoleToUser{
    private String username;
    private String roleName;
}
