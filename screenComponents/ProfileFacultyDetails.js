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
const fontFamily = settings.fontFamily
const depatlist=[{depat:'Aeronautical Engineering'},
                  {depat:'Electronics & Communication'},
                  {depat:'Computer science & Engineering'},
                  {depat:'Aeronautical Engineering'},
                  {depat:'Electronics & Communication'},
                  {depat:'Computer science & Engineering'},
                  {depat:'Think and Grow Rich'},
                  {depat:'Aeronautical Engineering'},
                  {depat:'Electronics & Communication'},
                  {depat:'Computer science & Engineering'},
                  {depat:'Others'},]

class ProfileFacultyDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      depatlist:depatlist,
      a1:false
      }
    }

 componentDidMount(){
 }

  touch=(item,index)=>{
    this.props.navigation.navigate('PFacultyDetailsCarousel')
  }

  depatList=()=>{
    return(
      <View style={{justifyContent:'center',marginVertical:20}}>
        <FlatList style={{}} data={this.state.depatlist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <View style={{marginVertical:0}}>
              <TouchableOpacity
                style={{flexDirection:'row',justifyContent:'space-between',
                          backgroundColor:'#000',width:width,paddingHorizontal:20,
                          paddingVertical:15,alignItems:'center'}}
                onPress={()=>{this.touch(item,index)}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                            fontWeight:'700'}]}>{item.depat}</Text>
                <FontAwesome name='angle-right' size={20} color='#fff'/>
              </TouchableOpacity>
            <View style={{borderWidth:0.5,borderColor:'#fff'}}></View>
          </View>
        )}/>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'FACULTY DETAILS'} screen={'ProfileFacultyDetails'}/>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <ScrollView style={{paddingVertical:10}}>
                  {this.depatList()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFacultyDetails);
