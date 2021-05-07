package br.com.dogsteps.excecoes;

public class EmailInvalidoException extends RuntimeException{
    public EmailInvalidoException(){
        super("O email possui um valor inválido!");
        printStackTrace();
    }
}
