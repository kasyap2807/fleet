package com.example.demo.Controller;

import com.example.demo.Model.VehicleLocation;
import com.example.demo.Repository.VehicleLocationRepository;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {
    @Autowired
    private VehicleLocationRepository repo;

    @PostMapping
    public VehicleLocation saveLocation(@RequestBody VehicleLocation vehicle) {
        return repo.save(vehicle);
    }

    @GetMapping
    public List<VehicleLocation> getAllVehicles() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleLocation> getVehicle(@PathVariable String id) {
        return repo.findById(id)
                   .map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
}
