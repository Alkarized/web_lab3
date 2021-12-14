package ru.itmo.alkarized.lab3.dao;

import lombok.Getter;
import ru.itmo.alkarized.lab3.entity.TableData;
import ru.itmo.alkarized.lab3.factory.PersistenceFactory;

import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.List;

@Named
@SessionScoped
public class UserDAO implements SimpleDAO, Serializable {

    @Inject @Getter
    private PersistenceFactory factory;

    @Override
    public TableData getCoordsById(Long id) {
        return null;
    }

    @Override
    public List<TableData> getAllCoords() {
        return null;
    }

    @Override
    public boolean addNewCoords(TableData tableData) {
        return false;
    }

}
