package br.com.dogsteps.models;

import java.io.Serializable;

public class Coordenada implements Serializable {
    private Double latitude;
    private Double longitude;

    public Coordenada(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Coordenada() {
    }
}
