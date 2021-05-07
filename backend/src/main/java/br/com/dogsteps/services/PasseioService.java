package br.com.dogsteps.services;

import br.com.dogsteps.interfaces.IRepositoryDao;
import br.com.dogsteps.interfaces.IServiceDao;
import br.com.dogsteps.models.Passeio;
import br.com.dogsteps.models.dto.PasseioDto;
import br.com.dogsteps.repositories.PasseioRepository;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/tours")
public class PasseioService implements IServiceDao<Passeio, String, PasseioDto> {
    private static IRepositoryDao<Passeio, String, PasseioDto> tourRepository = new PasseioRepository();

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public List<Passeio> getAll() {
        return tourRepository.getList();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Passeio get(@PathParam("id") String id) {
        return tourRepository.find(id);
    }

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Override
    public Response post(Passeio passeio) {
        return tourRepository.add(passeio);
    }

    @PUT
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Override
    public Response update(Passeio passeio) {
        return tourRepository.update(passeio);
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response remove(@PathParam("id") String id) {
        return tourRepository.remove(id);
    }

    @POST
    @Path("/filter")
    @Consumes(MediaType.APPLICATION_JSON)
    @Override
    public List<Passeio> getListByFilter(PasseioDto passeioDTO) {
        return tourRepository.getListByFilter(passeioDTO);
    }
}
