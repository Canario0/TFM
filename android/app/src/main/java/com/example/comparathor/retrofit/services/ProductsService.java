package com.example.comparathor.retrofit.services;

import com.example.comparathor.entities.ProductSummary;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface ProductsService {

    @GET("/v1/products")
    Call<List<ProductSummary>> getAll();
}
