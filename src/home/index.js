import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState} from 'react';
import { ImageBackground, Pressable, Text, View, Image, Modal,TextInput,FlatList,KeyboardAvoidingView,Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home (){
      const navigation = useNavigation();

      const [m,setM]=useState(false)
      const [mDelete,setMDelete]=useState(false)
      const [mEditar, setMEditar] = useState(false);
      const [indexEditar, setIndexEditar] = useState(null);
      const [mAviso,setMAviso]=useState(false)
      const [Aviso,setAviso]=useState('')
      const [msg,setMsg]=useState(0)
      const [dados, setDados] = useState([]);
      const [saldo, setSaldo] = useState(0);
      const [saldoCor, setSaldoCor] = useState('');
      const [usuario, setUsuario] = useState({ 
        nome: "Usuário", 
        dataNasc: "00/00/0000" 
      });
      const [saldoVisivel, setSaldoVisivel] = useState(true);
      const [showPerfil, setShowPerfil] = useState(false);


      useEffect(() => {


        carregarDados();
        
      }, [m === false]);

      useEffect(() => {
        const carregarUsuario = async () => {
          try {
            const userSalvo = await AsyncStorage.getItem('usuarios');
            const usuarios = userSalvo ? JSON.parse(userSalvo) : [];
            
            if (usuarios.length > 0) {
              setUsuario(usuarios[0]); // Pega o primeiro usuário da lista
            } else {
              // Define um usuário padrão se não houver nenhum cadastrado
              setUsuario({ nome: "Usuário", dataNasc: "00/00/0000" });
            }
          } catch (error) {
            console.log("Erro ao buscar usuário:", error);
            // Garante um fallback mesmo em caso de erro
            setUsuario({ nome: "Usuário", dataNasc: "00/00/0000" });
          }
        };

        carregarUsuario();
      }, []);

      const carregarDados = async () => {
        try {
          const dadosSalvos = await AsyncStorage.getItem('dados');
          let lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];

          setDados(lista);

          let total = 0;
          lista.forEach(item => {
            console.log(item.valor)
            const valor = parseFloat(item.valor)
            console.log(valor)
            total += item.mOn === "Recebido" ? valor : -valor;
          });

          setSaldo(total);

        } catch (error) {
          console.log('Erro ao carregar dados:', error);
        }
      };

      const newCard = (tipos) =>{
            let mOn;
            if(tipos=='+'){
              setMsg('Recebido')
            }else{
              setMsg('Enviado')
            }
            setM(true)
      }

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
          
          const formatarDesc = (texto) => {
            if (!texto) return '';
            const textArrumado = texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
            cad("desc", textArrumado)
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
      const editarCampo = (type, text) => {
        setFormData(prev => ({
          ...prev,
          [type]: text
        }));
      };

      const formatarDataEditar = (text) => {
        const temp = text.replace(/\D/g, '');
        let formatado = temp;
        if(temp.length > 2 && temp.length <=4){
            formatado = temp.slice(0,2) + '/' + temp.slice(2);
        } 
        else if (temp.length > 4) {
            formatado = temp.slice(0, 2) + '/' + temp.slice(2, 4) + '/' + temp.slice(4, 8);
        }
        editarCampo("data", formatado);
      }

      const formatarHoraEditar = (text) => {
        const temp = text.replace(/\D/g, '');
        let formatado = temp;

        if (temp.length > 2 && temp.length <= 4) {
          formatado = temp.slice(0, 2) + ':' + temp.slice(2);
        } else if (temp.length > 4) {
          formatado = temp.slice(0, 2) + ':' + temp.slice(2, 4);
        }

        editarCampo("hora", formatado);
      }

      const formatarValorEditar = (valor) => {
        let valorFormatado = valor.replace(/\D/g, '');
        valorFormatado = valorFormatado.replace(/^0+(?=\d)/, '');
        valorFormatado = valorFormatado.padStart(3, '0');
        valorFormatado = valorFormatado.replace(/(\d)(\d{2})$/, '$1,$2');
        valorFormatado = valorFormatado.replace(/(\d)(?=(\d{3})+(\,|$))/g, '$1.');

        const finalValor = validarValor(valorFormatado);
        editarCampo("valor", finalValor);
      };

    const formatarDescEditar = (texto) => {
      editarCampo("desc", texto); // Agora aceita o texto como digitado
    };


    const cadastrar = async () =>{

      if (indexEditar !== null) {
        salvarEdicao();  
        setFormData({
          desc: '',
          valor: '',
          data: '',
          hora: '',
          mOn: ''
        });
        return;
      }

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
                  console.log(lista)
                  setM(false)
                  carregarDados();

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

    const apagarDados = async () => {
      try {
        await AsyncStorage.removeItem('dados');
        carregarDados();
        console.log('Lista dados apagada com sucesso.');
      } catch (error) {
        console.log('Erro ao apagar a lista DATOS:', error);
      }
    };

const abrirModalEdicao = (item, index) => {
  setFormData(item);
  setMsg(item.mOn); 
  setIndexEditar(index);
  setMEditar(true);
};

    const salvarEdicao = async () => {
  if (!formData.desc || !formData.valor || !formData.data || !formData.hora) {
    setAviso("Preencha todos os campos para editar.");
    setMAviso(true);
    return;
  }

  // Formata a descrição antes de salvar
  const dadosFormatados = {
    ...formData,
    desc: formData.desc.charAt(0).toUpperCase() + formData.desc.slice(1).toLowerCase()
  };

  const dadosAtualizados = [...dados];
  dadosAtualizados[indexEditar] = dadosFormatados;

  try {
    await AsyncStorage.setItem("dados", JSON.stringify(dadosAtualizados));
    setDados(dadosAtualizados);
    setMEditar(false);
    setFormData({ desc: "", valor: "", data: "", hora: "", mOn: "" });
    setIndexEditar(null);
    carregarDados();
  } catch (error) {
    console.log("Erro ao salvar edição:", error);
  }
};
    const deletarItem = async (indexParaDeletar) => {
      try {
        const dadosSalvos = await AsyncStorage.getItem('dados');
        let lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];

        lista.splice(indexParaDeletar, 1);

        await AsyncStorage.setItem('dados', JSON.stringify(lista));
        setDados(lista);
        carregarDados();
        setMEditar(false);
        setFormData({ desc: "", valor: "", data: "", hora: "", mOn: "" });
        setIndexEditar(null);
      } catch (error) {
        console.log('Erro ao deletar item:', error);
      }
    };


      return(
            <View style={styles.container}>
                  <View style={styles.navbar}>
                    <View style={styles.navbarIni}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between',gap:'50%', }}>
                        
                        {/* Ícone perfil no canto esquerdo */}
                        <Pressable onPress={() => setShowPerfil(true)}>
                          <Image
                            source={require('../../assets/img/perfil.png')}
                            style={{ width: 60, height: 60, tintColor: '#fff' }}
                          />
                        </Pressable>

                        {/* Container dos dois ícones no canto direito */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Pressable onPress={() => setSaldoVisivel(!saldoVisivel)}>
                            <Image
                              source={
                                saldoVisivel
                                  ? require('../../assets/img/ver.png')
                                  : require('../../assets/img/naoVer.png')
                              }
                              style={{ width: 40, height: 31, marginRight: 10, tintColor: '#fff' }}
                            />
                          </Pressable>

                          <Pressable onPress={() => setMDelete(true)}>
                            <Image
                              source={require('../../assets/img/lixeira.png')}
                              style={{ width: 30, height: 40, tintColor: '#fff' }}
                            />
                          </Pressable>
                        </View>

                      </View>
                    </View>
                        <View style={styles.navbarBox}>
                              <Text style={{ fontSize: 25,marginBottom:10,marginLeft:10, fontWeight: 'bold', color: '#fff' }}>Olá, {usuario.nome}</Text>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                              <View>
                                
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff'}}>
                                  {saldoVisivel ? ` R$ ${saldo.toFixed(2).replace('.', ',')}` : 'Saldo: --------'}
                                </Text>
                              </View>
                            </View>
                          </View>
                  </View>
                    <View style={styles.flatList}>
                      <View style={styles.flatListBox}>
                    <FlatList 
                      data={dados.slice().reverse()} 
                      renderItem={({ item, index }) => {
                        const originalIndex = dados.length - 1 - index;
                        return (
                          <View style={styles.cardBox}> 
                            <Pressable onPress={()=>abrirModalEdicao(item,originalIndex)} style={styles.card}>
                              {/* Descrição no topo */}
                              <Text style={styles.cardTextDesc}>{item.desc}</Text>

                              {/* Valor à esquerda, Data/Hora à direita */}
                              <View style={styles.cardLinha}>
                                <Text
                                  style={[
                                    styles.cardTextValor,
                                    item.mOn === "Recebido"
                                      ? { color: "#23ff00" }
                                      : { color: "#ff0000" },
                                  ]}
                                >
                                  {item.mOn === "ganhou" ? `R$ ${item.valor}` : `R$ ${item.valor}`}
                                </Text>
                                <View style={{ flex: 1 }} />
                                <Text style={styles.cardText}>
                                  {item.data} - {item.hora}
                                </Text>
                              </View>
                            </Pressable>
                          </View>
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                    />
                      </View>
                    </View>
                    <Pressable style={styles.plusA} onPress={()=> newCard('+')}>
                          <Image style={styles.plus} source={require('../../assets/img/yes.png')}></Image>
                    </Pressable>
                    <Pressable style={styles.plusB} onPress={()=> newCard('-')}>
                          <Image style={styles.plus} source={require('../../assets/img/no.png')}></Image>
                    </Pressable>    

                  <Modal animationType='fade' transparent={true} visible={m}>
                   <Pressable onPress={()=>{setM(false), setFormData({desc: "",valor: "",data: "",hora: "",mOn: ""});}}>
                    <View style={styles.modalA}>
                       
                        <View style={styles.modalBox}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: msg === 'Recebido' ? '#00d14d' : '#d10000', textAlign: 'center',fontSize:35, marginBottom: 20, textShadowColor: 'rgba(0, 0, 0, 0.2)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3, textTransform: 'capitalize' }}>{msg}</Text>
                        <View style={styles.TArea}>
                          <View style={styles.linha}>
                            <TextInput placeholder="Descrição" style={styles.input} placeholderTextColor="rgba(0, 0, 0, 0.3)" maxLength={20}  onChangeText={formatarDesc}/>
                          </View>
                          <View style={styles.linha}>
                            <TextInput placeholder="Valor" style={styles.input} placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='numeric' maxLength={9} onChangeText={formatarValor} value={formData.valor}/>
                          </View>
                          <View style={styles.linha}>
                            <TextInput placeholder="Data" style={styles.inputA} placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={10} maxLength={10} keyboardType="numeric" onChangeText={formatarData} value={formData.data}/>
                            <TextInput placeholder="Hora" style={styles.inputA} placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={5} maxLength={5} keyboardType="numeric" onChangeText={formatarHora} value={formData.hora}/>
                          </View>
                          <Pressable style={{ backgroundColor: '#00d14d', paddingHorizontal: 30,paddingVertical:15, borderRadius: 10,borderWidth:2, textAlign:'center', marginRight: 10}} onPress={()=>cadastrar()}><Text style={{ color: '#fff',  fontSize:20, }}>Salvar</Text></Pressable>
                        </View>
                      </View>
                    </View>
                    </Pressable>
                  </Modal>

                  <Modal animationType='fade' transparent={true} visible={mAviso}>
                        <Pressable onPress={()=>{setMAviso(false),setFormData({desc: "",valor: "",data: "",hora: "",mOn: ""});}} style={styles.modalA}>
                              <View style={styles.modalA}>
                                    <View style={styles.modalBox}>
                                          <Text style={styles.titulo}>{Aviso}</Text>
                                    </View>
                              </View>
                        </Pressable>
                  </Modal>


                  <Modal animationType='fade' transparent={true} visible={showPerfil}>
                        <Pressable style={styles.modalA} onPress={()=>{setShowPerfil(false),setFormData({desc: "",valor: "",data: "",hora: "",mOn: ""});}} >
                                    <View style={styles.modalBoxP}>
                                          <Text style={styles.titulo}>{usuario.nome}</Text>
                                          <Text style={styles.titulo}>{usuario.dataNasc}</Text>
                                    </View>
                        </Pressable>
                  </Modal>

                  <Modal animationType='fade' transparent={true} visible={mDelete}>
                        <Pressable style={styles.modalA} onPress={()=>{setMDelete(false),setFormData({desc: "",valor: "",data: "",hora: "",mOn: ""});}}>
                                    <View style={styles.modalBoxDelete}>
                                          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginVertical: 20 }}>Deseja deletar todas as informações?</Text>
                                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                            <Pressable onPress={() => {setMDelete(false);apagarDados()}} style={{ backgroundColor: '#d10000', paddingHorizontal: 30,paddingVertical:15, borderRadius: 10,borderWidth:2, textAlign:'center', marginRight: 10 }}>
                                              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize:20, }}>Sim</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{setMDelete(false)}} style={{ backgroundColor: '#00d14d', paddingHorizontal: 30,paddingVertical:15, borderRadius: 10,borderWidth:2, textAlign:'center', marginRight: 10}}>
                                              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize:20, }}>Não</Text>
                                            </Pressable>
                                          </View>
                                    </View>
                        </Pressable>
                  </Modal>

                  <Modal animationType='fade' transparent={true} visible={mEditar}>
                      <Pressable style={styles.modalA} onPress={()=>{setMEditar(false),setFormData({desc: "",valor: "",data: "",hora: "",mOn: ""});}}>
                      <View style={styles.modalBox}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: msg === 'Recebido' ? '#00d14d' : '#d10000',fontSize:35 ,textAlign: 'center', marginBottom: 20, textShadowColor: 'rgba(0, 0, 0, 0.2)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3, textTransform: 'capitalize' }}>{msg}</Text>
                        <View style={styles.TArea}>
                          <View style={styles.linha}>
                            <TextInput placeholder="Descrição" style={styles.input} placeholderTextColor="rgba(0, 0, 0, 0.3)" maxLength={20}  onChangeText={formatarDescEditar} value={formData.desc}/>
                          </View>
                          <View style={styles.linha}>
                            <TextInput placeholder="Valor" style={styles.input} placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType='numeric' maxLength={9} onChangeText={formatarValorEditar} value={formData.valor}/>
                          </View>
                          <View style={styles.linha}>
                            <TextInput placeholder="Data" style={styles.inputA} placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={10} maxLength={10} keyboardType="numeric" onChangeText={formatarDataEditar} value={formData.data}/>
                            <TextInput placeholder="Hora" style={styles.inputA} placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={5} maxLength={5} keyboardType="numeric" onChangeText={formatarHoraEditar} value={formData.hora}/>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 }}>
                            <Pressable onPress={salvarEdicao} style={{ backgroundColor: '#00d14d',paddingHorizontal: 30,paddingVertical:15, borderRadius: 10,borderWidth:2, textAlign:'center', marginRight: 10}}>
                              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize:20, }}>Salvar</Text>
                            </Pressable>
                            <Pressable onPress={() => deletarItem(indexEditar)} style={{ backgroundColor: '#d10000', paddingHorizontal: 30,paddingVertical:15, borderRadius: 10,borderWidth:2, textAlign:'center', marginRight: 10 }}>
                              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize:20, }}>Deletar</Text>
                            </Pressable>
                          </View>

                        </View>
                      </View>
                      </Pressable>
                  </Modal>
            </View>


      )
}