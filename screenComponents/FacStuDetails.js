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
  ToastAndroid,RefreshControl,TouchableWithoutFeedback,TouchableNativeFeedback} from 'react-native';
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,MaterialCommunityIcons,Feather,Octicons,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';
import Chat from '../screenComponents/Chat';


const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor

const faculty = [{img:require('../assets/Unknown_Boy.jpg'),
                  name:'Kizie basu',nameid:'TEA001',sub:'MATHS'},
                {img:require('../assets/Unknown_Boy.jpg'),
                  name:'Soundarya',nameid:'TEA002',sub:'TAMIL'},
                {img:require('../assets/Unknown_Boy.jpg'),
                  name:'Ram',nameid:'TEA003',sub:'SCIENCE'},]

const student = [{img:require('../assets/Unknown_Boy.jpg'),
                  name:'Abishek',nameid:'AAA001',},
                {img:require('../assets/Unknown_Boy.jpg'),
                  name:'Anand',nameid:'AAA002',},
                {img:require('../assets/Unknown_Boy.jpg'),
                  name:'Arthy',nameid:'AAA003',},]

class FacStuDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      faculty:faculty,
      student:student
      }
    }

faculty=()=>{
  return(
    <View style={{}}>
    <FlatList data={this.state.faculty}keyExtractor={(item,index)=>index.toString()}
         renderItem={({item, index})=>(
        <TouchableOpacity
          onPress={()=>{this.props.navigation.navigate('FacStuDetails',{faclty:true})}} style={{flex:1,flexDirection:'row',paddingHorizontal:20,
                alignItems:'center',justifyContent:'space-between',
                paddingVertical:5,marginVertical:20}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={(item.img)} style={{height:width*0.12,width:width*0.12,borderRadius:50}}/>
            <View style={{paddingHorizontal:10}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,
                            fontWeight:'700'}]}>{item.name}</Text>
              <Text style={[styles.text,{color:'#fff',fontSize:14,
                            fontWeight:'700'}]}>{item.nameid}</Text>
            </View>
          </View>
          <View style={{alignItems:'center'}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700'}]}>{item.sub}</Text>
              <MaterialCommunityIcons name='comment-text-outline' size={18} color='#fff'/>
          </View>
        </TouchableOpacity>
      )}/>
    </View>
  )
}

student=()=>{
  return(
    <View style={{}}>
    <FlatList data={this.state.student}keyExtractor={(item,index)=>index.toString()}
         renderItem={({item, index})=>(
        <TouchableOpacity
          onPress={()=>{this.props.navigation.navigate('FacStuDetails',{faclty:true})}} style={{flex:1,flexDirection:'row',paddingHorizontal:20,
                alignItems:'center',justifyContent:'space-between',
                paddingVertical:5,marginVertical:20}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={(item.img)} style={{height:width*0.12,width:width*0.12,borderRadius:50}}/>
            <View style={{paddingHorizontal:10}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,
                            fontWeight:'700'}]}>{item.name}</Text>
              <Text style={[styles.text,{color:'#fff',fontSize:14,
                            fontWeight:'700'}]}>{item.nameid}</Text>
            </View>
          </View>
              <MaterialCommunityIcons name='comment-text-outline' size={18} color='#fff'/>
        </TouchableOpacity>
      )}/>
    </View>
  )
}



  render() {
     const { messages } = this.state;
     const faclty = this.props.navigation.getParam('faclty',false);
     const student = this.props.navigation.getParam('student',false)
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={student?'Student details':'FacStu details'} screen={'FacStuDetails'}/>
            {faclty && <View>{this.faculty()}</View>}
            {student && <View>{this.student()}</View>}
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

export default connect(mapStateToProps, mapDispatchToProps)(FacStuDetails);
