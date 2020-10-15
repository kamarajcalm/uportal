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

import SwitchSelector from "react-native-switch-selector";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily = settings.fontFamily
const formlist=[{img:require('../assets/Unknown_Boy.jpg'),name:'Think and Grow Rich',a1:false,
                  issuedby:'Ms jennifer',issuedate:'12 Aug 2020',returndate:'Return Date : 19 Aug 2020'},
                  {img:require('../assets/Unknown_Boy.jpg'),name:'Quantum Physics',a1:false,
                  issuedby:'Ms jennifer',issuedate:'12 Aug 2020',returndate:'Return Date : 19 Aug 2020'},
                  {img:require('../assets/Unknown_Boy.jpg'),name:'World Geography',a1:false,
                  issuedby:'Ms jennifer',issuedate:'12 Aug 2020',returndate:'Returned'},]

class ProfileLibrary extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      formlist:formlist,
      a1:false
    }
  }


  componentDidMount(){
  }

  touch=(item,index)=>{
    this.state.formlist[index].a1=!this.state.formlist[index].a1
    this.setState({formlist})
  }

  formList=()=>{
    return(
      <View style={{justifyContent:'center',marginVertical:20}}>
        <FlatList style={{}} data={this.state.formlist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <View>
              <TouchableOpacity
                style={{flex:1,borderRadius:10,backgroundColor:'#3F3F3F',
                        width:width*0.9,marginVertical:15}}
                onPress={()=>{this.touch(item,index)}}>
                <View style={{flexDirection:'row',height:width*0.35,borderRadius:10,
                            shadowRadius: 10,shadowColor:'#000000',borderColor:'#000',
                            shadowOpacity: 0.18,elevation:5,backgroundColor:'#3F3F3F',
                            shadowOffset:{height: 2,width:0}}}>
                  <View style={{flex:0.32,}}>
                    <Image source={(item.img)} style={{height:'100%',width:'100%',borderTopLeftRadius:10,
                                                        borderBottomLeftRadius:10}}/>
                  </View>
                  <View style={{flex:0.67,paddingVertical:10}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:16,textAlign:'center',
                              paddingVertical:4,fontWeight:'700'}]}>{item.name}</Text>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,textAlign:'center',
                              paddingVertical:4,fontWeight:'400'}]}>Issued by : {item.issuedby}</Text>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,textAlign:'center',
                            paddingVertical:4,fontWeight:'400'}]}>Issued Date : {item.issuedate}</Text>
                    <Text style={[styles.text,{color:'#fff',fontSize:12,textAlign:'center',
                            paddingVertical:4,fontWeight:'700'}]}>{item.returndate}</Text>
                  </View>
                </View>

                {item.a1&&
                  <View style={{marginVertical:20,alignItems:'center'}}>
                    <TouchableOpacity style={{paddingVertical:8,paddingHorizontal:25,borderRadius:10,
                                              backgroundColor:'#4F4F4F',}}>
                      <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                                    fontWeight:'700'}]}>Request for Extension</Text>
                    </TouchableOpacity>
                  </View>
                }
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        <Headers navigation={this.props.navigation} name={'LIBRARY'} screen={'ProfileLibrary'}/>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ScrollView >
              {this.formList()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLibrary);
