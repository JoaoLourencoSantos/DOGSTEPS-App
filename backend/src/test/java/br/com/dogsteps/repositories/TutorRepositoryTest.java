package br.com.dogsteps.repositories;

import br.com.dogsteps.models.*;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Random;

import static org.junit.Assert.*;

public class TutorRepositoryTest {

    TutorRepository tutores;
    static String statusBADREQUEST = Response.status(Response.Status.BAD_REQUEST).build().toString();
    static String statusOK = Response.status(Response.Status.OK).build().toString();
    static String statusNOTFOUND = Response.status(Response.Status.NOT_FOUND).build().toString();

    @Before
    public void setUp(){
        tutores = new TutorRepository();
    }

    @Test
    public void add() {
        Tutor tutor = geraTutor();
        tutor.setIdade(-23);
        assertEquals("espera recusar idade negativa com um BAD_REQUEST",
                statusBADREQUEST,tutores.add(tutor).toString());

        tutorDefault(tutor);
        tutor.setSenha("");
        assertEquals("espera recusar Strings vazias com BAD_REQUEST",
                statusBADREQUEST, tutores.add(tutor).toString());

        tutorDefault(tutor);
        assertEquals("espera recusar referencia null com BAD_REQUEST",
                statusBADREQUEST, tutores.add(tutor).toString());

        tutorDefault(tutor);
        tutor.setEmail("2321313dasdsxc");
        assertEquals("espera recusar emails invalidos com BAD_REQUEST",
                statusBADREQUEST, tutores.add(tutor).toString());

        tutorDefault(tutor);
        assertEquals("espera aceitar um tutor válido com OK",
                statusOK, tutores.add(tutor).toString());
    }

    @Test
    public void update() {
        String idAleatorio = populaTutores(20);

        assertEquals("deve se recusar a busca com BAD_REQUEST ao enviar referencia null",
                statusBADREQUEST, tutores.update(null).toString());

        Tutor tutorASerAlterado = tutores.find(idAleatorio);
        assertEquals("deve encontrar o tutor e retornar StatusOK",
                statusOK, tutores.update(tutorASerAlterado).toString() );
        Tutor tutor = geraTutor();
        assertEquals("deve se recusar a exclusão com NOT_FOUND",
                statusNOTFOUND, tutores.update(tutor).toString() );

    }

    @Test
    public void remove() {
        String idAleatorio = populaTutores(20);

        assertEquals("deve se recusar a busca com BAD_REQUEST ao enviar referencia null",
                statusBADREQUEST, tutores.remove(null).toString());

        assertEquals("deve se recusar a exclusão com NOT_FOUND",
                statusNOTFOUND, tutores.remove("98789787u8hkok09").toString() );

        Tutor tutorASerAlterado = tutores.find(idAleatorio);
        assertEquals("deve encontrar o tutor e retornar StatusOK",
                statusOK, tutores.remove(idAleatorio).toString() );
    }

    private String populaTutores(int tamanho){
        Random random = new Random();
        int indiceGerado = random.nextInt(tamanho);
        String id = "";

        for(int i = 0 ; i < tamanho ; i++){
            Tutor tutor = geraTutor();
            tutores.add(tutor);
            if(i == indiceGerado){
                id = tutor.getId();
            }
        }

        return id;
    }

    public Tutor geraTutor(){
        String[] nomes = {"Pedro", "Carla", "Maria", "Mercedes", "Tatiana", "Cintia", "Gustavo", "Flávia",
                "Juliana", "Mateus"};
        Random random = new Random();
        int indiceGerado = random.nextInt(nomes.length);
        int idade = 18 + random.nextInt(100);

        return new Tutor(nomes[indiceGerado], "foto", 20, "25324554879", "email@email.com", "4924u24jdsda",
                new Endereco(), new ArrayList<Pet>());
    }

    private void tutorDefault(Tutor tutor){
        tutor.setIdade(29);
        tutor.setSenha("3232313");
        tutor.setNome("Bob");
        tutor.setEmail("test@test.com");
        tutor.setEndereco(new Endereco());
    }
}