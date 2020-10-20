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

const listofsection=[{id:1,icon:require('../assets/Unknown_Boy.jpg'),
                      nameid:'SEC A',name:'CLASS I'},
                     {id:2,icon:require('../assets/Unknown_Boy.jpg'),
                     nameid:'SEC B',name:'CLASS III'},
                     {id:3,icon:require('../assets/Unknown_Boy.jpg'),
                     nameid:'SEC C',name:'CLASS V'},]
const collegeData = [{id:1,icon:require('../assets/Unknown_Boy.jpg'),
                      nameid:'1st Year',name:'CSE SEC A'},
                     {id:2,icon:require('../assets/Unknown_Boy.jpg'),
                     nameid:'2nd Year',name:'CSE SEC B'},
                     {id:3,icon:require('../assets/Unknown_Boy.jpg'),
                     nameid:'3rd Year',name:'CSE SEC C'},]
class SchoolStafAttendance extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props){
    super(props);
    this.state={
      collegeData:collegeData,
      listofsection:listofsection,
      college:false,
      school:false,
      }
  }



  listOfDetails=(collegeStaf)=>{
    return(
      <FlatList
          style={{paddingBottom:100}}
          data={collegeStaf!=null?this.state.collegeData:this.state.listofsection}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:20,
                        alignItems:'center',justifyContent:'space-between',paddingVertical:10}}
               onPress={()=>{this.onListTouch(item,collegeStaf)}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={(item.icon)} style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
                <View>
                  <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>{item.name}</Text>
                  <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:12,paddingHorizontal:10}]}>{item.nameid}</Text>
                </View>
              </View>
              <FontAwesome name='angle-right' size={18} color='#fff'/>
             </TouchableOpacity>
           )
         }
      />
    )
  }

  onListTouch=(item,collegeStaf)=>{
    if(collegeStaf!=null){
      this.props.navigation.navigate('ChoosePeriod',{college:item})
    }else{
      this.props.navigation.navigate('ChoosePeriod',{class1:item})
    }

  }

  others=(collegeStaf)=>{
    console.log(collegeStaf,'collegeStaf')
    if(collegeStaf!=null){
      this.props.navigation.navigate('OtherAttendance',{clgStafAttend:collegeStaf})
    }else{
      this.props.navigation.navigate('OtherAttendance')
    }
  }

  render() {
    var collegeStaf = this.props.navigation.getParam('collegeStaf',null)
    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
        <Headers navigation={this.props.navigation} name={'ATTENDANCE'}
            screen={'SchoolStafAttendance'}/>
            <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
            <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
              paddingHorizontal:20,fontWeight:'700'}]}>MY CLASSES</Text>
              <ScrollView>
                {this.listOfDetails(collegeStaf)}
                <TouchableOpacity onPress={()=>{this.others(collegeStaf)}} style={{flexDirection:'row',width:width*0.4,backgroundColor:'#333333',
                            alignItems:'center',justifyContent:'center',paddingVertical:10,
                            borderRadius:10,alignSelf:'center'}}>
                    <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                              fontSize:14,paddingHorizontal:10}]}>OTHERS</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SchoolStafAttendance);
