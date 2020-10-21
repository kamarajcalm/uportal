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

const tabs =[{name:'TODAYS RETURNS'},{name:'PENDING'},{name:'HISTORY'}]

class ProfileLibrary extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      formlist:formlist,
      a1:false,
      selectedTab:0,
      scrollX : new Animated.Value(0),
      scrollY: new Animated.Value(0),
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
    var collegeAd = this.props.navigation.getParam('collegeAd',null)
    var schoolAd = this.props.navigation.getParam('schoolAd',null)
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        <Headers navigation={this.props.navigation} name={'LIBRARY'} screen={'ProfileLibrary'}/>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          {(collegeAd!=null||schoolAd!=null)&&<View style={{paddingHorizontal:10}}>
            <Animated.View style={{flexDirection: 'row',}}>
              {tabs.map((item, i) => {
                return (
                  <TouchableOpacity key={i} onPress={()=>{this.setState({selectedTab:i});
                    this.scroll.scrollTo({ x: (i)*width });
                    this.setState({scrollY:new Animated.Value(0)})}}
                    style={{flex:1,borderBottomWidth: 0,borderColor:'#f2f2f2',
                    alignItems: 'center',justifyContent: 'center',height:45}} >
                    <Text   style={[styles.text,{fontSize:16,fontWeight:'700',
                        color:this.state.selectedTab==i?'#fff':'#d6d6d6'}]}>{item.name}</Text>
                    <Animated.View
                              style={{ height: 4, width: '100%', backgroundColor: this.state.selectedTab==i?'#fff':'#000',
                              position: 'absolute',bottom: 0,left:0,marginTop:4}}/>
                  </TouchableOpacity>
                );
              })}

            </Animated.View>
            <ScrollView
                  horizontal={true}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }]  )}
                  scrollEventThrottle={16}
                  onMomentumScrollEnd={this.handlePageChange}
                  ref={(node) => {this.scroll = node}}
                  style={{flex:1,backgroundColor:'#000'}}
                  onContentSizeChange={() =>this.scroll.scrollTo({ x: (this.state.selectedTab)*width })}
                  >
                    {tabs.map((item, i) => {
                        return (
                          <View key={i} style={{flex:1,backgroundColor: '#000',width:width*1,}} >
                          {i==0&&this.state.selectedTab==0&&
                            <View style={{alignItems:'center'}}>
                             <ScrollView >
                             <TouchableOpacity style={{paddingHorizontal:25,paddingVertical:10,backgroundColor:'#333333',borderRadius:10,alignSelf:'center',marginTop:20}}>
                             <Text style={[styles.text,{color:'#fff',fontSize:14,
                             fontWeight:'700'}]}>REMIND ALL</Text>
                             </TouchableOpacity>
                               {this.formList()}
                             </ScrollView>
                             </View>
                          }
                          {i==1&&this.state.selectedTab==1&&
                            <View style={{alignItems:'center'}}>
                             <ScrollView >
                               {this.formList()}
                             </ScrollView>
                             </View>
                          }
                          {i==2&&this.state.selectedTab==2&&
                            <View style={{alignItems:'center'}}>
                             <ScrollView >
                               {this.formList()}
                             </ScrollView>
                             </View>
                          }
                          </View>
                        );
                      })}
            </ScrollView>
            </View>}
            {(collegeAd==null||schoolAd==null)&&
              <ScrollView >
                {this.formList()}
              </ScrollView>
            }
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileLibrary);
