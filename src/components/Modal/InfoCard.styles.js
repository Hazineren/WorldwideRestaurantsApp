import { StyleSheet } from "react-native";

export default StyleSheet.create({
    modal:{
        justifyContent:'flex-end',
        margin:0
    },
    container:{
        backgroundColor:'#424242',
        padding:15
    },
    img:{
        width:'100%',
        height:190,
        marginVertical:10,
        borderWidth:1,
        borderColor:'white',
        borderRadius:8
    },
    name:{
        fontSize:22,
        fontWeight:'700',
        color:'white',
        alignSelf:'center'
    },
    category:{
        color:'white',
        fontSize:17,
    },
    rating:{
        color:'white',
        fontWeight:'bold'
    }
})