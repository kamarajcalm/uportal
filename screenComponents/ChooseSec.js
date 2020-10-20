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

const listofsection=[{id:1,icon:require('../assets/Unknown_Boy.jpg'),name:'SEC A'},
                     {id:2,icon:require('../assets/Unknown_Boy.jpg'),name:'SEC B'},
                     {id:3,icon:require('../assets/Unknown_Boy.jpg'),name:'SEC C'},]

const section=[{id:1,icon:require('../assets/Unknown_Boy.jpg'),name:'CSE SEC A'},
                     {id:2,icon:require('../assets/Unknown_Boy.jpg'),name:'CSE SEC B'},
                     {id:3,icon:require('../assets/Unknown_Boy.jpg'),name:'CSE SEC C'},]
class ChooseSec extends React.Component {

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
      section:section,
      college:false,
      school:false,
      }
  }



  listOfDetails=(class1,collegeAd)=>{
    return(
      <FlatList
          style={{paddingBottom:100}}
          data={collegeAd!=null?this.state.section:this.state.listofsection}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:20,
                        alignItems:'center',justifyContent:'space-between',paddingVertical:10}}
               onPress={()=>{this.onListTouch(item,class1,collegeAd)}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={(item.icon)} style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
                <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>{item.name}</Text>
              </View>
              <FontAwesome name='angle-right' size={18} color='#fff'/>
             </TouchableOpacity>
           )
         }
      />
    )
  }

  onListTouch=(item,class1,collegeAd)=>{
    if(collegeAd!=null){
      this.props.navigation.navigate('Semester',{collegeAd:item})
    }else{
      this.props.navigation.navigate('StudentAttendance',{item:{name:item.name,class1:class1}})
    }  
  }

  render() {
    const class1 = this.props.navigation.getParam('item',null)
    var collegeAd =this.props.navigation.getParam('collegeAd',null)
    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
        <Headers navigation={this.props.navigation} name={class1!=null?class1.name:collegeAd!=null?'ATTENDANCE':''}
            screen={'SchoolAdminAttendance'}/>
            <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
              {collegeAd!=null?<View></View>:<Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
              paddingHorizontal:20,fontWeight:'700'}]}>CHOOSE SECTION</Text>}
              <ScrollView>
              {collegeAd!=null &&<View style={{flexDirection:'row',
                    justifyContent:'space-between',marginHorizontal:20,marginVertical:10}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                            fontWeight:'700'}]}>1st Year</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                            fontWeight:'700'}]}>2nd Year</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                            fontWeight:'700'}]}>3rd Year</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                            fontWeight:'700'}]}>4th Year</Text>
                </View>}
                {this.listOfDetails(class1,collegeAd)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSec);
