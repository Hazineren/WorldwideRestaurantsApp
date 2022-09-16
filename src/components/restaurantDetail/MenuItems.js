import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import BouncyCheckBox from 'react-native-bouncy-checkbox'
import { useDispatch, useSelector } from 'react-redux'

const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    titleStyle: {
        fontSize: 19,
        fontWeight: '600',
        color: 'black'
    }
})

export default function MenuItems({ restaurantName, foods, hideCheckbox, marginLeft }) {

    const dispatch = useDispatch();
    const selectItem = (item, checkboxValue) =>
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...item, restaurantName: restaurantName, checkboxValue: checkboxValue }
        })

    const cartItems = useSelector(state => state.cartReducer.selectedItems.items)

    const isFoodInCard = (food, cartItems) =>
        Boolean(cartItems.find((item) => item.title == food.title));


    return (
        <ScrollView >
            {foods.map((food, index) => (
                <View key={index}>
                    <View style={styles.menuItemStyle}>
                        {hideCheckbox ? (<></>) : (
                            <BouncyCheckBox
                                iconStyle={{ borderColor: 'lightgray', borderRadius: 0 }}
                                fillColor='green'
                                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                                isChecked={isFoodInCard(food, cartItems)} />
                        )}
                        <FoodInfo food={food} />
                        <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0}/>
                    </View>
                    <Divider width={0.5} orientation='vertical' style={{ marginHorizontal: 20 }} />
                </View>
            ))}
        </ScrollView>
    )
}

const FoodInfo = (props) => (
    <View style={{ width: 220, justifyContent: 'space-evenly' }}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text style={{ color: 'black' }}>{props.food.description}</Text>
        <Text style={{ color: 'black' }}>{props.food.price}</Text>
    </View>
)

const FoodImage = ({marginLeft,...props}) => (
    <View>
        <Image source={{ uri: props.food.image }} style={{ height: 100, width: 100, borderRadius: 8, marginLeft:marginLeft }}></Image>
    </View>
)