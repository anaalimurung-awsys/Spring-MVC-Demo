package com.spring.spring_rest.security;

import java.util.Arrays;
import com.spring.spring_rest.service.CustomUserDetailsService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@EnableWebSecurity 
@Configuration 
public class SecurityConfig {

   private CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    /**
     * Function to filter requests.
     * @param sec
     * @return sec.cors()
     * @throws Exception
     */
    @Bean 
    SecurityFilterChain filterChain(HttpSecurity sec) throws Exception {
        return sec.cors(cors -> cors.configure(sec))
                    .csrf(AbstractHttpConfigurer::disable)
                    .sessionManagement(session -> 
                        session.sessionCreationPolicy(
                            SessionCreationPolicy.IF_REQUIRED))
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/api/auth/**").permitAll()
                            .requestMatchers(HttpMethod.OPTIONS, "/**")
                                .permitAll()
                            .requestMatchers("/api/students/**")
                                .hasAnyAuthority("USER", "ADMIN")
                            .anyRequest()
                            .authenticated())
                    .httpBasic(Customizer.withDefaults())
                    .build();
    }
    
    public CustomUserDetailsService getUserDetailsService() {
        return userDetailsService;
    }

    public void setUserDetailsService(
        CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    /**
     * Hashes passwords before saving to database.
     * @return new BCryptPasswordEncoder()
     */
    @Bean 
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Method to manually authenticate users.
     * @param authentication
     * @return authentication.getAuthenticationManager()
     * @throws Exception
     */
    @Bean 
    AuthenticationManager authManager(
        AuthenticationConfiguration authentication
    ) throws Exception {
        return authentication.getAuthenticationManager();
    }

    /**
     * For cross origin configuration.
     * @return new UrlBasedCorsConfiguration source 
     */
    @Bean 
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration conf =  new CorsConfiguration();

        conf.setAllowedOrigins(Arrays.asList("http://localhost:3000",
                                                "http://127.0.0.1:3000"));
        conf.setAllowedMethods(Arrays.asList("GET", "POST",
                                                "PUT", "PATCH",
                                                "DELETE", "OPTIONS"));
        conf.setAllowedHeaders(Arrays.asList("Authorization",
                                                "Cache-Control",
                                                "Content-Type"));               
        conf.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = 
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", conf);

        return source;
    }
}
