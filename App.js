import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Entrar from './src/login/entrar/index.js';
import Cadastro from './src/login/cadastro/index.js';
import Home from './src/home/index.js';
import Inicio from './src/login/inicio/index.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

  <NavigationContainer>
    <StatusBar 
      hidden={true}
    />
      <Stack.Navigator>
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Entrar" 
          component={Entrar} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerShown: false,
          }}
          />
        </Stack.Navigator>

  </NavigationContainer>
)}

