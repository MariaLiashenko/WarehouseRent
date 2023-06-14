#include <WiFi.h>
#include <HTTPClient.h>
#include "DHTesp.h"


const char* API_URL = "https://httpbin.org/post";


const int WATER_PIN = 15;
DHTesp waterSensor;

unsigned long lastTime = 0;

unsigned long timerDelay = 2000;

void setup() {
  Serial.begin(115200);

  WiFi.begin("Wokwi-GUEST", "", 6);
  Serial.print("Connection setup. Please wait...");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected successfully! Your IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("==============");
  Serial.println("Wait " + String(timerDelay / 1000) + " seconds");
  waterSensor.setup(WATER_PIN, DHTesp::DHT22);
}

void loop() {
  
  if ((millis() - lastTime) > timerDelay) {
    
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;

      http.begin(client, API_URL);

      TempAndHumidity waterData = waterSensor.getTempAndHumidity();

      Serial.println("Humidity:" + String(waterData.humidity));
      Serial.println("temperature:" + String(waterData.temperature));
      Serial.println("==============");
      Serial.println("PUT request data:"); 
      Serial.print("HTTP Response code: ");
      Serial.println("==============");
            
      String httpRequestData1 = 
       "{\"nameDevice\":\"" + String("device 3") +
        "\",\"temperature\":\"" + String(waterData.temperature,0) +
        "\",\"humidity\":\"" + String(waterData.humidity, 0) +
        "\"}";

     
      Serial.println("==============");
      Serial.println("PUT request data:");
      Serial.println("==============");
      Serial.println(httpRequestData1);
     
      Serial.print("HTTP Response code: ");
      Serial.println("==============");
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}