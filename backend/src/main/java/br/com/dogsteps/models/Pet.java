package br.com.dogsteps.models;

import br.com.dogsteps.enums.ESex;

import java.io.Serializable;

public class Pet extends Configuracoes implements Serializable {
    private static final long serialVersionUID = 1L;

    private String nome;
    private int idade;
    private String foto;
    private String raca;
    private ESex sexo;
    private String tutorId;
    private String descricao;

    public Pet(String nome, int idade, String foto, String raca, ESex sexo, String tutorId) {
        this.nome = nome;
        this.idade = idade;
        this.foto = foto;
        this.raca = raca;
        this.sexo = sexo;
        this.tutorId = tutorId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getRaca() {
        return raca;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }

    public ESex getSexo() {
        return sexo;
    }

    public void setSexo(ESex sexo) {
        this.sexo = sexo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getTutorId() {
        return tutorId;
    }

    public void setTutorId(String tutorId) {
        this.tutorId = tutorId;
    }

    public Pet() {
    }
}
