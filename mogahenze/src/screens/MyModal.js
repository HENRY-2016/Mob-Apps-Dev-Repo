import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";

const MyModal = () => {
    // const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);

    return (
    <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            
            <PhoneInput
            ref={phoneInput} defaultValue={value}
            defaultCode="DM" layout="first"
            onChangeText={(text) => {setValue(text);}}
            onChangeFormattedText={(text) => {setFormattedValue(text);}}
            withDarkTheme withShadow autoFocus
            />

            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={styles.textStyle}>CANCEL</Text>
                <Text style={styles.textStyle}>CONTINUE</Text>

            </Pressable>
        </View>
        </View>
        </Modal>
        {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
        >
        <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
    </View>
    );
    };
// https://reactnative.dev/docs/modal
// https://www.npmjs.com/package/react-native-phone-input
// https://www.npmjs.com/package/react-native-phone-number-input
    const styles = StyleSheet.create({
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
    },
    modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },
    button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
    },
    buttonOpen: {
    backgroundColor: "#F194FF",
    },
    buttonClose: {
    backgroundColor: "#2196F3",
    },
    textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
    },
    modalText: {
    marginBottom: 15,
    textAlign: "center"
    }
    });

    export default MyModal;