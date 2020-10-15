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
  ToastAndroid,RefreshControl,
  TouchableWithoutFeedback,TouchableNativeFeedback} from 'react-native';
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

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily= settings.fontFamily

const formlist=[{name:'Hackathon 2020',
                  desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam libero eget aliquam dictum neque ullam corper bibendum bibendum at. Rutrum hendrerit crasquam sed malesuada consequat hendrerit.'},
                  {name:'Interschool Competitions',
                  desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam libero eget aliquam dictum neque ullam corper bibendum bibendum at. Rutrum hendrerit crasquam sed malesuada consequat hendrerit.'},]

class ProfileForms extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      formlist:formlist,
    }
  }


  componentDidMount(){
  }

  switchTab=()=>{
    return(
      <SwitchSelector
         initial={0}
         onPress={value => this.setState({ gender: value })}
         textColor={'#fff'} //'#7a44cf'
         textStyle={[styles.text,{fontWeight:'700',fontSize:14}]}
         selectedTextStyle={[styles.text,{fontWeight:'700',fontSize:14}]}
         selectedColor={'#000'}
         backgroundColor={'#333333'}
         buttonColor={'#fff'}
         borderColor={'#000'}
         borderRadius={10}
         borderWidth={0}
         paddingVertical={10}
         hasPadding
         valuePadding={4}
         height={width*0.15}
         style={{width:width*0.9,marginVertical:20,alignSelf:'center'}}
         textContainerStyle={{borderRadius:10,}}
         selectedTextContainerStyle={{borderRadius:10,}}
         options={[
           { label: "INTRA", value: "f", },
           { label: "INTER", value: "m",  },
           { label: "COMPLETED", value: "m",  }
         ]}
      />
    )
  }

  formList=()=>{
    return(
      <View style={{justifyContent:'center'}}>
        <FlatList style={{}} data={this.state.formlist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity   style={{borderRadius:10,backgroundColor:'#3F3F3F',
                                        width:width*0.9,paddingVertical:10,
                                        paddingHorizontal:10,marginVertical:10}}
              onPress={()=>{this.props.navigation.navigate('ProfileFillForm',{item:item})}}>
              <Text style={[styles.text,{fontSize:16,color:'#fff',paddingVertical:6,
                        fontWeight:'700'}]} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.text,{fontSize:14,color:'#fff',paddingVertical:6,
                        fontWeight:'400'}]} numberOfLines={4}>{item.desc}</Text>
              <TouchableOpacity>
                <Text style={[styles.text,{fontSize:12,color:'#fff',
                        textDecorationLine: "underline",
                        paddingVertical:6,fontWeight:'700'}]}>APPLY NOW</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }



  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        <Headers navigation={this.props.navigation} name={'FORMS'} screen={'ProfileForms'}/>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ScrollView >
            {this.switchTab()}
            {this.formList()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForms);
