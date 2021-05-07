package br.com.dogsteps.interfaces;

import java.util.List;

public interface IRepositoryFilter<T, DTO> {
    public List<T> getListByFilter(DTO dto);
}
