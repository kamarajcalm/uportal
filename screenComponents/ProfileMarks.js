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

const semdata=[{no:'#',sub:'SUBJECT',test1:'TEST I',test2:'TEST II',test3:'TEST III',exa:'EXA'},
              {no:'1',sub:'LANGUAGE',test1:'90',test2:'80',test3:'70',exa:'9'},
              {no:'2',sub:'ENGLISH',test1:'80',test2:'70',test3:'90',exa:'8'},
              {no:'3',sub:'MATHEMATICS',test1:'70',test2:'80',test3:'80',exa:'7'},
              {no:'4',sub:'PHYSICS',test1:'80',test2:'70',test3:'70',exa:'6'},
              {no:'5',sub:'EG',test1:'90',test2:'80',test3:'70',exa:'7'},]

class ProfileMarks extends React.Component {

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
      classdata:semdata
      }
    }

 componentDidMount(){
 }

 semResult=()=>{
   return(
     <View style={{marginTop:10,borderRadius:10}}>
        <FlatList style={{}} data={this.state.semdata} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:6,}}>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>{item.no}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.25}}>
              <Text style={{color:'#fff',fontSize:12}}>{item.sub}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>{item.test1}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>{item.test2}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>{item.test3}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:14,textAlign:'center'}}>{item.exa}</Text>
            </View>

          </View>
        )}
        />
        <View>
          <View style={{borderWidth:0.2,borderColor:'#fff',width:'100%'}}/>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:6,}}>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}> </Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.25}}>
              <Text style={{color:'#fff',fontSize:12}}>TOTAL</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>380</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>380</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>380</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:14,textAlign:'center'}}>30</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{borderWidth:0.2,borderColor:'#fff',width:'100%'}}/>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:6,}}>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}></Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.25}}>
              <Text style={{color:'#fff',fontSize:12}}>PERCENTAGE</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>90%</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>90%</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>90%</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:14,textAlign:'center'}}>90</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{borderWidth:0.2,borderColor:'#fff',width:'100%',height:1}}/>
        </View>
        <View style={{marginVertical:10,marginHorizontal:10,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'#fff',paddingVertical:2,paddingHorizontal:2}}>SGPA</Text>
          <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:6}}><Text style={{color:'#fff',paddingVertical:2,paddingHorizontal:4}}>7.7</Text></View>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'#fff',paddingVertical:2,paddingHorizontal:2}}>CGPA</Text>
          <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:6}}><Text style={{color:'#fff',paddingVertical:2,paddingHorizontal:4}}>7.6</Text></View>
          </View>
        </View>
     </View>
   )
 }

 sem=()=>{
   return(
     <View>
      <View style={{borderRadius:10,marginHorizontal:15,marginVertical:10,backgroundColor:'#3c3c3c'}}>
        <TouchableOpacity style={{height:width*0.35,alignItems:'center',justifyContent:'center',shadowOpacity: 0.18,elevation:5,backgroundColor:'#3c3c3c',shadowColor:'#000',borderRadius:10,shadowOffset: {height: 2,width:0}}} onPress={()=>{this.setState({a1:!this.state.a1,a2:false})}}>
            <Image source={require('../assets/Unknown_Boy.jpg')} style={{height:'100%',width:'100%',borderRadius:10,zIndex:0}}/>
            <View style={{alignSelf:'center',position:'absolute',alignItems:'center',justifyContent:'center',zIndex:1}}>
              <Text style={{color:'#000',fontSize:20}}>SEMESTER I</Text>
              <FontAwesome name='angle-down' size={20} color='#000'/>
            </View>
        </TouchableOpacity>
        {this.state.a1&&
          <ScrollView style={{backgroundColor:'#3c3c3c',borderRadius:10,paddingVertical:10}}>
              {this.semResult()}
          </ScrollView>
        }
      </View>
     </View>
   )
 }
 classResult=()=>{
   return(
     <View style={{marginTop:10,borderRadius:10}}>
        <FlatList style={{}} data={this.state.classdata} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:6,}}>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>{item.no}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.25}}>
              <Text style={{color:'#fff',fontSize:12}}>{item.sub}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>{item.test1}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>{item.test2}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>{item.test3}</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:14,textAlign:'center'}}>{item.exa}</Text>
            </View>

          </View>
        )}
        />
        <View>
          <View style={{borderWidth:0.2,borderColor:'#fff',width:'100%'}}/>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:6,}}>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}> </Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.25}}>
              <Text style={{color:'#fff',fontSize:12}}>TOTAL</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>380</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>380</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>380</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:14,textAlign:'center'}}>30</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{borderWidth:0.2,borderColor:'#fff',width:'100%'}}/>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:6,}}>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}></Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.25}}>
              <Text style={{color:'#fff',fontSize:12}}>PERCENTAGE</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>90%</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>90%</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>90%</Text>
            </View>
            <View style={{borderWidth:0.2,height:40,borderColor:'#fff',paddingVertical:-6}}/>
            <View style={{flex:0.13}}>
              <Text style={{color:'#fff',fontSize:14,textAlign:'center'}}>90</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{borderWidth:0.2,borderColor:'#fff',width:'100%',height:1}}/>
        </View>
        <View style={{marginVertical:10,marginHorizontal:10,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'#fff',paddingVertical:2,paddingHorizontal:2}}>SGPA</Text>
          <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:6}}><Text style={{color:'#fff',paddingVertical:2,paddingHorizontal:4}}>7.7</Text></View>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'#fff',paddingVertical:2,paddingHorizontal:2}}>CGPA</Text>
          <View style={{borderWidth:0.2,borderColor:'#fff',marginHorizontal:6}}><Text style={{color:'#fff',paddingVertical:2,paddingHorizontal:4}}>7.6</Text></View>
          </View>
        </View>
     </View>
   )
 }

 classes=()=>{
   return(
     <View>
      <View style={{borderRadius:10,marginHorizontal:15,marginVertical:10,backgroundColor:'#3c3c3c'}}>
        <TouchableOpacity style={{height:width*0.35,alignItems:'center',justifyContent:'center',shadowOpacity: 0.18,elevation:5,backgroundColor:'#3c3c3c',shadowColor:'#000',borderRadius:10,shadowOffset: {height: 2,width:0}}} onPress={()=>{this.setState({a2:!this.state.a2,a1:false})}}>
            <Image source={require('../assets/Unknown_Boy.jpg')} style={{height:'100%',width:'100%',borderRadius:10,zIndex:0}}/>
            <View style={{alignSelf:'center',position:'absolute',alignItems:'center',justifyContent:'center',zIndex:1}}>
              <Text style={{color:'#000',fontSize:20}}>CLASS XII</Text>
              <FontAwesome name='angle-down' size={20} color='#000'/>
            </View>
        </TouchableOpacity>
        {this.state.a2&&
          <View style={{alignItems:'center',backgroundColor:'#3c3c3c',paddingVertical:10,marginVertical:10}}>
              {this.classResult()}
          </View>
        }
      </View>
     </View>
   )
 }

  render() {
    const receivedValue = this.props.navigation.getParam('receivedValue', () => {});
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <Headers navigation={this.props.navigation} name={'ACADEMIC MARKS'}
            screen={'ProfileMarks'}/>
            <View style={{flex:1,paddingVertical:20}}>
              <View>
              <Text style={{color:'#fff',fontSize:20,textAlign:'center',paddingVertical:10}}>ENGINEERING</Text>
              {this.sem()}
              <Text style={{color:'#fff',fontSize:20,textAlign:'center',paddingVertical:10}}>SCHOOL</Text>
              {this.classes()}
              </View>

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
});

const mapStateToProps =(state) => {
    return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMarks);
