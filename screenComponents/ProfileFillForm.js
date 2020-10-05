import React from 'react';
import {
  Image,Platform,Switch,
  ScrollView,StyleSheet,
  Text,Button,TextInput,NativeModules,
  TouchableOpacity,View,Animated,
  Slider,ImageBackground,LayoutAnimation,
  Dimensions, Alert,StatusBar,
  FlatList, AppState, BackHandler ,
  AsyncStorage,ActivityIndicator,
  ToastAndroid,RefreshControl,TouchableWithoutFeedback,TouchableNativeFeedback} from 'react-native';
import {Fontisto,FontAwesome,Entypo,
  SimpleLineIcons,MaterialCommunityIcons,
  Feather,Octicons,MaterialIcons,
  FontAwesome5,AntDesign} from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';
import HttpsClient from '../helpers/HttpsClient';

import SwitchSelector from "react-native-switch-selector";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url

const radio_props = [
  {label: '0-17', value: 0 },
  {label: '18-35', value: 1 },
  {label: '36-70', value: 2 },
  {label: '70 & above', value: 3 }
];
const radio_props2 =[
  {label: 'Male', value: 0 },
  {label: 'Female', value: 1 },
]
const radio_props3=[
  {label: 'Yes', value: 0 },
  {label: 'No', value: 1 },
  {label: 'Maybe', value: 2 },
]


class ProfileFillForm extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      value:0
      }
    }


 componentDidMount(){

 }

  radio1=()=>{
    return(
      <View style={{paddingVertical:0}}>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          labelColor={'#fff'}
          buttonColor={'#fff'}
          selectedButtonColor={'#fff'}
          style={{color:'#fff',paddingVertical:10}}
          labelStyle={{color:'#fff',textAlign:'center'}}
          buttonSize={12}
          buttonOuterSize={16}
          isSelected={false}
          formHorizontal={false}
          labelHorizontal={true}
          wrapStyle={{paddingVertical:20}}
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
    )
  }
  radio2=()=>{
    return(
      <View style={{paddingVertical:0}}>
        <RadioForm
          radio_props={radio_props2}
          initial={0}
          labelColor={'#fff'}
          buttonColor={'#fff'}
          selectedButtonColor={'#fff'}
          style={{color:'#fff',paddingVertical:10}}
          labelStyle={{color:'#fff',textAlign:'center'}}
          buttonSize={12}
          buttonOuterSize={16}
          isSelected={false}
          formHorizontal={false}
          labelHorizontal={true}
          wrapStyle={{paddingVertical:20}}
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
    )
  }
  radio3=()=>{
    return(
      <View style={{paddingVertical:0}}>
        <RadioForm
          radio_props={radio_props3}
          initial={0}
          labelColor={'#fff'}
          buttonColor={'#fff'}
          selectedButtonColor={'#fff'}
          style={{color:'#fff',paddingVertical:10}}
          labelStyle={{color:'#fff',textAlign:'center'}}
          buttonSize={12}
          buttonOuterSize={16}
          isSelected={false}
          formHorizontal={false}
          labelHorizontal={true}
          formStyle={{paddingVertical:20}}
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
    )
  }


  render() {
    var item=this.props.navigation.getParam('item',null)
    console.log(item,'itemitem')
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={item.name} screen={'ProfileFillForm'}/>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <ScrollView >
                <Text style={{color:'#fff',paddingVertical:20,textAlign:'center'}}>Please fill up the details below</Text>
                <View >
                    <Text style={{color:'#fff',paddingVertical:20}}>Lorem ipsum dolor sit amet,consectetur adipiscing elit.</Text>
                    {this.radio1()}
                </View>
                <View >
                    <Text style={{color:'#fff',paddingVertical:20}}>Nec sagittis.</Text>
                    {this.radio2()}
                </View>
                <View >
                    <Text style={{color:'#fff',paddingVertical:20}}>Porttitor id diam nisi ullamcorper.</Text>

                </View>
                <View >
                    <Text style={{color:'#fff',paddingVertical:20}}>Ultricies eu nisi eget feugiat id velit.</Text>
                    {this.radio3()}
                </View>
                <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#3c3c3c',paddingVertical:15,paddingHorizontal:40,borderRadius:7,marginVertical:20}} onPress={()=>{this.props.navigation.goBack()}}>
                  <Text style={{color:'#fff',fontSize:16}}>SUBMEET</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const mapStateToProps =(state) => {
    return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFillForm);