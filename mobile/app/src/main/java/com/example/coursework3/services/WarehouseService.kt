package com.example.coursework3.services

import com.example.coursework3.data.Warehouse
import retrofit2.Call
import retrofit2.http.GET

interface WarehouseService {


    @GET("/warehouses")
    fun getInsurances(): Call<List<Warehouse>>
}