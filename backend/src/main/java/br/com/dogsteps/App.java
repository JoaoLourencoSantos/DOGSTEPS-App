package br.com.dogsteps;

import br.com.dogsteps.utils.FilterResponse;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import java.io.IOException;
import java.net.URI;

public class App {
    private static final String PACKAGE = "br.com.dogsteps";
    private static final int PORTA = 8080;
    private static final String BASE_URI = "http://localhost:" + PORTA + "/dogsteps";
    private static HttpServer server;
    private static ResourceConfig resourceConfig;

    public static void main(String[] args) throws IOException {
        server = startServer();
        System.out.println(String.format(
                "Aplicação de está iniciada na porta " + PORTA + "\nPressione enter para terminar...", BASE_URI));
        System.in.read();
        server.shutdownNow();
    }

    private static HttpServer startServer() {
        resourceConfig = new ResourceConfig().packages(PACKAGE);
        resourceConfig.register(FilterResponse.class);
        return GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), resourceConfig);
    }
}
