import React from 'react';
import { View,Image } from 'react-native';
import {Marker} from 'react-native-maps';
import styles from './RestaurantMarker.styles'
import IonIcon from 'react-native-vector-icons/Ionicons'

const RestaurantMarker=({coordinates, restaurantImageUrl,onSelect})=>{
    return(
        <Marker coordinate={coordinates} onPress={onSelect}>
                <Image style={styles.image} source={{uri: restaurantImageUrl}}/>
                <IonIcon name="caret-down-outline" size={30} color='black' style={{
                    alignSelf:'center',paddingTop:0,bottom:10.5
                }}></IonIcon>
        </Marker>
    )
}

export default RestaurantMarker;