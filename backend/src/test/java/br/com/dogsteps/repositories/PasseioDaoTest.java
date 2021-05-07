package br.com.dogsteps.repositories;

import br.com.dogsteps.enums.ETourStatus;
import br.com.dogsteps.models.Passeio;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.Random;


import static org.junit.Assert.assertEquals;

public class PasseioDaoTest {

    PasseioRepository passeios;
    static String statusBADREQUEST = Response.status(Response.Status.BAD_REQUEST).build().toString();
    static String statusOK = Response.status(Response.Status.OK).build().toString();
    static String statusNOTFOUND = Response.status(Response.Status.NOT_FOUND).build().toString();

    @Before
    public void setUp() {
        passeios = new PasseioRepository();
    }

    @Test
    public void find() {
        String id = populaPasseio(32);
        assertEquals("passeio não encontrado deve ser null",
                null, passeios.find("32313233"));
        assertEquals("esse passeio deve ser encontrado",
                id, passeios.find(id).getId());
    }

    @Test
    public void add() {

    }

    @Test
    public void update() {
        String id = populaPasseio(30);
        Passeio passeio = passeios.find(id);



        assertEquals("Alterando a data do passeio", statusOK,
                passeios.update(passeio).toString());
        passeio.setStatus(ETourStatus.ONGOING);
        assertEquals("alterando a status ", statusOK,
                passeios.update(passeio).toString());
    }

    @Test
    public void remove() {
    }

    private String populaPasseio(int tamanho) {
        Random random = new Random();
        int indiceGerado = random.nextInt(tamanho);
        String idAleatorio = "";



        return idAleatorio;
    }


}