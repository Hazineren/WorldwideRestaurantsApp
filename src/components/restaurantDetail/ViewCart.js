import { View, Text, Modal,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native'


export default function ViewCart({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const {items,restaurantName} = useSelector((state) => state.cartReducer.selectedItems)
    const total = items.map((item => Number(item.price.replace('$', '')))).reduce((prev, curr) => prev + curr, 0)
    const totalUSD = total.toLocaleString('en', {
        style: 'currency',
        currency: 'USD'
    });

    const addOrderToFireBase = ()=>{
        setLoading(true);
        const db = firestore();
        db.collection('orders').add({
            items:items,
            restaurantName: restaurantName,
            createdAt: firestore.FieldValue.serverTimestamp(),
        })
        .then(()=>{
            setTimeout(()=>{
                setLoading(false);
                navigation.navigate('OrderCompleted')
            },2500)
        })
    }

    const styles = StyleSheet.create({
        modalContainer:{
            flex:1,
            justifyContent:'flex-end',
            backgroundColor:'rgba(0,0,0,0.7)'
        },
        modalCheckoutContainer:{
            backgroundColor:'white',
            padding:16,
            height:500,
            borderWidth:5
        },
        restaurantName:{
            textAlign:'center',
            fontWeight:'600',
            color:'black',
            fontSize:18,
            marginBottom:10
        },
        subTotalContainer:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop:15
        },
        subTotalText:{
            textAlign:'left',
            fontWeight:'600',
            color:'black',
            fontSize:15,
            marginBottom:10
        }
    })

    const checkoutModalContent = () => {
        return (
            <>
                <View style={styles.modalContainer}>
                    <View style={styles.modalCheckoutContainer}>
                        <Text style={styles.restaurantName}>{restaurantName}</Text>
                        {items.map((item,index)=>(
                            <OrderItem key={index} item={item}></OrderItem>
                        ))}
                        <View style={styles.subTotalContainer}>
                            <Text style={styles.subTotalText}>Subtotal</Text>
                            <Text style={{color:'black'}}>{totalUSD}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity style={{marginTop:20,backgroundColor:'black',
                            alignItems:'center',
                            padding:13,
                            borderRadius:30,
                            width:300,
                            position:'relative'}} onPress={()=>{addOrderToFireBase()
                                                                setModalVisible(false);}}>
                                <Text style={{color:'white'}}>Checkout</Text>
                                <Text style={{position:'absolute',
                                right:20,
                                color:'white',
                                fontSize:15,
                                top:11}}>{total ? totalUSD:''}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        )
    }

    return (
        <>
            <Modal animatedType='slide' visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
                {checkoutModalContent()}
            </Modal>
            {total ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: 330,
                        zIndex: 1
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100%'
                    }}>
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                backgroundColor: 'black',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                padding: 15,
                                borderRadius: 30,
                                width: 300,
                                position: 'relative'
                            }}
                            onPress={()=>setModalVisible(true)}>
                            <Text style={{ color: 'white', fontSize: 20, marginRight: 30 }}>View Cart</Text>
                            <Text style={{ color: 'white', fontSize: 20 }}>{totalUSD}</Text>
                        </TouchableOpacity>
                    </View>
                </View>) : (
                <></>
            )}
            {loading ? <View style={{
                backgroundColor:'black',
                position:'absolute',
                opacity:0.6,
                justifyContent:'center',
                alignItems:'center',
                height:'100%',
                width:'100%'
            }}><LottieView style={{height:200}} autoPlay speed={3} source={require('../../../assets/animations/scanner.json')}/></View> : <></>}
        </>
    )
}