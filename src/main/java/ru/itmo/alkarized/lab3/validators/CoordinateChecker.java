package ru.itmo.alkarized.lab3.validators;

import ru.itmo.alkarized.lab3.entity.Coordinate;

import static java.lang.Math.pow;

public class CoordinateChecker {
    public static void check(Coordinate coordinate) {
        int x = coordinate.getX();
        float y = coordinate.getY();
        float r = coordinate.getR();
        coordinate.setIsHit((y >= 0 && x <= 0 && x >= -r && y <= r / 2) || (pow(x, 2) + pow(y, 2) <= pow(r, 2) && y >= 0 && x >= 0) || (x <= 0 && y <= 0 && y >= -0.5 * x - r / 2));
    }
}
