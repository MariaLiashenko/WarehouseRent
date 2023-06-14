package com.example.coursework3.client

import com.example.coursework3.data.Warehouse
import com.example.coursework3.services.WarehouseService
import retrofit2.Call
import com.google.gson.GsonBuilder
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class WarehousesClient {

    private val warehousesService: WarehouseService

    init {
        val retrofit = Retrofit.Builder()
            .baseUrl("http://10.0.2.2:8000/")
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttpClient.createOkHttpClient())
            .build()

        warehousesService = retrofit.create(WarehouseService::class.java)
    }

    fun getAllInsurances(): Call<List<Warehouse>>{
        return warehousesService.getInsurances()
    }
}