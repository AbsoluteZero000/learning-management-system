package com.els.repo;

import com.els.models.Account;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class AccountRepository {

    private EntityManager entityManager;
    private EntityManagerFactory emf;

    public AccountRepository() {
        this.emf = Persistence.createEntityManagerFactory("default");
        this.entityManager = this.emf.createEntityManager();
    }

    public AccountRepository(String pu) {
        this.emf = Persistence.createEntityManagerFactory(pu);
        this.entityManager = this.emf.createEntityManager();
    }

    public Account add(Account account) {
        entityManager.getTransaction().begin();
        entityManager.persist(account);
        entityManager.getTransaction().commit();
        return account;
    }

    public Account find(Integer integer) {
        return entityManager.find(Account.class, integer);
    }

    public Account update(Account account) {
        Account accountToUpdate = find(account.getId());
        entityManager.getTransaction().begin();
        accountToUpdate.setName(account.getName());
        entityManager.getTransaction().commit();
        return accountToUpdate;
    }

    public void delete(Account account) {
        entityManager.getTransaction().begin();
        entityManager.remove(account);
        entityManager.getTransaction().commit();
    }

    public void close() {
        this.entityManager.close();
        this.emf.close();
    }
}
