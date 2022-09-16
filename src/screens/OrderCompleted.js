import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';
import MenuItems from '../components/restaurantDetail/MenuItems';
import { ScrollView } from 'react-native-gesture-handler';

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: 'Lasagna',
        description: 'With butter lettuce, tomato and sauce bechamel',
        price: '$13.50',
        image: 'https://img.freepik.com/premium-photo/concept-indian-cuisine-baked-chicken-wings-legs-honey-mustard-sauce-serving-dishes-restaurant-black-plate-indian-spices-wooden-table-background-image_127425-18.jpg?w=2000'
      },
    ]
  })
  const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems)

  const total = items.map((item => Number(item.price.replace('$', '')))).reduce((prev, curr) => prev + curr, 0)

  const totalUSD = total.toLocaleString('en', {
    style: 'currency',
    currency: 'USD'
  });

  useEffect(() => {
    const db = firestore();
    const unsubscribe = db.collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data())
        })
      })
    return ()=> unsubscribe();
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{margin:15, alignItems:'center', height:'100%'}}>
        <LottieView style={{ height: 100, alignSelf: 'center', marginBottom: 30 }} autoPlay source={require('../../assets/animations/check-mark.json')} speed={0.5} loop={false} />
        <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>Your order at {restaurantName} has been placed for {totalUSD}</Text>
       <ScrollView>
        <MenuItems foods={lastOrder.items} hideCheckbox={true} marginLeft={10}></MenuItems>
        </ScrollView>
        <LottieView style={{ height: 200, alignSelf: 'center', marginBottom: 30 }} autoPlay source={require('../../assets/animations/cooking.json')} speed={0.5} />
        
      </View>
    </View>
  )
}