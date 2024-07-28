import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//importar screen Principal

const Stack = createStackNavigator();
import Login2 from "./pestañas/Login2";
import Navegation from "./Navegation";
import Registro from "./pestañas/Registro";

function MyStackLogin () {
    return (
       <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login2}/>
        <Stack.Screen options={{headerShown:false}} name="Registro" component={Registro}/>
        <Stack.Screen options={{headerShown:false}} name="Dash" component={Navegation}/>
       </Stack.Navigator>
    )
}

export default function Navegation2 () {
    return(
        <NavigationContainer>
         <MyStackLogin/>
        </NavigationContainer>
    )
}