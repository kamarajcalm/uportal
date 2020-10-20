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

const semester=[{id:1,name:'SEM I'},
                     {id:2,name:'SEM II'},
                     {id:3,name:'SEM III'},]

class Semester extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props){
    super(props);
    this.state={
      semester:semester,
      college:false,
      school:false,
    }
  }

  listOfDetails=(collegeAd)=>{
    return(
      <FlatList
          style={{paddingBottom:100}}
          data={this.state.semester}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{paddingHorizontal:20,width:width*0.35,alignSelf:'center',
                    backgroundColor:'#333333',alignItems:'center',marginVertical:10,
                    justifyContent:'center',paddingVertical:10,borderRadius:10}}
               onPress={()=>{this.onListTouch(item,collegeAd)}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>

                <Text style={[styles.text,{color:'#fff',fontWeight:'700',
                          fontSize:14,paddingHorizontal:10}]}>{item.name}</Text>
              </View>

             </TouchableOpacity>
           )
         }
      />
    )
  }

  onListTouch=(item,collegeAd)=>{
    console.log(collegeAd,'collegeAd')
      this.props.navigation.navigate('StudentAttendance',{collegeAd:{name:item.name,collegeAd:collegeAd}})
  }

  render() {
    var collegeAd =this.props.navigation.getParam('collegeAd',null)
    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
        <Headers navigation={this.props.navigation} name={collegeAd!=null?collegeAd.name:''}
            screen={'Semester'}/>
            <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
              <ScrollView>
                {this.listOfDetails(collegeAd)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Semester);
