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
  Feather,Octicons,MaterialIcons,Ionicons,
  FontAwesome5,AntDesign} from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';
import HttpsClient from '../helpers/HttpsClient';
import Modal from "react-native-modal";
import Swiper from 'react-native-swiper';
import Notes from '../screenComponents/Notes';
import Chat from '../screenComponents/Chat';
import TimeAgo from 'react-native-timeago';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily = settings.fontFamily

const warriorsmodallist=[{name:'Tom Banton'},{name:'Baristow (wk)'},{name:'Malan'},
                         {name:'Billings'},{name:'Moeen (c)'},{name:'J Denly'},
                         {name:'Chris jordan'},{name:'Tom curron'},{name:'Adil Rashid'},
                         {name:'Jofra Archer'},{name:'Mark Wood'},]


const timeline = [
              {img:require('../assets/Unknown_Boy.jpg'),name:'Stanly',dest:'PES UNIVERCITY',
              like:0,date:new Date(),comment:false,share:false,dot:false,
              desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},

              {img:require('../assets/Unknown_Boy.jpg'),name:'Stanly',dest:'PES UNIVERCITY',
              like:0,date:new Date(),comment:false,share:false,dot:false,
              descimg:require('../assets/robot.jpg'),shortdesc:'Lorem ipsum dolor sit amet, consectetur ipsum dolor sit amet, consectetur adipiscing elit'},

              {img:require('../assets/Unknown_Boy.jpg'),name:'Stanly',dest:'PES UNIVERCITY',
              like:0,date:new Date("2015-06-21"),comment:false,share:false,dot:false,
              descimg:require('../assets/robo.jpg'),shortdesc:'Lorem ipsum dolor sit amet, consectetur ipsum dolor sit amet, consectetur adipiscing elit'},

              {img:require('../assets/Unknown_Boy.jpg'),name:'Stanly',dest:'PES UNIVERCITY',
              like:0,date:new Date("2020-06-21"),comment:false,share:false,dot:false,
              desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}]

const imag=[{img:require('../assets/marks.png'),name:'Whatsapp'},
            {img:require('../assets/marks.png'),name:'Facebook'},
            {img:require('../assets/marks.png'),name:'Instagram'},
            {img:require('../assets/marks.png'),name:'Mail'},]

const index=1

class Home extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      like:0,
      imag:imag,
      timelinepost:'',
      timeline:timeline,
      comment:'',
      warriorsmodallist:warriorsmodallist,
      lionsmodallist:warriorsmodallist,
      lionsmodel:false,
      warriorsmodel:false,
      share:false,
      index:1,
      }
    }

  componentDidMount=async()=>{
    let collegeStud = this.props.navigation.getParam('collegeStud',false);
    console.log(collegeStud,'collegeStud');
    let schoolStud = this.props.navigation.getParam('schoolStud',false);
    console.log(schoolStud,'schoolStud');
    let schoolAd = this.props.navigation.getParam('schoolAd',false);
    console.log(schoolAd,'schoolAd');
    let collegeAd = this.props.navigation.getParam('collegeAd',false);
    console.log(collegeAd,'collegeAd');
    let schoolStaf = this.props.navigation.getParam('schoolStaf',false);
    console.log(schoolStaf,'schoolStaf');
    let collegeStaf = this.props.navigation.getParam('collegeStaf',false);
    console.log(collegeStaf,'collegeStaf');
    AsyncStorage.setItem("collegeStud", JSON.stringify(collegeStud));
    AsyncStorage.setItem("schoolStud", JSON.stringify(schoolStud));
    AsyncStorage.setItem("schoolAd", JSON.stringify(schoolAd));
    AsyncStorage.setItem("collegeAd", JSON.stringify(collegeAd));
    AsyncStorage.setItem("schoolStaf", JSON.stringify(schoolStaf));
    AsyncStorage.setItem("collegeStaf", JSON.stringify(collegeStaf));
  }

  like=(item,index)=>{
    this.state.timeline[index].like=this.state.timeline[index].like+1
    this.setState({timeline:this.state.timeline})
  }
  comment=(item,index)=>{
    this.state.timeline[index].comment=!this.state.timeline[index].comment
    this.setState({timeline})
  }

  share=(item,index)=>{
    this.state.timeline[index].share=!this.state.timeline[index].share
    this.setState({timeline})
  }

  dot=(item,index)=>{
    this.state.timeline[index].dot=!this.state.timeline[index].dot
    this.setState({timeline})
  }


  homeTimeLine=()=>{
    return(
      <View style={{flex:1}}>
        <FlatList style={{paddingBottom:100}}
          data={this.state.timeline} keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <View style={{flex:1,justifyContent:'center',paddingHorizontal:width*0.04,marginVertical:8}}>
            <View style={{justifyContent:'space-between',borderWidth:1,
                        flexDirection:'row',alignItems:'center'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{width:width*0.15,height:width*0.15}}>
                  <Image source={(item.img)} style={{width:'100%',height:'100%',borderRadius:30}} />
                </View>
                <View style={{paddingHorizontal:10}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'600'}]}
                        numberOfLines={1}>{item.name}</Text>
                  <Text style={[styles.text,{color:'#fff',fontSize:12,fontWeight:'600'}]}
                        numberOfLines={1}>{item.dest}</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Ionicons name={'md-time'} size={12} color={'#828282'}/>
                    <TimeAgo time={(item.date)}hideAgo={false}interval={60000} style={[styles.text,{color:'#828282',fontSize:12,fontWeight:'600',
                            paddingHorizontal:6}]}/>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={()=>{this.dot(item,index)}}style={{padding:10}}>
                <MaterialCommunityIcons name="dots-vertical" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            {item.dot&&<View>{this.dotModal(item,index)}</View>}

            <View style={{height:width*0.4,borderWidth:1,marginTop:6}}>
              {item.desc &&
                <View>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'400'}]} numberOfLines={5}>{item.desc}</Text>
                  <TouchableWithoutFeedback>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,
                          paddingVertical:6,fontWeight:'600'}]}>Read more</Text>
                  </TouchableWithoutFeedback>
                </View>
              }
              {item.dest &&
                <View>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,paddingBottom:6,
                        fontWeight:'400'}]} numberOfLines={2}>{item.shortdesc}</Text>
                  <View style={{height:width*0.3}}>
                    <Image source={(item.descimg)} style={{height:'100%',width:'100%'}}/>
                  </View>
                </View>
              }
            </View>
            {item.like!=0&&
            <Text style={[styles.text,{color:'#828282',paddingVertical:10,
                    fontSize:12,fontWeight:'600'}]}>{item.like} like</Text>
            }

            <View style={{justifyContent:'space-between',borderWidth:1,flexDirection:'row',
                        alignItems:'center',marginVertical:15,marginHorizontal:12,paddingVertical:6}}>
              <TouchableOpacity style={{flexDirection:'row'}}
                  onPress={()=>{this.like(item,index)}}>
                <AntDesign name='like1' size={20} color='#fff'/>
                <Text style={{color:'#fff',fontSize:14,paddingHorizontal:4}}>LIKE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row'}}
                  onPress={()=>{this.comment(item,index)}}>
                <FontAwesome5 name='comment-alt' size={20} color='#fff'/>
                <Text style={[styles.text,{color:'#fff',fontSize:14,paddingHorizontal:4,fontWeight:'600'}]}>COMMENT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row'}}
                  onPress={()=>{this.share(item,index)}}>
                <Feather name='share-2' size={20} color='#fff'/>
                <Text style={[styles.text,{color:'#fff',fontSize:14,paddingHorizontal:4,
                        fontWeight:'600'}]}>SHARE</Text>
              </TouchableOpacity>
            </View>

            {item.comment&&
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',
                          paddingHorizontal:10,alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>
                  <Image source={(item.img)} style={{height:width*0.1,width:width*0.1,borderRadius:30}}/>
                  <TextInput
                      style={{borderWidth:0,marginHorizontal:6,
                              borderColor:'#000',width:width*0.6,borderRadius:10,
                              color:'#fff',paddingHorizontal:15,backgroundColor:'#2F2F2F'}}
                      placeholder="Type your comments here..."
                      placeholderTextColor={'#828282'}
                      selectionColor={'#fff'}
                      onChangeText={(comments)=> this.setState({ comments})}
                      value={this.state.comments}
                  />
                </View>
                <MaterialIcons name='navigate-next' size={20} color='#fff'/>
              </View>
            }
            {item.share&&<View>{this.shareModal(item,index)}</View>}
          </View>
        )}
        />
      </View>
    )
  }

  timelinePost=()=>{
    return(
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',paddingHorizontal:25,marginVertical:8}}>
          <Image source={require('../assets/Unknown_Boy.jpg')}  style={{height:width*0.14,width:width*0.14,borderRadius:30}}/>
          <TextInput
            style={{borderWidth:0,borderColor:'#000',width:width*0.6,
                    borderRadius:0,color:'#000',paddingHorizontal:15}}
            placeholder="Whats on your mind?"
            placeholderTextColor={'#7A7A7A'}
            selectionColor={'#fff'}
            onChangeText={()=> this.setState({ timelinepost})}
            value={this.state.timelinepost}
          />
        </View>
      </View>
    )
  }

  timeline2=()=>{
    return(
      <View>
        <View style={{flexDirection:'row',marginTop:0,justifyContent:'space-between',
                  backgroundColor:'#141414',paddingHorizontal:30,
                  paddingVertical:15,alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>
            <Image source={require('../assets/photovideo.png')} style={{height:width*0.07,width:width*0.07,}}/>
            <Text style={[styles.text,{color:'#fff',paddingHorizontal:6,fontWeight:'700',fontSize:14}]}>PHOTO/VIDEOS</Text>
          </View>
          <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.props.navigation.navigate('MyWallScreen')}}>
            <Image source={require('../assets/feed.png')} style={{height:width*0.07,width:width*0.07,}}/>
            <Text style={[styles.text,{color:'#fff',paddingHorizontal:6,fontWeight:'700',fontSize:14}]}>MY WALL</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }



  shareModal=(item,index)=>{
    return(
      <View>
        <Modal isVisible={item.share}animationIn="slideInUp"
            animationOut="slideOutDown" hasBackdrop={true}
            backdropColor={'transparent'} onBackdropPress={()=>{this.share(item,index)}}>
            <View style={{paddingVertical:20,alignItems:'center',position:'absolute',bottom:0,
                          left:0,right:0,paddingHorizontal:20,
                          backgroundColor:'#000',borderRadius:10,width:width,
                          marginHorizontal:-20,marginVertical:-20}}>
              <View style={{}}>
                <Text style={[styles.text,{color:'gray',fontSize:16,textAlign:'left'}]}>SHARE</Text>
                <FlatList
                  data={this.state.imag}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  renderItem={({item, index})=>(
                  <TouchableOpacity style={{flex:1,justifyContent:'center',
                              paddingVertical:20,marginHorizontal:20}}>
                    <Image source={(item.img)}
                          style={{height:width*0.15,width:width*0.15,}}/>
                    <Text style={[styles.text,{color:'#fff',
                                  fontSize:16,textAlign:'left'}]}>{item.name}</Text>
                  </TouchableOpacity>
                  )}
                />
              </View>
            </View>
        </Modal>
      </View>
    )
  }

  dotModal=(item,index)=>{
    return(
      <View>
        <View style={{paddingVertical:0,alignItems:'center',position:'absolute',top:-4,right:10,
                      paddingHorizontal:0,backgroundColor:'#333333',borderRadius:0,zIndex:1}}>
          <View style={{}}>
            <Text style={[styles.text,
                      {color:'#fff',fontSize:16,textAlign:'center',
                      padding:10,paddingHorizontal:20}]}>Turn on post notification</Text>
              <View style={{borderWidth:0.5,borderColor:'#5b5a5a'}}/>
              <Text style={[styles.text,{color:'#fff',fontSize:16,
                    textAlign:'center',padding:10}]}>Delete</Text>
              <View style={{borderWidth:0.5,borderColor:'#5b5a5a'}}/>
              <Text style={[styles.text,
                          {color:'red',fontSize:16,textAlign:'center',padding:10}]}>Report</Text>
          </View>
        </View>
      </View>
    )
  }

  home=()=>{
    return(
      <View>
        <Headers navigation={this.props.navigation} name={'Universal wall'} screen={'Home'}/>
        <View style={{flex:1,}}>
          <ScrollView stickyHeaderIndices={[1]}>
            {this.timelinePost()}
            {this.timeline2()}
            {this.homeTimeLine()}
          </ScrollView>
        </View>
      </View>
    )
  }


  _onScrollBeginDrag(e) {
      console.log(e) // Logs 'dragging'
  }

  _onScrollSettlingDrag(e) {
      console.log(e) // Logs 'settling'
  }

  _onScrollEndDrag(e) {
      console.log(e) // Logs 'idle'
  }

  render(){

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        <Swiper style={{}}
                onScrollBeginDrag={this._onScrollBeginDrag.bind(this)}
                onScrollSettlingDrag={this._onScrollSettlingDrag.bind(this)}
                onScrollEndDrag={this._onScrollSettlingDrag.bind(this)}
                showsButtons={true} loop={false}
                buttonWrapperStyle ={{backgroundColor:'transparent',flexDirection:'row',
                                    position: 'absolute',top:0,left:0,flex:1,
                                    paddingHorizontal:10,paddingVertical:10,
                                    justifyContent: 'space-between',alignItems:'center'}}
                prevButton={this.state.index==2?<Text style={[styles.text1,{transform:[{rotate:'270 deg'}],}]}>BACK</Text>:<Text style={[styles.text1,{transform:[{rotate:'270 deg'}],}]}>NOTES</Text>}

                nextButton={this.state.index==0?<Text style={[styles.text1,{transform:[{rotate:'90 deg'}],}]}>BACK</Text>:<Text style={[styles.text1,{transform:[{rotate:'90 deg'}],}]}>CHATS</Text>}

                disablePrevButton={false}
                scrollEnabled={true}
                disableNextButton={false}
                onIndexChanged={(index)=>{this.setState({index})}}
                index={index}>
                <View style={styles.slide1}>
                    <Notes navigation={this.props.navigation}/>
                </View>
                <View style={styles.slide2}>
                    {this.home()}
                </View>
                <View style={{}}>
                  <View>
                    <Headers navigation={this.props.navigation} name={'Chats'} screen={'Chat'}/>
                    <Chat />
                  </View>
                </View>
        </Swiper>
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
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  text1: {
    fontStyle:'normal',
    fontFamily:fontFamily,
    lineHeight:22,
    backgroundColor:'#2f2f2f',
    paddingHorizontal:20,
    borderRadius:10,
    marginHorizontal:-40,
    color:'#fff',
    fontSize:14,
    fontWeight:'700',
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
