package ru.itmo.alkarized.lab3.entity;

import lombok.Data;

@Data
public class Coordinate {
    private int x = 0;
    private float y = 0.0f;
    private float r = 0.0f;
    private Boolean isHit;
}
