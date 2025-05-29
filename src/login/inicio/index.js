import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useEffect} from 'react';
import { ImageBackground, Pressable, Text, View, Image} from 'react-native';

export default function Entrar (){
      const navigation = useNavigation();

      const go = (local) =>{
            navigation.navigate(local)
      }
      
      useEffect(()=>{
      },)

return(
      <ImageBackground style={styles.container} sresizeMode='cover' source={require('../../../assets/img/back.png')}>
            <Image style={styles.logo} source={require('../../../assets/img/bmg.png')} />
            <Pressable onPress={() => go('Entrar')} style={styles.botao}>
                  <Text style={styles.botaoT}>
                        Entrar
                  </Text>
            </Pressable>
            <Pressable onPress={() => go('Cadastro')} style={styles.botao}>
                  <Text style={styles.botaoT}>
                        Cadastrar
                  </Text>
            </Pressable>
      </ImageBackground>
);
}