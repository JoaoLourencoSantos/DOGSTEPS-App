package br.com.dogsteps.interfaces;

public interface IFindOne<T, DTO> {
    public T get(DTO dto);
}
