#include <Servo.h>

//[CALIBRATION - LINE_SENSOR]
#define DELAY_TO_READ 20 //ms

//Constantes de Pinagem
#define PIN_MOTOR_ESQUERDA  3
#define PIN_MOTOR_DIREITA  4

//Constantes de controle
#define STOP_MOTOR 95
#define STOPED_M  87
#define L_BACK_MOTOR 180
#define L_FRONT_MOTOR 0 
#define R_BACK_MOTOR 0
#define R_FRONT_MOTOR 180 

// Commands
#define C_FRONT 102
#define C_BACK 98
#define C_STOP 115
#define C_LEFT 108
#define C_RIGHT 114

// ================ MOTORES ===========

//Variaveis
Servo motorEsquerda;
Servo motorDireita;
bool motorActive;

//Variavel de controle

#define Right  110
#define Left 30 
#define direita 190
#define esquerda 15


//Inicialização dos motores
void motorSetup(){
  //set pin motors
  motorEsquerda.attach(PIN_MOTOR_ESQUERDA);
  motorDireita.attach(PIN_MOTOR_DIREITA);
  //initialize motors
  motorEsquerda.write(STOP_MOTOR);
  motorDireita.write(STOP_MOTOR);
  // Setup
  motorActive = false;
}


// ====== CONTROLE DO MOTOR =======

void moveMotor(int left, int right){
  if(!motorActive){
    unstopMotor();
  }
  motorEsquerda.write(left);
  motorDireita.write(right);
}

void stopMotor(){
  motorEsquerda.detach();
  motorDireita.detach();
  motorActive = false;
}

void unstopMotor(){
  motorEsquerda.attach(PIN_MOTOR_ESQUERDA);
  motorDireita.attach(PIN_MOTOR_DIREITA);
  motorActive = true;
}


// ======= LOGIC ======

void moveToDirection(int command){
    switch(command){
      case C_STOP:
        stopMotor();
      break;
      case C_FRONT:
        moveMotor(L_FRONT_MOTOR,R_FRONT_MOTOR);
      break;  
      case C_BACK:
        moveMotor(L_BACK_MOTOR,R_BACK_MOTOR);
      break;
      case C_LEFT:
        moveMotor(L_BACK_MOTOR,R_FRONT_MOTOR);
      break;
      case C_RIGHT:
        moveMotor(L_FRONT_MOTOR,R_BACK_MOTOR);
      break;
    }
}

void test2(){
  int readed;
   if (Serial.available() > 0) {
    // lê do buffer o dado recebido:
    readed = Serial.read();
    moveToDirection(readed);
    //Serial.print("I received: ");
    //Serial.println(readed, DEC);
  }

}

//=================================================================


// === SETUP ===
void setup() {
  //motorSetup();
  Serial.begin(9600);
}

void loop(){
    //Lê e printa os dados lidos dos sensores
    test2();
}
