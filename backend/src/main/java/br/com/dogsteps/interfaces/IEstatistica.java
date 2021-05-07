package br.com.dogsteps.interfaces;

import java.util.Map;

public interface IEstatistica<T extends Number> {
    public String getAllEstatisticas();
    public Map<String, ?> getPasseiosEstatistica();
    public Map<String, ?> getTotalCadastroDogWalker();
    public Map<String, ?> getMediaPetsPorTutor();
    public Map<String, ?> getMediaIdadePasseadores();
    public Map<String, ?> getMediaHorarioPasseio();
}
