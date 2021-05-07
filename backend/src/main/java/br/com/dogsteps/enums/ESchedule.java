package br.com.dogsteps.enums;

public enum ESchedule {
    MANHA(1, "Passear durante a manhã"),
    TARDE(2, "Passear durante a tarde"),
    NOITE(3, "Passear durante a noite");

    private int id;
    private String descricao;

    ESchedule(int id, String descricao) {
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
