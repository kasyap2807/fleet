package com.example.demo.Repository;

import com.example.demo.Model.VehicleLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleLocationRepository extends JpaRepository<VehicleLocation, String> {
}
