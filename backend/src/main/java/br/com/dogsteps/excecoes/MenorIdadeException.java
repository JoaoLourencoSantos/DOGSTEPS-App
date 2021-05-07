package br.com.dogsteps.excecoes;

public class MenorIdadeException extends RuntimeException {
    public MenorIdadeException(){
        super("O usuário é menor de idade!");
        printStackTrace();
    }
}
