import { View, Text, Image} from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import styles from './InfoCard.styles'

const InfoCard=({visible,restaurant,close}) =>{
    console.log('asdasdasdasdasdasdadas')
    const formattedCategories = restaurant?.categories?.map(i=>i.title).join(' · ')
    
    
  return (
    <Modal style={styles.modal} isVisible={visible} swipeDirection='down'
        onSwipeComplete={close} onBackdropPress={close} onBackButtonPress={close}
        backdropOpacity={0.5}>
        <View style={styles.container}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Image style={styles.img} source={{uri: restaurant.image_url}}/>
            <Text style={styles.category}>{formattedCategories}</Text>
            <Text style={styles.rating}>{restaurant.rating} 🌟 ({restaurant.review_count}+)</Text>
        </View>
    </Modal>
  )
}

export default InfoCard