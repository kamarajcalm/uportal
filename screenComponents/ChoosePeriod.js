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

class ChoosePeriod extends React.Component {

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
      checked:true,
      }
  }



  listOfDetails=()=>{
    return(
      <FlatList
          style={{paddingBottom:100}}
          data={this.state.listofsection}
          numColumns = {3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:20,width:width*0.25,
                        marginHorizontal:10,alignItems:'center',
                        justifyContent:'center',marginVertical:15}}
               onPress={()=>{this.onListTouch(item,index)}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'#000'}}>
                    {!item.checked && <Fontisto name={'checkbox-passive'} size={18}color={'#fff'}/>}
                    {item.checked&&<Fontisto name={'checkbox-active'} size={18}color={'#fff'}/>}
                </TouchableOpacity>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                      fontSize:14,paddingHorizontal:10}]}>{item.name}</Text>
              </View>
             </TouchableOpacity>
           )
         }
      />
    )
  }

  onListTouch=(item,index)=>{
    this.state.listofsection[index].checked=!this.state.listofsection[index].checked
    this.setState({listofsection})
  }
  others=(college,clgStafAttend)=>{
    if(college!=null){
      this.props.navigation.navigate('TakeAttendace',{college:college})
    }else if(clgStafAttend!=null){
      this.props.navigation.navigate('StafChooseSubject',{clgStafAttend:clgStafAttend})
    }else {
      this.props.navigation.navigate('TakeAttendace')
    }
  }

  checkedAll=()=>{
    console.log(this.state.checked,'this.state.checked')
    if(this.state.checked==true){
      for(var i in this.state.listofsection){
        this.state.listofsection[i].checked=true
      }
      console.log(this.state.listofsection,'this.state.listofsection')
    }else{
      for(var i in this.state.listofsection){
        this.state.listofsection[i].checked=false
      }
    }
  }

  render() {
    const class1 = this.props.navigation.getParam('class1',null)
    const others = this.props.navigation.getParam('others',null)
    var college = this.props.navigation.getParam('college',null)
    var clgStafAttend = this.props.navigation.getParam('clgStafAttend',null)
    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
        <Headers navigation={this.props.navigation} name={others!=null?others.name:class1!=null?class1.name+" "+class1.nameid:college!=null?college.name:clgStafAttend!=null?clgStafAttend.name:''}
            screen={'SchoolStafAttendance'}/>
            <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                      paddingHorizontal:20,fontWeight:'700'}]}>CHOOSE PERIOD</Text>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
                    onPress={()=>{this.setState({checked:!this.state.checked});this.checkedAll()}}>
                    <TouchableOpacity style={{backgroundColor:'#000'}}>
                        {this.state.checked && <Fontisto name={'checkbox-passive'} size={18}color={'#fff'}/>}
                        {!this.state.checked && <Fontisto name={'checkbox-active'} size={18}color={'#fff'}/>}
                    </TouchableOpacity>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                          paddingHorizontal:10,fontWeight:'700'}]}>SELECT ALL</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                {this.listOfDetails()}
                <TouchableOpacity onPress={()=>{this.others(college,clgStafAttend)}} style={{flexDirection:'row',width:width*0.4,backgroundColor:'#333333',
                            alignItems:'center',justifyContent:'center',paddingVertical:10,
                            borderRadius:10,alignSelf:'center'}}>
                    <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                              fontSize:14,paddingHorizontal:10}]}>TAKE ATTENDANCE</Text>
                 </TouchableOpacity>
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
    return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePeriod);
