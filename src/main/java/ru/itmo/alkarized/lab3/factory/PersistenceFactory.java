package ru.itmo.alkarized.lab3.factory;

import lombok.Getter;

import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.io.Serializable;

@Named()
@SessionScoped
public class PersistenceFactory implements Serializable {
    @Getter
    private EntityManagerFactory factory;

    @PostConstruct
    public void init(){
        factory = Persistence.createEntityManagerFactory("TableData");
    }

}
