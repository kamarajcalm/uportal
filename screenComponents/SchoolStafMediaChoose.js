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
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily =settings.fontFamily
const semdata=[{name:'CLASS I'},{name:'CLASS VII'},
               {name:'CLASS II'},{name:'CLASS VIII'},
               {name:'CLASS III'},{name:'CLASS IX'},
               {name:'CLASS IV'},{name:'CLASS X'},
               {name:'CLASS V'},{name:'CLASS XI'},
               {name:'CLASS VI'},{name:'CLASS XII'}]

class SchoolStafMediaChoose extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      emailid:'',
      a1:false,
      a2:false,
      semdata:semdata,
    }
  }

  componentDidMount=()=>{
  }


  touch=(item)=>{
      this.props.navigation.navigate('MediaChooseSubject',{scStMeChoose:item})
  }

  render(){
    var schoolAd = this.props.navigation.getParam('schoolAd',null)
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'MEDIA'}
            screen={'SchoolStafMediaChoose'}/>
            <View style={{paddingVertical:50,justifyContent:'center',alignItems:'center'}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                          paddingVertical:15,fontWeight:'700'}]}>CHOOSE CLASS</Text>
              <FlatList
                contenContainerStyle={{justifyContent:'space-between',}}
                data={this.state.semdata}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>(
                  <TouchableOpacity  onPress={()=>{this.touch()}} style={{marginHorizontal:10,marginVertical:15,paddingHorizontal:40,
                          backgroundColor:'#333333',borderRadius:7,width:width*0.38}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                          paddingVertical:10,fontWeight:'700'}]}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              {schoolAd!=null &&<TouchableOpacity     style={{marginHorizontal:10,marginVertical:15,paddingHorizontal:40,
                      backgroundColor:'#333333',borderRadius:7,width:width*0.5}}
                onPress={()=>{this.props.navigation.navigate('SchoolStafMedia')}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                      paddingVertical:10,fontWeight:'700'}]}>OTHERS</Text>
              </TouchableOpacity>}
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolStafMediaChoose);
