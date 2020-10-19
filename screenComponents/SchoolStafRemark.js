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
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily =settings.fontFamily

const remarksData = [{img:require('../assets/Unknown_Boy.jpg'),name:'Abhishek',
                      cls:'CLASS I',time:'10:30 AM, 12Aug 2020',text:'Lorem ipsum dolor sit amet,  consectetur adipiscing elit'},
                     {img:require('../assets/Unknown_Boy.jpg'),name:'Arthy',
                      cls:'CLASS II',time:'10:30 AM, 12Aug 2020',text:'Lorem ipsum dolor sit amet,  consectetur adipiscing elit'},
                     {img:require('../assets/Unknown_Boy.jpg'),name:'Abi',
                      cls:'CLASS III',time:'10:30 AM, 12Aug 2020',text:'Lorem ipsum dolor sit amet,  consectetur adipiscing elit'},]

class SchoolStafRemark extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      remarksData:remarksData,
    }
  }

  componentDidMount=async()=>{}



  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'REMARKS'}
            screen={'SchoolStafRemark'}/>
            <View style={{padding:10}}>
            <FlatList
              contenContainerStyle={{justifyContent:'space-between',}}
              data={this.state.remarksData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index})=>(
                <View >
                  <View style={{flexDirection:'row',justifyContent:'space-between',
                            paddingHorizontal:20,paddingVertical:10}}>
                    <View style={{flexDirection:'row',}}>
                      <Image source={(item.img)} style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
                      <View style={{paddingHorizontal:10}}>
                        <Text style={[styles.text,{color:'#fff',fontSize:16,
                                fontWeight:'700'}]}>{item.name}</Text>
                        <Text style={[styles.text,{color:'#8B8B8B',fontSize:14,
                                fontWeight:'700'}]}>{item.cls}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={[styles.text,{color:'#8B8B8B',fontSize:10,
                              fontWeight:'700'}]}>{item.time}</Text>
                    </View>
                  </View>
                  <View style={{paddingHorizontal:20}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                            fontWeight:'700'}]}>{item.text}</Text>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                            fontWeight:'700'}]}>{item.text}</Text>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,
                            fontWeight:'700'}]}>{item.text}</Text>
                  </View>
                  <View style={{marginHorizontal:10,borderColor:'#8B8B8B',
                                borderWidth:0.5,marginVertical:10}}/>
                </View>
              )}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(SchoolStafRemark);
