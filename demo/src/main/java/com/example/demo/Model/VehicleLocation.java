package com.example.demo.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class VehicleLocation {
    @Id
    private String vehicleId;
    private double latitude;
    private double longitude;

    public String getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(String vehicleId) {
        this.vehicleId = vehicleId;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public VehicleLocation(String vehicleId, double latitude, double longitude) {
        this.vehicleId = vehicleId;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public VehicleLocation() {
    }
}
