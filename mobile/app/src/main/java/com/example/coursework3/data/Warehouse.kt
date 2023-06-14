package com.example.coursework3.data

data class Warehouse(
    val en: LanguageDetails,
    val ukr: LanguageDetails,
    val _id: String,
    val electricity: Boolean,
    val plumbing: Boolean,
    val protection: Boolean,
    val priceMonth: Int,
    val priceYear: Int,
    val photos: List<String>,
    val temperature: Int,
    val humidity: Int,
    val __v: Int
)

data class LanguageDetails(
    val name: String,
    val description: String,
    val city: String,
    val adress: String,
    val size: String
)
