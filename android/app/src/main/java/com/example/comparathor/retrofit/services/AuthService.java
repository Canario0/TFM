package com.example.comparathor.retrofit.services;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface AuthService {

    public class Login {
        public String idToken;

    }

    public class Credentials {
        public String username;
        public String password;

        public Credentials(String username, String password) {
            this.username = username;
            this.password = password;
        }
    }

    @POST("/v1/users/login")
    Call<Login> login(@Body Credentials credentials);

    @POST("/v1/users/logout")
    Call<Void> logout(@Header("authorization") String auth);
}
