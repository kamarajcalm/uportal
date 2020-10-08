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
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily =settings.fontFamily
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

const dropdown=[{label: 'Item', value: 'Item'},{label: 'Item', value: 'Item'},
              {label: 'Item', value: 'Item'},{label: 'Item', value: 'Item'},
              ]

class ProfileFillForm extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      value:0,
      drop:'',
      dropdown : dropdown
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
          labelStyle={[styles.text,{color:'#fff',textAlign:'center',fontWeight:'400',fontSize:12}]}
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
          labelStyle={[styles.text,{color:'#fff',textAlign:'center',fontWeight:'400',fontSize:12}]}
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
          labelStyle={[styles.text,{color:'#fff',textAlign:'center',fontWeight:'400',fontSize:12}]}
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

  dropdown=()=>{
    return(
      <View>
      <DropDownPicker
            items={this.state.dropdown}
            defaultNull={ null}
            dropDownStyle={{backgroundColor:'#333333',borderWidth:0}}
            defaultValue={this.state.drop}
            placeholder="Select"
            arrowColor={'#fff'}
            dropDownMaxHeight={width}
            style={{backgroundColor:'#333333',borderWidth:1,borderColor:'#333333'}}
            placeholderStyle={{fontWeight: 'bold',color:'#fff'}}
            labelStyle={{fontSize: 14, color: '#fff'}}
            containerStyle={{height: 40,width:width*0.4}}
            onChangeItem={item => this.setState({
                drop: item.value
            })}
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
                <Text style={[styles.text,{color:'#fff',paddingVertical:20,textAlign:'center',fontWeight:'400',fontSize:14}]}>Please fill up the details below</Text>
                <View >
                    <Text style={[styles.text,{color:'#fff',paddingVertical:20,fontWeight:'400',fontSize:14}]}>Lorem ipsum dolor sit amet,consectetur adipiscing elit.</Text>
                    {this.radio1()}
                </View>
                <View >
                    <Text style={[styles.text,{color:'#fff',paddingVertical:20,fontWeight:'400',fontSize:14}]}>Nec sagittis.</Text>
                    {this.radio2()}
                </View>
                <View >
                    <Text style={{color:'#fff',paddingVertical:20}}>Porttitor id diam nisi ullamcorper.</Text>
                    {this.dropdown()}
                </View>
                <View >
                    <Text style={[styles.text,{color:'#fff',paddingVertical:20,fontWeight:'400',fontSize:14}]}>Ultricies eu nisi eget feugiat id velit.</Text>
                    {this.radio3()}
                </View>
                <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#4F4F4F',paddingVertical:15,paddingHorizontal:40,borderRadius:7,marginVertical:20}} onPress={()=>{this.props.navigation.goBack()}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700'}]}>SUBMEET</Text>
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
  text:{
    fontStyle:'normal',
    fontFamily:fontFamily,
    lineHeight:22
  }
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
