package com.example.coursework3.services

import MySharedPreferences
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.example.coursework3.R
import com.example.coursework3.WarehousesActivity
import com.example.coursework3.clients.LoginClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : AppCompatActivity() {

    private val loginClient = LoginClient()
    private lateinit var sharedPreferences: MySharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        sharedPreferences = MySharedPreferences(this)

     val loginButton = findViewById<Button>(R.id.buttonLogin)
        loginButton.setOnClickListener{
            val userName = findViewById<EditText>(R.id.editTextTextUserName).text.toString()
            val password = findViewById<EditText>(R.id.editTextTextPassword).text.toString()

            GlobalScope.launch(Dispatchers.Main) {
                val response = withContext(Dispatchers.IO) {
                    loginClient.login(userName, password)
                }
                println(response)
                if (response.isSuccessful) {
                    val loginResponse = response.body()
                    println(loginResponse)
                    Toast.makeText(this@MainActivity, "Login successful", Toast.LENGTH_SHORT)
                        .show()
                    sharedPreferences.saveUserId(loginResponse!!.details._id);
//                    sharedPreferences.savePageId(0);
                    val intent = Intent(this@MainActivity, WarehousesActivity::class.java)
                    startActivity(intent)
                    println(sharedPreferences.getUserId())
                }
            }
        }
        val registerButton = findViewById<Button>(R.id.buttonRegister)
        registerButton.setOnClickListener{
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }




        }

}