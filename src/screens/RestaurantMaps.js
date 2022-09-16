import { View, Text } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import MapView from 'react-native-maps'
import SeacrhBar from '../components/home/SeacrhBar';
import RestaurantMarker from '../components/marker/RestaurantMarker/RestaurantMarker';
import { localRestaurants } from '../components/home/RestaurantItems';
import InfoCard from '../components/Modal/InfoCard';

const YELP_API_KEY = '6E141OUaC2LZceBiEtX-ETWQkWOy7xAJU25r4OrEBIA2v7R0EctaT7QM5_ZpS9HbBOIcjwKACbW4NObVufc7GPLhzwVFgdCnQMMYQM1TrkJuT8-HSx-u6qzUe_0aY3Yx';
export default function RestaurantMaps() {
    const mapRef = useRef();

    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState('New York, NY, USA') //New York, NY, USA // San Francisko
    const [activeTab, setActiveTab] = useState('Delivery');
    const [res, setRes] = useState();
    const [st, setSt] = useState(false);
    const [infoModalVisibilty, setInfoModalVisibilty] = useState(false);


    const getRestaurantsFromYelp = useCallback((a) => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${a}`;
        console.log(yelpUrl, '********api noluyo')

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
    },
        [city],
    )


    useEffect(() => {
        getRestaurantsFromYelp(city);
        console.log(restaurantData,'ilk fonk veri')
    }, [city, activeTab])

    const renderRestaurantMarker = () => {
        return restaurantData.map(({coordinates,image_url,id,name,rating,review_count,categories}) => {
            return (
                <RestaurantMarker onSelect={() => {handleMarkerSelect(coordinates,!st,{name,rating,image_url,review_count,categories})}} key={id} restaurantImageUrl={image_url} coordinates={{
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                }}
                    title='Ankara' description='Türkiyenin Başkenti'></RestaurantMarker>
            )
        })
    }
    
    const setlemeIslemi=(s)=>{
        setRes(s);
        handleModalVisibility()
        console.log('İçeri girio mus')
        console.log(s,'*****')
    }

    const handleMarkerSelect=(coor,st, selectedRestaurant)=>{
        console.log(st,'st ne')
        if (st) {
            setlemeIslemi(selectedRestaurant);
            setSt(false)
        }
        
        console.log(selectedRestaurant,'restoooo')
        // console.log(restaurantData.length, 'asdasd')
        // console.log(restaurantData)
        console.log(coor, 'cooor verisi ne abi')
        //console.log(mapRef,'reffff')
        mapRef?.current?.animateToRegion({
            latitude: coor.latitude,
            longitude: coor.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
        })
    }

    const handleModalVisibility = () => {
        setInfoModalVisibilty(!infoModalVisibilty);
    }

    return (
        <View style={{ flex: 1 }}>
            <SeacrhBar cityHandler={setCity} regionMaps={handleMarkerSelect(restaurantData[0].coordinates,null)} restaurantData={restaurantData}></SeacrhBar>
            <MapView ref={mapRef} style={{ flex: 1 }}>
                {restaurantData && renderRestaurantMarker()}
            </MapView>
           {res && (<InfoCard visible={infoModalVisibilty} close={handleModalVisibility} restaurant={res}/>)}
        </View>
    )
}