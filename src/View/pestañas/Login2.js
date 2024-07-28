import React, { useState } from "react";
import { StyleSheet, View, Alert, Image } from "react-native";
import { Text, TextInput, Button, PaperProvider } from "react-native-paper";
import { app, database } from "../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const auth = getAuth(app);

const Login2 = () => {
  const navigation = useNavigation();
  const [user, onChangeUser] = useState('');
  const [password, onChangePass] = useState('');
  const [verpassword, setVerPassword] = useState(true);

  const crearCuenta = () => {
    createUserWithEmailAndPassword(auth, user, password)
      .then((UserCredential) => {
        Alert.alert('Cuenta creada');
        console.log('Cuenta creada', UserCredential.user);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error al crear la cuenta', error.message);
      });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, user, password)
      .then((UserCredential) => {
        Alert.alert('Bienvenido:', UserCredential.user.email);
        navigation.replace('Dash');
        console.log('Usuario autenticado', UserCredential.user);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error al iniciar sesión', error.message);
      });
  };

  const verificarUsuario = () => {
    if (user === '') {
      Alert.alert('El campo de usuario no debe de estar vacío');
    } else if (password === '') {
      Alert.alert('El campo password no debe de estar vacío');
    }
  };

  const togglePasswordVisibility = () => {
    setVerPassword(!verpassword);
  };

  return (
    <PaperProvider>
      <View style={styles.contenedorpricipal}>
        <Text style={styles.title}>Happy King</Text>
        <View style={styles.image}>
          <Image
            source={require('../../../assets/Img/castle.png')}
            style={styles.castle}
          />
        </View>
        <Text style={styles.loginText}>Login</Text>

        <View style={styles.contendorinput}>
          <TextInput
            theme={{ colors: { primary: '#C7B3B3' } }}
            label="Correo"
            onChangeText={onChangeUser}
            keyboardType="default"
            value={user}
          />
          <TextInput
            theme={{ colors: { primary: '#C7B3B3' } }}
            style={styles.inputMarginTop}
            label="Password"
            onChangeText={onChangePass}
            secureTextEntry={verpassword}
            value={password}
            keyboardType="numeric"
            right={<TextInput.Icon icon='eye' onPress={togglePasswordVisibility} />}
          />
          <Button
            theme={{ colors: { primary: '#C7B3B3' } }}
            style={styles.buttonMarginTop}
            icon="login"
            mode="contained"
            onPress={login}
          >
            Ingresar
          </Button>
          <Button
            theme={{ colors: { primary: '#C7B3B3' } }}
            style={styles.buttonMarginTop}
            icon="login"
            mode="contained"
            onPress={crearCuenta}
          >
            Registrarse
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  contenedorpricipal: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: 'center',
    color: '#805959',
    marginBottom: 30,
    fontSize: 64
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contendorinput: {
    padding: 15,
  },
  inputMarginTop: {
    marginTop: 10,
  },
  buttonMarginTop: {
    marginTop: 20,
  },
});

export default Login2;
