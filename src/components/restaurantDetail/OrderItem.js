import { View, Text } from 'react-native'
import React from 'react'

export default function OrderItem({item}) {
    const {title, price} = item;
  return (
    <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        borderBottomWidth:1,
        borderBottomColor:'black'
    }}>
      <Text style={{color:'black'}}>{title}</Text>
      <Text style={{color:'black'}}>{price}</Text>
    </View>
  )
}