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
import {Fontisto, FontAwesome,Entypo,SimpleLineIcons,
  MaterialCommunityIcons,Feather,Octicons,
  MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';

import SwitchSelector from "react-native-switch-selector";
import {ScrollableTabView,DefaultTabBar,
  ScrollableTabBar} from '@valdio/react-native-scrollable-tabview';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Modal from "react-native-modal";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const fontFamily = settings.fontFamily
const warriors1inning=[{id:1,batsman:'Batsman',batsmansome:'',Rs:'R',Bs:'Bs',s4:'4s',s6:'6s'},
                       {id:2,batsman:'Tom Banton',batsmansome:'c Wade b Hazlewood',Rs:'2',Bs:'6',s4:'6',s6:'6'},
                       {id:3,batsman:'Baristow (wk)',batsmansome:'c & b Hazlewood',Rs:'55',Bs:'44',s4:'44',s6:'44'},
                       {id:4,batsman:'Malan',batsmansome:'c Wade b Hazlewood',Rs:'21',Bs:'18',s4:'18',s6:'18'},
                       {id:5,batsman:'Billings',batsmansome:'c & b Hazlewood',Rs:'4',Bs:'21',s4:'21',s6:'21'},
                       {id:6,batsman:'Moeen (c)',batsmansome:'c Wade b Hazlewood ',Rs:'23',Bs:'9',s4:'9',s6:'9'},
                       {id:7,batsman:'J Denly',batsmansome:'c & b Hazlewood',Rs:'29',Bs:'21',s4:'21',s6:'21'},
                       {id:8,batsman:'Chris jordan',batsmansome:'c Wade b Hazlewood',Rs:'4',Bs:'23',s4:'23',s6:'23'},
                       {id:9,batsman:'Tom curron',batsmansome:'c & b Hazlewood',Rs:'4',Bs:'23',s4:'23',s6:'23'},
                       {id:10,batsman:'Adil Rashid',batsmansome:'c Wade b Hazlewood',Rs:'6',Bs:'4',s4:'4',s6:'4'},
                       {id:11,batsman:'Jofra Archer',batsmansome:'c & b Hazlewood',Rs:'7',Bs:'1',s4:'1',s6:'1'},
                       {id:12,batsman:'Mark Wood',batsmansome:'c Wade b Hazlewood',Rs:'6',Bs:'1',s4:'1',s6:'1'},]

const lions1inning=[{id:1,batsman:'Bowlers',od:'O',ms:'M',rs:'R',ws:'S',nb:'NB',wd:'WD',eco:'ECO'},
                    {id:2,batsman:'Starc',od:'4',ms:'0',rs:'6',ws:'6',nb:'133.0',wd:'133.0',eco:'133.0'},
                    {id:3,batsman:'Hazlewood',od:'4',ms:'0',rs:'44',ws:'44',nb:'33.33',wd:'33.33',
                    eco:'33.33'},
                    {id:4,batsman:'Kane',od:'4',ms:'0',rs:'18',ws:'18',nb:'116.22',wd:'116.22',eco:'116.22'},
                    {id:5,batsman:'Agar',od:'4',ms:'0',rs:'21',ws:'21',nb:'116.22',wd:'116.22',eco:'116.22'},
                    {id:6,batsman:'Bowlers',od:'4',ms:'0',rs:'9',ws:'9',nb:'116.22',wd:'116.22',eco:'116.22'}]

const warriorsmodallist=[{name:'Tom Banton'},{name:'Baristow (wk)'},{name:'Malan'},
                         {name:'Billings'},{name:'Moeen (c)'},{name:'J Denly'},
                         {name:'Chris jordan'},{name:'Tom curron'},{name:'Adil Rashid'},
                         {name:'Jofra Archer'},{name:'Mark Wood'},]

class PageThird extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };


  constructor(props) {
    super(props);
    this.state={
      openView:false,
      warriors1inning:warriors1inning,
      lions1inning:lions1inning,
      activeSlide:0,
      warriorsmodallist:warriorsmodallist,
      lionsmodallist:warriorsmodallist
    }
  }

  cricketView=()=>{
    return(
      <View style={{backgroundColor:'#333333',paddingVertical:15,paddingHorizontal:15,
                    marginHorizontal:15,marginVertical:20,}}>
        <TouchableOpacity style={{borderWidth:0,}}
          onPress={()=>{this.setState({openView:!this.state.openView})}}>
          <View style={{borderWidth:0,flexDirection:'row',alignItems:'center',
                        justifyContent:'space-between'}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}  onPress={()=>{this.setState({warriorsmodel:true})}}>
              <Image source={require('../assets/warriors.jpeg')} style={{height:width*0.15,width:width*0.15}}/>
              <Text style={[styles.text,{color:'#fff',fontSize:14,paddingHorizontal:6,
                        fontWeight:'700'}]}>131/10</Text>
            </TouchableOpacity>

            <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700'}]}>vs</Text>

            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
              onPress={()=>{this.setState({lionsmodel:true})}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,paddingHorizontal:6,
                          fontSize:14,fontWeight:'700'}]}>81/10</Text>
              <Image source={require('../assets/lions.jpeg')} style={{height:width*0.15,width:width*0.15}}/>
            </TouchableOpacity>
          </View>
          <View style={{borderWidth:0,paddingVertical:8,
                justifyContent:'space-between',flexDirection:'row'}}>
            <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                        fontWeight:'700'}]}>Warriors</Text>
            <View style={{width:width*0.4,justifyContent:'center',
                        alignSelf:'center',alignItems:'center'}}>
              <Text style={[styles.text,
                    {color:'#fff',fontSize:12,textAlign:'center',fontWeight:'700'}]}
                    numberOfLines={2}>Warriors won by 50runs with 1 over left</Text>
            </View>
            <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                    fontWeight:'700'}]}>Lions</Text>
          </View>
        </TouchableOpacity>
          {this.state.openView &&
            <View style={{borderWidth:0,marginVertical:10,alignItems:'center'}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'center',
                      fontWeight:'400'}]}>Poll ratings</Text>
              <View style={{width:width*0.6,borderWidth:0,flexDirection:'row',
                        justifyContent:'space-between',paddingVertical:10}}>
                <View style={{}}>
                  <View style={{backgroundColor:'blue',width:width*0.4}}>
                    <Text style={[styles.text,{color:'#fff',textAlign:'center',paddingVertical:6,
                          fontSize:14,fontWeight:'700'}]}>70%</Text>
                  </View>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'left',paddingVertical:6,
                          fontWeight:'700'}]}>Warriors</Text>
                </View>
                <View>
                  <View style={{backgroundColor:'red',width:width*0.2}}>
                    <Text style={[styles.text,{color:'#fff',textAlign:'center',paddingVertical:6,
                          fontSize:14,fontWeight:'700'}]}>30%</Text>
                  </View>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,
                          textAlign:'right',paddingVertical:6,fontWeight:'700'}]}>Lions</Text>
                </View>
              </View>
              <Text style={[styles.text,{color:'#fff',fontSize:12,textAlign:'center',
                    fontWeight:'400'}]}>You have choosen warriors</Text>
            </View>
          }
        </View>
      )
    }

  switchTab=()=>{
    return(
      <SwitchSelector
          initial={0}
          onPress={value => this.setState({ gender: value })}
          textColor={'#fff'} //'#7a44cf'
          textStyle={[styles.text,{fontWeight:'700',fontSize:14}]}
          selectedTextStyle={[styles.text,{fontWeight:'700',fontSize:14}]}
          selectedColor={'#000'}
          backgroundColor={'#333333'}
          buttonColor={'#fff'}
          borderColor={'#000'}
          borderRadius={10}
          borderWidth={0}
          paddingVertical={10}
          hasPadding
          valuePadding={4}
          height={width*0.15}
          style={{width:width*0.6,marginVertical:20,alignSelf:'center'}}
          textContainerStyle={{borderRadius:10,}}
          selectedTextContainerStyle={{borderRadius:10,}}
          options={[
            { label: "INTRA", value: "f", },
            { label: "INTER", value: "m",  }
          ]}
      />
    )
  }

  warriors1inning=()=>{
    return(
      <FlatList style={{}} data={this.state.warriors1inning}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index})=>(
        <View style={{flexDirection:'row',justifyContent:'space-between',
                      alignItems:'center',flex:1,paddingVertical:10}}>
          <View style={{flexDirection:'row',alignItems:'center',flex:0.6,
                      justifyContent:'space-between'}}>
            <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'left',
                      fontWeight:'700'}]}>{item.batsman}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:12,textAlign:'left',
                      fontWeight:'700'}]}>{item.batsmansome}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',flex:0.4,
                        justifyContent:'space-between',paddingLeft:4}}>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                      fontWeight:'700'}]}>{item.Rs}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                      fontWeight:'700'}]}>{item.Bs}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                      fontWeight:'700'}]}>{item.s4}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                      fontWeight:'700'}]}>{item.s6}</Text>
          </View>
        </View>
        )}
      />
    )
  }

  lions1inning=()=>{
    return(
      <FlatList style={{}} data={this.state.lions1inning}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index})=>(
        <View style={{flexDirection:'row',justifyContent:'space-between',
                      alignItems:'center',flex:1,paddingVertical:10}}>
          <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'left',flex:0.2,
                      fontWeight:'700'}]}>{item.batsman}</Text>
          <View style={{flexDirection:'row',alignItems:'center',flex:0.4,
                      justifyContent:'space-between',paddingRight:4}}>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.os}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.ms}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.rs}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.ws}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',flex:0.4,
                      justifyContent:'space-between',paddingLeft:4}}>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                      fontWeight:'700'}]}>{item.nb}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                      fontWeight:'700'}]}>{item.wd}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                      fontWeight:'700'}]}>{item.eco}</Text>
          </View>
        </View>
        )}
    />
    )
  }

  winnerList1inning=()=>{
    return(
      <View style={{backgroundColor:'#333333',paddingVertical:15,paddingHorizontal:15,
                    marginHorizontal:15,marginVertical:20,borderRadius:10}}>
        <View style={{justifyContent:'space-between',flexDirection:'row',
                      alignItems:'center',marginTop:10}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[styles.text,{color:'#fff',fontSize:16,textAlign:'left',
                        fontWeight:'700'}]}>Warriors</Text>
            <Text style={[styles.text,{color:'#BDBDBD',fontSize:14,textAlign:'left',
                        paddingLeft:6,fontWeight:'700'}]}>1st innings</Text>
          </View>
          <Text style={[styles.text,{color:'#fff',fontSize:16,textAlign:'right',
                        fontWeight:'700'}]}>131/10</Text>
        </View>
        {this.warriors1inning()}
        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
            <Text style={[styles.text,{color:'#fff',fontSize:16,textAlign:'left',
                      fontWeight:'700'}]}>Lions</Text>
            <Text style={[styles.text,{color:'#BDBDBD',fontSize:14,textAlign:'left',paddingLeft:6,
                      fontWeight:'700'}]}>1st innings</Text>
        </View>
        {this.lions1inning()}
      </View>
    )
  }

  winnerList2inning=()=>{
    return(
      <View style={{backgroundColor:'#333333',paddingVertical:15,paddingHorizontal:15,
                    marginHorizontal:15,marginVertical:20,borderRadius:10}}>
        <View style={{justifyContent:'space-between',
                    flexDirection:'row',alignItems:'center',marginTop:10}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[styles.text,{color:'#fff',fontSize:16,textAlign:'left',
                          fontWeight:'700'}]}>Lions</Text>
            <Text style={[styles.text,{color:'#BDBDBD',fontSize:14,textAlign:'left',
                          paddingLeft:6,fontWeight:'700'}]}>2nd innings</Text>
          </View>
          <Text style={[styles.text,{color:'#fff',fontSize:16,textAlign:'right',
                          fontWeight:'700'}]}>81/10</Text>
        </View>

        {this.warriors2inning()}

        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
            <Text style={[styles.text,{color:'#fff',fontSize:16,textAlign:'left',
                          fontWeight:'700'}]}>Warriors</Text>
            <Text style={[styles.text,{color:'#BDBDBD',fontSize:14,textAlign:'left',
                        paddingLeft:6,fontWeight:'700'}]}>2nd innings</Text>
        </View>
        {this.lions2inning()}
      </View>
    )
  }

  warriors2inning=()=>{
    return(
      <FlatList style={{}} data={this.state.warriors1inning}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
        <View style={{flexDirection:'row',justifyContent:'space-between',
                      alignItems:'center',flex:1,paddingVertical:10}}>
          <View style={{flexDirection:'row',alignItems:'center',flex:0.6,
                        justifyContent:'space-between'}}>
            <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'left',
                        fontWeight:'700'}]}>{item.batsman}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:12,textAlign:'left',
                        fontWeight:'700'}]}>{item.batsmansome}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',flex:0.4,
                        justifyContent:'space-between',paddingLeft:4}}>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.Rs}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.Bs}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.s4}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.s6}</Text>
          </View>
        </View>
        )}
      />
    )
  }

  lions2inning=()=>{
    return(
      <FlatList style={{}} data={this.state.lions1inning}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index})=>(
        <View style={{flexDirection:'row',justifyContent:'space-between',
                      alignItems:'center',flex:1,paddingVertical:10}}>
          <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'left',
                      flex:0.2,fontWeight:'700'}]}>{item.batsman}</Text>
          <View style={{flexDirection:'row',alignItems:'center',
                      flex:0.4,justifyContent:'space-between',paddingRight:4}}>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.os}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.ms}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.rs}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.ws}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',flex:0.4,
                        justifyContent:'space-between',paddingLeft:4}}>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.nb}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.wd}</Text>
            <Text style={[styles.text,{color:'#fff',fontSize:item.id==1?14:12,
                        fontWeight:'700'}]}>{item.eco}</Text>
          </View>
        </View>
        )}
      />
    )
  }

  warriorsModal=()=>{
    return(
      <View>
        <Modal isVisible={this.state.warriorsmodel}animationIn="slideInLeft"
            animationOut="slideOutLeft" hasBackdrop={true}
            backdropColor={'transparent'}
            onBackdropPress={()=>{this.setState({warriorsmodel:false});}}>
            <View style={{paddingVertical:20,alignItems:'flex-start',
                            paddingHorizontal:20,backgroundColor:'#333333',borderRadius:10,
                            width:width*0.4,marginHorizontal:-20}}>
              <Text style={[styles.text,{color:'#fff',fontSize:16,paddingVertical:4,
                            fontWeight:'700'}]}>WARRIOS</Text>
              <Text style={[styles.text,{color:'#BDBDBD',fontSize:14,paddingVertical:4,
                            fontWeight:'700'}]}>Playing XI</Text>
                <FlatList style={{}} data={this.state.warriorsmodallist}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index})=>(
                    <View style={{paddingVertical:10,}}>
                      <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'left',
                              paddingVertical:4,fontWeight:'700'}]}>{item.name}</Text>
                    </View>
                    )}
                />
            </View>
        </Modal>
      </View>
    )
  }

  lionsModal=()=>{
    return(
      <View>
        <Modal isVisible={this.state.lionsmodel}animationIn="slideInRight"
            animationOut="slideOutRight" hasBackdrop={true}
            backdropColor={'transparent'}
            onBackdropPress={()=>{this.setState({lionsmodel:false});}}>
              <View style={{paddingVertical:20,alignItems:'flex-start',
                            paddingHorizontal:20,backgroundColor:'#333333',borderRadius:10,
                            width:width*0.4,marginLeft:width*0.55}}>
                <Text style={[styles.text,{color:'#fff',fontSize:16,paddingVertical:4,
                            fontWeight:'700'}]}>LIONS</Text>
                <Text style={[styles.text,{color:'#BDBDBD',fontSize:14,paddingVertical:4,
                            fontWeight:'700'}]}>Playing XI</Text>
                <FlatList style={{}} data={this.state.lionsmodallist}
                  keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
                  <View style={{paddingVertical:10,}}>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,textAlign:'left',
                            paddingVertical:4,fontWeight:'700'}]}>{item.name}</Text>
                  </View>
                  )}
                />
              </View>
        </Modal>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={'Sports Wall'} screen={'PageThird'}/>
          {this.warriorsModal()}
          {this.lionsModal()}
          <ScrollView style={{flex:1,paddingTop:this.state.openView?40:0,paddingBottom:100}}>
              {!this.state.openView&&
                <View>
                  {this.switchTab()}
                  <MyCarousel navigation={this.props.navigation}  />
                </View>
              }
              {this.state.activeSlide==0&&<View>{this.cricketView()}</View>}

              {this.state.openView &&
                <ScrollView style={{paddingBottom:100}}>
                  {this.winnerList1inning()}
                  {this.winnerList2inning()}
                  <View stytle={{height:0}}></View>
                </ScrollView>
              }
          </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageThird);

class MyCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeSlide:0,
      entries : [{name:'CRICKET',},
                 {name:'BASKET BALL',},
                 {name:'VOLLEY BALL',}]
      }
    }
    _renderItem ({item, index}) {
        return <View style={{width:width*0.35,
                          justifyContent:'center',paddingVertical:4,marginHorizontal:0,
                          borderRadius:10,alignItems:'center'}}>
                  <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:0,
                            paddingLeft:0,fontWeight:'700'}]}>{item.name}</Text>
          </View>
    }
    render () {
        return (
            <View>
                <Carousel
                  style="slides"
                  itemsPerInterval={1}
                  data={this.state.entries}
                  renderItem={this._renderItem}
                  onSnapToItem={(index) => {this.setState({ activeSlide: index })}}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  slideStyle={{alignItems:'center'}}
                  containerCustomStyle={'center'}
                />
            </View>
        );
    }
  }
  const sliderWidth=width;
const itemWidth=width*0.3;
