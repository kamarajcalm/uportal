import wamp from 'wamp.js2';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button
} from 'react-native';
import { Icon } from "react-native-elements";
import Headers  from '../helpers/Headers.js';
const messageData = [
  {
    id: 1,
    userId: 1,
    text: "Hello world",
    error: false,
    sending: false,
    createdAt: "2018-10-03 12:13:24",
    type:'in',
  },
  {
    id: 2,
    userId: 2,
    text: "Hello world",
    error: false,
    sending: false,
    createdAt: "2018-08-03 12:13:24",
    type:'out',
  },
];



export default class Chat extends Component {



  static navigationOptions = {
           title: 'ChatUi',
           headerStyle: {
                 backgroundColor: "#fdeb33",
               },
            headerTintColor: '#fff',
         };

  constructor(props) {
    super(props);
    this.state = {
       messages: [],
      data: [
        {id:1, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit amet" , attachment :require('../assets/imgboy.jpeg')},
        {id:2, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",attachment :require('../assets/imgboy.jpeg')} ,
        {id:3, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met",attachment :require('../assets/imgboy.jpeg')},
        {id:4, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met",attachment :require('../assets/imgboy.jpeg')},
        {id:5, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met",attachment :require('../assets/imgboy.jpeg')},
        {id:6, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met",attachment :require('../assets/imgboy.jpeg')},
        {id:7, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met",attachment :require('../assets/imgboy.jpeg')},
        {id:8, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met",attachment :require('../assets/imgboy.jpeg')},
        {id:9, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met",attachment :require('../assets/imgboy.jpeg')},
      ],
    };

  }

//  state = {
//    messages: [],
//  };

  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }


   componentDidMount = () => {
     console.log(wamp);
     this.getMessages();


    const connection = new wamp.Connection({
        url: 'ws://ws.syrow.com:8090/ws',
        realm: 'default'
    });

    connection.onopen = (session , details) => {
      console.warn("onopen");
      session.subscribe("com.myapp.oncounter", (args)=>{
        console.warn(args);
      });


    };

    connection.onclose = (reason, details) => {
      console.warn("onclose : reason = " + reason + ", details = " + details);
    };

    //onsole.warn("connection.open()");
    connection.open();
   };

   getMessages = () => {
     this.setState({
       messages: messageData,
     });
   };

 sendMessage = message => {
     this.setState(prevState => ({
       messages: [this.state.message, ...prevState.messages],
     }));
     console.log(this.state.messages,'this.state.message')
   };

  render() {

    return (
      <View style={[styles.container,{backgroundColor:'#000',width:'100%'}]}>
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id.toString();
          }}
          renderItem={(message) => {
            console.log(item);
            const item = message.item;
            let inMessage = item.type === 'in';
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[styles.item, itemStyle,{backgroundColor:'#000'}]}>

                {!inMessage && this.renderDate(item.date)&&<View style={{flexDirection:'row',alignItems:'center',borderWidth:1,
                        borderColor:'#000',backgroundColor:'#000'}}>
                  <View style={[styles.balloon,{backgroundColor:'#fff',marginHorizontal:10}]}>
                    <Text style={{color:'#000'}}>{item.message}</Text>
                  </View>
                  <Image source={(item.attachment)} style={{width:50,height:50,borderRadius:30}}/>
                </View>}

                {inMessage && this.renderDate(item.date)&&<View style={{flexDirection:'row',alignItems:'center',borderWidth:1,
                        borderColor:'#000',backgroundColor:'#000'}}>
                  <Image source={(item.attachment)}
                    style={{width:50,height:50,borderRadius:30}}/>
                  <View style={[styles.balloon,{backgroundColor:'#2f2f2f',marginHorizontal:10}]}>
                    <Text style={{color:'#fff'}}>{item.message}</Text>
                  </View>
                </View>}

              </View>
            )
          }}
        />
        <View style={[styles.footer,{backgroundColor:'#000',alignItems:'center',borderWidth:0}]}>
          <View style={[styles.inputContainer,{backgroundColor:'#000'}]}>
            <TextInput style={[styles.inputs,{backgroundColor:'#2f2f2f',borderRadius:7,padding:6}]}
                placeholder="Enter your message here"
                placeholderTextColor="gray"
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.setState({message:text})}/>
          </View>
          <TouchableOpacity    style={{marginHorizontal: 15,}}>
             <Icon type="ionicon" name="md-attach" color={'#fff'}  size={24} style={{textAlignVertical: 'center',}} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnSend,{backgroundColor:'#000'}]}onPress={()=>this.sendMessage()} >
              <Icon type="ionicon" name= "md-send" color="#fff" style={{textAlignVertical: 'center'}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  list:{
    paddingHorizontal: 17,
  },
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:"#00BFFF",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },
  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',

  },
  inputContainer: {
    borderBottomColor: '#000',
    backgroundColor: '#2f2f2f',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 7,
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#eeeeee",
    borderRadius:300,
    padding:5,
  },
});
