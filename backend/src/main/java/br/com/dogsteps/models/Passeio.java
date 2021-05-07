package br.com.dogsteps.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import br.com.dogsteps.enums.EDuracao;
import br.com.dogsteps.enums.ETourStatus;

public class Passeio extends Configuracoes implements Serializable {
    private static final long serialVersionUID = 1L;
    private Agenda agenda;
    private ETourStatus status;
    private EDuracao duracao;
    private List<Pet> pets = new ArrayList<>();
    private String dogWalkerId;
    private String tutorId;
    private Avaliacao avaliacao;

    public Passeio(Agenda agenda, ETourStatus status, EDuracao duracao, List<Pet> pets, String dogWalkerId, String tutorId, Avaliacao avaliacao) {
        this.agenda = agenda;
        this.status = status;
        this.duracao = duracao;
        this.pets = pets;
        this.dogWalkerId = dogWalkerId;
        this.tutorId = tutorId;
        this.avaliacao = avaliacao;
    }

    public Agenda getAgenda() {
        return agenda;
    }

    public void setAgenda(Agenda agenda) {
        this.agenda = agenda;
    }

    public ETourStatus getStatus() {
        return status;
    }

    public void setStatus(ETourStatus status) {
        this.status = status;
    }

    public EDuracao getDuracao() {
        return duracao;
    }

    public void setDuracao(EDuracao duracao) {
        this.duracao = duracao;
    }

    public List<Pet> getPets() {
        return pets;
    }

    public void setPets(List<Pet> pets) {
        this.pets = pets;
    }

    public String getDogWalkerId() {
        return dogWalkerId;
    }

    public void setDogWalkerId(String dogWalkerId) {
        this.dogWalkerId = dogWalkerId;
    }

    public String getTutorId() {
        return tutorId;
    }

    public void setTutorId(String tutorId) {
        this.tutorId = tutorId;
    }

    public Avaliacao getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(Avaliacao avaliacao) {
        this.avaliacao = avaliacao;
    }

    public Passeio() {
    }

}
