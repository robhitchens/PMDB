package com.github.robhitchens.dao;

import com.github.robhitchens.entity.Movie;
import org.springframework.data.repository.CrudRepository;

public interface MovieRepository extends CrudRepository<Movie,Long> {
}
