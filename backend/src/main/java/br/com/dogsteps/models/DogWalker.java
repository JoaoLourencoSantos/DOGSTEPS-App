package br.com.dogsteps.models;

import br.com.dogsteps.interfaces.IBaseRepository;
import br.com.dogsteps.repositories.PasseioRepository;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class DogWalker extends User implements Serializable {
    private static final long serialVersionUID = 1L;
    private double mediaAvaliacao;
    private String descricao;
    private List<Avaliacao> avaliacoes;
    private Preferencias preferencias;
    private Agenda agenda;

    public DogWalker(String nome, String photoUrl, int idade, String cpf, String email, String senha, Endereco endereco,
                     Agenda agenda, List<Avaliacao> avaliacoes, double mediaAvaliacao, String descricao) {
        super(nome, photoUrl, idade, cpf, email, senha, endereco);

        this.avaliacoes = avaliacoes;
        this.mediaAvaliacao = mediaAvaliacao;
        this.descricao = descricao;
        this.agenda = agenda;
    }

    public List<Avaliacao> getAvaliacoes() {
        final IBaseRepository<Passeio> listaDePasseios = new PasseioRepository();

        List<Passeio> passeios = listaDePasseios.getList().stream()
                .filter(passeio ->
                        passeio.getDogWalkerId().equals(getId()) &&
                                passeio.getAvaliacao() != null
                ).collect(Collectors.toList());
        if (passeios.size() > 0) {
            return passeios.stream().map(Passeio::getAvaliacao).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    public void setAvaliacoes(List<Avaliacao> avaliacoes) {
        this.avaliacoes = avaliacoes;
    }

    public double getMediaAvaliacao() {
        if (this.getAvaliacoes().size() > 0)
            return this.getAvaliacoes().stream().mapToInt(Avaliacao::getNota).average().getAsDouble();
        return 0;
    }

    public void setMediaAvaliacao(double mediaAvaliacao) {
        this.mediaAvaliacao = mediaAvaliacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Preferencias getPreferencias() {
        return preferencias;
    }

    public void setPreferencias(Preferencias preferencias) {
        this.preferencias = preferencias;
    }

    public Agenda getAgenda() {
        return agenda;
    }

    public void setAgenda(Agenda agenda) {
        this.agenda = agenda;
    }

    public DogWalker() {
    }

    public boolean estaDentroDoPoligono(List<Coordenada> coordenadas) {
        Coordenada localizacao = this.getEndereco().getCoordenada();
        List<Double> latitudes = coordenadas.stream().map(x -> x.getLatitude()).collect(Collectors.toList());
        List<Double> longitudes = coordenadas.stream().map(y -> y.getLongitude()).collect(Collectors.toList());
        return localizacao.getLatitude() > latitudes.get(0) && localizacao.getLatitude() < latitudes.get(1) &&
                localizacao.getLongitude() > longitudes.get(0) && localizacao.getLongitude() < longitudes.get(1);
    }


    @Override
    public String toString() {
        return this.getNome();
    }
}
