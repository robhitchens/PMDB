package com.github.robhitchens.dao;

import com.github.robhitchens.entity.Customer;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CustomerRepository /*extends CrudRepository<Customer, Long>j*/ {

    public List<Customer> findByLastName(String lastName);

    public Customer findById(long id);
}
