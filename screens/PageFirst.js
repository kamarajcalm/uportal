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

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor

const timeline=[{img:require('../assets/Unknown_Boy.jpg'),name:'Stanly',dest:'PES UNIVERCITY',
            like:0,time:'just ago',comment:true,
            desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},

          {img:require('../assets/Unknown_Boy.jpg'),name:'Stanly',dest:'PES UNIVERCITY',
          like:0,time:'just ago',comment:false,
           descimg:require('../assets/robot.jpg'),shortdesc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},

          {img:require('../assets/Unknown_Boy.jpg'),name:'Stanly',dest:'PES UNIVERCITY',
          like:0,time:'just ago',comment:false,
           descimg:require('../assets/robo.jpg'),shortdesc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},

          {img:require('../assets/Unknown_Boy.jpg'),name:'Stanly',dest:'PES UNIVERCITY',
          like:0,time:'just ago',comment:false,
           desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}]

class PageFirst extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      timeline:timeline,
      }
    }

    like=(item,index)=>{
      this.state.timeline[index].like=this.state.timeline[index].like+1
      this.setState({timeline:this.state.timeline})
    }
    comment=(item,index)=>{
      this.state.timeline[index].comment=!this.state.timeline[index].comment
      this.setState({timeline})
    }

  homeTimeLine=()=>{
    return(
      <View style={{flex:1}}>
        <FlatList
             style={{paddingBottom:400}}
             data={this.state.timeline}
             keyExtractor={(item, index) => index.toString()}
             renderItem={({item, index})=>(
         <View style={{flex:1,justifyContent:'center',paddingHorizontal:width*0.04,marginVertical:8}}>

           <View style={{justifyContent:'space-between',borderWidth:1,
                          flexDirection:'row',alignItems:'center'}}>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               <View style={{width:width*0.15,height:width*0.15}}>
                 <Image source={(item.img)} style={{width:'100%',height:'100%',borderRadius:30}} />
               </View>
               <View style={{paddingHorizontal:10}}>
                 <Text style={{color:'#fff',fontSize:16}} numberOfLines={1}>{item.name}</Text>
                 <Text style={{color:'#fff',fontSize:12}} numberOfLines={1}>{item.dest}</Text>
                 <Text style={{color:'#fff',fontSize:12}} numberOfLines={1}>{item.time}</Text>
               </View>
             </View>
             <MaterialCommunityIcons name="dots-vertical" size={18} color="#fff" />
           </View>

           <View style={{height:width*0.4,borderWidth:1,marginTop:6}}>
             {item.desc &&
               <View>
                 <Text style={{color:'#fff',fontSize:16}} numberOfLines={5}>{item.desc}</Text>
                 <TouchableWithoutFeedback>
                   <Text style={{color:'#fff',fontSize:16,paddingVertical:6}}>Read more</Text>
                 </TouchableWithoutFeedback>
               </View>
             }
             {item.dest &&
               <View>
                 <Text style={{color:'#fff',fontSize:16,paddingBottom:6}} numberOfLines={2}>{item.shortdesc}</Text>
                 <View style={{height:width*0.3}}>
                   <Image source={(item.descimg)} style={{height:'100%',width:'100%'}}/>
                 </View>
               </View>
             }
           </View>
           {item.like!=0&&
           <Text style={{color:'#fff',paddingVertical:8}}>{item.like} like</Text>
           }

           <View style={{justifyContent:'space-between',borderWidth:1,flexDirection:'row',
                         alignItems:'center',marginVertical:15,marginHorizontal:12,paddingVertical:6}}>
             <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.like(item,index)}}>
               <AntDesign name='like1' size={20} color='#fff'/>
               <Text style={{color:'#fff',fontSize:14,paddingHorizontal:4}}>LIKE</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.comment(item,index)}}>
               <FontAwesome5 name='comment-alt' size={20} color='#fff'/>
               <Text style={{color:'#fff',fontSize:14,paddingHorizontal:4}}>COMMENT</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{flexDirection:'row'}}>
               <Feather name='share-2' size={20} color='#fff'/>
               <Text style={{color:'#fff',fontSize:14,paddingHorizontal:4}}>SHARE</Text>
             </TouchableOpacity>
           </View>

           {item.comment==true&&
             <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,alignItems:'center'}}>
               <View style={{flexDirection:'row'}}>
                 <Image source={(item.img)} style={{height:width*0.1,width:width*0.1,borderRadius:30}}/>
                 <View style={{backgroundColor:'gray',marginHorizontal:6,borderRadius:7,justifyContent:'center'}}>
                   <Text style={{paddingHorizontal:10,marginRight:20}}>Type your comment here...</Text>
                 </View>
               </View>
               <MaterialIcons name='navigate-next' size={20} color='#fff'/>
             </View>
           }
        </View>
      )}
      />
    </View>
    )
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={'Institute wall'} screen={'PageFirst'} />
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            {this.homeTimeLine()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PageFirst);
