import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00d14d',
    },
    logo:{
        width:430,
        height:430,
        bottom:'10%',
    },
    botao:{
        backgroundColor:'rgb(28, 27, 27)',
        width:'80%',
        height:80,
        borderRadius:10,
        top:'7%',
        marginBottom:30,
        borderWidth:2,
        borderBottomWidth:4,
        borderRightWidth:4,
        borderColor:'rgba(183, 183, 183, 0.58)',
        justifyContent:'center',
    },
    botaoT:{
        textAlign:'center',
        fontSize:40,
        fontWeight:400,
        color:'#fff',
        backgroundColor:'rgb(28, 27, 27)',
    }
});
