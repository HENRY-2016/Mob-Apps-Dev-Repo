

import React, { useState, useEffect } from 'react';
import { Button, StyleSheet,Image, Pressable,Text, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { APIImageUpload } from './DataFileApis';
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function ImagePickerExample() {
const [image, setImage] = useState(null);
const [imageType, setImageType] = useState(null);

const [checked1, setChecked1] = useState(false);
const [checked2, setChecked2] = useState(false);
const {isChecked, setIsChecked} = useState(false);

const pickImage = async () => {
// No permissions request is necessary for launching the image library
let result = await ImagePicker.launchImageLibraryAsync({
	mediaTypes: ImagePicker.MediaTypeOptions.All,
	allowsEditing: true,
	aspect: [4, 3],
	quality: 1,
});

console.log(result);

if (!result.cancelled) {
	let img = result.uri;
	let imgType = result.type;
	setImage(img);
	setImageType(imgType);

}
};

const postImage = async () =>
{
// const formData = new FormData();
// formData.append("image", {
//   uri,
//   name: `image`,
//   type,
// });
let ImageUri = image.replace('file://', '');
console.log( image);
console.log("=====>>>" + ImageUri);
let ImageName = ImageUri.split('/').pop();
console.log("<<=====>>>"+ imageType + "::"+ ImageName);

const formData = new FormData();
// formData.append("image","FileName" //{// uri,name: ImageUri,// type,});
// formData.append("image",{uri:ImageUri, type:imageType});
// formData.append("image",ImageUri);
formData.append("image",ImageName);
// formData.append("file",ImageName);
// myHeaders = formData.getHeaders();
try {
	const { data } = await axios.post(APIImageUpload, formData, 
		{
		headers: { "content-type": "multipart/form-data"}}
		// headers:{"Content-Type": "image/jpeg"}}

		);
	// if (!data.isSuccess) {
	//   alert("Image upload failed!");
	//   return;
	// }
	console.log(data)
		
	alert("Image Uploaded");
	} 
catch (err) {
	console.log(err);
	alert("Something went wrong");
} 
}

const postImage2 = async () =>
{

let ImageUri = image.replace('file://', '');
console.log("=====>>>" + ImageUri + imageType);

const formData = new FormData();
formData.append("image",{uri:ImageUri,name:'ImageUri', type:imageType});

let res = await fetch(APIImageUpload,
	{
	method: 'post',
	body: formData,
	headers: {
		'Content-Type': 'multipart/form-data;','Accept': '*/*',
	},
	}
);
let responseJson = await res.json();
console.log(responseJson)

}

function tickSelectedOption  ( num,text)
{
	console.log(text+num)
	if (num === "1")
	{
		setChecked1(!checked1)
		console.log(text)
	}
	else if (num === "2")
	{
		setChecked2(!checked2)
		console.log(text)
	}
}
return (
<View style={styles.container} >
	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	<Button title="Pick an image from camera roll" onPress={pickImage} />
	{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
	<Text>Image</Text>
	<View style={{height:20}} ></View>
		<Button title="Post Image" onPress={postImage} />
	</View>

	<View style={styles.section}>
	<Checkbox style={styles.checkbox} value={isChecked} onValueChange={setIsChecked} />
	
	<Text style={styles.paragraph}>Normal checkbox</Text>
	</View>
	<View style={styles.section}>
	<Checkbox style={styles.checkbox}  />
	
	<Text style={styles.paragraph}>Normal checkbox</Text>
	</View>
	<View style={styles.checkboxContainer}>
		<Pressable
			style={[styles.checkboxBase, checked1 && styles.checkboxChecked]}
			onPress={() => tickSelectedOption("1","N/A")}>
			{checked1 && <Ionicons name="checkmark" size={24} color="white" />}
		</Pressable>
		<Text style={styles.paragraph2}>Normal checkbox</Text>
	</View>

	<View style={styles.checkboxContainer}>
		<Pressable
			style={[styles.checkboxBase, checked2 && styles.checkboxChecked]}
			onPress={() => tickSelectedOption("2","N/A22")}>
			{checked2 && <Ionicons name="checkmark" size={24} color="white" />}
		</Pressable>
		<Text style={styles.paragraph2}>Normal checkbox</Text>
	</View>

</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
marginHorizontal: 16,
marginVertical: 32,
},
// section: {
// flexDirection: 'row',
// alignItems: 'center',
// },
// paragraph: {
// fontSize: 15,
// },
// checkbox: {
// margin: 8,
// },






paragraph2: {
	fontSize: 15,
	marginLeft:10,
	},


checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
},
checkboxChecked: {backgroundColor: 'coral',},

appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    marginVertical: 16,
    // fontWeight: 'bold',
    fontSize: 24,
  },
  checkboxContainer: {
	margin:8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    // fontWeight: 500,
    fontSize: 18,
  },

});