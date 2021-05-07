package br.com.dogsteps.utils;

import br.com.dogsteps.interfaces.IBaseRepository;
import br.com.dogsteps.interfaces.IFindOne;
import br.com.dogsteps.models.DogWalker;
import br.com.dogsteps.models.Tutor;
import br.com.dogsteps.models.dto.UserDto;
import br.com.dogsteps.repositories.DogWalkerRepository;
import br.com.dogsteps.repositories.TutorRepository;
import com.google.gson.Gson;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Login implements IFindOne<String, UserDto> {
    private static IBaseRepository<DogWalker> dogWalkerRepository = new DogWalkerRepository();
    private static IBaseRepository<Tutor> tutorRepository = new TutorRepository();

    @Override
    public String get(UserDto userDto) {
        List<DogWalker> listaDeDogWalkers = dogWalkerRepository.getList();
        List<Tutor> listaDeTutores = tutorRepository.getList();
        String id = "";
        String type = "";

        listaDeDogWalkers = listaDeDogWalkers.stream()
                .filter(dogWalker ->
                        dogWalker.getEmail().equals(userDto.getEmail()) &&
                                dogWalker.getSenha().equals(userDto.getSenha())
                ).collect(Collectors.toList());

        listaDeTutores = listaDeTutores.stream()
                .filter(tutor ->
                        tutor.getEmail().equals(userDto.getEmail()) &&
                                tutor.getSenha().equals(userDto.getSenha())
                ).collect(Collectors.toList());

        if (listaDeDogWalkers.size() > 0) {
            id = listaDeDogWalkers.get(0).getId();
            type = listaDeDogWalkers.get(0).getClass().getSimpleName();
            return getJson(type, id);
        }

        if (listaDeTutores.size() > 0) {
            id = listaDeTutores.get(0).getId();
            type = listaDeTutores.get(0).getClass().getSimpleName();
            return getJson(type, id);
        }
        return getJson(type, null);
    }

    public String getJson(String type, String id) {
        Map<String, String> map = new HashMap<String, String>();
        map.put("type", type);
        map.put("id", id);
        return new Gson().toJson(map);
    }
}
