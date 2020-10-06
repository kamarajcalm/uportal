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

import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily
const entries=[{subject:'LANGUAGE',img:require('../assets/Unknown_Boy.jpg'),
                name:'Stelaa Joseph',quali:'BE',
                desig:'Lecture',emailid:'stella@gmail.com',
                classeshandling:'Class I, Class III'},
               {subject:'MATHEMATICS',img:require('../assets/Unknown_Boy.jpg'),
                name:'Michael Vaughan',quali:'BSC',
                desig:'Professor',emailid:'michael@gmail.com',
                classeshandling:'Class I, Class III'},
               {subject:'ENGLISH',img:require('../assets/Unknown_Boy.jpg'),
                name:'Rose marie',quali:'B COM',
                desig:'Professor',emailid:'rose@gmail.com',
                classeshandling:'Class I, Class III'},]

class PFacultyDetailsCarousel extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      activeSlide:0,
      entries : entries
      }
    }

 componentDidMount(){
 }

 _renderItem ({item, index}) {
     return(
     <View style={{width:width*0.65,borderWidth:0,borderColor:'#fff',
                          backgroundColor:'#3F3F3F',justifyContent:'center',marginHorizontal:10,
                          borderRadius:10,alignItems:'center',alignSelf:'center'}}>
          <View style={{width:width*0.65,borderWidth:0,
                            backgroundColor:'rgba(104, 104, 104, 0.6)',justifyContent:'center',paddingVertical:15,
                            marginHorizontal:0,borderRadius:10,alignItems:'center',shadowRadius: 7,shadowColor:'blur(5.46863px)',shadowOpacity: 0.1,elevation:5,}}
                      >
              <View style={{width:width*0.65,justifyContent:'center',alignItems:'center'}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,paddingVertical:10,paddingLeft:0,fontWeight:'700'}]}>{item.subject}</Text>
                    <AntDesign name='infocirlceo' size={18} color='#fff'style={{position:'absolute',top:10,right:20}}/>
                    <Image source={(item.img)} style={{height:width*0.35,width:width*0.25}}/>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,
                                paddingVertical:10,paddingLeft:0,fontWeight:'700'}]}>{item.name}</Text>
              </View>
          </View>
          <View style={{paddingVertical:10}}>
              <View style={styles.view1}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:4,flex:0.6,fontWeight:'700'}]}>Qualification</Text>
                  <Text style={[styles.text,{color:'#fff',fontSize:12,paddingVertical:4,flex:0.4,fontWeight:'400'}]}>{item.quali}</Text>
              </View>
              <View style={styles.view1}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:4,flex:0.6,fontWeight:'700'}]}>Designation</Text>
                  <Text style={[styles.text,{color:'#fff',fontSize:12,paddingVertical:4,flex:0.4,fontWeight:'400'}]}>{item.quali}</Text>
              </View>
              <View style={styles.view1}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:4,flex:0.6,fontWeight:'700'}]}>Email ID</Text>
                  <Text style={[styles.text,{color:'#fff',fontSize:12,paddingVertical:4,flex:0.4,fontWeight:'400'}]}
                    numberOfLines={1}>{item.emailid}</Text>
              </View>
              <View style={styles.view1}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:4,flex:0.6,fontWeight:'700'}]}>Class handling</Text>
                  <Text style={[styles.text,{color:'#fff',fontSize:12,paddingVertical:4,flex:0.4,fontWeight:'400'}]}>{item.classeshandling}</Text>
              </View>

              <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#000',borderRadius:7,marginVertical:10}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:6,paddingHorizontal:20,fontWeight:'600'}]}>CONTACT</Text>
              </TouchableOpacity>
          </View>
       </View>
      )
 }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000000'}}>
            <Headers navigation={this.props.navigation} name={'FACULTY DETAILS'} screen={'PFacultyDetailsCarousel'}/>
            <View style={{flex:1,alignItems:'center',}}>
            <View style={{margin:width*0.2,}}>
            <Carousel
                style="slides"
                itemsPerInterval={1}
                data={this.state.entries}
                renderItem={this._renderItem}
                onSnapToItem={(index) => {this.setState({ activeSlide: index })}}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
              />
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
  view1:{
    flexDirection:'row',
    width:width*0.6,
    paddingHorizontal:10,
    alignItems:'center',
    justifyContent:'space-between'
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
const sliderWidth=width;
const itemWidth=width*0.65;

export default connect(mapStateToProps, mapDispatchToProps)(PFacultyDetailsCarousel);
