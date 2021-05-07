package br.com.dogsteps.models;

import java.io.Serializable;

public class Avaliacao extends Configuracoes implements Serializable {
    private int nota;

    public Avaliacao(int nota) {
        this.nota = nota;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public Avaliacao() {
    }
}
