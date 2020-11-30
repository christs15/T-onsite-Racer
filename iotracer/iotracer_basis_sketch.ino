#include <ESP32Servo.h>
#include <analogWrite.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

//BLE
#define SERVICE_UUID        "ae975c80-05f0-11ea-8d71-362b9e155667"
#define COMMAND_CHAR_UUID   "b81f189c-05f0-11ea-8d71-362b9e155667"

//servo parameters
Servo servo1;
static const int servoPin = 4;

//motor parameters
int motorDir = 18;
int motorPWM = 5;
 
void setup()
{
  Serial.begin(115200);
  pinMode(motorDir,OUTPUT);
  pinMode(motorPWM,OUTPUT);

  // Initialize Bluetooth Low Energy
  initBLE();

  //attach servo
  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);
  servo1.setPeriodHertz(50);    // standard 50 hz servo
  servo1.attach(servoPin);
  
  //straight forward
  servo1.write(90);
  //stop motor
  stopMotor();
  
}
 
void loop()
{

}


void motorPower(int fb) { //value from 0 to 255, 128 to stop motor
    if(fb == 128)
      stopMotor();
    else if(fb > 128)
      moveForward(fb);
    else
      moveBackwards(fb);
}


void stopMotor() {
  //stop motor
}

void moveForward(int fb) {
 //move forwards
}

void moveBackwards(int fb) {
  //move backwards
}

void steer (int steer){
//servo
  
}


void carControl(int steer, int pow) { 
      //steer
      //motorPower
}

void initBLE() {
  //define ble T-Racer Profile and start advertising
}
