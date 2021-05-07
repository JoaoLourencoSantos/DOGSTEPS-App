package br.com.dogsteps.excecoes;

public class ValorNegativoException extends RuntimeException{
    public ValorNegativoException(){
        super("O valor recebido é negativo!");
        printStackTrace();
    }
}
