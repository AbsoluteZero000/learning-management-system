package com.els.repo;

import java.util.List;

import com.els.models.Account;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

public class AccountRepo {

    @PersistenceContext(unitName = "DB")
    private EntityManager em;

    public boolean addAccount(Account account) {
        try {
            em.persist(account);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

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

    
}
