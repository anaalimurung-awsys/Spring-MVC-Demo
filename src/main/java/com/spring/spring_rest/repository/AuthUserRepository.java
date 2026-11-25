package com.spring.spring_rest.repository;

import com.spring.spring_rest.entity.Auth_User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 
 * AuthUserRepository
 */
public interface AuthUserRepository extends JpaRepository<Auth_User, Long> {
    Optional<Auth_User> findByUsername(String username);
    Boolean existsByUsername(String username);
}
