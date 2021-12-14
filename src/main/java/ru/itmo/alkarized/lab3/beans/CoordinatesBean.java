package ru.itmo.alkarized.lab3.beans;

import lombok.Getter;
import lombok.Setter;
import ru.itmo.alkarized.lab3.entity.Coordinate;
import ru.itmo.alkarized.lab3.validators.CoordinateChecker;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.util.ArrayList;

@ManagedBean
@ApplicationScoped
public class CoordinatesBean {

    @Getter
    @Setter
    private Coordinate coordinate = new Coordinate();

    @Getter
    @Setter
    private ArrayList<Coordinate> coords = new ArrayList<Coordinate>();

    public void addCoordinate() {
        CoordinateChecker.check(coordinate);
        coords.add(coordinate);
        coordinate = new Coordinate();
    }
}
