import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView, 
  TextInput,
  Image,
} from 'react-native';
//Array
//Map and ScrollView
//Flatlist
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

//Ternary Operator
// if(condition){

// }
// else{

// }

// condition ? true :false

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [], 
    };
  }
  getProducts = async () => {
    this.setState({products:[]})
    var resp = await db.collection('Products').where('email', '==', firebase.auth().currentUser.email).get();
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
    // if (this.state.products.length) {
    //   return (
    //     <View>
    //       <Text>Best Place to sell your products!</Text>
    //     </View>
    //   );
    // } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View>
            <Text style={{ color: 'black', fontSize: 24, marginLeft: 15, marginTop:30 }}>
              Welcome,
              {firebase.auth().currentUser.displayName
                ? firebase.auth().currentUser.displayName
                : ''}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: '5%',
                marginRight: '5%',
              }}>
              <Text style={{ color: 'grey', marginTop: 10, fontSize: 15 }}>
                What would you sell today?
              </Text>
             
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: '90%',
                backgroundColor: '#ddd',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                borderRadius: 10,
              }}>
              <FontAwesome name="search" size={24} color="black" />
              <TextInput
                style={{
                  height: 40,
                  width: '85%',
                  paddingLeft: 20,
                }}
                placeholder="Search products"
              />
            </View>
          </View>
          <View>
            <Image
              style={{
                width: 300,
                height: 170,
                alignSelf: 'center',
                marginTop: 20,
                borderRadius: 20,
              }}
              source={require('../assets/Banner1.png')} 
            />
          </View>

          <ScrollView>
            <Text style={{ marginTop: 10, marginLeft: 10, fontWeight: 'bold', fontSize:16 }}>
             Your Products:
            </Text>

            <View> 
              {this.state.products.length===0?
              <View>
              <Text style={{alignSelf:'center',fontWeight:"bold",fontSize:20, marginTop:50}}>No Products Uploaded Yet!</Text>
               <Image
              style={{ 
                width: 200,
                height: 200,
                alignSelf: 'center',
                marginTop: 20,
                borderRadius: 20,
              }}
              source={require('../assets/banner4.png')}
            />
              </View>
              :this.state.products.map((a) => {
                return (
                  <View
                  key={a.id}
                    style={{
                      backgroundColor: '#F8F8F8',
                      marginVertical: 5,
                      padding: 10,
                      borderRadius: 10,
                      width: '90%',
                      alignSelf: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{ uri: a.image }}
                      style={{ width: 100, height: 100, borderRadius: 10 }}
                    />
                    <View style={{ marginLeft: 20, width: '70%' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                        {a.name}
                      </Text>
                      <Text style={{ color: 'grey',fontSize:12, width:140 }} numberOfLines={1}>
                        {a.description}
                      </Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                        ₹{a.price}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      );
    // }
  }
}

const styles = StyleSheet.create({});
