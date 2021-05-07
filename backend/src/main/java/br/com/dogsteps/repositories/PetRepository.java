package br.com.dogsteps.repositories;

import br.com.dogsteps.dao.Dao;
import br.com.dogsteps.excecoes.StringVaziaException;
import br.com.dogsteps.excecoes.ValorNegativoException;
import br.com.dogsteps.interfaces.IDao;
import br.com.dogsteps.interfaces.IRepositoryDao;
import br.com.dogsteps.models.Pet;
import br.com.dogsteps.models.dto.PetDto;
import org.jetbrains.annotations.NotNull;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.List;

public class PetRepository implements IRepositoryDao<Pet, String, PetDto> {

    private static final String DIRETORIO = "database/pets.bin";
    private final IDao<Pet, String> PET_DAO = inicializarDao();

    @Override
    public Dao inicializarDao() {
        try {
            return new Dao(DIRETORIO);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List getList() {
        return PET_DAO.getAll();
    }

    @Override
    public Pet find(String id) {
        return PET_DAO.get(id);
    }

    @Override
    public Response add(Pet pet) {
        try {
            validarRequisicao(pet);
            if (PET_DAO.add(pet))
                return Response.status(Response.Status.OK).build();
            else
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } catch (ValorNegativoException | StringVaziaException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @Override
    public Response update(Pet pet) {
        try {
            validarRequisicao(pet);
            if (PET_DAO.update(pet))
                return Response.status(Response.Status.OK).build();
            else
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } catch (ValorNegativoException | StringVaziaException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @Override
    public Response remove(String id) {
        if (id != null) {
            if (!(id.isEmpty())) {
                if (PET_DAO.remove(id))
                    return Response.status(Response.Status.OK).build();
                else
                    return Response.status(Response.Status.NOT_FOUND).build();
            }
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @Override
    public List<Pet> getListByFilter(PetDto petDTO) {
        return null;
    }


    private void validarRequisicao(Pet pet) throws ValorNegativoException, StringVaziaException {
        if (pet.getIdade() <= 0)
            throw new ValorNegativoException();

        if (pet.getNome().isEmpty() || pet.getFoto().isEmpty() || pet.getRaca().isEmpty())
            throw new StringVaziaException();

    }
}
