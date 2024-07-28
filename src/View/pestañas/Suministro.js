import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, set } from 'firebase/database'; 
import { database } from '../../firebaseConfig'; 

const Suministro = () => {
  const Navegacion = useNavigation();
  const [nivel, setNivel] = useState('Alto');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const nivelRef = ref(db, 'Dispensador/Sensor/Nivel');

    const unsubscribe = onValue(nivelRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNivel(data); 
      } else {
        setNivel('Desconocido'); 
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMedir = () => {
    setButtonDisabled(true);

    setTimeout(() => {
      const db = getDatabase();
      const nivelRef = ref(db, 'Dispensador/Sensor/Nivel');
      const nuevoNivel = obtenerNivelAleatorio(); 

      set(nivelRef, nuevoNivel)
        .then(() => {
          setNivel(nuevoNivel);
        })
        .catch((error) => {
          console.log('Error actualizando nivel:', error);
        })
        .finally(() => {
          setButtonDisabled(false);
        });
    }, 1000); 
  };

  const obtenerNivelAleatorio = () => {
    const niveles = ['Alto', 'Medio', 'Bajo'];
    return niveles[Math.floor(Math.random() * niveles.length)];
  };

  const getGaugeColor = () => {
    switch (nivel) {
      case 'Alto':
        return 'green';
      case 'Medio':
        return 'orange';
      case 'Bajo':
        return 'red';
      default:
        return 'grey';
    }
  };

  const getGaugeWidth = () => {
    switch (nivel) {
      case 'Alto':
        return '80%';
      case 'Medio':
        return '50%';
      case 'Bajo':
        return '20%';
      default:
        return '0%';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suministro</Text>
      <View style={styles.gaugeContainer}>
        <View style={styles.gaugeBackground}>
          <View
            style={[
              styles.gaugeFill,
              { width: getGaugeWidth(), backgroundColor: getGaugeColor() },
            ]}
          />
        </View>
        <Text style={styles.gaugeText}>Nivel:</Text>
        <Text style={styles.gaugeValue}>{nivel}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleMedir}
        disabled={buttonDisabled}
      >
        <Text style={styles.buttonText}>Medir 🧪</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Navegacion.navigate('Happy King')}>
        <Text style={styles.buttonText}>Regresar ↩</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gaugeContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  gaugeBackground: {
    width: '100%',
    height: 30,
    backgroundColor: '#ddd',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
  },
  gaugeFill: {
    height: '100%',
    borderRadius: 15,
  },
  gaugeText: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gaugeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#C7B3B3',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '45%',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Suministro;
