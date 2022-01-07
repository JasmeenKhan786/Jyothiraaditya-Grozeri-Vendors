import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Entypo } from "@expo/vector-icons";
// onPress={()=>{
//   this.props.navigation.navigate('OrderDetails',{id:a.id})
// }}

// var resp= db.collection('Products').doc(this.props.route.params.id).get();
//resp.data() - state
export default class OrderScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  getProducts = async () => {
    var resp = await db
      .collection("requests")
      .where("sellerEmail", "==", firebase.auth().currentUser.email)
      .get();

    resp.docs.map((d) => {
      var temp = this.state.products;
      var data = d.data();
      data.id = d.id;
      temp.push(data);
      this.setState({ products: temp });
    });
  };

  componentDidMount() {
    this.getProducts();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{}}>
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
            <Text style={{ color: "black", fontSize: 20 }}>Order Requests</Text>
            <View style={{ backgroundColor: "#eb8430" }}></View>
          </View>
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
                No Orders Recieved Yet!
              </Text>
            </View>
          ) : (
            this.state.products.map((a) => {
              return (
                <TouchableOpacity
                key={a.id}
                  onPress={() => {
                    this.props.navigation.navigate("OrderDetails", {
                      id: a.id,
                    });
                  }}
                  style={{
                    backgroundColor: "#F8F8F8",
                    marginVertical: 5,
                    padding: 10,
                    borderRadius: 20,
                    width: "90%",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 10,
                      marginTop: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Product:
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    {a.productName}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    Quantity:
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    {a.customerQuantity}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    Delivery Option:
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    {a.deliveryOption}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    Customer Message
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    {a.customerMessage}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    Customer Address:
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    {a.customerAddress}
                  </Text>

                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    Customer email:
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    {a.customerEmail}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
