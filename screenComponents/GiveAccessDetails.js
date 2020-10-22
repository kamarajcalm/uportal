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

const listofdetails=[{id:1,icon:require('../assets/Unknown_Boy.jpg'),name:'Abhishek',
                      nameid:'AA001'},
                     {id:2,icon:require('../assets/Unknown_Boy.jpg'),name:'Ajay',
                     nameid:'AA002'},]
class GiveAccessDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      listofdetails:listofdetails
      }
    }

  componentDidMount(){
  }

  list=()=>{
    return(
      <View style={{flex:1,width:width,}}>
      <FlatList
          style={{paddingBottom:100,backgroundColor:'#000'}}
          data={this.state.listofdetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:20,
                        alignItems:'center',justifyContent:'space-between',
                        paddingVertical:10,backgroundColor:'#0A0A0A'}}
               onPress={()=>{this.onListTouch(item)}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={(item.icon)} style={{height:width*0.09,width:width*0.09,borderRadius:30}}/>
                <View>
                    <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>{item.name}</Text>
                    <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>{item.nameid}</Text>
                </View>
              </View>
              <TouchableOpacity style={{borderRadius:10,backgroundColor:'#ff0000',paddingHorizontal:25,paddingVertical:6}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,
                  fontWeight:'700'}]}>DISABLE</Text>
              </TouchableOpacity>
             </TouchableOpacity>
           )
         }
      />
      </View>
    )
  }

  render() {

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'GIVE ACCESS'}
            screen={'GiveAccessScreen'}/>
            <View style={{flex:1,paddingVertical:20}}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',width:width*0.9,alignItems:'center',paddingVertical:20}}
                  onPress={()=>{}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,
                            fontWeight:'700'}]}>UNIQUE ID / NAME</Text>
                    <FontAwesome name='search' size={18} color='#fff'
                                  style={{alignSelf:'flex-end'}}/>
                  </TouchableOpacity>
              </View>
              {this.list()}
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

export default connect(mapStateToProps, mapDispatchToProps)(GiveAccessDetails);
