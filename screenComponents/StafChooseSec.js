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

class StafChooseSec extends React.Component {

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



  listOfDetails=(attend,stafMarks,collegeStaf,clgStafAttend)=>{
    return(
      <FlatList
          style={{paddingBottom:100}}
          data={this.state.listofsection}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,flexDirection:'row',paddingHorizontal:20,
                        alignItems:'center',justifyContent:'space-between',paddingVertical:10}}
               onPress={()=>{this.onListTouch(item,attend,stafMarks,collegeStaf,clgStafAttend)}}>
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

  componentDidMount(){
  }

  onListTouch=(item,attend,stafMarks,collegeStaf,clgStafAttend)=>{
    if(attend!=null){
      this.props.navigation.navigate('StafChooseSubject',{attend:{name:item.name,attend:attend}})
    }else if(stafMarks!=null){
      this.props.navigation.navigate('StafChooseSubject',{stafMarks:{name:item.name,stafMarks:stafMarks.item.name}})
    }else if(collegeStaf!=null){
      this.props.navigation.navigate('StafChooseSubject',{collegeStaf:{name:item.name,collegeStaf:collegeStaf}})
    }else if (clgStafAttend!=null) {
      this.props.navigation.navigate('ChoosePeriod',{clgStafAttend:{name:item.name,clgStafAttend:clgStafAttend}})
    }

  }

  render() {
    var attend = this.props.navigation.getParam('item',null);
    var stafMarks = this.props.navigation.getParam('stafMarks',null);
    var collegeStaf = this.props.navigation.getParam('collegeStaf',null);
    var clgStafAttend = this.props.navigation.getParam('clgStafAttend',null);
    console.log(attend,'attend',stafMarks)
    return (
      <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
        <Headers navigation={this.props.navigation} name={attend!=null?attend.name:stafMarks!=null?stafMarks.item.name:collegeStaf!=null?'ACADEMIC MARKS':clgStafAttend!=null?'ATTENDANCE':''} screen={'StafChooseSec'}/>
            <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
            {clgStafAttend!=null||collegeStaf!=null?<View>
              <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                paddingHorizontal:20,fontWeight:'700',
                textAlign:'center'}]}>{collegeStaf!=null?collegeStaf.fullname:clgStafAttend!=null?clgStafAttend.fullname:''}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                    paddingHorizontal:20,fontWeight:'700',
                    textAlign:'center'}]}>1st Year</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                    paddingHorizontal:20,fontWeight:'700',
                    textAlign:'center'}]}>2nd Year</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                    paddingHorizontal:20,fontWeight:'700',
                    textAlign:'center'}]}>3rd Year</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
                    paddingHorizontal:20,fontWeight:'700',
                    textAlign:'center'}]}>4th Year </Text>
                </View>
              </View>:
            <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:10,
              paddingHorizontal:20,fontWeight:'700'}]}>CHOOSE SECTION</Text>}
              <ScrollView>
                {this.listOfDetails(attend,stafMarks,collegeStaf,clgStafAttend)}
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

export default connect(mapStateToProps, mapDispatchToProps)(StafChooseSec);
