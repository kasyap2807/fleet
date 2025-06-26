package com.example.demo.Repository;


import com.example.demo.Model.VehicleLocationHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleLocationHistoryRepository extends JpaRepository<VehicleLocationHistory, Long> {
    List<VehicleLocationHistory> findByVehicleIdOrderByTimestampDesc(String vehicleId);
}
