import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import IonIcons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function SeacrhBar({cityHandler,regionMaps,...props}) {
  return (
    <View style={{marginTop:15, flexDirection:'row'}}>
      <GooglePlacesAutocomplete
      query={{key: 'AIzaSyB7dhbYC-jO86RiDrbNKyJQTxMBFRcz7dc'}}
      placeholder='Search...'
      onPress={(data, details = null)=>{
        console.log(data.description)
        const city = data.description.split(',')[0]
        cityHandler(city)
        regionMaps
        
      }}
      styles={{
        textInput:{
            backgroundColor:'#eee',
            borderRadius:20,
            fontWeight:'700',
            marginTop:7
        },
        textInputContainer:{
            backgroundColor:'#eee',
            borderRadius:50,
            flexDirection:'row',
            alignItems:'center',
            marginRight:10
        }
      }}
      renderLeftButton={()=><View style={{marginLeft:10}}>
            <IonIcons name='location-sharp' size={24} color='black'></IonIcons>
      </View>}
      renderRightButton={()=>(<View 
      style={{
        flexDirection:'row',
        marginRight:8,
        backgroundColor:'white',
        padding:9,
        borderRadius:30,
        alignItems:'center'
        }}>
        <AntDesign color='black' name='clockcircle' size={11} style={{marginRight:5}}/>
        <Text style={{color:'black'}}>Search</Text>
      </View>)}/>
    </View>
  )
}