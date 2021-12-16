package ru.itmo.alkarized.lab3.factory;

import lombok.Getter;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.io.Serializable;

public class PersistenceFactory implements Serializable {
    @Getter
    private EntityManagerFactory factory;

    public PersistenceFactory(){
        factory = Persistence.createEntityManagerFactory("TableData");
    }

}
