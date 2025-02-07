import React from 'react';
import { Image, Text, StyleSheet,View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';

import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';


const uri = 'https://th.bing.com/th/id/R.78ba71b0f636acf0e541a431f1352632?rik=JB7Yp8Dix8Fc6A&pid=ImgRaw&r=0'
const porfilePicture = 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg'

function HomeScreen(){
  return(
    <View style={{flex:1, alignItems:'center', alignContent:'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

function LoginScreen(){
  const [email,setEmail]= React.useState('')
  const [password,setPassword] = React.useState('')
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log('Account Created!')
      const user = userCredential.user;
      console.log(user)
    })
    .catch(error =>{
      console.log(error)
      Alert.alert(error.message)
    })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log('Signed in!')
      const user = userCredential.user;
      console,log(user)
      navigation.navigate('Home');
    })
    .catch(error =>{
      console.log(error)
    })
  }

  return(
    <View style={styles.container}>
    <Image source={{uri}} style={[styles.image, StyleSheet.absoluteFill]}/>
    <ScrollView contentContainerStyle= {{
      flex: 1,
      width:'100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <BlurView intensity={100}>
          <View style={styles.Login}>
              <Image source={{uri:porfilePicture}} style={styles.porfilePicture}/>
              <View>
                  <Text style={{fontSize:17, fontWeight: '400', color:'white'}}>E-mail</Text>
                  <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder='@utrivieramaya.edu.mx'/>
              </View>
              <View>
                  <Text style={{fontSize:17, fontWeight: '400', color:'white'}}>Password</Text>
                  <TextInput onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder='Password' secureTextEntry={true}/>
              </View>
              <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
                  <Text style={{fontSize:17, fontWeight: '400', color: 'white'}}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, {backgroundColor: '#6792F090'}]}>
                  <Text style={{fontSize:17, fontWeight: '400', color: 'white'}}>Create Account</Text>
              </TouchableOpacity>
          </View>
      </BlurView>
    </ScrollView>
  </View>
);
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  Login:{
    width: 350,
    height: 490,
    borderColor:'#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center'
  },
  porfilePicture:{
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30,
  },
  input:{
    width: 250,
    height: 40,
    borderColor:'#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  button:{
    width: 250,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#00CFEB90',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
});
