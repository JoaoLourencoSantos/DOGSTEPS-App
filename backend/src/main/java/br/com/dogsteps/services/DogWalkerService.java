package br.com.dogsteps.services;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.dogsteps.interfaces.IRepositoryDao;
import br.com.dogsteps.interfaces.IServiceDao;
import br.com.dogsteps.models.dto.DogWalkerDto;
import br.com.dogsteps.models.DogWalker;
import br.com.dogsteps.repositories.DogWalkerRepository;

@Path("/dogwalkers")
public class DogWalkerService implements IServiceDao<DogWalker, String, DogWalkerDto> {
    private static IRepositoryDao<DogWalker, String, DogWalkerDto> dogWalkerRepository = new DogWalkerRepository();

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public List<DogWalker> getAll() {
        return dogWalkerRepository.getList();
    }

    @POST
    @Path("/filter")
    @Consumes(MediaType.APPLICATION_JSON)
    @Override
    public List<DogWalker> getListByFilter(DogWalkerDto dogWalkerDTO) {
        return dogWalkerRepository.getListByFilter(dogWalkerDTO);
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public DogWalker get(@PathParam("id") String id) {
        return dogWalkerRepository.find(id);
    }

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Override
    public Response post(DogWalker dogWalker) {
        return dogWalkerRepository.add(dogWalker);
    }

    @PUT
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Override
    public Response update(DogWalker dogWalker) {
        return dogWalkerRepository.update(dogWalker);
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response remove(@PathParam("id") String id) {
        return dogWalkerRepository.remove(id);
    }
}
