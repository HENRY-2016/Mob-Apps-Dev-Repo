import React, { useState, useEffect } from 'react';
import { Button, Image, Text, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { APIImageUpload } from './DataFileApis';
import axios from "axios";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [imageType, setImageType] = useState(null);


  
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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Text>Image</Text>
      <View style={{height:20}} ></View>
        <Button title="Post Image" onPress={postImage} />
    </View>
  );
}
