package com.els.repo;

import java.util.List;

import com.els.models.Account;
import com.els.models.Instructor;
import com.els.models.Student;
import com.els.util.LoginWrapper;
import com.els.util.SignupWrapper;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

public class AccountRepo {

    @PersistenceContext(unitName = "DB")
    private EntityManager em;


    public Account getAccount(String email) {
        String query = "SELECT a FROM Account a WHERE a.email = :email";
        TypedQuery<Account> typedQuery = em.createQuery(query, Account.class);
        typedQuery.setParameter("email", email);
        return typedQuery.getSingleResult();
    }

    public Account getAccountById(String id) {
        String query = "SELECT a FROM Account a WHERE a.id = :id";
        TypedQuery<Account> typedQuery = em.createQuery(query, Account.class);
        typedQuery.setParameter("id", id);
        return typedQuery.getSingleResult();
    }

    public boolean updateAccount(Account account) {
        try {
            em.merge(account);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteAccount(String id) {
        try {
            Account account = getAccountById(id);
            em.remove(account);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Account> getAllAccounts() {
        String query = "SELECT a FROM Account a";
        TypedQuery<Account> typedQuery = em.createQuery(query, Account.class);
        return typedQuery.getResultList();
    }

    public Account signup(SignupWrapper signupWrapper) {
        Account account;

        if(signupWrapper.role == "instructor")
            account = new Instructor(signupWrapper);
        else if(signupWrapper.role == "student")
            account = new Student(signupWrapper);
        else if(signupWrapper.role == "admin")
            account = new Account(signupWrapper);
        else
            throw new IllegalArgumentException("Invalid role");

        em.persist(account);
        return account.getAccount();
    }

    public Account logIn(LoginWrapper loginWrapper) throws Exception{
        TypedQuery<Account> query = em
        .createQuery("select u from Account u where u.name = :email and u.password = :password", Account.class);
        query.setParameter("email", loginWrapper.email);
        query.setParameter("password", loginWrapper.password);
        List<Account> accounts = query.getResultList();
        if (accounts.isEmpty())
            throw new Exception("Invalid login credentials");
        return accounts.get(0);
    }


}
