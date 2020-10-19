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

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily = settings.fontFamily
const depatlist=[{depat:'AE'},{depat:'EC'},
                  {depat:'CsE'},{depat:'AE'},
                  {depat:'EC'},{depat:'CsE'},
                  {depat:'TGR'},{depat:'AE'},
                  {depat:'EC'},{depat:'CsE'},]
const classes=[{depat:'CLASS I'},{depat:'CLASS VII'},
                  {depat:'CLASS II'},{depat:'CLASS VIII'},
                  {depat:'CLASS III'},{depat:'CLASS IX'},
                  {depat:'CLASS IV'},{depat:'CLASS X'},
                  {depat:'CLASS V'},{depat:'CLASS XI'},
                  {depat:'CLASS VI'},{depat:'CLASS XII'}]

class ProfileFacultyDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      depatlist:depatlist,
      a1:false,
      classes:classes,
      }
    }

 componentDidMount(){
 }

  touch=(item,index)=>{
    this.props.navigation.navigate('PFacultyDetailsCarousel')
  }

  depatList=(school)=>{
    return(
      <View style={{justifyContent:'center',marginVertical:20}}>
        <FlatList style={{}} data={school!=null?this.state.classes:this.state.depatlist}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
            <View style={{marginVertical:0}}>
              <TouchableOpacity
                style={{backgroundColor:'#333333',width:width*0.3,paddingHorizontal:20,
                borderRadius:10,paddingVertical:15,alignItems:'center',margin:10}}
                onPress={()=>{this.touch(item,index)}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                            fontWeight:'700',textAlign:'center'}]}>{item.depat}</Text>

              </TouchableOpacity>

          </View>
        )}/>
      </View>
    )
  }

  render() {
    var school = this.props.navigation.getParam('school',null)
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'FACULTY DETAILS'} screen={'ProfileFacultyDetails'}/>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <ScrollView style={{paddingVertical:10}}>
                  {school!=null&&<Text style={[styles.text,{color:'#fff',fontSize:14,
                        fontWeight:'700',textAlign:'center'}]}>CHOOSE CLASS</Text>}
                  {this.depatList(school)}
                  <TouchableOpacity
                    style={{backgroundColor:'#333333',width:width*0.3,
                            paddingHorizontal:20,borderRadius:10,paddingVertical:15,
                            alignItems:'center',margin:10,alignSelf:'center'}}
                    onPress={()=>{this.touch()}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,
                                fontWeight:'700',textAlign:'center'}]}>OTHERS</Text>
                  </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFacultyDetails);
