package com.example.coursework3

import MySharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.coursework3.R
import com.example.coursework3.adapters.WarehousesAdapter
import com.example.coursework3.client.WarehousesClient
import com.example.coursework3.clients.LoginClient
import com.example.coursework3.data.Warehouse
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class WarehousesActivity : AppCompatActivity(){
    private lateinit var warehousesAdapter: WarehousesAdapter
    private lateinit var recyclerView: RecyclerView

    private lateinit var sharedPreferences: MySharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_warehouses)
        sharedPreferences = MySharedPreferences(this)
        setupRecyclerView()
        fetchWarehouses()
    }


    private fun setupRecyclerView() {
        val userId = sharedPreferences.getUserId()


        warehousesAdapter = WarehousesAdapter(userId!!)

        recyclerView = findViewById<RecyclerView>(R.id.ListWarehousesrecyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this@WarehousesActivity)
        recyclerView.adapter = warehousesAdapter


   }
    private fun fetchWarehouses() {
        val client = WarehousesClient()

        client.getAllInsurances().enqueue(object: Callback<List<Warehouse>>{
            override fun onResponse(call: Call<List<Warehouse>>, response: Response<List<Warehouse>>) {



                if (response.isSuccessful) {
                    val warehouses = response.body()
//                    println(warehouses)

                    warehousesAdapter.setWarehouses(warehouses!!)

                } else {
                    // Handle API error
                    Toast.makeText(
                        this@WarehousesActivity,
                        "Response is not succeeded",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }

            override fun onFailure(call: Call<List<Warehouse>>, t: Throwable) {
                Toast.makeText(
                    this@WarehousesActivity,
                    "Failed to fetch warehouses: ${t.message}",
                    Toast.LENGTH_SHORT
                ).show()
                Log.e("Warehouse Activity", t.message!!)
            }
        })
    }
    }