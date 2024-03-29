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
                      name:'CLASS I',sec:'SECTION A'},
                     {id:2,icon:require('../assets/Unknown_Boy.jpg'),
                     name:'CLASS III',sec:'SECTION B'},
                     {id:3,icon:require('../assets/Unknown_Boy.jpg'),
                     name:'CLASS V',sec:'SECTION C'},]
const collegeyear=[{id:1,icon:require('../assets/Unknown_Boy.jpg'),
                      name:'SEC A',sec:'1st YEAR'},
                     {id:2,icon:require('../assets/Unknown_Boy.jpg'),
                     name:'SEC B',sec:'2nd YEAR'},
                     {id:3,icon:require('../assets/Unknown_Boy.jpg'),
                     name:'SEC C',sec:'3rd YEAR'},]
class SchoolStafMarks extends React.Component {

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
      collegeyear:collegeyear,
      college:false,
      school:false,
      }
  }



  listOfDetails=(collegeStaf)=>{
    return(
      <FlatList
          style={{paddingBottom:100}}
          data={collegeStaf!=null?this.state.collegeyear:this.state.listofsection}
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
                          fontSize:12,paddingHorizontal:10}]}>{item.sec}</Text>
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
    console.log(item,'item')
    if(collegeStaf!=null){
      this.props.navigation.navigate('ChooseSubject',{collegeStaf:item})
    }else{
        this.props.navigation.navigate('ChooseSubject',{item:item})
    }

  }

  others=(collegeStaf)=>{
    if(collegeStaf!=null){
    this.props.navigation.navigate('OtherAttendance',{collegeStaf:{stafMarks:true}})
    }else{
      this.props.navigation.navigate('OtherAttendance',{item:{stafMarks:true}})
    }
  }

  render() {
    const collegeStaf = this.props.navigation.getParam('collegeStaf',null)

    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
        <Headers navigation={this.props.navigation} name={'ACADEMIC MARKS'}
            screen={'SchoolStafMarks'}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SchoolStafMarks);
