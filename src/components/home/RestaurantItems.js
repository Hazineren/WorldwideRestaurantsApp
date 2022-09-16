import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export const localRestaurants = [
    {
        name: 'Beachside Bar',
        image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80',
        categories: ['Cafe', 'Bar'],
        price: '$$',
        reviews: 1200,
        rating: 4.5,
        coordinates:{
            latitude: 40.736218,
            longitude: -73.99597
        }
    },
    {
        name: 'Benihana',
        image_url: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        categories: ['Cafe', 'Bar'],
        price: '$$',
        reviews: 1244,
        rating: 3.7,
        coordinates:{
            latitude:35.500,
            longitude: 35.500
        }
    },
    {
        name: "India's Grill",
        image_url: 'http://cdn.primedia.co.za/primedia-broadcasting/image/upload/c_fill,h_437,w_700/hrtzobn7hu3uf3u9wovj',
        categories: ['Indian', 'Bar'],
        price: '$$',
        reviews: 700,
        rating: 4.9,
        coordinates:{
            latitude:35.500,
            longitude: 35.500
        }
    }
]

export default function RestaurantItems({ navigation, ...props }) {
    return (
        <>
            {props.restaurantData.map((restaurant, index) => (
                <TouchableOpacity 
                key={index}
                activeOpacity={1} style={{ marginBottom: 30 }} onPress={()=>
                navigation.navigate('RestaurantDetail',{
                    name: restaurant.name,
                    image: restaurant.image_url,
                    price: restaurant.price,
                    reviews: restaurant.review_count,
                    rating: restaurant.rating,
                    categories: restaurant.categories
                })}>
                    <View
                        style={{ marginTop: 10, padding: 15, backgroundColor: 'white' }}>
                        <RestaurantImage image={restaurant.image_url} />
                        <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
                    </View>
                </TouchableOpacity>
            ))
            }
        </>
    )
}

const RestaurantImage = (props) => (
    <>
        <Image source={{ uri: props.image }}
            style={{ width: '100%', height: 180, borderRadius:5 }} />
        <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }}>
            <MaterialCommunityIcon name='heart-outline' size={25} color='white'></MaterialCommunityIcon>
        </TouchableOpacity>
    </>
)

const RestaurantInfo = (props) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    }}>
        <View>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>{props.name}</Text>
            <Text style={{ fontSize: 13, color: 'gray' }}>30-45 · min</Text>
        </View>
        <View style={{
            backgroundColor: '#eee',
            height: 30,
            width: 30,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{ color: 'black' }}>{props.rating}</Text>
        </View>

    </View>
)