package com.example.movieservice.Entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @JsonProperty("theater_name")
    private String theater_name;

    @Column(nullable = false)

    @JsonProperty("location_name")
    private String location_name;

    @JsonProperty("imageUrl")
    private String imageUrl;

    @JsonProperty("location_link")
    private String location_link;

    @JsonProperty("address")
    private String address;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone_no")
    private String phone_no;
    
    @JsonProperty("google_map_link")
    private String google_map_link;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "theater_features", joinColumns = @JoinColumn(name = "location_id"), inverseJoinColumns = @JoinColumn(name = "feature_id"))
    private List<Feature> features = new ArrayList<>();

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTheaterName() {
        return this.theater_name;
    }

    public void setTheaterName(String theater_name) {
        this.theater_name = theater_name;
    }

    public String getLocationName() {
        return this.location_name;
    }

    public void setLocationName(String location_name) {
        this.location_name = location_name;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getLocationLink() {
        return this.location_link;
    }

    public void setLocationLink(String location_link) {
        this.location_link = location_link;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return this.phone_no;
    }

    public void setPhoneNo(String phone_no) {
        this.phone_no = phone_no;
    }

    public String getGoogleMapLink() {
        return this.google_map_link;
    }

    public void setGoogleMapLink(String google_map_link) {
        this.google_map_link = google_map_link;
    }

    public List<Feature> getFeatures() {
        return this.features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }
}
