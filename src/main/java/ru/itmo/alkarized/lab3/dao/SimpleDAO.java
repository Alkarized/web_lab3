package ru.itmo.alkarized.lab3.dao;

import ru.itmo.alkarized.lab3.entity.Coordinate;

import java.util.List;

public interface SimpleDAO {
    public List<Coordinate> getAllCoords();
    public boolean addNewCoords(Coordinate coordinate);
}
