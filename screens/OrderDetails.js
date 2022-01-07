import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import db from "../config";
import { Entypo } from "@expo/vector-icons";
// onPress={()=>{
//   this.props.navigation.navigate('OrderDetails',{id:a.id})
// }}

// var resp= db.collection('Products').doc(this.props.route.params.id).get();
//resp.data() - state
export default class OrderDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      response: "",
    };
  }

  updateRequest = () => {
    db.collection("requests")
      .doc(this.props.route.params.id)
      .update({ status: this.state.response });
      alert('Request Updated!')
      this.props.navigation.goBack()
  };

  getProducts = async () => {
    var resp = await db
      .collection("requests")
      .doc(this.props.route.params.id)
      .get();


    this.setState({ products: resp.data() });
  };

  componentDidMount() {
    this.getProducts();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
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
                this.props.navigation.goBack();
              }}
              name="arrow-bold-left"
              size={28}
              color="black"
            />
            <Text style={{ color: "black", fontSize: 20 }}>Update Order</Text>
            <View style={{ backgroundColor: "#eb8430" }}></View>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            Options:
          </Text>
          <Text style={{ marginLeft: 30, marginTop: 10 }}>- Received</Text>
          <Text style={{ marginLeft: 30, marginTop: 10 }}>- Accepted</Text>
          <Text style={{ marginLeft: 30, marginTop: 10 }}>- Delivering</Text>
          <Text style={{ marginLeft: 30, marginTop: 10 }}>- Delivered</Text>

          <View
            style={{
              borderWidth: 1,
              width: "80%",
              marginLeft: 35,
              marginTop: 30,
            }}
          >
            <TextInput
              onChangeText={(val) => {
                this.setState({ response: val });
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#EB8430",
              width: "60%",
              height: 30,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              borderRadius: 10,
            }}
            onPress={() => {
              if(this.state.response){
              this.updateRequest();
              }
              else{
                alert('Please fill the response!')
              }
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "white",
              }}
            >
              Update Request
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
