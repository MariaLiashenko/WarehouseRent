package com.example.coursework3.services

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.coursework3.R
import com.example.coursework3.WarehousesActivity

class RegisterActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
            val loginButton = findViewById<Button>(R.id.buttonLogin)
            loginButton.setOnClickListener{
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
            }
        val registerButton = findViewById<Button>(R.id.buttonRegister)
        registerButton.setOnClickListener{
            val intent = Intent(this, WarehousesActivity::class.java)
            startActivity(intent)
        }
    }
}