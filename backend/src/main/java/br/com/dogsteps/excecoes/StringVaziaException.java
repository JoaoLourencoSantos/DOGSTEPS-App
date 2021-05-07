package br.com.dogsteps.excecoes;

public class StringVaziaException extends RuntimeException {
    public StringVaziaException(){
        super("O valor recebido está vazio!");
        printStackTrace();
    }
}
