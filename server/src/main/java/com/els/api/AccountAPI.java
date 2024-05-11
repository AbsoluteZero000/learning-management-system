package com.els.api;

import java.io.IOException;
import java.util.List;

import com.els.models.Account;
import com.els.repo.AccountRepo;
import com.els.util.LoginWrapper;
import com.els.util.SignupWrapper;

import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

@Path("/account")
public class AccountAPI {

    @Inject
    AccountRepo accountRepo;

    private Account currentUser;

    @POST
    @Path("/login")
    public Account login(LoginWrapper loginWrapper) throws Exception{
        currentUser = accountRepo.logIn(loginWrapper);
        return currentUser;
    }

    @POST
    @Path("/signup")
    public Account signup(SignupWrapper signupWrapper) throws  IOException{
        currentUser = accountRepo.signup(signupWrapper);
        return currentUser;
    }

    @POST
    @Path("/logout")
    public boolean logout() {
        currentUser = null;
        return true;
    }

    @GET
    @Path("/get/{id}")
    public Account getAccount(@PathParam("id") String id) {
        return accountRepo.getAccountById(id);
    }

    @GET
    @Path("/get")
    public Account getAccount() {
        return currentUser;
    }

    @GET
    @Path("/all")
    public List<Account> getAllAccounts() {
        return accountRepo.getAllAccounts();
    }
}
