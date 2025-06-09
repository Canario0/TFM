package com.example.comparathor.entities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        return "Comparison{" + "id='" + id + '\'' + ", ownerId='" + ownerId + '\'' + ", name='" + name + '\'' + ", description='" + description + '\'' + ", products=" + (products != null ? products.size() + " items" : "null") + '}';
    }

    public Map<String, Map<String, List<ProductMetadata>>> getGroupedSubcategories() {
        Map<String, Map<String, List<ProductMetadata>>> groupedCategories = new HashMap<>();
        for (Product product : this.products) {
            for (ProductSubCategory subCategory : product.getSubCategories()) {
                Map<String, List<ProductMetadata>> groupedMetadata = groupedCategories.computeIfAbsent(subCategory.getName(), (key) -> new HashMap<>());
                subCategory.getMetadata().forEach((m) -> {
                    List<ProductMetadata> metadataList = groupedMetadata.computeIfAbsent(m.getKey(), (key) -> new ArrayList<>());
                    metadataList.add(new ProductMetadata(product.getId(), m.getValue()));
                });
            }
        }
        return groupedCategories;
    }

    static class ProductMetadata {
        private String productId;
        private String value;

        public ProductMetadata(String productId, String value) {
            this.productId = productId;
            this.value = value;
        }

        public void setValue(String value) {
            this.value = value;
        }

        public void setProductId(String productId) {
            this.productId = productId;
        }
    }
}