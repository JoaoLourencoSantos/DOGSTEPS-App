package br.com.dogsteps.enums;

import java.io.Serializable;

public enum EDuracao implements Serializable {

    E30MINUTOS(1, "Passear durante 30 minutos"),
    E1HORA(2, "Passear durante 1 hora");

    private int id;
    private String descricao;

    EDuracao(int id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public int getId() {
        return id;
    }
    public String getDescricao() {
        return descricao;
    }
}
