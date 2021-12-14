package ru.itmo.alkarized.lab3.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity @Getter @Setter
@Table(name = "TableData")
public class TableData implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    long id;

    @Column(nullable = false)
    int xCoordinate;

    @Column(nullable = false)
    float yCoordinate;

    @Column(nullable = false)
    float radius;

    @Column(nullable = false)
    boolean isHit;
}
