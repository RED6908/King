import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database'; // Importar las funciones necesarias
import { database } from '../../firebaseConfig'; // Importa tu configuración de Firebase

const Historial = () => {
  const navigation = useNavigation();
  const [unlockHistory, setUnlockHistory] = useState([]);

  useEffect(() => {
    const fetchUnlockHistory = () => {
      const unlockHistoryRef = ref(database, 'historial'); // Usa el path adecuado según tu estructura de base de datos

      const unsubscribe = onValue(unlockHistoryRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const unlockHistoryData = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setUnlockHistory(unlockHistoryData);
        } else {
          setUnlockHistory([]);
        }
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    };

    fetchUnlockHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial</Text>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Usuario</Text>
          <Text style={styles.headerText}>Hora</Text>
          <Text style={styles.headerText}>Fecha</Text>
        </View>
        {unlockHistory.map((unlockEvent) => (
          <View key={unlockEvent.id} style={styles.row}>
            <Text style={styles.cell}>{unlockEvent.nombre || 'N/A'}</Text>
            <Text style={styles.cell}>
              {new Date(unlockEvent.timestamp).toLocaleTimeString() || 'N/A'}
            </Text>
            <Text style={styles.cell}>
              {new Date(unlockEvent.timestamp).toLocaleDateString() || 'N/A'}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Happy King')}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#CCC7C7',
    padding: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#C7B3B3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Historial;
