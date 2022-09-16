import { View, Text, Image } from 'react-native'
import React from 'react'


export default function About(props) {
    const { name, image, price, reviews, rating, categories } = props.route.params;

    const formattedCategories = categories.map((cat) => cat.title).join(' · ')

    const description = `${formattedCategories} ${price ? ' · ' + price : ''} · 🎫 · ${rating} 🌟 (${reviews}+) `
    return (
        <View>
            <RestaurantImage image={image} />
            <RestaurantName name={name} />
            <RestaurantDescription description={description} />
        </View>
    )
}

const RestaurantImage = (props) => (
    <Image source={{ uri: props.image }} style={{ width: '100%', height: 150 }}></Image>
)

const RestaurantName = (props) => (
    <Text style={{
        fontSize: 29, fontWeight: '500', color: 'black',
        marginTop: 10, marginHorizontal: 15
    }}>{props.name}</Text>
)

const RestaurantDescription = (props) => (
    <Text style={{ marginTop: 10, marginHorizontal: 15, fontWeight: '400', fontSize: 15.5, color: 'black' }}>{props.description}</Text>
)