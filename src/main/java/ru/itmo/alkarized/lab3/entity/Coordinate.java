package ru.itmo.alkarized.lab3.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "TableData")
public class Coordinate implements Serializable {
    @Id @Getter @Setter
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    long id;

    @Getter @Setter
    @Column(nullable = false)
    int x = 0;

    @Getter @Setter
    @Column(nullable = false)
    float y;

    @Getter @Setter
    @Column(nullable = false)
    float r = 2f;

    @Getter @Setter
    @Column(nullable = false)
    boolean hit;

}
