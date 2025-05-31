import React from "react";
import UsuarioGitHub from './componentes/UsuarioGitHub';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="GitHub" component={UsuarioGitHub} />
      </Drawer.Navigator>      
    </NavigationContainer>
  );
}
