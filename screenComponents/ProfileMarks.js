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
  ToastAndroid,RefreshControl,TouchableWithoutFeedback,
  TouchableNativeFeedback} from 'react-native';

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

const semdata=[{no:'#',sub:'SUBJECT',test1:'TEST I',test2:'TEST II',test3:'TEST III',exa:'EXA'},
              {no:'1',sub:'LANGUAGE',test1:'90',test2:'80',test3:'70',exa:'9'},
              {no:'2',sub:'ENGLISH',test1:'80',test2:'70',test3:'90',exa:'8'},
              {no:'3',sub:'MATHEMATICS',test1:'70',test2:'80',test3:'80',exa:'7'},
              {no:'4',sub:'PHYSICS',test1:'80',test2:'70',test3:'70',exa:'6'},
              {no:'5',sub:'EG',test1:'380',test2:'380',test3:'380',exa:'3'},
              {no:'',sub:'TOTAL',test1:'90%',test2:'90%',test3:'90%',exa:'9'},
              {no:'',sub:'PERCENTAGE',test1:'90',test2:'80',test3:'70',exa:'7'},]

const classdata =[{no:'#',sub:'SUBJECT',test1:'TEST I',test2:'TEST II',test3:'TEST III',exa:'EXA'},
              {no:'1',sub:'LANGUAGE',test1:'90',test2:'80',test3:'70',exa:'9'},
              {no:'2',sub:'ENGLISH',test1:'80',test2:'70',test3:'90',exa:'8'},
              {no:'3',sub:'MATHEMATICS',test1:'70',test2:'80',test3:'80',exa:'7'},
              {no:'',sub:'TOTAL',test1:'90%',test2:'90%',test3:'90%',exa:'9'},
              {no:'',sub:'PERCENTAGE',test1:'90',test2:'80',test3:'70',exa:'7'},]

class ProfileMarks extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      emailid:'',
      a1:false,
      a2:false,
      semdata:semdata,
      classdata:classdata
      }
    }

  componentDidMount=async()=>{}



 sem=()=>{
    return(
      <View >
        <View style={{borderRadius:10,marginHorizontal:15,marginVertical:10,backgroundColor:'#3F3F3F'}}>
          <TouchableOpacity
            style={{height:width*0.35,alignItems:'center',justifyContent:'center',
                    shadowOpacity: 0.18,elevation:5,backgroundColor:'#3F3F3F',
                    shadowColor:'#000',borderRadius:10,shadowOffset: {height: 2,width:0}}}
            onPress={()=>{this.setState({a1:!this.state.a1,a2:false})}}>
            <Image source={require('../assets/Unknown_Boy.jpg')}    style={{height:'100%',width:'100%',borderRadius:10,zIndex:0,opacity:0.5}}/>
            <View style={{alignSelf:'center',position:'absolute',
                          alignItems:'center',justifyContent:'center',zIndex:1}}>
              <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700'}]}>SEMESTER I</Text>
              <FontAwesome name='angle-down' size={20} color='#fff'/>
            </View>
          </TouchableOpacity>
          {this.state.a1&&
            <ScrollView style={{backgroundColor:'#3F3F3F',borderRadius:10,paddingVertical:10}}>
              {this.sem1()}
            </ScrollView>
          }
        </View>
      </View>
    )
  }

 classResult=()=>{
    return(
    <View style={{marginTop:10,borderRadius:10}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <FlatList style={{}}
          data={this.state.classdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <View>
            {item.no==''&&<View style={{borderWidth:0.2,borderColor:'#fff',
            paddingVertical:-6,width:width*0.7,marginHorizontal:10}}/>}
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',
                          alignItems:'center',paddingHorizontal:6,width:width*0.7}}>
              <View style={{width:width*0.1}}>
                <Text style={[styles.text,
                              {color:'#fff',fontSize:12,textAlign:'center',
                              fontWeight:item.no=='#'?'700':'400'}]}>{item.no}</Text>
              </View>
              <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
              <View style={{width:width*0.45}}>
                <Text style={[styles.text,
                            {color:'#fff',fontSize:12,textAlign:'left',
                            fontWeight:item.no=='#'?'700':'400'}]}>{item.sub}</Text>
              </View>
              <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
              </View>
            </View>
          )}
        />
      <ScrollView horizontal={true}>
       <FlatList style={{}}
          data={this.state.classdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <View>
          {item.no==''&&<View style={{borderWidth:0.2,borderColor:'#fff',
          paddingVertical:-6,width:width*0.8,marginHorizontal:10}}/>}
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',
                      alignItems:'center',paddingHorizontal:6,width:width*0.8}}>

              <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
              <View style={{width:width*0.15}}>
                <Text style={[styles.text,
                            {color:'#fff',fontSize:12,textAlign:'center',
                            fontWeight:item.no=='#'?'700':'400'}]}>{item.test1}</Text>
              </View>
              <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
              <View style={{width:width*0.15}}>
                <Text style={[styles.text,
                            {color:'#fff',fontSize:12,textAlign:'center',
                            fontWeight:item.no=='#'?'700':'400'}]}>{item.test2}</Text>
              </View>
              <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
              <View style={{width:width*0.15}}>
                <Text style={[styles.text,
                            {color:'#fff',fontSize:12,textAlign:'center',
                            fontWeight:item.no=='#'?'700':'400'}]}>{item.test3}</Text>
              </View>
              <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
              <View style={{width:width*0.15}}>
                <Text style={[styles.text,
                              {color:'#fff',fontSize:12,textAlign:'center',
                              fontWeight:item.no=='#'?'700':'400'}]}>{item.exa}</Text>
              </View>
            </View>
            </View>
          )}
        />
       </ScrollView>
      </View>

        <View>
          <View style={{borderWidth:0.2,borderColor:'#fff',width:'100%',marginHorizontal:10}}/>
        </View>
        <View style={{marginVertical:10,marginHorizontal:10,flexDirection:'row',
                      justifyContent:'space-between'}}>
          <View style={{flexDirection:'row'}}>
            <Text style={[styles.text,
                      {color:'#fff',fontSize:14,textAlign:'center',
                      fontWeight:'700',paddingVertical:2,paddingHorizontal:2}]}>TOTAL MARKS</Text>
            <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:6}}>
              <Text style={[styles.text,
                            {color:'#fff',fontSize:14,textAlign:'center',fontWeight:'700',
                            paddingVertical:2,paddingHorizontal:2}]}>7.7</Text>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={[styles.text,
                          {color:'#fff',fontSize:14,textAlign:'center',fontWeight:'700',
                          paddingVertical:2,paddingHorizontal:2}]}>ATTENDANCE</Text>
            <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:6}}>
              <Text style={[styles.text,
                            {color:'#fff',fontSize:14,textAlign:'center',fontWeight:'700',
                            paddingVertical:0.2,paddingHorizontal:2}]}>7.6</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

 classes=()=>{
    return(
      <View>
        <View style={{borderRadius:10,marginHorizontal:15,marginVertical:10,
                      backgroundColor:'#3F3F3F',marginBottom:100}}>
          <TouchableOpacity
            style={{height:width*0.35,alignItems:'center',justifyContent:'center',
                   shadowOpacity: 0.18,elevation:5,backgroundColor:'#3F3F3F',
                   shadowColor:'#000',borderRadius:10,shadowOffset: {height: 2,width:0}}}
            onPress={()=>{this.setState({a2:!this.state.a2,a1:false})}}>
            <Image source={require('../assets/Unknown_Boy.jpg')}  style={{height:'100%',width:'100%',borderRadius:10,zIndex:0,opacity:0.5}}/>
            <View style={{alignSelf:'center',position:'absolute',
                          alignItems:'center',justifyContent:'center',zIndex:1}}>
              <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700'}]}>CLASS XII</Text>
              <FontAwesome name='angle-down' size={20} color='#fff'/>
            </View>
          </TouchableOpacity>
          {this.state.a2&&
            <ScrollView style={{backgroundColor:'#3F3F3F',paddingVertical:10,marginVertical:10,}}>
              {this.classResult()}
            </ScrollView>
          }
        </View>
      </View>
    )
  }

  sem1=()=>{
    return(
    <View>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <FlatList style={{}}
        data={this.state.semdata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index})=>(
        <View>
        {item.no==''&&<View style={{borderWidth:0.2,borderColor:'#fff',paddingVertical:-6,width:width*0.7,marginHorizontal:10}}/>}
          <View style={{flex:1,paddingHorizontal:6,flexDirection:'row',width:width*0.7}}>
            <View style={{width:width*0.12}}>
                <Text style={[styles.text,{color:'#fff',fontSize:12,textAlign:'center',
                              fontWeight:item.no=='#'?'700':'400'}]}>{item.no}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{width:width*0.3}}>
                <Text style={[styles.text,{color:'#fff',paddingHorizontal:10,fontSize:12,
                              fontWeight:item.no=='#'?'700':'400'}]}>{item.sub}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
          </View>
        </View>)}
      />
       <ScrollView horizontal={true}>
        <FlatList style={{}}
          data={this.state.semdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <View>
            {item.no==''&&<View style={{borderWidth:0.2,borderColor:'#fff',width:width*0.8,marginHorizontal:0}}/>}
            <View style={{flex:1,paddingHorizontal:6,flexDirection:'row',width:width*0.8}}>

              <View style={{width:100}}>
                  <Text style={[styles.text,
                                {color:'#fff',fontSize:12,textAlign:'center',
                                fontWeight:item.no=='#'?'700':'400'}]}>{item.test1}</Text>
              </View>
              <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
              <View style={{width:100}}>
                  <Text style={[styles.text,
                                {color:'#fff',fontSize:12,textAlign:'center',
                                fontWeight:item.no=='#'?'700':'400'}]}>{item.test2}</Text>
              </View>
              <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
              <View style={{width:100}}>
                  <Text style={[styles.text,
                                {color:'#fff',fontSize:12,textAlign:'center',
                                fontWeight:item.no=='#'?'700':'400'}]}>{item.test3}</Text>
              </View>
              <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
              <View style={{width:100}}>
                  <Text style={[styles.text,
                                {color:'#fff',fontSize:12,textAlign:'center',
                                fontWeight:item.no=='#'?'700':'400'}]}>{item.exa}</Text>
              </View>
            </View>
            </View>
          )}
          />
        </ScrollView>
      </View>
      <View>
        <View style={{borderWidth:0.2,borderColor:'#fff',width:'100%',marginHorizontal:10}}/>
      </View>
      <View
          style={{marginVertical:10,marginHorizontal:10,
                  flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
          <Text style={[styles.text,
                        {color:'#fff',fontSize:14,textAlign:'center',
                        fontWeight:'700',paddingVertical:2,paddingHorizontal:2}]}>SGPA</Text>
          <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:6}}>
              <Text style={[styles.text,
                        {color:'#fff',fontSize:14,textAlign:'center',
                        fontWeight:'700',paddingVertical:2,paddingHorizontal:2}]}>7.7</Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={[styles.text,
                        {color:'#fff',fontSize:14,textAlign:'center',fontWeight:'700',
                        paddingVertical:2,
                        paddingHorizontal:2}]}>CGPA</Text>
          <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:6}}>
              <Text style={[styles.text,
                        {color:'#fff',fontSize:14,textAlign:'center',fontWeight:'700',
                        paddingVertical:0.2,paddingHorizontal:2}]}>7.6</Text>
          </View>
        </View>
      </View>
    </View>
    )
  }

  render() {

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={'ACADEMIC MARKS'}
            screen={'ProfileMarks'}/>
          <View style={{flex:1,paddingVertical:20,}}>
            <ScrollView>
              <Text style={[styles.text,
                          {color:'#fff',fontSize:16,textAlign:'center',paddingVertical:10,
                          fontWeight:'700'}]}>ENGINEERING</Text>
              {this.sem()}
              <Text style={[styles.text,
                            {color:'#fff',fontSize:16,textAlign:'center',
                            paddingVertical:10,fontWeight:'700'}]}>SCHOOL</Text>
              {this.classes()}
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
  return{}
}

const mapDispatchToProps = (dispatch) => {
  return{};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMarks);
