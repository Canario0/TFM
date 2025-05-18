package com.example.comparathor.entities;

import android.graphics.drawable.Drawable;

public class CategoryPreview {
    private String id;
    private String name;
    private Icons icon;

    public CategoryPreview(String id, String name, Icons icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }

    // Getters and Setters
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

    public Icons getIcon() {
        return icon;
    }

    public int getResourceIcon() {
        return this.icon.getDrawableResource();
    }

    public void setIcon(Icons icon) {
        this.icon = icon;
    }

    public void setIcon(String icon) {
        this.icon = Icons.valueOf(icon);
    }

    @Override
    public String toString() {
        return "CategoryPreview{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", icon=" + icon +
                '}';
    }
}