#include <ESP32Servo.h>
#include <analogWrite.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

//BLE
#define SERVICE_UUID        "ae975c80-05f0-11ea-8d71-362b9e155667"
#define COMMAND_CHAR_UUID   "b81f189c-05f0-11ea-8d71-362b9e155667"
BLEDevice           Device;
BLEServer*          pServer;
BLEService*         pService;
BLECharacteristic*  pControllCharacteristic;
BLEAdvertising*     pAdvertising;

//servo parameters
Servo servo1;
int pos = 0; 
//static const int servoPin = 25;
static const int servoPin = 4;

//motor pins (just for test method)
int INA = 18;
//int INA = 13;
int INB = 5;

//motor Pins
int motorDir = 18;
//int motorDir = 13;
int motorPWM = 5;
 
void setup()
{
  Serial.begin(115200);
  pinMode(motorDir,OUTPUT);
  pinMode(motorPWM,OUTPUT);

  // Initialize Bluetooth Low Energy
  initBLE();
  
  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);
  servo1.setPeriodHertz(50);    // standard 50 hz servo
  servo1.attach(servoPin, 1000, 2000);
  servo1.write(90);
  stopMotor();
}
 
void loop()
{

/*  for(int posDegrees = 0; posDegrees <= 180; posDegrees++) {
        carControl(posDegrees, 255);
        Serial.println(posDegrees);
        delay(100);
  }

  for(int posDegrees = 180; posDegrees >= 0; posDegrees--) {
        carControl(posDegrees, 0);
        Serial.println(posDegrees);
        delay(100);
   }
   */
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
  digitalWrite( motorDir, LOW ); // Set motor to off
  digitalWrite( motorPWM, LOW );
}

void moveForward(int fb) {
  Serial.print("move forward - ");
  digitalWrite( motorDir, HIGH ); // direction = forward
  int pow = 255 - ((fb - 128) * 2);
  //int pow =fb;
  Serial.print("Set value to motor:  ");
  Serial.println(pow);
  analogWrite( motorPWM, pow );
}

void moveBackwards(int fb) {
  Serial.print("move backword - ");
  digitalWrite( motorDir, LOW ); // direction = backwards
  int pow = 255 - (fb * 2);
  //int pow =fb;
  Serial.print("Set value to motor:  ");
  Serial.println(pow);
  analogWrite(motorPWM, pow);
}

void carControl(int lr, int fb) {
      steer(lr);
      motorPower(fb);
}

void steer(int angle) {
  servo1.write(angle); //angle: the value to write to the servo, from 0 to 180
}

// Server Callbacks
class ServerCallbacks : public BLEServerCallbacks {
    void onConnect(BLEServer* pServerCallback) {
      Serial.println("Client connected");
    }

    void onDisconnect(BLEServer* pServerCallback) {
      Serial.println("Client disconnected");
      stopMotor();
    }
};

class CharacteristicCallbacks: public BLECharacteristicCallbacks {
    //
    void onWrite(BLECharacteristic* pCharacteristic) {
      std::string value = pCharacteristic->getValue(); //receive value via BLE from characteristic
      String svalue= value.c_str();
      Serial.println("value received:  "+svalue);
      int splitindex = svalue.indexOf(',');  //parse value(speed, steer)
      int speed = svalue.substring(0,splitindex).toInt(); //get spped value
      int steer = svalue.substring(splitindex+1).toInt(); //get steer valu
      carControl(steer, speed); //send values to motors
    }
};

void initBLE() {

  Device.init("IoT_Racer"); //Give your Device a custom name (Bluetooth-Name)
  pServer       = Device.createServer();
  pService      = pServer->createService(SERVICE_UUID);
  pControllCharacteristic  = pService->createCharacteristic(COMMAND_CHAR_UUID, BLECharacteristic::PROPERTY_WRITE_NR | BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE); //set write property to characteristic so that we can write values to it
  // has to be enabled for iOS
  pControllCharacteristic->setWriteNoResponseProperty(true);


  Device.setEncryptionLevel(ESP_BLE_SEC_ENCRYPT);
  pControllCharacteristic->setAccessPermissions(ESP_GATT_PERM_READ_ENCRYPTED | ESP_GATT_PERM_WRITE_ENCRYPTED);

  //define callbacks
  pServer->setCallbacks(new ServerCallbacks());
  pControllCharacteristic->setCallbacks(new CharacteristicCallbacks());


  pControllCharacteristic->setValue("128,90"); //set value to 128,90 -> motor off

  pService->start();

  //Start Advertising
  pAdvertising = Device.getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  Device.startAdvertising();
  Serial.println("Start Advertising");
}
