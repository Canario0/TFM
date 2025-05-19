package com.example.comparathor.entities;

public class ProductSummary {
    private String id;
    private String name;
    private Icons icon;
    private String category;
    private Double rating;
    private Double price;
    private String maker;
    private String brand;
    private String model;
    private String description;

    public ProductSummary(
            String id,
            String name,
            Icons icon,
            String category,
            Double rating,
            Double price,
            String maker,
            String brand,
            String model,
            String description) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.category = category;
        this.rating = rating;
        this.price = price;
        this.maker = maker;
        this.brand = brand;
        this.model = model;
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

    public int getResourceIcon() {
        return this.icon.getDrawableResource();
    }

    public Icons getIcon() {
        return icon;
    }

    public void setIcon(Icons icon) {
        this.icon = icon;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
