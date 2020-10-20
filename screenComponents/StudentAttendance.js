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
  TouchableWithoutFeedback,
  TouchableNativeFeedback} from 'react-native';

import {Fontisto, FontAwesome,Entypo,
  SimpleLineIcons,MaterialCommunityIcons,Feather,
  Octicons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';

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
const fontFamily= settings.fontFamily

const listofsection=[{id:1,icon:'',
                      name:'',percent:'ENGLISH',nameid:''},
                     {id:2,icon:require('../assets/Unknown_Boy.jpg'),
                      name:'AASHIKA',percent:'70%',nameid:'AA001'},
                     {id:3,icon:require('../assets/Unknown_Boy.jpg'),
                      name:'AARAV',percent:'70%',nameid:'AA001'},
                     {id:4,icon:require('../assets/Unknown_Boy.jpg'),
                      name:'ARTHY',percent:'70%',nameid:'AA001'},
                     {id:5,icon:require('../assets/Unknown_Boy.jpg'),
                      name:'AASHIKA',percent:'70%',nameid:'AA001'},
                     {id:6,icon:require('../assets/Unknown_Boy.jpg'),
                      name:'AARAV',percent:'70%',nameid:'AA001'},
                     {id:7,icon:require('../assets/Unknown_Boy.jpg'),
                      name:'ARTHY',percent:'70%',nameid:'AA001'},
                     {id:8,icon:require('../assets/Unknown_Boy.jpg'),
                      name:'AASHIKA',percent:'70%',nameid:'AA001'},
                     {id:9,icon:require('../assets/Unknown_Boy.jpg'),
                      name:'AARAV',percent:'70%',nameid:'AA001'},
                      {id:10,icon:require('../assets/Unknown_Boy.jpg'),
                       name:'AARAV',percent:'70%',nameid:'AA001'},
                      {id:11,icon:require('../assets/Unknown_Boy.jpg'),
                       name:'ARTHY',percent:'70%',nameid:'AA001'},
                      {id:12,icon:require('../assets/Unknown_Boy.jpg'),
                       name:'AASHIKA',percent:'70%',nameid:'AA001'},
                      {id:13,icon:require('../assets/Unknown_Boy.jpg'),
                       name:'AARAV',percent:'70%',nameid:'AA001'},]

class StudentAttendance extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props){
    super(props);
    this.state={
      collegeStud:false,
      schoolStud:false,
      schoolAd:false,
      collegeAd:false,
      schoolStaf:false,
      collegeStaf:false,
      listofsection:listofsection,
      college:false,
      school:false,
      }
  }

  listOfDetails=()=>{
    return(
      <FlatList
          style={{paddingBottom:100}}
          data={this.state.listofsection}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:20,
                        alignItems:'center',justifyContent:'space-between',paddingVertical:10}}
               >
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={(item.icon)} style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
                <View>
                  <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>{item.name}</Text>
                  <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:12,paddingHorizontal:10}]}>{item.nameid}</Text>
                </View>
              </View>
              <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                      fontSize:14,paddingHorizontal:10}]}>{item.percent}</Text>
             </TouchableOpacity>
           )
         }
      />
    )
  }

  list=()=>{
    return(
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <FlatList
          style={{paddingBottom:100}}
          data={this.state.listofsection}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:20,
                        alignItems:'center',justifyContent:'space-between',paddingVertical:10}}
               >
              <View style={{flexDirection:'row',alignItems:'center',width:width*0.4}}>
                <Image source={(item.icon)} style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
                <View>
                  <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>{item.name}</Text>
                  <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:12,paddingHorizontal:10}]}>{item.nameid}</Text>
                </View>
              </View>
              </TouchableOpacity>
            )
          }
       />
       <ScrollView horizontal={true}>
        <FlatList
          style={{paddingBottom:100}}
          data={this.state.listofsection}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:20,
              alignItems:'center',justifyContent:'space-between',paddingVertical:10}} >
              <View style={{height:width*0.12,flexDirection:'row',justifyContent:'space-between',width:width*0.7,marginRight:20}}>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',width:width*0.17,
                        fontSize:item.id==1?10:14,paddingHorizontal:10}]}>{item.percent}</Text>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',width:width*0.17,
                        fontSize:item.id==1?10:14,paddingHorizontal:10}]}>{item.percent}</Text>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',width:width*0.17,
                        fontSize:item.id==1?10:14,paddingHorizontal:10}]}>{item.percent}</Text>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',width:width*0.17,
                        fontSize:item.id==1?10:14,paddingHorizontal:10}]}>{item.percent}</Text>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',width:width*0.17,
                        fontSize:item.id==1?10:14,paddingHorizontal:10}]}>{item.percent}</Text>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',width:width*0.17,
                        fontSize:item.id==1?10:14,paddingHorizontal:10}]}>{item.percent}</Text>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',width:width*0.17,
                        fontSize:item.id==1?10:14,paddingHorizontal:10}]}>{item.percent}</Text>
              </View>

             </TouchableOpacity>
           )
         }
      />
      </ScrollView>
      </View>
    )
  }

  render() {
    var name = this.props.navigation.getParam('item',null)
    var collegeAd = this.props.navigation.getParam('collegeAd',null)
    console.log(name,'name',collegeAd)
    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
        <Headers navigation={this.props.navigation} name={name!=null?name.class1.name +"  "+ name.name:collegeAd!=null?collegeAd.collegeAd.name+' '+collegeAd.name:''}
            screen={'StudentAttendance'}/>
            <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
            <View style={{flexDirection:'row',width:width,justifyContent:'space-between'}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
              paddingHorizontal:20,fontWeight:'700',textAlign:'left'}]}>STUDENTS</Text>
              <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                paddingHorizontal:20,fontWeight:'700',textAlign:'right'}]}>ATTENDANCE %</Text>
            </View>
              <ScrollView>
                {collegeAd!=null?<View>{this.list()}</View>:<View>{this.listOfDetails()}</View>}
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
  text:{
    fontStyle:'normal',
    fontFamily:fontFamily,
    lineHeight:22
  }
});

const mapStateToProps =(state) => {
  return{}
}

const mapDispatchToProps = (dispatch) => {
  return{};
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentAttendance);
