import { StyleSheet, View, Alert } from "react-native";
import { Text,TextInput,Button,IconButton, PaperProvider } from "react-native-paper";
import React from "react";
import FromnuevoUser from "./FromnuevoUser";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

const Registro = () => {
  const Navegacion = useNavigation();
  
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const [user, onChangeUser]=React.useState('')
  const [Password, onChangePass]=React.useState('')
  const [verpassword, SetVerPassword]=React.useState(true)

  const crearcuenta = ()=>{
    createUserWithEmailAndPassword(auth,user,Password)
    .then((UserCredential)=>{console.log('cuenta creada')
      Alert.alert('Cuenta creada')
      const user = UserCredential.user
      console.log(user)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const loggin = ()=>{
    signInWithEmailAndPassword()
    .then((UserCredential)=>{console.log('cuenta creada')
      Alert.alert('Cuenta creada')
      const user = UserCredential.user
      console.log(user)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  
  const IngreserUsuario = ()=>{
    if(user == ''){
      Alert.alert('El campo de usuario no debe de estar vacio')
    }if(Password == ''){
      Alert.alert('El campo password no debe de estar vacio')
    }/*else{
      Alert.alert(user,Password)
    }*/
  }

  const funverpassword = ()=>{
    SetVerPassword(!verpassword)

    /*if(verpassword == true){
      SetVerPassword(false)
    }else{
      SetVerPassword(true)
    }*/
  }

  return (
    <PaperProvider>
      <View style={styles.contenedorpricipal}>
      <Text style={{textAlign:'center', color:'#805959', marginBottom:30}} variant="displayLarge">Happy King</Text>
      <Text style={{textAlign:'center'}} variant="headlineLarge">Registro</Text>

      <View style={styles.contendorinput}>
      <TextInput
      theme={{ colors:{primary: '#C7B3B3'}}}
      label="Usuario"
      onChangeText={onChangeUser}
      keyboardType="text"
      value={{user}}
      
    />
      <TextInput
      theme={{ colors:{primary: '#C7B3B3'}}}
      style={{marginTop:10}}
      label="Password"
      onChangeText={onChangePass}
      secureTextEntry = {verpassword}
      keyboardType="numeric"
      value={{Password}}
      right={<TextInput.Icon icon='eye' onPress={funverpassword} />}
    />
      <Button theme={{ colors: { primary: '#C7B3B3' } }} style={{marginTop:20}} icon="login" mode="contained" onPress={loggin}>
        Ingresar
        </Button>
        <Button theme={{ colors: { primary: '#C7B3B3' } }} style={{marginTop:20}} icon="login" mode="contained" onPress={crearcuenta}>
        Registrarse
        </Button>
        <FromnuevoUser/>
      </View>
    </View>
    </PaperProvider>
  )
}

export default Registro

const styles = StyleSheet.create({
  contenedorpricipal: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#f5f5f5",
   
  },
  contendorinput:{
    padding:15,
  }
})