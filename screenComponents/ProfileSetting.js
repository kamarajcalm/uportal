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

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily

class ProfileSetting extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      emailid:''
      }
    }

  componentDidMount(){
  }

  receivedValue = (emailid) => {
     this.setState({emailid})
  }

  receivedLanguage=(language)=>{
    this.setState({language})
  }

  render() {

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'SETTINGS'}
            screen={'ProfileSetting'}/>
            <View style={{flex:1,paddingVertical:20}}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../assets/Unknown_Boy.jpg')} style={{height:width*0.2,width:width*0.2,borderRadius:50}}/>
                <TouchableOpacity style={{marginVertical:10,paddingVertical:8}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                                fontWeight:'700'}]}>Change profile picture</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                      style={{flexDirection:'row',justifyContent:'space-between',
                              width:width*0.9,alignItems:'center',paddingVertical:20}}
                      onPress={()=>{this.props.navigation.navigate('LinkEmail',{receivedValue: this.receivedValue })}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,
                                  fontWeight:'700'}]}>Link Email ID</Text>
                    <View style={{flexDirection:'row',width:width*0.3,justifyContent:'space-between'}}>
                      <Text style={[styles.text,{color:'#979797',fontSize:14,
                                  fontWeight:'400'}]}>{this.state.emailid}</Text>
                      <FontAwesome name='angle-right' size={18} color='#fff'/>
                    </View>
                  </TouchableOpacity>
                  <View style={{borderWidth:0.5,borderColor:'#fff',width:width}}></View>
                  <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',width:width*0.9,alignItems:'center',paddingVertical:20}}
                  onPress={()=>{this.props.navigation.navigate('Language',{receivedLanguage: this.receivedLanguage })}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,
                            fontWeight:'700'}]}>Language</Text>
                    <View style={{flexDirection:'row',width:width*0.3,justifyContent:'flex-end'}}>
                      <Text style={[styles.text,{color:'#979797',fontSize:14,paddingHorizontal:10,
                            fontWeight:'400'}]}>{this.state.language}</Text>
                      <FontAwesome name='angle-right' size={18} color='#fff'/>
                    </View>
                  </TouchableOpacity>
                  <View style={{borderWidth:0.5,borderColor:'#fff',width:width}}></View>
                  <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',width:width*0.9,alignItems:'center',paddingVertical:20}}
                  onPress={()=>{this.props.navigation.navigate('ChangePassword')}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,
                            fontWeight:'700'}]}>Change password</Text>
                    <FontAwesome name='angle-right' size={18} color='#fff'
                                  style={{alignSelf:'flex-end'}}/>
                  </TouchableOpacity>
                  <View style={{borderWidth:0.5,borderColor:'#fff',width:width}}></View>
              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSetting);
