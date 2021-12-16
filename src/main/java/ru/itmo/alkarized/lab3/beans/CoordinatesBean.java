package ru.itmo.alkarized.lab3.beans;

import lombok.Getter;
import lombok.Setter;
import ru.itmo.alkarized.lab3.dao.UserDAO;
import ru.itmo.alkarized.lab3.entity.Coordinate;
import ru.itmo.alkarized.lab3.validators.CoordinateChecker;

import javax.annotation.PostConstruct;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(eager = true)
@ApplicationScoped
public class CoordinatesBean {

    private final UserDAO dataBaseHandler = new UserDAO();

    @Getter
    @Setter
    private Coordinate coordinate = new Coordinate();

    @Getter
    @Setter
    private ArrayList<Coordinate> coords = new ArrayList<Coordinate>();

    public void addCoordinate() {
        CoordinateChecker.check(coordinate);
        if (dataBaseHandler.addNewCoords(coordinate)){
            coords.add(coordinate);
        }
        coordinate = new Coordinate();
    }

    public CoordinatesBean(){
        List<Coordinate> list = dataBaseHandler.getAllCoords();
        if (list != null){
            coords.addAll(list);
        }
    }
}
