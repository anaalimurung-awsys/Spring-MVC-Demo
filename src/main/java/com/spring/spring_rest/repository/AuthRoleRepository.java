package com.spring.spring_rest.repository;

import com.spring.spring_rest.entity.Auth_Roles;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 
 * AuthRoleRepository
 */
public interface AuthRoleRepository extends JpaRepository<Auth_Roles, Long> {
    Optional<Auth_Roles> findByName(String name);
    Boolean existsByName(String name);
}
