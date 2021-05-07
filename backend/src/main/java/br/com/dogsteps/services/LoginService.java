package br.com.dogsteps.services;

import br.com.dogsteps.interfaces.IFindOne;
import br.com.dogsteps.models.dto.UserDto;
import br.com.dogsteps.utils.Login;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("/login")
public class    LoginService {
    private static IFindOne<String, UserDto> userRepository = new Login();

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    public String logarUsuario(UserDto userDto) {
        return userRepository.get(userDto);
    }
}