import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import {Divider} from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'
import Categories from '../components/home/Categories'
import HeaderTabs from '../components/home/HeaderTabs'
import RestaurantItems, {
    localRestaurants,
} from '../components/home/RestaurantItems'
import SeacrhBar from '../components/home/SeacrhBar'

const YELP_API_KEY = '6E141OUaC2LZceBiEtX-ETWQkWOy7xAJU25r4OrEBIA2v7R0EctaT7QM5_ZpS9HbBOIcjwKACbW4NObVufc7GPLhzwVFgdCnQMMYQM1TrkJuT8-HSx-u6qzUe_0aY3Yx';

export default function Home({navigation}) {
    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState('New York, NY, USA') //New York, NY, USA // San Francisko
    const [activeTab, setActiveTab] = useState('Delivery');

    const getRestaurantsFromYelp = () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;


        const apiOptions = {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`,
            },
        };
        return fetch(yelpUrl, apiOptions)
            .then((res) => res.json())
            .then(json => setRestaurantData(
                json.businesses.filter((business) =>
                    business.transactions.includes(activeTab.toLowerCase())
                )
            )
        )
    }

    useEffect(() => {
        getRestaurantsFromYelp();
        
    }, [city,activeTab])


    return (
        <View style={{ backgroundColor: '#eee', flex: 1 }}>
            <View style={{ backgroundColor: 'white', padding: 15 }}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
                <SeacrhBar cityHandler={setCity} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories />
                <RestaurantItems restaurantData={restaurantData} navigation={navigation}/>
            </ScrollView>
            <Divider width={1}/>
            <BottomTabs restaurantData={restaurantData} navigation={navigation}/>
        </View>

    )
}