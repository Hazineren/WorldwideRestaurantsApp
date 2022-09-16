import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function BottomTabs({navigation}) {

  const onPress=()=>{
    navigation.navigate('RestaurantMaps')
  }

  return (
    <View style={{
        flexDirection:'row',
        margin:10,
        marginHorizontal:30,
        justifyContent:'space-between'
    }}>
    <Icon icon='home' text='Home'/>
    <Icon icon='search' text='Browse' onPress={onPress}/>
    <Icon icon='shopping-bag' text='Grocery'/>
    <Icon icon='receipt' text='Orders'/>
    <Icon icon='user' text='Account'/>

    </View>
  )
}

const Icon = (props)=>(
    <TouchableOpacity onPress={props.onPress}>
    <View>
    <FontAwesome5 
        name={props.icon}
        size={25}
        style={{
            marginBottom:3,
            alignSelf:'center',
            color:'black'
        }}/>
        <Text>{props.text}</Text>
    </View>
    </TouchableOpacity>
)