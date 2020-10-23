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
const fontFamily=settings.fontFamily


const syllabusdetails = [{term:'TERM I',chap1:'Chapter 1 : Shapes and space',
                         chap2:'Chapter 2 : Number from one to nine',
                         chap3:'Chapter 3 : Addition',comm:'COMMENT',
                         comments:'addition till page no 29'},]



const syllabusdata = [{a1:false,name:'MATHEMATICS',pk:1,edit:false,createnew:false,
                      img:require('../assets/Unknown_Boy.jpg'),syllabusdetails:syllabusdetails},
                      {a1:false,name:'ENGLISH',pk:2,edit:false,createnew:false,
                      img:require('../assets/Unknown_Boy.jpg'),syllabusdetails:syllabusdetails},
                      {a1:false,name:'HINDI',pk:3,edit:false,createnew:false,
                      img:require('../assets/Unknown_Boy.jpg'),syllabusdetails:syllabusdetails},]




class Syllabus extends React.Component{

  static navigationOptions=({navigation})=>{
    const {params={}}=navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      itemIndex:1,
      syllabusdata:syllabusdata,
      }
    }

  componentDidMount(){
  }

  touch=(item,index)=>{
    this.state.syllabusdata[index].a1=!this.state.syllabusdata[index].a1
    this.setState({syllabusdata})
    if(this.state.syllabusdata[index].a1==true){
      this.setState({itemIndex:item.pk})
    }else{
    }
    console.log(this.state.open,'open')
  }

  save=(item,index)=>{
    this.state.syllabusdata[index].edit=!this.state.syllabusdata[index].edit
    this.setState({syllabusdata})
    console.log(this.state.syllabusdata,'this.state.syllabusdata')
  }

  createNew=(item,index)=>{
    this.state.syllabusdata[index].createnew=!this.state.syllabusdata[index].createnew
    this.setState({syllabusdata})
    console.log(this.state.syllabusdata,'this.state.syllabusdata')
  }
  cancelsave=(item,index)=>{
    this.state.syllabusdata[index].edit=!this.state.syllabusdata[index].edit
    this.state.syllabusdata[index].createnew=!this.state.syllabusdata[index].createnew
    this.setState({syllabusdata})
  }

  syllabusDetails=(item,index)=>{
    console.log(item.syllabusdetails,'item.syllabusdetails')
    var edit=item.edit;
    var createnew=item.createnew;
    return(
      <View style={{marginTop:10,borderRadius:10}}>
        <FlatList style={{}} data={item.syllabusdetails}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={({item,index})=>(
          <View>
            <View style={{flex:1,flexDirection:'row',paddingBottom:10,
                    justifyContent:'space-between',paddingHorizontal:6,}}>
              <View style={{flex:0.3,justifyContent:'flex-start',paddingVertical:10}}>
                  <TextInput style={{height: 45,borderWidth:1,
                        borderColor:edit==true?createnew==true?'#3F3F3F':'#fff':'#3F3F3F',
                        alignSelf:'center',width:'100%',borderRadius:7,
                        color:'#fff',marginVertical:0,
                        paddingHorizontal:15,backgroundColor:'transperent'}}
                        editable={edit==true?createnew==true?false:true:false}
                        placeholder=""
                        selectionColor={'#000'}
                        onChangeText={term => {this.setState({term:term})}}
                        value={item.term}
                  />
              </View>
              <View style={{flex:0.7,paddingHorizontal:0,paddingTop:10}}>
                <TextInput style={{height: 45,borderWidth:1,
                      borderColor:edit==true?createnew==true?'#3F3F3F':'#fff':'#3F3F3F',
                      alignSelf:'center',width:'100%',borderRadius:7,
                      color:'#fff',marginVertical:0,
                      paddingHorizontal:15,backgroundColor:'transperent'}}
                      editable={edit==true?createnew==true?false:true:false}
                      placeholder=""
                      selectionColor={'#000'}
                      onChangeText={chap1 => {this.setState({chap1:chap1})}}
                      value={item.chap1}
                />
                <TextInput style={{height: 45,borderWidth:1,
                      borderColor:edit==true?createnew==true?'#3F3F3F':'#fff':'#3F3F3F',
                      alignSelf:'center',width:'100%',borderRadius:7,
                      color:'#fff',marginVertical:0,
                      paddingLeft:15,backgroundColor:'transperent'}}
                      editable={edit==true?createnew==true?false:true:false}
                      placeholder=""
                      selectionColor={'#000'}
                      onChangeText={chap2 => {this.setState({chap2:chap2})}}
                      value={item.chap2}
                />
                <TextInput style={{height: 45,borderWidth:1,
                      borderColor:edit==true?createnew==true?'#3F3F3F':'#fff':'#3F3F3F',
                      alignSelf:'center',width:'100%',borderRadius:7,
                      color:'#fff',marginVertical:0,
                      paddingHorizontal:15,backgroundColor:'transperent'}}
                      editable={edit==true?createnew==true?false:true:false}
                      placeholder=""
                      selectionColor={'#000'}
                      onChangeText={chap3 => {this.setState({chap3:chap3})}}
                      value={item.chap3}
                />
              </View>
            </View>
            {createnew==true?<View>
              <View style={{flex:1,flexDirection:'row',paddingBottom:10,
                      justifyContent:'space-between',paddingHorizontal:6,}}>
                <View style={{flex:0.3,justifyContent:'flex-start',paddingVertical:10}}>
                    <TextInput style={{height: 45,borderWidth:1,
                          borderColor:edit==true?'#fff':'#3F3F3F',alignSelf:'center',
                          width:'100%',borderRadius:7,color:'#fff',marginVertical:0,
                          paddingHorizontal:15,backgroundColor:'transperent'}}
                          editable={edit==true?true:false}
                          placeholder=""
                          selectionColor={'#000'}
                          onChangeText={term => {this.setState({term:term})}}
                          value={this.state.term}
                    />
                </View>
                <View style={{flex:0.7,paddingHorizontal:10,paddingTop:10}}>
                  <TextInput style={{height: 45,borderWidth:1,
                        borderColor:edit==true?'#fff':'#3F3F3F',alignSelf:'center',
                        width:'100%',borderRadius:7,color:'#fff',marginVertical:0,
                        paddingHorizontal:15,backgroundColor:'transperent'}}
                        editable={edit==true?true:false}
                        placeholder=""
                        selectionColor={'#000'}
                        onChangeText={chap1 => {this.setState({chap1:chap1})}}
                        value={this.state.chap1}
                  />
                  <TextInput style={{height: 45,borderWidth:1,
                        borderColor:edit==true?'#fff':'#3F3F3F',alignSelf:'center',
                        width:'100%',borderRadius:7,color:'#fff',marginVertical:0,
                        paddingHorizontal:15,backgroundColor:'transperent'}}
                        editable={edit==true?true:false}
                        placeholder=""
                        selectionColor={'#000'}
                        onChangeText={chap2 => {this.setState({chap2:chap2})}}
                        value={this.state.chap2}
                  />
                  <TextInput style={{height: 45,borderWidth:1,
                        borderColor:edit==true?'#fff':'#3F3F3F',alignSelf:'center',
                        width:'100%',borderRadius:7,color:'#fff',marginVertical:0,
                        paddingHorizontal:15,backgroundColor:'transperent'}}
                        editable={edit==true?true:false}
                        placeholder=""
                        selectionColor={'#000'}
                        onChangeText={chap3 => {this.setState({chap3:chap3})}}
                        value={this.state.chap3}
                  />
                </View>
              </View>
              </View>:<View></View>}
              <View style={{flex:1,flexDirection:'row',alignItems:'center',
                      justifyContent:'space-between',paddingHorizontal:6,}}>
                <View style={{flex:0.3,justifyContent:'center',paddingVertical:10}}>
                  <Text style={[styles.text,{fontSize:16,fontWeight:'700',textAlign:'left',
                        color:'#fff',paddingHorizontal:10}]}>{item.comm}</Text>
                </View>
                <View style={{flex:0.7,paddingHorizontal:0,paddingTop:0}}>
                  <TextInput style={{height: 45,borderWidth:1,
                    borderColor:edit==true?'#fff':'#3F3F3F',alignSelf:'center',
                    width:'100%',borderRadius:7,color:'#fff',marginVertical:0,
                    paddingHorizontal:15,backgroundColor:'transperent'}}
                    editable={edit==true?true:false}
                    placeholder=""
                    selectionColor={'#000'}
                    onChangeText={comments => {this.setState({comments:comments})}}
                    value={item.comments}
                  />
                </View>
            </View>
          </View>
        )}
        />
        {item.edit==true&&<View>
          {item.createnew==true?<View style={{padding:4,width:'100%',flexDirection:'row',alignItems:'center',
                  justifyContent:'space-between',marginTop:10,paddingHorizontal:10}}>
            <TouchableOpacity style={{alignSelf:'flex-start'}}
                onPress={()=>{this.cancelsave(item,index)}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                  fontWeight:'700',textAlign:'left'}]}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'flex-end'}}
                  onPress={()=>{this.cancelsave(item,index)}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,
                  fontWeight:'700',textAlign:'right'}]}>SAVE</Text>
            </TouchableOpacity>
            </View>:<View style={{padding:4 ,alignSelf:'center'}}>
            <TouchableOpacity style={{marginBottom:10}}
                  onPress={()=>{this.save(item,index)}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,
                    fontWeight:'700',textAlign:'center'}]}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:10}}
                  onPress={()=>{this.createNew(item,index)}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,
                    fontWeight:'700',textAlign:'center'}]}>CREATE NEW</Text>
            </TouchableOpacity>
          </View>}
        </View>}
      </View>
    )
  }

  edit=(item,index)=>{
    this.state.syllabusdata[index].edit=!this.state.syllabusdata[index].edit
    this.setState({syllabusdata})
    console.log(this.state.syllabusdata,'edit:false,')
  }

  syllabus=()=>{
    return(
      <View style={{marginVertical:10}}>
        <FlatList style={{}} data={this.state.syllabusdata}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={({item,index})=>(
            <View style={{borderRadius:10,marginHorizontal:15,marginVertical:10,
                          backgroundColor:'#3F3F3F'}}>
              <TouchableOpacity
                  style={{height:width*0.35,alignItems:'center',justifyContent:'center',
                          shadowOpacity:0.18,elevation:5,backgroundColor:'#3F3F3F',
                          shadowColor:'#000',borderRadius:10,shadowOffset:{height:2,width:0}}}
                  onPress={()=>{this.touch(item,index)}}>
                <Image source={(item.img)}
                       style={{height:'100%',width:'100%',borderRadius:10,zIndex:0,opacity:0.5}}/>
                <View style={{alignSelf:'center',position:'absolute',alignItems:'center',
                        justifyContent:'center',zIndex:1}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:16,
                          fontWeight:'700'}]}>{item.name}</Text>
                  <FontAwesome name='angle-down' size={20} color='#fff'/>
                </View>
                {(item.a1&&item.pk==this.state.itemIndex)&&
                <TouchableOpacity style={{position:'absolute',bottom:10,right:10,
                                          flexDirection:'row',alignItems:'center'}}
                    onPress={()=>{this.edit(item,index)}}>
                  <AntDesign name={'edit'} color={'#fff'} size={16}/>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,
                                fontWeight:'700',paddingLeft:6}]}>EDIT</Text>
                </TouchableOpacity>}
              </TouchableOpacity>
              {(item.a1&&item.pk==this.state.itemIndex)&&
                <ScrollView style={{backgroundColor:'#3F3F3F',borderRadius:10,paddingVertical:10}}>
                  {this.syllabusDetails(item,index)}
                </ScrollView>
              }
            </View>
          )}
        />
      </View>
    )
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#000'}}>
        <View style={{backgroundColor:'#000'}}>
          {this.syllabus()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Syllabus);
