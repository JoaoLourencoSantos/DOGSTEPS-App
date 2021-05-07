package br.com.dogsteps.services;

import br.com.dogsteps.interfaces.IRepositoryDao;
import br.com.dogsteps.interfaces.IServiceDao;
import br.com.dogsteps.models.Pet;
import br.com.dogsteps.models.dto.PetDto;
import br.com.dogsteps.repositories.PetRepository;
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

@Path("/pets")
public class PetService implements IServiceDao<Pet, String, PetDto> {

    private static IRepositoryDao<Pet, String, PetDto> petRepository = new PetRepository();

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public List<Pet> getAll() {
        return petRepository.getList();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Pet get(@PathParam("id") String id) {
        return petRepository.find(id);
    }

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Override
    public Response post(Pet pet) {
        return petRepository.add(pet);
    }

    @PUT
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Override
    public Response update(Pet pet) {
        return petRepository.update(pet);
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response remove(@PathParam("id") String id) {
        return petRepository.remove(id);
    }

    @POST
    @Path("/filter")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Pet> getListByFilter(PetDto petDTO) {
        return null;
    }
}
