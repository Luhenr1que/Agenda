import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useEffect} from 'react';
import { ImageBackground, Pressable, Text, View, Image} from 'react-native';

export default function Inicio (){
      const navigation = useNavigation();

      const go = (local) =>{
            navigation.navigate(local)
      }
      
      useEffect(()=>{
      },)

return(
      <View style={styles.container} sresizeMode='cover' source={require('../../../assets/img/back.png')}>
            <Image style={styles.logo} source={require('../../../assets/img/bmg.png')} />
            <Pressable onPress={() => go('Cadastro')} style={styles.botao}>
                  <Text style={styles.botaoT}>
                        Cadastre-se
                  </Text>
            </Pressable>
      </View>
);
}