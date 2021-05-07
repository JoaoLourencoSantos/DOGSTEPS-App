package br.com.dogsteps.excecoes;

public class AgendaNullException extends RuntimeException {
    public AgendaNullException(){
        super("A agenda possui um valor inválido!");
        printStackTrace();
    }
}
