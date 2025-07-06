package com.example.movieservice.Security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                // .addResourceLocations("file:///D:/Projects/movie_images/");
                .addResourceLocations("file:///D:/Projects/movie_ticket_booking_images/");
    }
}
