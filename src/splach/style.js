import{StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#00d14d',
    },
    box:{
        width:'98%',
        flex:0.6,
        backgroundColor:'#bc7126',
        borderWidth:5,
        borderRadius:30,
        borderColor:'#713205',
        paddingTop:'10%',
        justifyContent:'center',
    },
    textArea:{
        bottom:'10%',
        marginTop:15,
        marginBottom: 15,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    logo:{
        bottom:'5%',
        width:200,
        height:200,
    },
    textL:{
        width: '90%',
        fontSize:21,
        marginLeft:40,
        textAlign:'justify',
        color:'rgb(28, 27, 27)',
        marginBottom:5,
    },
    text:{
        borderColor:'rgba(0, 0, 0, 0.58)',
        borderWidth:3,
        width: '90%',
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 22,
        textAlign:'center',
        color:'#000'
    },
    botBack:{
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 10,
    },
    botBackImg:{
        width:56,
        height:56,
    },
    bot:{
        alignSelf:'center',
        width:273,
        height:78,
    },
    aviso:{
        textAlign:'center',
        fontSize: 25,
        color:'#000',
        marginHorizontal:20,
    },
        modal:{
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(94, 93, 93, 0.8)',
        justifyContent:'center',
        alignItems:'center',
    },
    boxM:{
        width:'80%',
        height:'30%',
        backgroundColor:"#fff",
        justifyContent:'center',
        alignItems:'center',
        gap:10,
        borderWidth:5,
        borderRadius:30,
        borderColor:'#462a71',
    },
    boxMTextView:{
        width:200,
        backgroundColor:'#fff',
        borderWidth:5,
        borderRadius:30,
        borderColor:'#462a71',
    },
    boxMText:{
        textAlign:'center',
        color:'#000',
        width:'100%',
        fontSize:40,
    },
    senhaContainer: {
        borderColor:'rgba(0, 0, 0, 0.58)',
        borderWidth:3,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom:20,
        },

    senhaInput: {
        right:'-5%',
        flex: 1,
        fontSize: 22,
        color: '#000',
        textAlign: 'center',
        },

    olhoBotao: {
        padding: 5,
        },

    olhoIcone: {
        width: 34,
        height: 27,
        tintColor:'#000',
    },
    bot:{
        marginTop:30,
        backgroundColor:'rgb(28, 27, 27)',
        paddingHorizontal:25,
        paddingVertical:12,
        fontSize:26,
        color:'rgb(255, 255, 255)',
        borderRadius:10,
        borderWidth:2,
        borderBottomWidth:4,
        borderRightWidth:4,
        borderColor:'rgba(98, 98, 98, 0.58)',
        justifyContent:'center',
    }

})

export default styles