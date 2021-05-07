package br.com.dogsteps.interfaces;

import javax.ws.rs.core.Response;

public interface IRepositoryDao<T, K, DTO> extends IBaseRepository<T>, IRepositoryFilter<T, DTO> {
    public T find(K k);
    public Response update(T t);
    public Response remove(K k);
}
