import { View, Text } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import About from '../components/restaurantDetail/About'
import MenuItems from '../components/restaurantDetail/MenuItems'
import ViewCart from '../components/restaurantDetail/ViewCart'


const foods = [
    {
        title: 'Lasagna',
        description: 'With butter lettuce, tomato and sauce bechamel',
        price: '$13.50',
        image: 'https://img.freepik.com/premium-photo/concept-indian-cuisine-baked-chicken-wings-legs-honey-mustard-sauce-serving-dishes-restaurant-black-plate-indian-spices-wooden-table-background-image_127425-18.jpg?w=2000'
    },
    {
        title: 'Tandoori Chicken',
        description: 'Amazing Indian dish with tenderloin chicken off the sizzles 🔥 ',
        price: '$19.20',
        image: 'https://www.photo.co.ke/wp-content/uploads/Food-and-Restaurant-Photography-Kenya-IMG_4824.jpg'
    },
    {
        title: 'Chilaquiles',
        description: 'With butter lettuce, tomato and sauce bechamel',
        price: '$14.50',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/62/37/d2/magic-foods.jpg'
    },{
        title: 'Chicken Caeser Salad',
        description: 'With butter lettuce, tomato and sauce bechamel',
        price: '$13.50',
        image: 'https://realhousemoms.com/wp-content/uploads/Chicken-Caesar-Salad-IG.jpg'
    },{
        title: 'Tandoori Chicken',
        description: 'Amazing Indian dish with tenderloin chicken off the sizzles 🔥 ',
        price: '$19.20',
        image: 'https://www.photo.co.ke/wp-content/uploads/Food-and-Restaurant-Photography-Kenya-IMG_4824.jpg'
    },{
        title: 'Chilaquiles',
        description: 'With butter lettuce, tomato and sauce bechamel',
        price: '$14.50',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/62/37/d2/magic-foods.jpg'
    },
]

export default function RestaurantDetail({route,navigation}) {

    return (
        <View>
            <About route={route}/>
            <Divider width={1.8} style={{ marginVertical: 20 }} />
            <MenuItems restaurantName={route.params.name} foods={foods}/>
            <ViewCart navigation={navigation}/>
        </View>
    )
}