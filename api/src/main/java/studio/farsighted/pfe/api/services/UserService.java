package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import studio.farsighted.pfe.api.interfaces.UserInterface;
import studio.farsighted.pfe.api.models.UserEntity;
import studio.farsighted.pfe.api.repositories.UserRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements UserInterface {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Page<UserEntity> get(String query, String title, String role, String department, Pageable pageable) {
        role = Arrays.stream(role.split(",")).sorted().collect(Collectors.joining(",")).replace(",", " % ");;
        return userRepository.findUsersByFilterCriteria(query, title, role, department, pageable);
    }

    @Override
    public UserEntity find(UUID id) {
        return userRepository.findById(id).get();
    }

    @Override
    public UserEntity save(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Arrays.stream(user.getRole().split(",")).sorted().collect(Collectors.joining(",")));
        return userRepository.save(user);
    }

    @Override
    public UserEntity update(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public void delete(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public Boolean isExist(UUID id) {return userRepository.existsById(id);}

    @Override
    public List<String> getDistinctDepartment() {
        return userRepository.findDistinctUserDepartment();
    }

    @Override
    public List<String> getDistinctJobTitles() {
        return userRepository.findDistinctJobTitles();
    }
}
