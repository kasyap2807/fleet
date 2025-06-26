package com.example.demo.Controller;

import com.example.demo.Model.VehicleLocation;
import com.example.demo.Model.VehicleLocationHistory;
import com.example.demo.Repository.VehicleLocationHistoryRepository;
import com.example.demo.Repository.VehicleLocationRepository;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    @Autowired
    private VehicleLocationRepository repo;

    @Autowired
    private VehicleLocationHistoryRepository historyRepo;

    @PostMapping("/save")
    public VehicleLocation saveLocation(@RequestBody VehicleLocation vehicle) {
        VehicleLocationHistory vh = new VehicleLocationHistory();
        vh.setVehicleId(vehicle.getVehicleId());
        vh.setLatitude(vehicle.getLatitude());
        vh.setLongitude(vehicle.getLongitude());
        vh.setTimestamp(LocalDateTime.now());
        historyRepo.save(vh);
        return repo.save(vehicle);
    }

    @GetMapping("/getAll")
    public List<VehicleLocation> getAllVehicles() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleLocation> getVehicle(@PathVariable String id) {
        return repo.findById(id)
                   .map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/history/{vehicleId}")
    public List<VehicleLocationHistory> getHistoryByVehicle(@PathVariable String vehicleId) {
        return historyRepo.findByVehicleIdOrderByTimestampDesc(vehicleId);
    }
}

