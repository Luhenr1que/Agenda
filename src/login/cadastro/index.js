import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useEffect,useState} from 'react';
import { View, Text, TextInput, Pressable, Image,TouchableWithoutFeedback, Keyboard, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Entrar (){

      const navigation = useNavigation();

      const [senhaVisivel, setSenhaVisivel] = useState(false); 
      const [mAviso,setMAviso] = useState(false); 
      const [aviso,setAviso] = useState('');  

      const [formData, setFormData] = useState({
        nome: "",
        dataNasc: "",
        senha: "",
        log:false,
      });

      const salvar = async () => {
        const { nome, dataNasc, senha } = formData;

            if(!nome || nome.length<2){
                setMAviso(true)
                setAviso("O nome deve  ter no minimo 2 letras.")
                return false
            }
            if(!dataNasc || dataNasc.length !== 10){
                
                setMAviso(true)
                setAviso("Coloque a data completa dd/mm/aaaa.")
                return false
            }
            const a = validarData(dataNasc);
            if(a){
                    setMAviso(true)
                    setAviso("Coloque uma data válida.")
                    return false
            }
            if(!senha || senha.length<4){
                setMAviso(true)
                setAviso("A senha tem que ter 4 caracteres")
                return false
            }
            try {
            const dadosAntigos = await AsyncStorage.getItem('usuarios');
            let lista = [];

            if (dadosAntigos !== null) {
                  lista = JSON.parse(dadosAntigos);
            }

            // Adiciona o novo usuário com log: true
            lista.push({ ...formData, log: true });
            await AsyncStorage.setItem('usuarios', JSON.stringify(lista));

            console.log('Sucesso ao salvar cadastro:');
            navigation.replace('Home'); // Usamos replace em vez de navigate
            return true;
            } catch(error) {
            console.log('Erro ao salvar cadastro:', error);
            return false;
            }
      };
      const formatar = (text) => {
        const temp = text.replace(/\D/g, '');
        let formatado = temp;
        if(temp.length > 2 && temp.length <=4){
            formatado = temp.slice(0,2) + '/' + temp.slice(2);
        } 
        else if (temp.length > 4) {
            formatado = temp.slice(0, 2) + '/' + temp.slice(2, 4) + '/' + temp.slice(4, 8);
        }
        cad("dataNasc", formatado)
    }

      const validarData = (dataNasc) => {
      const partes = dataNasc.split('/');
      if (partes.length !== 3) return true;

      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1; 
      const ano = parseInt(partes[2], 10);

      const data = new Date(ano, mes, dia);

      if (
      data.getFullYear() === ano &&
      data.getMonth() === mes &&
      data.getDate() === dia
      ) {
      const hoje = new Date();
      const dataLimite = new Date(
            hoje.getFullYear() - 18,
            hoje.getMonth(),
            hoje.getDate()
      );

      if (data > dataLimite) {
            return true; 
      } else {
            return false; 
      }
      } else {
      return true; 
      }
      };


      const cad = (type, text) => {
      setFormData(prev => ({
      ...prev,
      [type]: text
      }));
      };


      
      useEffect(()=>{
      },)
return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                  <Image style={styles.logo} source={require('../../../assets/img/bmg.png')} />
            <View style={styles.textArea}>
                  <Text style={styles.textL}>Nome:</Text>
                        <TextInput
                              style={[styles.text]}
                              placeholder="Digite seu nome"
                              placeholderTextColor="rgba(0, 0, 0, 0.3)"
                              minLength={2}
                              onChangeText={(text) => cad("nome", text)}
                        />
            </View>

            <View style={styles.textArea}>
                  <Text style={styles.textL}>Data de Nascimento:</Text>
                        <TextInput
                              style={[styles.text]}
                              placeholder="dd/mm/aaaa"
                              placeholderTextColor="rgba(0, 0, 0, 0.3)"
                              minLength={10}
                              maxLength={10}
                              keyboardType="numeric"
                              onChangeText={formatar}
                              value={formData.dataNasc}
                        />
            </View>

            <View style={styles.textArea}>
                  <Text style={styles.textL}>Senha:</Text>
                        <View style={[styles.text, styles.senhaContainer]}>
                        <TextInput
                              style={[styles.senhaInput]}
                              placeholder="Crie uma senha"
                              placeholderTextColor="rgba(0, 0, 0, 0.3)"
                              minLength={4}
                              maxLength={4}
                              secureTextEntry={!senhaVisivel}
                              onChangeText={(text) => cad("senha", text)}
                        />
                  <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.olhoBotao}>
                        <Image style={styles.olhoIcone}
                        source={
                        senhaVisivel
                              ? require('../../../assets/img/naoVer.png')
                              : require('../../../assets/img/ver.png')
                        }
                        />
                  </Pressable>
                  </View>
                  <Pressable onPress={()=> {salvar()}}><Text style={styles.bot}>Concluir</Text></Pressable>
            </View>

            <Modal animationType='fade' visible={mAviso} transparent={true} style={styles.modal}>
                  <Pressable onPress={()=>setMAviso(false)} style={styles.modal}>
                  <View style={styles.boxM}>
                        <Text style={styles.aviso}>{aviso}</Text>    
                  </View>
                  </Pressable>
            </Modal>

            </View>
        </TouchableWithoutFeedback>

)

}
