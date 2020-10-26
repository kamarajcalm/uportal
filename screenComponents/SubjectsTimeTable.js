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
import Syllabus from '../screenComponents/Syllabus';
import TimeTable from '../screenComponents/TimeTable';
import Modal from "react-native-modal";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily

const semtimetable=[{day:'DAY',i:'I',ii:'II',iii:'III',iv:'IV',v:'V',vi:'VI',vii:'VII',viii:'VIII'},
                    {day:'MONDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',
                    vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},
                    {day:'TUESDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',
                    vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},
                    {day:'WEDNESDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',
                    vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},
                    {day:'THURSDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',
                    vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},
                    {day:'FRIDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',
                    vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},
                    {day:'SATURDAY',i:'SCIENCE',ii:'MATHS',iii:'HINDI',iv:'ENGLISH',v:'LANGUGE',
                    vi:'SCIENCE',vii:'WORKSHOP',viii:'GAME'},]

const semesterdata = [{a1:false,name:'SEMESTER III',pk:1,edit:false,
                      img:require('../assets/Unknown_Boy.jpg'),semtimetable:semtimetable}]

class SubjectsTimeTable extends React.Component{

  static navigationOptions=({navigation})=>{
    const {params={}}=navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      itemIndex:1,
      semesterdata:semesterdata,
      modal:false,
      showMenu:false,
      menuItem:null,
      menuIndex:null
      }
    }

  componentDidMount(){
  }

  touch1=(item,index)=>{
    this.state.semesterdata[index].a1=!this.state.semesterdata[index].a1
    this.setState({semesterdata})
  }
  editPeriod=(item,index)=>{
    this.setState({showMenu:true,menuItem:item,menuIndex:index})

  }
  showMenuList=(item,index)=>{
    if(this.state.showMenu==true&&this.state.menuIndex==index){
      return(
        <View style={{position:'absolute',top:-20,left:0,right:-0,zIndex:99,alignItems:'center',backgroundColor:'#000',width:width*0.6,height:40,borderRadius:10}}>
          <View style={{flex:1,flexDirection:'row',width:width*0.6,justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}}>
            <Text style={{color:'#fff',fontSize:14}}>SWAP</Text>
          <View style={{height:35,borderColor:'#fff',borderWidth:0.2}}/>
            <Text style={{color:'#fff',fontSize:14}}>REPLACE</Text>
          <View style={{height:35,borderColor:'#fff',borderWidth:0.2}}/>
            <Text style={{color:'#fff',fontSize:14}}>CANCEL</Text>
          </View>
        </View>
      )
    }else{
      return null
    }
  }



  semTimeTable=(item,index)=>{
    console.log(item.semtimetable,'item.semtimetable')
    var edit =item.edit;
    return(
      <View style={{marginBottom:40,borderRadius:10}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
        <FlatList style={{}} data={item.semtimetable}
          keyExtractor={(item,index)=>index.toString()}
          listKey={(item,index)=>index.toString()}
          renderItem={({item,index})=>(
          <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.25,}}>
              <View style={{justifyContent:'flex-start',paddingVertical:item.day==''?6:10,width:width*0.25}}>
                <Text style={[styles.text,{fontSize:item.day==''?10:12,
                        fontWeight:item.day=='DAY'?'700':'400',
                        textAlign:'left',color:'#fff',paddingHorizontal:10}]}>{item.day}</Text>
              </View>
            </View>)}
          />
          <ScrollView horizontal nestedScrollEnabled>
              <FlatList style={{}} data={item.semtimetable}
                keyExtractor={(item,index)=>index.toString()}
                listKey={(item,index)=>index.toString()}
                renderItem={({item,index})=>(
                <View style={{}}>
                {this.showMenuList(item,index)}
                  <View style={{flexDirection:'row',width:width*1.8,
                                justifyContent:'space-between',}}>
                  <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:4}}/>
                    <TouchableOpacity disabled={item.day==''||item.day=='DAY'||edit==false?true:false}
                        onPress={()=>{(edit==true&&item.day!=''||item.day!='DAY')&&this.editPeriod(item.i,index)}}>

                      <Text style={[styles.text,{color:'#fff',fontSize:item.day==''?10:12,
                          fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                          textAlign:'center',paddingVertical:item.day==''?0:10}]}>{item.i}</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:4}}/>

                    <TouchableOpacity disabled={item.day==''||item.day=='DAY'||edit==false?true:false}
                        onPress={()=>{(edit==true&&item.day!=''||item.day!='DAY')&&this.editPeriod(item.ii,index)}}>

                        <Text style={[styles.text,{color:'#fff',fontSize:item.day==''?10:12,
                          fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                          textAlign:'center',paddingVertical:item.day==''?0:10}]}>{item.ii}</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:4}}/>
                    <TouchableOpacity disabled={item.day==''||item.day=='DAY'||edit==false?true:false}
                        onPress={()=>{(edit==true&&item.day!=''||item.day!='DAY')&&this.editPeriod(item.iii,index)}}>

                        <Text style={[styles.text,{color:'#fff',fontSize:item.day==''?10:12,
                          fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                          textAlign:'center',paddingVertical:item.day==''?0:10}]}>{item.iii}</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:4}}/>

                    <TouchableOpacity disabled={item.day==''||item.day=='DAY'||edit==false?true:false}
                        onPress={()=>{(edit==true&&item.day!=''||item.day!='DAY')&&this.editPeriod(item.iv,index)}}>

                        <Text style={[styles.text,{color:'#fff',fontSize:item.day==''?10:12,
                          fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                          textAlign:'center',paddingVertical:item.day==''?0:10}]}>{item.iv}</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:4}}/>
                    <TouchableOpacity disabled={item.day==''||item.day=='DAY'||edit==false?true:false}
                        onPress={()=>{(edit==true&&item.day!=''||item.day!='DAY')&&this.editPeriod(item.v,index)}}>

                        <Text style={[styles.text,{color:'#fff',fontSize:item.day==''?10:12,
                          fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                          textAlign:'center',paddingVertical:item.day==''?0:10}]}>{item.v}</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:4}}/>
                    <TouchableOpacity disabled={item.day==''||item.day=='DAY'||edit==false?true:false}
                        onPress={()=>{(edit==true&&item.day!=''||item.day!='DAY')&&this.editPeriod(item.vi,index)}}>

                        <Text style={[styles.text,{color:'#fff',fontSize:item.day==''?10:12,
                          fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                          textAlign:'center',paddingVertical:item.day==''?0:10}]}>{item.vi}</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:4}}/>
                    <TouchableOpacity disabled={item.day==''||item.day=='DAY'||edit==false?true:false}
                        onPress={()=>{(edit==true&&item.day!=''||item.day!='DAY')&&this.editPeriod(item.vii,index)}}>
                        <Text style={[styles.text,{color:'#fff',fontSize:item.day==''?10:12,
                          fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                          textAlign:'center',paddingVertical:item.day==''?0:10}]}>{item.vii}</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:4}}/>
                    <TouchableOpacity disabled={item.day==''||item.day=='DAY'||edit==false?true:false}
                        onPress={()=>{(edit==true&&item.day!=''||item.day!='DAY')&&this.editPeriod(item.viii,index)}}>
                        <Text style={[styles.text,{color:'#fff',fontSize:item.day==''?10:12,
                          fontWeight:item.day=='DAY'?'700':'400',width:width*0.2,
                          textAlign:'center',paddingVertical:item.day==''?0:10}]}>{item.viii}</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:4}}/>
                  </View>
                  {edit==true&&item.day!=''&&<View style={{borderWidth:0.5,width:width*1.8,
                          marginHorizontal:4,borderColor:'#fff'}}/>}
            </View>)}
          />
          </ScrollView>

        </View>
        {edit==true&&<View style={{padding:4,width:'100%',flexDirection:'row',alignItems:'center',
                justifyContent:'space-between',marginTop:10,paddingHorizontal:10}}>
          <TouchableOpacity style={{alignSelf:'flex-start'}}
              onPress={()=>{this.cancelsave(item,index)}}>
              <Text style={[styles.text,{color:'#fff',fontSize:16,
                fontWeight:'700',textAlign:'left'}]}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf:'flex-end'}}
                onPress={()=>{this.cancelsave(item,index)}}>
              <Text style={[styles.text,{color:'#fff',fontSize:16,
                fontWeight:'700',textAlign:'right'}]}>SAVE</Text>
          </TouchableOpacity>
          </View>}
    </View>
    )
  }
  edit=(item,index)=>{
    this.state.semesterdata[index].edit=!this.state.semesterdata[index].edit
    if(this.state.semesterdata[index].edit==true){
      this.state.semesterdata[index].semtimetable.splice(0,0,
        {day:'',
        i:'9:00-9:45',
        ii:'9:45-10:30',
        iii:'11:15-11:50',
        iv:'11:50-12:35',
        v:'01:15-01:50',
        vi:'01:50-02:35',
        vii:'2:50-3:30',
        viii:'VIII'},)
    }
    this.setState({semesterdata})
    console.log(this.state.semesterdata,'this.state.semesterdata')
  }

  semester=()=>{
    return(
      <View style={{marginVertical:10,}}>
        <FlatList style={{paddingBottom:100}} data={this.state.semesterdata}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({item,index})=>(
          <View style={{borderRadius:10,marginHorizontal:15,marginVertical:10,
                  backgroundColor:'#3F3F3F'}}>
            <TouchableOpacity style={{height:width*0.35,alignItems:'center',justifyContent:'center',
                  shadowOpacity: 0.18,elevation:5,backgroundColor:'#3F3F3F',
                  shadowColor:'#000',borderRadius:10,shadowOffset: {height: 2,width:0}}} onPress={()=>{this.touch1(item,index)}}>
              <Image source={(item.img)} style={{height:'100%',width:'100%',borderRadius:10,zIndex:0,opacity:0.5}}/>
              <View style={{alignSelf:'center',position:'absolute',alignItems:'center',
                    justifyContent:'center',zIndex:1}}>
                <Text style={[styles.text,{color:'#fff',fontSize:16,
                    fontWeight:'700'}]}>{item.name}</Text>
                <FontAwesome name='angle-down' size={20} color='#fff'/>
              </View>
              {item.a1 &&
              <TouchableOpacity style={{position:'absolute',bottom:10,right:10,
                                        flexDirection:'row',alignItems:'center'}}
                  onPress={()=>{this.edit(item,index)}}>
                <AntDesign name={'edit'} color={'#fff'} size={16}/>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                              fontWeight:'700',paddingLeft:6}]}>EDIT</Text>
              </TouchableOpacity>}
            </TouchableOpacity>

            {item.a1&&
              <View style={{backgroundColor:'#3F3F3F',borderRadius:10,paddingVertical:10}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',
                      textAlign:'center',paddingVertical:10}]}>PERIODS</Text>
                <View>{this.semTimeTable(item,index)}</View>
                <View style={{flexDirection:'row',justifyContent:'space-between',position:'absolute',bottom:0,left:0,right:0,backgroundColor:'#000'}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{height:10,width:10,backgroundColor:'green',marginRight:4}}/>
                    <Text style={[styles.text,{color:'green',
                      fontSize:14,fontWeight:'700'}]}>SWAPPED</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{height:10,width:10,backgroundColor:'yellow',marginRight:4}}/>
                    <Text style={[styles.text,{color:'yellow',
                      fontSize:14,fontWeight:'700'}]}>REPLACED</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{height:10,width:10,backgroundColor:'red',marginRight:4}}/>
                    <Text style={[styles.text,{color:'red',
                      fontSize:14,fontWeight:'700'}]}>CANCELLED</Text>
                  </View>
                </View>
              </View>
            }
          </View>
        )}
        />
      </View>
    )
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#000'}}>
        {this.semester()}
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsTimeTable);
