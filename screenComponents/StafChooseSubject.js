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

const itemdata=[{name:'TEST-1'},{name:'TEST-2'},{name:'TEST-1'},
                {name:'TEST-2'},{name:'ANNUAL'}]
const listofsection=[{id:1,icon:require('../assets/Unknown_Boy.jpg'),
                      name:'CHEMISTRY',itemdata:itemdata,open:false},
                     {id:2,icon:require('../assets/Unknown_Boy.jpg'),
                     name:'MATHEMATICS',itemdata:itemdata,open:false},
                     {id:3,icon:require('../assets/Unknown_Boy.jpg'),
                     name:'ENGLISH',itemdata:itemdata,open:false},
                     {id:2,icon:require('../assets/Unknown_Boy.jpg'),
                     name:'EG',itemdata:itemdata,open:false},
                     {id:3,icon:require('../assets/Unknown_Boy.jpg'),
                     name:'PHYSICS',itemdata:itemdata,open:false},]

class StafChooseSubject extends React.Component {

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



  listOfDetails=(stafMarks)=>{
    return(
      <FlatList
          style={{paddingBottom:100}}
          data={this.state.listofsection}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <View style={{width:width*0.6,backgroundColor:'#141414',
                        alignItems:'center',justifyContent:'center',marginVertical:10,borderRadius:10,alignSelf:'center'}}>
            <TouchableOpacity style={{flexDirection:'row',width:width*0.6,backgroundColor:'#333333',
                        alignItems:'center',justifyContent:'center',paddingVertical:10,borderRadius:10,alignSelf:'center'}}
               onPress={()=>{this.onListTouch(item,index,stafMarks)}}>
              <View style={{alignItems:'center',flexDirection:'row'}}>

                <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>{item.name}</Text>

              </View>

             </TouchableOpacity>
             <View>{item.open &&this.state.itemIndex==item.id&& <View>
               {this.openTest(item)}
               </View>}</View>

             </View>
           )
         }
      />
    )
  }

  openTest=(item,index)=>{
    return(
      <View>
      <FlatList
          style={{}}
          data={item.itemdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <View style={{width:width*0.6,
                        paddingVertical:10,borderRadius:10,}}>
            <Text style={[styles.text,{color:'#fff',fontSize:14,
              fontWeight:'700',paddingLeft:20}]}>{item.name}</Text>
            </View>
          )}/>
      </View>
    )
  }



  onListTouch=(item,index)=>{
    this.props.navigation.navigate('ChoosePeriod',{others:item})
  }

  render() {

    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
        <Headers navigation={this.props.navigation} name={'ATTENDANCE'}
            screen={'StafChooseSubject'}/>
            <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
            <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
              paddingHorizontal:20,fontWeight:'700',textAlign:'center'}]}>CHOOSE SUBJECT</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(StafChooseSubject);
