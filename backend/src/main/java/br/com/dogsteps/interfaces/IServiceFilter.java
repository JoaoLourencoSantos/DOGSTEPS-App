package br.com.dogsteps.interfaces;

import java.util.List;

public interface IServiceFilter<T, DTO> {
    public List<T> getListByFilter(DTO dto);
}
