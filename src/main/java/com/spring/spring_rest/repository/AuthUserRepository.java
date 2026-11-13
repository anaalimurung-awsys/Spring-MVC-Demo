package com.spring.spring_rest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.spring_rest.entity.Auth_User;

public interface AuthUserRepository extends JpaRepository<Auth_User, Integer> {
    Optional<Auth_User> findByUsername(String username);
    Boolean existsByUsername(String username);
}
