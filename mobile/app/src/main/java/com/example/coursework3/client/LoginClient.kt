package com.example.coursework3.clients

import com.example.coursework3.client.okHttpClient
import com.example.coursework3.data.LoginRequest
import com.example.coursework3.data.LoginResponse
import com.example.coursework3.services.LoginService
import com.google.gson.GsonBuilder
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class LoginClient {
    private val retrofit: Retrofit by lazy {
        val gson = GsonBuilder().setLenient().create()
        Retrofit.Builder()
            .baseUrl("http://10.0.2.2:8000/")
            .addConverterFactory(GsonConverterFactory.create(gson))
            .client(okHttpClient.createOkHttpClient())
            .build()
    }

    private val loginService: LoginService by lazy {
        retrofit.create(LoginService::class.java)
    }

    suspend fun login(username: String, password: String): Response<LoginResponse> {
        val loginRequest = LoginRequest(username, password)
        return loginService.login(loginRequest)
    }
}