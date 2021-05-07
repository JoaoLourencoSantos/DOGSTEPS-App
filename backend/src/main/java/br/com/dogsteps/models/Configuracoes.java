package br.com.dogsteps.models;

import java.io.Serializable;

public class Configuracoes implements Serializable {
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Configuracoes() {
    }
}
