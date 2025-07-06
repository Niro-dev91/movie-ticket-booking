package com.example.movieservice.Controller;

import com.example.movieservice.Entity.Feature;
import com.example.movieservice.Entity.Location;
import com.example.movieservice.Service.LocationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.List;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    /*
     * @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
     * public String testMultipart(
     * 
     * @RequestPart("location") MultipartFile locationFile,
     * 
     * @RequestPart(value = "imageFile", required = false) MultipartFile imageFile,
     * 
     * @RequestPart(value = "features", required = false) String featuresJson
     * ) throws IOException {
     * System.out.println("Received location part as file: " +
     * locationFile.getOriginalFilename());
     * 
     * if (imageFile != null) {
     * System.out.println("Received image file: " +
     * imageFile.getOriginalFilename());
     * System.out.println("Image content size: " + imageFile.getSize());
     * } else {
     * System.out.println("No image file received.");
     * }
     * 
     * String locationContent = new String(locationFile.getBytes());
     * System.out.println("Location JSON content: " + locationContent);
     * 
     * if (featuresJson != null) {
     * System.out.println("Features JSON: " + featuresJson);
     * } else {
     * System.out.println("No features received.");
     * }
     * 
     * return "ok";
     * }
     */

    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Location createLocation(
            @RequestPart("location") String locationJson,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile,
            @RequestPart("features") String featuresJson) throws JsonProcessingException {
      //  System.out.println("Received location JSON: " + locationJson);

        ObjectMapper mapper = new ObjectMapper();
        Location location = mapper.readValue(locationJson, Location.class);
        List<Feature> features = mapper.readValue(featuresJson, new TypeReference<List<Feature>>() {
        });

        return locationService.saveLocation(location, imageFile, features);
    }

    @GetMapping("/all")
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    /*
     * @GetMapping("/{location_link}")
     * public String getLocationDetail(@PathVariable String location_link) {
     * // return locationService.getLocationDetail(location_link);
     * return location_link;
     * }
     */
    @GetMapping("/{locationLink}")
    public Location getLocationByLink(@PathVariable String locationLink) {
        return locationService.findByLocationLink(locationLink);
    }

}
