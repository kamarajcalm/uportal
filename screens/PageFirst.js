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
const fontFamily = settings.fontFamily

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
                 <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'600'}]} numberOfLines={1}>{item.name}</Text>
                 <Text style={[styles.text,{color:'#fff',fontSize:12,fontWeight:'600'}]} numberOfLines={1}>{item.dest}</Text>
                 <Text style={[styles.text,{color:'#828282',fontSize:12,fontWeight:'600'}]} numberOfLines={1}>{item.time}</Text>
               </View>
             </View>
             <MaterialCommunityIcons name="dots-vertical" size={20} color="#fff" />
           </View>

           <View style={{height:width*0.4,borderWidth:1,marginTop:6}}>
           {item.desc &&
             <View>
               <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'400'}]} numberOfLines={5}>{item.desc}</Text>
               <TouchableWithoutFeedback>
                 <Text style={[styles.text,{color:'#fff',fontSize:14,paddingVertical:6,fontWeight:'600'}]}>Read more</Text>
               </TouchableWithoutFeedback>
             </View>
           }
             {item.dest &&
               <View>
                 <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'400'}]} numberOfLines={2}>{item.shortdesc}</Text>
                 <View style={{height:width*0.3}}>
                   <Image source={(item.descimg)} style={{height:'100%',width:'100%'}}/>
                 </View>
               </View>
             }
           </View>
           {item.like!=0&&
           <Text style={[styles.text,{color:'#828282',paddingVertical:10,fontSize:12,fontWeight:'600'}]}>{item.like} like</Text>
           }

           <View style={{justifyContent:'space-between',borderWidth:1,flexDirection:'row',
                         alignItems:'center',marginVertical:15,marginHorizontal:12,paddingVertical:6}}>
             <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.like(item,index)}}>
               <AntDesign name='like1' size={20} color='#fff'/>
               <Text style={{color:'#fff',fontSize:14,paddingHorizontal:4}}>LIKE</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.comment(item,index)}}>
               <FontAwesome5 name='comment-alt' size={20} color='#fff'/>
               <Text style={[styles.text,{color:'#fff',fontSize:14,paddingHorizontal:4,fontWeight:'600'}]}>COMMENT</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{flexDirection:'row'}}>
               <Feather name='share-2' size={20} color='#fff'/>
               <Text style={[styles.text,{color:'#fff',fontSize:14,paddingHorizontal:4,fontWeight:'600'}]}>SHARE</Text>
             </TouchableOpacity>
           </View>

           {item.comment&&
             <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,alignItems:'center'}}>
               <View style={{flexDirection:'row'}}>
                 <Image source={(item.img)} style={{height:width*0.1,width:width*0.1,borderRadius:30}}/>
                 <TextInput
                 style={{borderWidth:0,marginHorizontal:6,
                   borderColor:'#000',width:width*0.6,borderRadius:10,
                   color:'#000',paddingHorizontal:15,backgroundColor:'#2F2F2F'}}
                     placeholder="Type your comments here..."
                     placeholderTextColor={'#828282'}
                     selectionColor={'#fff'}
                     onChangeText={()=> this.setState({ comments})}
                     value={this.state.comments}
                 />
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

  timelinePost=()=>{
    return(
    <View style={{flex:1}}>
       <View style={{flexDirection:'row',paddingHorizontal:25}}>
        <Image source={require('../assets/Unknown_Boy.jpg')} style={{height:width*0.14,width:width*0.14,borderRadius:30}}/>
        <TextInput
        style={{borderWidth:0,borderColor:'#000',width:width*0.6,borderRadius:0,color:'#000',paddingHorizontal:15}}
            placeholder="Whats on your mind?"
            placeholderTextColor={'#7A7A7A'}
            selectionColor={'#fff'}
            onChangeText={()=> this.setState({ timelinepost})}
            value={this.state.timelinepost}
        />
      </View>
      <View style={{flexDirection:'row',marginTop:4,justifyContent:'space-between',backgroundColor:'#141414',paddingHorizontal:30,paddingVertical:15,alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>
            <FontAwesome name='image' size={20} color='#fff'/>
            <Text style={[styles.text,{color:'#fff',paddingHorizontal:6,fontWeight:'700',fontSize:14}]}>PHOTO/VIDEOS</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <FontAwesome name='image' size={20} color='#fff'/>
            <Text style={[styles.text,{color:'#fff',paddingHorizontal:6,fontWeight:'700',fontSize:14}]}>MY WALL</Text>
          </View>
      </View>
    </View>
    )
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={'Institute wall'} screen={'PageFirst'} />
          <View style={{flex:1,}}>
          <ScrollView>

            {this.timelinePost()}
            {this.homeTimeLine()}
            </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageFirst);
