package com.vzh.iherych.Service;

import com.vzh.iherych.Model.User;
import com.vzh.iherych.Model.UserRole;
import com.vzh.iherych.Repository.UserRepository;
import com.vzh.iherych.Repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;

    public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    public static boolean validate(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        return matcher.find();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            log.info("User not found");
            throw new UsernameNotFoundException("User not found");
        }else{
            log.info("User found with username: " + username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        if (!validate(user.getEmail()) || userRepository.findByEmail(user.getEmail()) != null) {
            return null;
        }
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return null;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        log.info("Saving user: " + user.getUsername());
        return userRepository.save(user);
    }

    public User updateUserById(Long id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setPassword(user.getPassword() == null ? existingUser.getPassword() : passwordEncoder.encode(user.getPassword()));
            existingUser.setFirstName(user.getFirstName() == null ? existingUser.getFirstName() : user.getFirstName());
            existingUser.setLastName(user.getLastName() == null ? existingUser.getLastName() : user.getLastName());
            return existingUser;
        }
        return null;
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public UserRole saveUserRole(UserRole userRole) {
        log.info("Saving role: " + userRole.getName());
        return userRoleRepository.save(userRole);
    }

    public void addRoleToUser(String userName, String roleName) {
        log.info("Adding role: " + roleName + " to user: " + userName);
        User user = userRepository.findByUsername(userName);
        UserRole userRole = userRoleRepository.findByName(roleName);
        user.getRoles().add(userRole);
    }

    public ResponseEntity<String> updatePassword(Long id, String oldPassword, String newPassword){
        User user = findById(id);
        if(user != null){
            if(passwordEncoder.matches(oldPassword, user.getPassword())){
                user.setPassword(passwordEncoder.encode(newPassword));
                log.info("Password updated for user: " + user.getUsername());
                return ResponseEntity.ok().build();
            }
            else{
                log.error("Old password does not match");
                return ResponseEntity.badRequest().body("Old password is incorrect");
            }
        }
        else{
            log.error("User not found");
            return ResponseEntity.badRequest().body("User not found");
        }
    }
}
