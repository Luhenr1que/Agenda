import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState} from 'react';
import { ImageBackground, Pressable, Text, View, Image, Modal,TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home (){
      const navigation = useNavigation();

      const [m,setM]=useState(false)
      const [mAviso,setMAviso]=useState(false)
      const [Aviso,setAviso]=useState('')
      const [tipo,setTipo]=useState(0)
      const [msg,setMsg]=useState(0)

      const newCard = (tipos) =>{
            let mOn;
            if(tipos=='+'){
              setMsg('ganhou')
            }else{
              setMsg('perdeu')
            }
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

      const formatarData = (text) => {
            const temp = text.replace(/\D/g, '');
            let formatado = temp;
            if(temp.length > 2 && temp.length <=4){
                formatado = temp.slice(0,2) + '/' + temp.slice(2);
            } 
            else if (temp.length > 4) {
                formatado = temp.slice(0, 2) + '/' + temp.slice(2, 4) + '/' + temp.slice(4, 8);
            }
            cad("data", formatado)
        }

        const formatarHora = (text) => {
            const temp = text.replace(/\D/g, '');
            let formatado = temp;
          
            if (temp.length > 2 && temp.length <= 4) {
              formatado = temp.slice(0, 2) + ':' + temp.slice(2);
            } else if (temp.length > 4) {
              formatado = temp.slice(0, 2) + ':' + temp.slice(2, 4);
            }
          
            cad("hora", formatado);
          };

          const formatarValor = (valor) => {

            let valorFormatado = valor.replace(/\D/g, '');
          
            valorFormatado = valorFormatado.replace(/^0+(?=\d)/, '');

            valorFormatado = valorFormatado.padStart(3, '0');
          
            valorFormatado = valorFormatado.replace(/(\d)(\d{2})$/, '$1,$2');
          
            valorFormatado = valorFormatado.replace(/(\d)(?=(\d{3})+(\,|$))/g, '$1.');

            const finalValor = validarValor(valorFormatado);
          
            cad("valor", finalValor);
          };

          const validarData = (inputData)=>{
            const partes = inputData.split('/');
            if(partes.length !== 3)return true;
                const dia = parseInt(partes[0],10);
                const mes = parseInt(partes[1],10)-1;
                const ano = parseInt(partes[2],10);
    
                const data = new Date(ano,mes,dia);
                if(data.getFullYear() === ano && data.getMonth() === mes && data.getDate() === dia){
                    console.log(data.toLocaleDateString('pt-BR'))
                    return false;
                }else{
                    return true;
                }  
        }

          const validarHora = (inputHora)=>{
            const partes = inputHora.split(':');
            if(partes.length !== 2)return true;
                const hh = parseInt(partes[0]);
                const mm = parseInt(partes[1]);

                console.log(hh,mm)
                if (hh>23 || mm>59 || hh<1 || mm<0){
                  setMAviso(true)
                  setAviso("Coloque uma data existente.")
                  return true
                } else{
                  return false
                }
        }

          const validarValor = (inputValor)=>{
            const tempValor = inputValor.replace(".","")
            const tempValorAgain = tempValor.replace(",",".")
            return tempValorAgain
        }
          
      const [formData, setFormData] = useState({
        desc: "",
        valor: "",
        data: "",
        hora: "",
        mOn: ""
      });

      const cad = (type, text) => {
        setFormData(prev => ({
            ...prev,
            [type]: text
          }))
      };

    const cadastrar = async () =>{

      formData.mOn=msg

      console.log(formData)

      const { desc, valor, data, hora, mOn } = formData;

      const a = validarData(data)

      const b = validarHora(hora)

      const c = validarValor(valor)

      if(!desc || !valor || !data || !hora || !mOn){
            setAviso('Preencha todos os campos.')
            setMAviso(true)
            return false
      } else if(a){
            setAviso('Preencha a data corretamente.')
            setMAviso(true)
            return false
      } else if(b){
            setAviso('Preencha a hora corretamente.')
            setMAviso(true)
            return false
      }else{ 
            try{
                  const dadosAntigos = await AsyncStorage.getItem('dados')
                  let lista = []
      
                  if (dadosAntigos !==  null){
                      lista = JSON.parse(dadosAntigos)
                  }
      
                  lista.push(formData)
                  await AsyncStorage.setItem('dados', JSON.stringify(lista))
      
                  console.log('Sucesso ao salvar dados');
                  setM(false)

                  setFormData({
                        desc: '',
                        valor: '',
                        data: '',
                        hora: '',
                        mOn: ''
                      });

                  return true;
              }catch{
                  console.log('Erro ao salvar dados:', error);
                   return false;
              }
      }

      


    }
      return(
            <View style={styles.container}>
                  <View style={styles.navbar}>
                        <View style={styles.navbarBox}>

                        </View>
                  </View>
                    <View style={styles.flatList}>
                      <View style={styles.flatListBox}>

                      </View>
                    </View>
                    <Pressable style={styles.plusA} onPress={()=> newCard('+')}>
                          <Image style={styles.plus} source={require('../../assets/img/yes.png')}></Image>
                    </Pressable>
                    <Pressable style={styles.plusB} onPress={()=> newCard('-')}>
                          <Image style={styles.plus} source={require('../../assets/img/no.png')}></Image>
                    </Pressable>    
                  <Modal animationType='fade' transparent={true} visible={m}>
                    <View style={styles.modalA}>
                      <View style={styles.modalBox}>
                        <Text style={styles.titulo}>{msg}</Text>
                        <View style={styles.TArea}>
                          <View style={styles.linha}>
                            <TextInput placeholder="Descrição" style={styles.input} placeholderTextColor="rgba(0, 0, 0, 0.3)" onChangeText={(text) => cad("desc", text)}/>
                          </View>
                          <View style={styles.linha}>
                            <TextInput placeholder="Valor" style={styles.input} placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='numeric' maxLength={9} onChangeText={formatarValor} value={formData.valor}/>
                          </View>
                          <View style={styles.linha}>
                            <TextInput placeholder="Data" style={styles.inputA} placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={10} maxLength={10} keyboardType="numeric" onChangeText={formatarData} value={formData.data}/>
                            <TextInput placeholder="Hora" style={styles.inputA} placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={5} maxLength={5} keyboardType="numeric" onChangeText={formatarHora} value={formData.hora}/>
                          </View>
                          <Pressable onPress={()=>cadastrar()}><Text>AAAAAAAAAAAAA</Text></Pressable>
                        </View>
                      </View>
                    </View>
                  </Modal>

                  <Modal animationType='fade' transparent={true} visible={mAviso}>
                        <Pressable onPress={()=>setMAviso(false)} style={styles.modalA}>
                              <View style={styles.modalA}>
                                    <View style={styles.modalBox}>
                                          <Text style={styles.titulo}>{Aviso}</Text>
                                    </View>
                              </View>
                        </Pressable>
                  </Modal>
            </View>

      )
}