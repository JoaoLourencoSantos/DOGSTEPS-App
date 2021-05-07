package br.com.dogsteps.models.dto;

import br.com.dogsteps.enums.ETourStatus;

public class PasseioDto {
    private ETourStatus status;
    private String idDogWalker;
    private String idTutor;

    public PasseioDto(ETourStatus status, String idDogWalker, String idTutor) {
        this.status = status;
        this.idDogWalker = idDogWalker;
        this.idTutor = idTutor;
    }

    public ETourStatus getStatus() {
        return status;
    }

    public void setStatus(ETourStatus status) {
        this.status = status;
    }

    public String getIdDogWalker() {
        return idDogWalker;
    }

    public void setIdDogWalker(String idDogWalker) {
        this.idDogWalker = idDogWalker;
    }

    public String getIdTutor() {
        return idTutor;
    }

    public void setIdTutor(String idTutor) {
        this.idTutor = idTutor;
    }

    public PasseioDto() {
    }
}
