package br.com.dogsteps.models;

import br.com.dogsteps.interfaces.IBaseRepository;
import br.com.dogsteps.repositories.PetRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Tutor extends User {
    private List<Pet> pets;

    public Tutor() {
    }

    public Tutor(String name, String photoUrl, int age, String cpf, String email, String password, Endereco address
            , List<Pet> pets) {
        super(name, photoUrl, age, cpf, email, password, address);
        this.pets = pets;
    }

    public List<Pet> getPets() {
        final IBaseRepository<Pet> listaDePasseios = new PetRepository();

        List<Pet> pets = listaDePasseios.getList().stream()
                .filter(pet ->
                        pet.getTutorId().equals(getId()) &&
                                pet.getTutorId() != null
                ).collect(Collectors.toList());
        if (pets.size() > 0) {
            return pets;
        }
        return new ArrayList<>();
    }

    public void setPets(List<Pet> pets) {
        this.pets = pets;
    }
}
