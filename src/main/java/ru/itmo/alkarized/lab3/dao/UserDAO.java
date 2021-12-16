package ru.itmo.alkarized.lab3.dao;

import lombok.Getter;
import ru.itmo.alkarized.lab3.entity.Coordinate;
import ru.itmo.alkarized.lab3.factory.PersistenceFactory;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.List;

public class UserDAO implements SimpleDAO, Serializable {

    @Getter
    private final PersistenceFactory factory = new PersistenceFactory();

    @Override
    public List<Coordinate> getAllCoords() {
        List<Coordinate> list = null;
        EntityManager em = factory.getFactory().createEntityManager();
        try{
            list= em.createQuery("SELECT c FROM Coordinate c", Coordinate.class).getResultList();
        } catch (Exception e){
            e.printStackTrace();
        }
        em.close();
        return list;
    }

    @Override
    public boolean addNewCoords(Coordinate coordinate) {
        EntityManager em = factory.getFactory().createEntityManager();
        try{
            em.getTransaction().begin();
            em.persist(coordinate);
            em.getTransaction().commit();
            return true;
        } catch (Exception e){
            System.err.println("Error in BD - get Coord");
            em.getTransaction().rollback();
        }
        em.close();
        return false;

    }

}
