package br.com.dogsteps.excecoes;

public class DataInvalidaException extends RuntimeException{
    public DataInvalidaException(){
        super("A data possui um valor inválido!");
        printStackTrace();
    }
}
