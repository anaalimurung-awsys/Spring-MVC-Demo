package com.spring.spring_rest.service;

import com.spring.spring_rest.entity.Auth_Roles;
import com.spring.spring_rest.entity.Auth_User;
import com.spring.spring_rest.repository.AuthUserRepository;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 
 * CustomUserDetailsService
 */
@Service 
public class CustomUserDetailsService implements UserDetailsService {
    private final AuthUserRepository authUserRepo;

    public CustomUserDetailsService(AuthUserRepository authUserRepo) {
        this.authUserRepo = authUserRepo;
    }

    public AuthUserRepository getAuthUserRepo() {
        return authUserRepo;
    }

    /**    (non-Javadoc)
     */
    @Override
    public UserDetails loadUserByUsername(String username) 
        throws UsernameNotFoundException {
            Auth_User user = authUserRepo
                            .findByUsername(username)
                            .orElseThrow(() ->
                            new UsernameNotFoundException("Username " + 
                                                username + 
                                                " not found"));
        return new User(user.getUsername(), 
                        user.getPassword(), 
                        mapRolesToAuthorities(user.getRoles()));
    }

    /**
     * Method to convert Auth_Roles objects to GrantedAuthority objects.
     * @param roles
     * @return
     */
    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Auth_Roles> roles) {
        return roles.stream().map(role -> 
                            new SimpleGrantedAuthority(role.getName()))
                            .collect(Collectors.toList());
    }
}
