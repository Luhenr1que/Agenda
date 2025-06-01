import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState} from 'react';
import { ImageBackground, Pressable, Text, View, Image, Modal,TextInput} from 'react-native';

export default function Home (){
      const navigation = useNavigation();

      const [m,setM]=useState(false)
      const [tipo,setTipo]=useState(0)

      const newCard = () =>{
            setM(true)
      }

      const mudarTipo = () =>{
            if(tipo==0){
                  setTipo(1)
            }else{
                  setTipo(0)
            }
      }
      
      useEffect(()=>{
      },)

      return(
            <View style={styles.container}>
                  <View style={styles.navbar}>

                  </View>
                  <View style={styles.menu}>

                  </View>
                  <View style={styles.flatList}>
                  </View>
                  <Pressable style={styles.plusA} onPress={()=> newCard()}>
                        <Image style={styles.plus} source={require('../../assets/img/mais.png')}></Image>
                  </Pressable>     
                  <Modal animationType='fade' transparent={true} visible={m}>

                        <View style={styles.modalA}>
                              <View style={styles.modalBox}>
                                    <Pressable onPress={()=>setM(false)}><Image style={styles.volta} source={require('../../assets/img/volta.png')}/></Pressable>
                                    <View  style={styles.modalBoxA}>
                                          <View style={styles.linha}>
                                                <TextInput placeholder="Valor" placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={8} keyboardType="decimal-pad" style={styles.tIValor}></TextInput>
                                                <Pressable onPress={()=>mudarTipo()}>
                                                      <Image style={styles.imgTi} source={tipo==0 ? require('../../assets/img/yes.png'):require('../../assets/img/no.png')} ></Image>
                                                </Pressable>
                                          </View>                                          
                                          <TextInput placeholder="Descrição" placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={8} style={styles.tI}>

                                          </TextInput>

                                          <TextInput placeholder="Data" placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={8} style={styles.tI}>
                                          </TextInput>
                                    </View>
                              </View>
                        </View>
                  </Modal>
            </View>

      )
}