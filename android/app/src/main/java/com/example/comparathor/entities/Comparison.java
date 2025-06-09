package com.example.comparathor.entities;

import java.util.List;

public class Comparison {
    private String id;
    private String ownerId;
    private String name;
    private String description;
    private List<Product> products;

    public Comparison(String id, String ownerId, String name, String description, List<Product> products) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.description = description;
        this.products = products;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "Comparison{" +
                "id='" + id + '\'' +
                ", ownerId='" + ownerId + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", products=" + (products != null ? products.size() + " items" : "null") +
                '}';
    }
}