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
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,MaterialCommunityIcons,Feather,Octicons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor

const listofdetails=[{id:1,icon:'',name:'MARKS'},{id:2,icon:'',name:'ATTENDANCE'},
                     {id:3,icon:'',name:'STATICS'},{id:4,icon:'',name:'LIBRARY'},
                     {id:5,icon:'',name:'SYLLABUS & TIMETABLE'},{id:6,icon:'',name:'CALENDAR & REMINDERS'},
                     {id:7,icon:'',name:'FACULTY DETAILS'},{id:8,icon:'',name:'MEDIA'},
                     {id:9,icon:'',name:'QUESTION PAPERS'},{id:10,icon:'',name:'FORMS'},
                     {id:11,icon:'',name:'FEEDBACK & REMARKS'},{id:12,icon:'',name:'SETTINGS'},]

class PageFourth extends React.Component {

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

  profileHead=()=>{
    return(
      <View style={{justifyContent:'center',backgroundColor:'#3c3c3c'}}>
        <Text style={{color:'#fff',textAlign:'center',paddingVertical:10}}>K L N COLLEGE OF ENGINEERING</Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:15,paddingVertical:10}}>
          <Image source={require('../assets/Unknown_Boy.jpg')} style={{height:width*0.2,width:width*0.2,borderRadius:50}}/>
          <View>
            <Text style={{fontSize:12,color:'#fff'}}>Unique ID : AAA1111</Text>
            <Text style={{fontSize:12,color:'#fff'}}>Name : Abishek Raj</Text>
            <Text style={{fontSize:12,color:'#fff'}}>Student ID : AAA00001</Text>
            <Text style={{fontSize:12,color:'#fff'}}>Class : III Sec:A</Text>
          </View>
          <View style={{height:width*0.18,borderWidth:0.5,borderColor:'#8c8c8c'}}></View>
          <View>
            <Text style={{color:'#fff',fontSize:12}}>REQUIRE ADMISSION</Text>
            <TouchableOpacity style={{borderRadius:7,backgroundColor:'#000',borderWidth:1,paddingVertical:6,marginTop:2}}>
              <Text style={{color:'#fff',textAlign:'center'}}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  listOfDetails=()=>{
    return(
      <FlatList
           style={{paddingBottom:100}}
           data={this.state.listofdetails}
           keyExtractor={(item, index) => index.toString()}
           renderItem={({item, index})=>(
             <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:20,alignItems:'center',justifyContent:'space-between',paddingVertical:10}} onPress={()=>{this.onListTouch(item)}}>
             <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={(item.icon)} style={{height:width*0.07,width:width*0.07}}/>
                <Text style={{color:'#fff'}}>{item.name}</Text>
              </View>
              <FontAwesome name='angle-right' size={18} color='#fff'/>
             </TouchableOpacity>
           )
         }
      />
    )
  }

  onListTouch=(item)=>{
    console.log(item,'item')
    if(item.name=='FORMS'){
      this.props.navigation.navigate('ProfileForms')
    }
    else if (item.name=='LIBRARY') {
      this.props.navigation.navigate('ProfileLibrary')
    }
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
            {this.profileHead()}
            <ScrollView>
            {this.listOfDetails()}
            </ScrollView>
          </View>
          <TabComponent navigation={this.props.navigation}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(PageFourth);
// <Headers navigation={this.props.navigation} name={'PageFirst'} screen={'PageFourth'}/>
