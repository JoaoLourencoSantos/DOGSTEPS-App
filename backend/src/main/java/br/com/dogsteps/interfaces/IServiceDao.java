package br.com.dogsteps.interfaces;

import javax.ws.rs.core.Response;

public interface IServiceDao<T, K, DTO> extends IBaseService<T>, IServiceFilter<T, DTO> {
    public T get(K k);
    public Response update(T t);
    public Response remove(K k);
}
