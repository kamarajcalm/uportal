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
import {Fontisto, FontAwesome,Entypo,
  SimpleLineIcons,MaterialCommunityIcons,
  Feather,Octicons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';
import Chat from '../screenComponents/Chat';

import ChatApp from '../screenComponents/ChatApp';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor

const schooladdata = [{img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'3',
                       chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'',
                       chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'3',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'3',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'3',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'3',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},]

const collegeaddata=[{img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'3',
                       chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                       chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'3',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'3',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'3',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'3',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},]

const schoolstafdata=[{img:require('../assets/Unknown_Boy.jpg'),name:'SEC A',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC B',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                      {img:require('../assets/Unknown_Boy.jpg'),name:'SEC C',count:'',
                      chat:'Ram:I am on the way to your office',time:'07:25 PM',},]

const collegestafdata=[{img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                        chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                        {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                        chat:'Ram:I am on the way to your office',time:'07:25 PM',},
                        {img:require('../assets/Unknown_Boy.jpg'),name:'CSE SEM I',count:'',
                        chat:'Ram:I am on the way to your office',time:'07:25 PM',},]
class PageSecond extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      collegeStud:false,
      schoolStud:false,
      schoolAd:false,
      collegeAd:false,
      schoolStaf:false,
      collegeStaf:false,
      data:null,
      schooladdata:schooladdata,
      collegeaddata:collegeaddata,
      schoolstafdata:schoolstafdata,
      collegestafdata:collegestafdata,
    }
  }

  componentDidMount=async()=>{
    const collegeStud = await AsyncStorage.getItem('collegeStud');
    const schoolStud = await AsyncStorage.getItem('schoolStud');
    const schoolAd = await AsyncStorage.getItem('schoolAd');
    const collegeAd = await AsyncStorage.getItem('collegeAd');
    const schoolStaf = await AsyncStorage.getItem('schoolStaf');
    const collegeStaf = await AsyncStorage.getItem('collegeStaf');
    this.setState({collegeStud:collegeStud});
    this.setState({schoolStud:schoolStud});
    this.setState({schoolAd:schoolAd});
    this.setState({collegeAd:collegeAd});
    this.setState({schoolStaf:schoolStaf});
    this.setState({collegeStaf:collegeStaf});
    console.log(collegeStud,'collegeStud',this.state.collegeStud);
    console.log(schoolStud,'schoolStud',this.state.schoolStud);
    console.log(schoolAd,'schoolAd',this.state.schoolAd);
    console.log(collegeAd,'collegeAd',this.state.collegeAd);
    console.log(schoolStaf,'schoolStaf',this.state.schoolStaf);
    console.log(collegeStaf,'collegeStaf',this.state.collegeStaf);
  }

  touch=(item,index)=>{
    this.props.navigation.navigate('ClassWall')
  }

  classsWall=(tru,type)=>{
    if(type=='schoolAd'){
      this.state.data=this.state.schooladdata;
    }else if(type=='collegeAd'){
      this.state.data=this.state.collegeaddata;
    }else if(type=='schoolStaf'){
      this.state.data=this.state.schoolstafdata;
    }else if(type=='collegeStaf'){
      this.state.data=this.state.collegestafdata;
    }
    return(
      <View>
        <FlatList
            style={{}}
            data={tru=='true'?this.state.data:this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item,index})=>(
              <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',
                   paddingVertical:15,alignItems:'center',width:width,paddingHorizontal:20}}
                   onPress={()=>this.touch(item,index)}>
                <View style={{flexDirection:'row',justifyContent:'space-between',
                               alignSelf:'flex-start',alignItems:'center'}}>
                  <Image source={(item.img)}   style={{height:width*0.12,width:width*0.12,borderRadius:30}}/>
                  <View style={{paddingLeft:6}}>
                      <Text style={[styles.text,{color:'#fff',
                      fontSize:14,fontWeight:'700'}]}>{item.name}</Text>
                      <Text style={[styles.text,{color:'#fff',
                      fontSize:12,fontWeight:'700'}]}>{item.chat}</Text>
                  </View>
                </View>
                <View style={{alignSelf:'flex-end'}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:10,
                                fontWeight:'700'}]}>{item.time}</Text>
                  {item.count!=''&&
                  <View style={{borderRadius:30,width:22,height:22,backgroundColor:'#333333',
                                alignSelf:'flex-end',justifyContent:'center'}}>
                        <Text style={[styles.text,{color:'#fff',textAlign:'center',
                                    fontSize:12,fontWeight:'700',}]}>{item.count}</Text>
                  </View>}
                 </View>
              </TouchableOpacity>
            )}/>
      </View>
    )
  }

  render() {
    const { messages } = this.state;
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        <Headers navigation={this.props.navigation} name={'Class wall'} screen={'PageSecond'}/>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:20}}>

          {this.state.schoolAd!='false'&&<View>
          {this.classsWall(this.state.schoolAd,'schoolAd')}
          </View>}

          {this.state.collegeAd!='false'&&<View>
          {this.classsWall(this.state.collegeAd,'collegeAd')}
          </View>}

          {this.state.schoolStaf!='false'&&<View>
          {this.classsWall(this.state.schoolStaf,'schoolStaf')}
          </View>}

          {this.state.collegeStaf!='false'&&<View>
          {this.classsWall(this.state.collegeStaf,'collegeStaf')}
          </View>}

          {(this.state.collegeStud=='true'||this.state.schoolStud=='true')?<ChatApp/>:<View></View>}

          <View style={{height:50}}></View>
          
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
});

const mapStateToProps =(state) => {
    return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSecond);
