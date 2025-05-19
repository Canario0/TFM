package com.example.comparathor.api;

import android.util.Log;

import com.example.comparathor.BuildConfig;
import com.example.comparathor.entities.CategoryPreview;
import com.example.comparathor.entities.ProductSummary;
import com.example.comparathor.retrofit.services.AuthService;
import com.example.comparathor.retrofit.services.CategoriesService;
import com.example.comparathor.retrofit.services.ProductsService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiFacade {
    private static ApiFacade instance;
    private final Retrofit retrofit;

    public static ApiFacade getInstance() {
        if (ApiFacade.instance == null) {
            ApiFacade.instance = new ApiFacade();
        }
        return ApiFacade.instance;
    }

    public ApiFacade() {
        this.retrofit = new Retrofit.Builder().baseUrl(BuildConfig.API_URL).addConverterFactory(GsonConverterFactory.create()).build();
    }

    public String login(String username, String password) {
        AuthService service = this.retrofit.create(AuthService.class);
        try {
            AuthService.Login result = service.login(new AuthService.Credentials(username, password)).execute().body();
            if (result == null) {
                return null;
            }
            return result.idToken;
        } catch (IOException e) {
            Log.w(AuthService.class.getName(), e.getMessage());
            return null;
        }
    }

    public void logout(String token) {
        AuthService service = this.retrofit.create(AuthService.class);
        try {
            service.logout("Bearer " + token).execute();
        } catch (IOException e) {
            Log.w(AuthService.class.getName(), e.getMessage());
        }
    }

    public List<CategoryPreview> getAllCategories() {
        CategoriesService service = retrofit.create(CategoriesService.class);
        try {
            List<CategoryPreview> result = service.getAll().execute().body();
            if (result == null) {
                return new ArrayList<>();
            }
            return result;
        } catch (IOException e) {
            Log.w(AuthService.class.getName(), e.getMessage());
            return new ArrayList<>();
        }
    }


    public List<ProductSummary> getAllProducts() {
        ProductsService service = retrofit.create(ProductsService.class);
        try {
            List<ProductSummary> result = service.getAll().execute().body();
            if (result == null) {
                return new ArrayList<>();
            }
            return result;
        } catch (IOException e) {
            Log.w(AuthService.class.getName(), e.getMessage());
            return new ArrayList<>();
        }
    }
}
