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
