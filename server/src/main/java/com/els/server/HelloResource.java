package com.els.server;

import com.els.models.Account;
import com.els.repo.AccountRepository;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("/hello-world")
public class HelloResource {
    @GET
    @Produces("text/plain")
    public String hello() {
        return "Hello, World!";
    }

    @GET
    @Path("/goodbye")
    @Produces("text/plain")
    public String goodbye() {
        AccountRepository repo = new AccountRepository();
        repo.add(new Account(1, "test", "test", "test", "test"));
        return repo.find(1).getName();
    }
}
