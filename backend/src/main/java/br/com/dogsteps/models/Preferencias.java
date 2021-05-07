package br.com.dogsteps.models;

import br.com.dogsteps.enums.EMood;
import br.com.dogsteps.enums.EPort;
import java.io.Serializable;
import java.util.List;

public class Preferencias implements Serializable {

    List<EPort> porte;
    List<EMood> temperamento;

    public Preferencias(List<EPort> porte, List<EMood> temperamento) {
        this.porte = porte;
        this.temperamento = temperamento;
    }

    public List<EPort> getPorte() {
        return porte;
    }

    public void setPorte(List<EPort> porte) {
        this.porte = porte;
    }

    public List<EMood> getTemperamento() {
        return temperamento;
    }

    public void setTemperamento(List<EMood> temperamento) {
        this.temperamento = temperamento;
    }

    public Preferencias() {
    }
}

