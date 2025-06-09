package com.example.comparathor.entities;

import java.util.List;

public class Product {
    private String id;
    private String name;
    private String icon;
    private String category;
    private double rating;
    private String maker;
    private String brand;
    private String model;
    private double price;
    private List<ProductSubCategory> subCategories;
    private String description;

    public Product(String id, String name, String icon, String category,
                   double rating, String maker, String brand, String model,
                   double price,
                   List<ProductSubCategory> subCategories, String description) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.category = category;
        this.rating = rating;
        this.maker = maker;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.subCategories = subCategories;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getMaker() {
        return maker;
    }

    public void setMaker(String maker) {
        this.maker = maker;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<ProductSubCategory> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<ProductSubCategory> subCategories) {
        this.subCategories = subCategories;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}