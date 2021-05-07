package br.com.dogsteps.interfaces;

import br.com.dogsteps.dao.Dao;
import javax.ws.rs.core.Response;
import java.util.List;

public interface IBaseRepository<T> {
    public Dao inicializarDao();
    public List<T> getList();
    public Response add(T t);
}
