package br.com.dogsteps.repositories;

import br.com.dogsteps.dao.Dao;
import br.com.dogsteps.excecoes.EmailInvalidoException;
import br.com.dogsteps.excecoes.StringVaziaException;
import br.com.dogsteps.excecoes.ValorNegativoException;
import br.com.dogsteps.interfaces.IDao;
import br.com.dogsteps.interfaces.IRepositoryDao;
import br.com.dogsteps.models.Tutor;
import br.com.dogsteps.models.dto.TutorDto;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.List;

public class TutorRepository implements IRepositoryDao<Tutor, String, TutorDto> {
    private static final String FILE_NAME = "database/tutor.bin";
    private final IDao<Tutor, String> TUTOR_DAO = inicializarDao();

    public Dao inicializarDao() {
        try {
            return new Dao<>(FILE_NAME);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Tutor> getList() {
        return TUTOR_DAO.getAll();
    }

    @Override
    public Tutor find(String id) {
        return (Tutor) TUTOR_DAO.get(id);
    }

    @Override
    public Response add(Tutor tutor) {
        try {
            validarRequisicao(tutor);
            return TUTOR_DAO.add(tutor) ?
                    Response.status(Response.Status.OK).build()
                    : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } catch (ValorNegativoException | StringVaziaException |
                EmailInvalidoException | NullPointerException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @Override
    public Response update(Tutor tutor) {
        try {
            return TUTOR_DAO.update(tutor) ?
                    Response.status(Response.Status.OK).build() :
                    Response.status(Response.Status.NOT_FOUND).build();
        } catch (ValorNegativoException | StringVaziaException |
                EmailInvalidoException | NullPointerException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @Override
    public Response remove(String id) {
        if (id != null) {
            if (!(id.isEmpty())) {
                return TUTOR_DAO.remove(id) ?
                        Response.status(Response.Status.OK).build() :
                        Response.status(Response.Status.NOT_FOUND).build();
            }
        }
        return
                Response.status(Response.Status.BAD_REQUEST).build();
    }

    @Override
    public List<Tutor> getListByFilter(TutorDto tutorDTO) {
        return null;
    }

    private void validarRequisicao(Tutor tutor) throws ValorNegativoException, StringVaziaException,
            EmailInvalidoException {

        if (tutor.getIdade() <= 0)
            throw new ValorNegativoException();

        if (tutor.getNome().isEmpty() || tutor.getEmail().isEmpty()
                || tutor.getCpf().isEmpty() || tutor.getSenha().isEmpty())
            throw new StringVaziaException();

        String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
        if (!(tutor.getEmail().matches(regex)))
            throw new EmailInvalidoException();
    }
}
