package com.github.robhitchens.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "date_released")
    private LocalDate dateReleased;

    @Column(name = "storyline")
    private String storyline;

    //TODO add foreign key relationships for Actor, Director, Writers, Formats


}
