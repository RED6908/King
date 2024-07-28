import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



//importar screen Principal
import Registro from "./pestañas/Registro";
import Menu from "./pestañas/Menu";
import Login2 from "./pestañas/Login2";
import Abrir from "./pestañas/Abrir";
import Historial from "./pestañas/Historial";
import Suministro from "./pestañas/Suministro";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack () {
    return (
       <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Mytabs" component={Mytabs} />
        <Stack.Screen name="Abrir" component={Abrir}/>
        <Stack.Screen name="Historial" component={Historial}/>
        <Stack.Screen name="Suministro" component={Suministro}/>
        <Stack.Screen name="Login" component={Login2}/>
       </Stack.Navigator>
    )
}

function Mytabs (){
    return(
        <Tab.Navigator initialRouteName="Menu" screenOptions={{tabBarActiveTintColor:'blue'}}>
        <Tab.Screen options={{tabBarIcon:({color,size})=>(<MaterialCommunityIcons name="home" size={size} color={color} />)}} name="Happy King" component={Menu}/>
        </Tab.Navigator>
    )
};

export default function Navegation () {
    return(
        
         <MyStack/>
        
    )
}