import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert,Text, View,Image, TouchableOpacity} from 'react-native';
import styles from "./stylesheet";
import {imageurl} from './DataFileApis';

export const numColums = 2;

export const formatNumberWithComma = (numb) => {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
export const formatData = (data,numColums) =>
{
    const numberOfFullRows = Math.floor(data.length / numColums);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColums);
    while (numberOfElementsLastRow !== numColums && numberOfElementsLastRow !==0)
    {
        data.push({key:`blank-${numberOfElementsLastRow}`,empty:true});
        numberOfElementsLastRow = numberOfElementsLastRow +1;
    }
    return data;
}

// export const getNumberOfItems = (number) => 
// {
//     try 
//     {   AsyncStorage.getItem ('NumberOfItems')
//         // .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
//         .then(value =>{if (value != null)
//             { let nu = value; return nu; }
//         })
//     }catch (error) { console.log(error)}
// };

export const addItemsToCart = (index,ProductsArray) => 
{
    console.log("Adding to cart ------")
    const newItems = [...ProductsArray]; // clone the array

    let product = newItems[index];
    let id = index;
    let name = product.Name;
    let status = product.Description;
    let amount = product.Amount;
    // let image = JSON.stringify(product.thumbnailImage);
    let image = product.image;
    let qty = 1;
    let itemcart={ id: id, name: name, status: status, amount: amount, qty:qty,image:image}
    // console.log("====="+JSON.stringify(itemcart))

    AsyncStorage.getItem('cartItems').then((datacart)=>{
            if (datacart !== null) 
            {
                // We have data!!
                const cart = JSON.parse(datacart)
                cart.push(itemcart)
                AsyncStorage.setItem('cartItems',JSON.stringify(cart));
                Alert.alert("Massage","Your Product Has Been \n\n Added To Cart");

            }
            else{
                const cart  = []
                cart.push(itemcart)
                AsyncStorage.setItem('cartItems',JSON.stringify(cart));
                Alert.alert("Massage","Your Product Has Been \n\n Added To Cart");
            }
        })
        .catch((err)=>{alert(err)})

        // NumberOfItems
        AsyncStorage.getItem('NumberOfItems').then((number)=>{
            if (number !== null) 
            {
                // We have data!!
                const value = JSON.parse(number)
                let newnumber = parseInt(value) + 1;
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(newnumber));
            }
            else{
                let newnumber = 1;
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(newnumber));
            }
        })
        .catch((err)=>{alert(err)})
}

