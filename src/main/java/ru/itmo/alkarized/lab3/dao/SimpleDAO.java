package ru.itmo.alkarized.lab3.dao;

import ru.itmo.alkarized.lab3.entity.TableData;

import java.util.List;

public interface SimpleDAO {
    public TableData getCoordsById(Long id);
    public List<TableData> getAllCoords();
    public boolean addNewCoords(TableData tableData);
}
