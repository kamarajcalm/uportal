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

import {Fontisto, FontAwesome,Entypo,AntDesign,
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

const listofsection=[{id:1,checked:false,name:'PERIOD 1'},
                     {id:2,checked:false,name:'PERIOD 2'},
                     {id:3,checked:false,name:'PERIOD 3'},
                     {id:4,checked:false,name:'PERIOD 1'},
                     {id:5,checked:false,name:'PERIOD 2'},
                     {id:6,checked:false,name:'PERIOD 3'},
                     {id:7,checked:false,name:'PERIOD 1'},
                     {id:8,checked:false,name:'PERIOD 2'},
                     {id:9,checked:false,name:'PERIOD 3'},]
const month =['January','February','March','April','May','Jun','July',
              'August','September','October','November','December']

const takeattendace=[{id:1,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'ARTHY',present:false,absent:true},
                      {id:2,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'AJAY',present:false,absent:true},
                      {id:3,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'AARAV',present:false,absent:true},
                      {id:4,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'ARTHY',present:false,absent:true},
                      {id:5,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'AJAY',present:false,absent:true},
                      {id:6,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'AARAV',present:false,absent:true},
                      {id:7,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'ARTHY',present:false,absent:true},
                      {id:8,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'AJAY',present:false,absent:true},
                      {id:9,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'AARAV',present:false,absent:true},
                      {id:10,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'ARTHY',present:false,absent:true},
                      {id:11,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'AJAY',present:false,absent:true},
                      {id:12,icon:require('../assets/Unknown_Boy.jpg'),opacity:false,
                      nameid:'AA001',name:'AARAV',present:false,absent:true},]

class TakeAttendace extends React.Component {

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
      takeattendace:takeattendace,
      college:false,
      school:false,
      checked:true,
      month:month,
      }
  }


  takeAttendace=()=>{
    return(
      <FlatList
          style={{paddingBottom:100}}
          data={this.state.takeattendace}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:10,
                        alignItems:'center',justifyContent:'space-between',paddingVertical:10}}
               >
               <View style={{flexDirection:'row',alignItems:'center',
                         justifyContent:'flex-start',}}>
               <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                       fontSize:16,paddingLeft:6,width:width*0.08}]}>{item.id}</Text>
              <View style={{flexDirection:'row',alignItems:'center',
                        justifyContent:'flex-start',width:width*0.25}}>
                <Image source={(item.icon)} style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
                <View>
                  <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>{item.name}</Text>
                  <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:12,paddingHorizontal:10}]}>{item.nameid}</Text>
                </View>
              </View>
              </View>
              <View style={{flexDirection:'row',width:width*0.45,alignItems:'center',}}>
              {item.present?<TouchableOpacity style={{backgroundColor:'#27C200',marginHorizontal:10,
                          paddingVertical:10,borderRadius:10,}}
                onPress={()=>{this.present(item,index)}}>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                        fontSize:14,paddingHorizontal:10}]}>PRESENT</Text>
              </TouchableOpacity>:<TouchableOpacity style={{backgroundColor:'#196e03',marginHorizontal:10,
                          paddingVertical:10,borderRadius:10,}}
                onPress={()=>{this.present(item,index)}}>
                <Text style={[styles.text,{color:'#858585',fontWeight:'700',
                        fontSize:14,paddingHorizontal:10}]}>PRESENT</Text>
              </TouchableOpacity>}

                {item.present?<TouchableOpacity style={{backgroundColor:'#600909',marginHorizontal:0,
                            paddingVertical:10,borderRadius:10,}}
                  onPress={()=>{this.present(item,index)}}>
                  <Text style={[styles.text,{color:'#858585',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>ABSENT</Text>
                </TouchableOpacity>:<TouchableOpacity style={{backgroundColor:'#FA0000',marginHorizontal:0,
                            paddingVertical:10,borderRadius:10,}}
                  onPress={()=>{this.present(item,index)}}>
                  <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>ABSENT</Text>
                </TouchableOpacity>
                }
              </View>
             </TouchableOpacity>
           )
         }
      />
    )
  }

  present=(item,index,type)=>{
    console.log(type,'type')
      this.state.takeattendace[index].absent=!this.state.takeattendace[index].absent
      this.state.takeattendace[index].present=!this.state.takeattendace[index].present
    this.setState({takeattendace})
    console.log(this.state.takeattendace[index].absent,'this.state.takeattendace[index].absent')
    console.log(this.state.takeattendace[index].present,'this.state.takeattendace[index].present')
  }

  componentDidMount(){
    this.setDate();
  }

  setDate = (newDate) => {
    const date = newDate || new Date();
    this.setState({
      selectedDate:
        date.getDate() + " " + this.state.month[date.getMonth()] + " " + date.getFullYear()
    });
  };

  getPreviousDate = () => {
    const { selectedDate } = this.state
    const currentDayInMilli = new Date(selectedDate).getTime()
    const oneDay = 1000 * 60 *60 *24
    const previousDayInMilli = currentDayInMilli - oneDay
    const previousDate = new Date(previousDayInMilli)
    this.setDate(previousDate)
  }

  getNextDate = () => {
    const { selectedDate } = this.state
    const currentDayInMilli = new Date(selectedDate).getTime()
    const oneDay = 1000 * 60 *60 *24
    const nextDayInMilli = currentDayInMilli + oneDay
    const nextDate = new Date(nextDayInMilli)
    this.setDate(nextDate)
  }

  timeTable=()=>{
    return(
      <View style={{alignItems:'center',paddingVertical:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',
                    paddingHorizontal:10,paddingVertical:10,width:width*0.6,alignItems:'center'}}>
          <TouchableOpacity style={{padding:8}} onPress={()=>{this.getPreviousDate()}}>
            <FontAwesome name='angle-left' size={20} color='#fff'/>
          </TouchableOpacity>
          <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700'}]}>{this.state.selectedDate}</Text>
          <TouchableOpacity style={{padding:8}} onPress={()=>{this.getNextDate()}}>
            <FontAwesome name='angle-right' size={20} color='#fff'/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render(){
    const class1 = this.props.navigation.getParam('class1',null)
    var college = this.props.navigation.getParam('college',null)
    var clgStafAttend = this.props.navigation.getParam('clgStafAttend',null)
    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
        <Headers navigation={this.props.navigation} name={college!=null?college.name:'CLASS I SEC A'}
            screen={'TakeAttendace'}/>
            <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
              <View>{this.timeTable()}</View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                      paddingHorizontal:20,fontWeight:'700'}]}>TOTAL STRENGTH:30</Text>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
                    onPress={()=>{}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                          paddingHorizontal:20,fontWeight:'700',textDecorationLine: "underline",}]}>GET ON MAIL</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:20,marginVertical:20}}>
                  <View>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,
                          fontWeight:'700'}]}>TOTAL PRESENT:20</Text>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,
                          fontWeight:'700'}]}>TOTAL ABSENT:05</Text>
                  </View>
                  <View style={{width:width*0.35}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',
                          textAlign:'center'}]}>MARK ALL</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',
                            paddingHorizontal:15}}>
                      <View style={{backgroundColor:'#27C200',height:20,width:20,alignItems:'center'}}>
                          <Feather name={'check'} size={20} color={'#fff'}/>
                      </View>
                      <View style={{backgroundColor:'#FA0000',height:20,width:20,alignItems:'center'}}>
                          <Entypo name={'cross'} size={20} color={'#fff'}/>
                      </View>
                    </View>
                  </View>
                </View>
                {this.takeAttendace()}
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

export default connect(mapStateToProps, mapDispatchToProps)(TakeAttendace);
