package com.example.comparathor.retrofit.services;

import com.example.comparathor.entities.Product;
import com.example.comparathor.entities.ProductSummary;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ProductsService {

    @GET("/v1/products")
    Call<List<ProductSummary>> getAll();

    @GET("/v1/products/{id}")
    Call<Product> getById(@Path("id") String id);
}
