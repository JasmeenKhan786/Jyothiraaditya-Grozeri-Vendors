import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Modal,
  TextInput,
  Picker,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
//Information:-
//Category - Dropdown
// Name
// Price (1 quantity) Rupees
// Image
//Description

//Collection : CompanyProducts

export default class UploadProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      image: "",
      uploading: "none",
      category: "",
      price: "",
      description: "",
      name: "",
      quantity: "",
      products: [],
    };
  }

  getProducts = async () => {
    this.setState({ products: [] });
    var resp = await db
      .collection("Products")
      .where("email", "==", firebase.auth().currentUser.email)
      .get();

    resp.docs.map((d) => {
      var temp = this.state.products;
      var data = d.data();
      data.id = d.id;
      temp.push(data);
      this.setState({ products: temp });
    });
  };

  deleteProduct = (id) => {
    db.collection("Products")
      .doc(id)
      .delete()
      .then(() => {
        alert("Document successfully deleted!");
      })
      .catch((error) => {
        alert("Error removing document: ", error);
      });
    this.getProducts();
  };
  componentDidMount() {
    this.getProducts();
  }
  addProducts = () => {
    db.collection("Products").add({
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      price: this.state.price,
      image: this.state.image,
      address: this.state.address,
      quantity: this.state.quantity,
      email: firebase.auth().currentUser.email,
    });
    this.getProducts();
  };

  selectImage = async (path) => {
    this.setState({ uploading: true });
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.email, path);
    }
  };

  uploadImage = async (uri, email, path) => {
    var response = await fetch(uri);
    //binary large objects
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(path + email);

    return ref.put(blob).then((response) => {
      this.fetchImage(email, path);
    });
  };

  fetchImage = (email, path) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child(path + email);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url, uploading: false });
      })
      .catch((error) => {
        this.setState({ image: "#", uploading: "none" });
      });
  };
  render() {
    var icon;
    if (this.state.uploading === "none") {
      icon = <Entypo name="upload" size={28} color="black" />;
    } else if (this.state.uploading) {
      icon = <ActivityIndicator size={"small"} color="black" />;
    } else {
      icon = <Feather name="check-circle" size={28} color="black" />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            width: "100%",
            height: 80,
            paddingTop: 36,
            paddingHorizontal: 20,
            backgroundColor: "#EB8430",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Entypo 
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
            name="arrow-bold-left"
            size={28}
            color="black"
          />
          <Text style={{ color: "black", fontSize: 20 }}>Your Products</Text>
          <View style={{ backgroundColor: "#eb8430" }}></View>
        </View>
        <ScrollView>
          {this.state.products.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text 
                style={{ fontSize: 18, fontWeight: "bold", marginTop: "30%" }}
              >
                No Products Uploaded Yet!
              </Text>
            </View>
          ) : (
            this.state.products.map((a) => {
              return (
                <View
                key={a.id}
                  style={{
                    backgroundColor: "#F8F8F8",
                    marginVertical: 5,
                    padding: 10,
                    borderRadius: 18,
                    width: "90%",
                    alignSelf: "center",
                    borderWidth: 1,
                  }}
                >
                  <Text style={{ fontSize: 17, color: "grey" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "black",
                      }}
                    >
                       Product Name:
                    </Text>
                    { " "+a.name}
                  </Text>
                  <Text style={{ fontSize: 17, color: "grey" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "black",
                      }}
                    >
                      Price:
                    </Text>
                    ₹{" "+a.price}
                  </Text>
                  <Text style={{ fontSize: 17, color: "grey" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "black",
                      }}
                    >
                      Quantity:
                    </Text>
                    {" "+a.quantity}
                  </Text>
                  <Text style={{ fontSize: 17, color: "grey" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "black",
                      }}
                    >
                      Address:
                    </Text>
                    { " "+a.address}
                  </Text>
                  <TouchableOpacity
                    style={{ marginLeft: 270 }}
                    onPress={() => {
                      this.deleteProduct(a.id);
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            }) 
          )}
        </ScrollView>

        <TouchableOpacity
          style={{
            backgroundColor: "#EB8430",
            width: "60%",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 10,
            marginVertical:10 
          }}
          onPress={() => {
            this.setState({ modalVisible: true , image:''});
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            + Add Products
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "100%",

              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: false });
              }}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                Upload Product
              </Text>

              <Picker
                mode="dropdown"
                selectedValue={this.state.category}
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 4,
                  color: "black",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    category: itemValue,
                  })
                }
              >
                <Picker.Item label="Product Category" value="" />
                <Picker.Item label="Vegetables" value="Vegetables" />
                <Picker.Item label="Fruits" value="Fruits" />
                <Picker.Item label="Milk" value="Milk" />
                <Picker.Item label="Dairy" value="Dairy" />
                <Picker.Item label="Spices" value="Spices" />
                <Picker.Item label="Nuts" value="Nuts" />
              </Picker>

              <View>
                <View></View>

                <TextInput
                  style={{
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 6,
                    width: "70%",
                    alignSelf: "center",
                    paddingLeft: 10,
                  }}
                  placeholder="Item Name"
                  onChangeText={(text) => {
                    this.setState({ name: text });
                  }}
                />
                <TextInput
                  style={{
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 6,
                    width: "70%",
                    alignSelf: "center",
                    paddingLeft: 10,
                  }}
                  placeholder="Price in ₹"
                  onChangeText={(text) => {
                    this.setState({ price: text });
                  }}
                />
                <TextInput
                  style={{
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 6,
                    width: "70%",
                    alignSelf: "center",
                    paddingLeft: 10,
                  }}
                  placeholder="Quantity (Use short form)"
                  onChangeText={(text) => {
                    this.setState({ quantity: text });
                  }}
                />
                <TextInput
                  style={{
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 6,
                    width: "70%",
                    alignSelf: "center",
                    paddingLeft: 10,
                  }}
                  placeholder="Address"
                  onChangeText={(text) => {
                    this.setState({ address: text });
                  }}
                />
                <TextInput
                  style={{
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 6,

                    width: "70%",
                    height: 100,
                    alignSelf: "center",
                    paddingLeft: 10,
                    paddingBottom: 60,
                  }}
                  placeholder="Description"
                  onChangeText={(text) => {
                    this.setState({ description: text });
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 10,
                    alignSelf: "center",
                  }}
                >
                  <Text style={{ fontSize: 20, marginLeft: 30 }}>
                    Upload Image
                  </Text>
                  <TouchableOpacity
                    style={{ marginHorizontal: 20 }}
                    onPress={() => {
                      this.selectImage("products/" + Math.random());
                    }}
                  >
                    {icon}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.addProducts();
                    this.setState({ modalVisible: false });
                    alert("Product has been uploaded");
                  }}
                  style={{
                    marginTop: 20,
                    alignSelf: "center",
                    justifyContent:'center',
                    alignItems:'center',
                    width: "40%",
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: "#EB8430",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ fontSize: 20 , color:'white'}}> Upload</Text>
                </TouchableOpacity>

                <View>
                  <Image
                    style={{
                      width: 300,
                      height: 170,
                      alignSelf: "center",
                      marginTop: 20,
                      borderRadius: 20,
                    }}
                    source={require("../assets/upload.png")}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
