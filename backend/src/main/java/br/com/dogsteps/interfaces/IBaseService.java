package br.com.dogsteps.interfaces;

import javax.ws.rs.core.Response;
import java.util.List;

public interface IBaseService<T>
{
    public Response post(T t);
    public List<T> getAll();

}
