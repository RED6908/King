import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../firebaseConfig'; 
import { ref, set, push, get } from 'firebase/database';

const Abrir = () => {
  const [motorState, setMotorState] = useState('apagado');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const Navegacion = useNavigation();

  // Función para actualizar el estado del motor en Firebase
  const actualizarEstadoMotor = (nuevoEstado) => {
    const motorRef = ref(database, 'Dispensador/Motor/Status');
    set(motorRef, nuevoEstado)
      .then(() => {
        console.log('Estado del motor actualizado exitosamente a:', nuevoEstado);
      })
      .catch((error) => {
        console.log('Error actualizando estado:', error);
      });
  };

  // Función para registrar el evento en el historial
  const registrarHistorial = (estado) => {
    const historialRef = ref(database, 'historial');
    const nuevoEvento = {
      nombre: 'Usuario1', // Aquí puedes obtener el nombre del usuario de alguna fuente
      timestamp: Date.now(),
      estado: estado
    };
    push(historialRef, nuevoEvento)
      .then(() => {
        console.log('Evento registrado en el historial.');
      })
      .catch((error) => {
        console.log('Error registrando evento en el historial:', error);
      });
  };

  // Función para encender el motor y apagarlo después de 15 segundos
  const manejarMotor = () => {
    if (motorState === 'apagado' && !buttonDisabled) {
      setMotorState('abriendo');
      actualizarEstadoMotor(true);
      registrarHistorial('abriendo'); // Registra el evento en el historial
      setButtonDisabled(true); 

      console.log('Motor encendido. Se apagará en 5 segundos.');
      setTimeout(() => {
        actualizarEstadoMotor(false);
        setMotorState('apagado');
        registrarHistorial('cerrado'); // Registra el evento en el historial
        console.log('Motor apagado después de 5 segundos.');
        setButtonDisabled(false); 
      }, 5 * 1000); // Esta parte es para ajustar el tiempo que estará abierto el servomotor
    }
  };

  // Cambiar el texto y el estilo del botón según el estado del motor
  const getButtonText = () => {
    if (motorState === 'apagado') {
      return 'Abrir';
    } else if (motorState === 'abriendo') {
      return 'Cerrando...';
    }
    return 'Abrir';
  };

  const getButtonStyle = () => {
    return motorState === 'abriendo' ? styles.buttonActive : styles.button;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrir</Text>
      <View>
        <Image
          source={require('../../../assets/Img/dulcero.png')}
          style={styles.gumball}
        />
      </View>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={manejarMotor}
        disabled={buttonDisabled} // Deshabilitar el botón durante el ciclo de encendido/apagado
      >
        <Text style={styles.buttonText}>{getButtonText()}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Navegacion.navigate('Happy King')}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Abrir;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gumball: {
    width: 200,
    height: 200,
    backgroundColor: '#FFF',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#C7B3B3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#B3C7C7', // Color diferente para cuando el motor está abriendo
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

//Subir este codigo al ardunio ESP32 desde el arduino IDE
// #include <WiFi.h>
// #include <FirebaseESP32.h>
// #include <ESP32Servo.h>

// #define WIFI_SSID "Ever0809"
// #define WIFI_PASSWORD "12345678"
// #define FIREBASE_HOST "domo-ut-a50a6-default-rtdb.firebaseio.com" 
// #define FIREBASE_AUTH "AIzaSyAO4X9FU8o-eQHLelFyKVfXfr-tHZ8FNek" 

// Servo myservo;

// /* Pin del ESP32 y el HC-SR04 */
// #define trigger_pin 23
// #define Echo_pin 22

// long duration;
// int distance; 

// FirebaseData firebaseData;
// FirebaseConfig config;
// FirebaseAuth auth;

// bool previousMotorStatus = false;

// void setup() {
//   Serial.begin(115200); 
//   delay(10);
//   myservo.attach(18); 

//   pinMode(trigger_pin, OUTPUT);
//   pinMode(Echo_pin, INPUT); 

//   //Configuración del GPIO
//   pinMode(2, OUTPUT);
//   digitalWrite(2, LOW);
//   pinMode(4, OUTPUT);
//   digitalWrite(4, LOW);

//   Serial.println();
//   Serial.println();
//   Serial.print("Conectandose a red : ");
//   Serial.println(WIFI_SSID);
  
//   WiFi.begin(WIFI_SSID, WIFI_PASSWORD); 
  
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
  
//   Serial.println("");
//   Serial.println("WiFi conectado");

//   config.host = FIREBASE_HOST;
//   config.signer.tokens.legacy_token = FIREBASE_AUTH;

//   Firebase.begin(&config, &auth);
//   Firebase.reconnectWiFi(true);
// }

// void loop() {
//   int pos;

//   if (Firebase.getBool(firebaseData, "/Dispensador/Motor/Status")) {
//     if (firebaseData.dataType() == "boolean") {
//       bool motorStatus = firebaseData.boolData();

//       if (motorStatus != previousMotorStatus) {
//         previousMotorStatus = motorStatus;

//         if (motorStatus) {
//           Serial.println("Motor activado. Abriendo...");
//           // Activar el motor (abrir)
//           for (pos = 50; pos <= 60; pos += 3) {
//             myservo.write(pos); 
//             Serial.print("Posición del servo: ");
//             Serial.println(pos);
//             delay(6); 
//           }

//           // Medir el nivel con el sensor ultrasónico
//           digitalWrite(trigger_pin, LOW);
//           delayMicroseconds(2);

//           // Pin of HC-SR04
//           digitalWrite(trigger_pin, HIGH);  
//           delayMicroseconds(10);
//           digitalWrite(trigger_pin, LOW);

//           // Measure the Echo output signal duration or pulse width
//           duration = pulseIn(Echo_pin, HIGH); 
//           distance = duration * 0.034 / 2; 

//           Serial.print("Distance: ");
//           Serial.print(distance);
//           Serial.println(" cm");

//           // Enviar el nivel de suministro a Firebase
//           String nivel;
//           if (distance >= 1 && distance <= 2) {
//             nivel = "Lleno";
//           } else if (distance >= 3 && distance <= 7) {
//             nivel = "Medio";
//           } else if (distance >= 8 && distance <= 10) {
//             nivel = "Vacio";
//           } else {
//             nivel = "Desconocido";
//           }

//           if (Firebase.setString(firebaseData, "/Dispensador/Sensor/Nivel", nivel)) {
//             Serial.println("Nivel de suministro enviado a Firebase.");
//           } else {
//             Serial.println("Error enviando nivel de suministro: " + firebaseData.errorReason());
//           }

//           delay(1000); 

//           Serial.println("Motor desactivado. Cerrando...");
//           // Desactivar el motor (cerrar)
//           for (pos = 60; pos >= 0; pos -= 3) {
//             myservo.write(pos); 
//             Serial.print("Posición del servo: ");
//             Serial.println(pos);
//             delay(3);           
//           }
          
//           // Resetear el estado del motor en Firebase
//           if (Firebase.setBool(firebaseData, "/Dispensador/Motor/Status", false)) {
//             Serial.println("Estado del motor reseteado a false en Firebase.");
//           } else {
//             Serial.println("Error reseteando el estado del motor en Firebase: " + firebaseData.errorReason());
//           }
//         }
//       }
//     }
//   } else {
//     Serial.println("Error al obtener el estado del motor: " + firebaseData.errorReason());
//   }

//   delay(1000); 
// }
