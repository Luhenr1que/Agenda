import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const checkLoginStatus = async () => {
        try {
          // Verifica se existe algum usuário cadastrado
          const usuariosSalvos = await AsyncStorage.getItem('usuarios');
          
          if (usuariosSalvos) {
            const usuarios = JSON.parse(usuariosSalvos);
            
            // Procura por um usuário com log: true
            const usuarioLogado = usuarios.find(user => user.log === true);
            
            if (usuarioLogado) {
              // Usuário já está logado, redireciona para Home
              navigation.replace('Home');
            } else {
              // Nenhum usuário logado, redireciona para Inicio
              navigation.replace('Inicio');
            }
          } else {
            // Nenhum usuário cadastrado, redireciona para Inicio
            navigation.replace('Inicio');
          }
        } catch (error) {
          console.error('Erro ao verificar login:', error);
          navigation.replace('Inicio');
        } finally {
          setIsLoading(false);
        }
      };

      checkLoginStatus();
    }, 2000);

    // Limpa o timeout se o componente for desmontado
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/img/bmg.png')} />
      {isLoading && <ActivityIndicator size="large" color="#000" />}
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#00d14d',
    },
    logo:{
        bottom:'5%',
        width:300,
        height:300,
    },
});