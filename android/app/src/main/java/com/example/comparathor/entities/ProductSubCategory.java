package com.example.comparathor.entities;

import java.util.List;

public class ProductSubCategory {
    private String name;
    private String icon;
    private List<Metadata> metadata;

    public ProductSubCategory(String name, String icon, List<Metadata> metadata) {
        this.name = name;
        this.icon = icon;
        this.metadata = metadata;
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

    public List<Metadata> getMetadata() {
        return metadata;
    }

    public void setMetadata(List<Metadata> metadata) {
        this.metadata = metadata;
    }

    public static class Metadata {
        private String key;
        private String value;

        public Metadata(String key, String value) {
            this.key = key;
            this.value = value;
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }
}