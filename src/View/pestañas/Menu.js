import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Menu = () => {
  const Navegacion = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Bienvenido</Text>
      <TouchableOpacity style={styles.button} onPress={() => Navegacion.navigate('Abrir')}>
        <Text style={styles.buttonText}>Abrir</Text>
        <View style={styles.icon}>
          <Text>🔓</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Navegacion.navigate('Historial')}>
        <Text style={styles.buttonText}>Historial</Text>
        <View style={styles.icon}>
          <Text>📋</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Navegacion.navigate('Suministro')}>
        <Text style={styles.buttonText}>Suministro</Text>
        <View style={styles.icon}>
          <Text>📈</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.salir1} onPress={() => Navegacion.navigate('Login')}>
        <Text style={styles.buttonText}>Salir</Text>
        <View style={styles.icon}>
          <Text>👑</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      },
      button: {
        backgroundColor: '#C7B3B3',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
       
      },
      icon: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
      },
      salir1: {
        backgroundColor: '#E7B3B5',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      Titulo:{
        fontSize: 42,
        fontWeight: 'bold',
        color: '#333',
      }
})