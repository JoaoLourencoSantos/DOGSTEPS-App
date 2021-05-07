package br.com.dogsteps.services;

import br.com.dogsteps.interfaces.IEstatistica;
import br.com.dogsteps.repositories.EstatisticasRepository;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/estatisticas")
public class EstatisticasService {
    private IEstatistica<Number> estatisticasService = new EstatisticasRepository();

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllEstatisticas() {
        return estatisticasService.getAllEstatisticas();
    }
}
