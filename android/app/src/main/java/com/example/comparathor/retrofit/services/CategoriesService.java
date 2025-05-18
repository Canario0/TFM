package com.example.comparathor.retrofit.services;

import com.example.comparathor.entities.CategoryPreview;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface CategoriesService {

    @GET("/v1/categories")
    Call<List<CategoryPreview>> getAll();
}
