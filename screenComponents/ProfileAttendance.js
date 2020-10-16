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
  FontAwesome5,AntDesign,Foundation} from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import TabComponent  from '../navigationComponents/TabComponent.js';
import Headers  from '../helpers/Headers.js';
import settings from '../appSettings';
import HttpsClient from '../helpers/HttpsClient';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import Modal from "react-native-modal";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily
const day =1
const month= 1
const year= 2020
const date=new Date()
const dateString=date
const months = ["January", "February", "March", "April",
                "May", "June", "July", "August", "September",
                "October","November", "December"];

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

const presentdata=[{period:'PERIOD',subject:'SUBJECT',faculty:'FACULTY HANDLED'},
                   {period:'1',subject:'HINDI',faculty:'Ms. SASIREKHA'},
                   {period:'2',subject:'ENGLISH',faculty:'Mr. RAM'},
                   {period:'3',subject:'MATHS',faculty:'Ms. SASIREKHA'},
                   {period:'4',subject:'ENGLISH',faculty:'Mr. RAM'},
                   {period:'5',subject:'HINDI',faculty:'Ms. SASIREKHA'},
                   {period:'1',subject:'HINDI',faculty:'Ms. SASIREKHA'},
                   {period:'2',subject:'ENGLISH',faculty:'Mr. RAM'},
                   {period:'3',subject:'MATHS',faculty:'Ms. SASIREKHA'},
                   {period:'4',subject:'ENGLISH',faculty:'Mr. RAM'},
                   {period:'5',subject:'HINDI',faculty:'Ms. SASIREKHA'},]

const attend=[{sub:'Subject',class:'Classes Attended',att:'Attendance'},
              {sub:'Maths',class:'25/30',att:'90%'},
              {sub:'Science',class:'25/30',att:'90%'},
              {sub:'Social',class:'25/30',att:'90%'},
              {sub:'Language',class:'25/30',att:'90%'},
              {sub:'English',class:'25/30',att:'90%'}]

class ProfileAttendance extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      date:new Date(),
      selectedStartDate: null,
      presentdata:presentdata,
      iconColour: "#bb5a51",
      day:1,
      selectedDay:null,
      holyday:true,
      present:false,
      absent:false,
      partial:false,
      attendance:false,
      attend:attend
    }
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(day) {
    this.setState({
      selectedStartDate: day,
    });
  }

  componentDidMount(){
  }


  onDayPress = (day) => {
    this.setState({day:day});
  };

  calendars=()=>{
    return(
      <Calendar
        onVisibleMonthsChange={(months)=>{console.log(months,'months')}}
        current={this.state.date}
        minDate={'2012-05-10'}
        maxDate={'2022-05-30'}
        allowRangeSelection={true}
        onDayPress={(day) => {console.log('selected day', day);this.setState({selectedDay:day})}}
        onDayLongPress={(day) => {console.log('selected day', day)}}
        monthFormat={'long'}
        onMonthChange={(months) => {this.changeMonth(months)}}
        hideArrows={false}
        hideExtraDays={false}
        disableMonthChange={false}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        disableAllTouchEventsForDisabledDays={false}
        renderHeader={date=>{
                        return(
                          <View>
                            <Text style={[styles.text,{color:'#fff',fontSize:14,
                                fontWeight:'700',}]}>{months[date.getMonth()]+" "+date.getFullYear()}</Text>
                          </View>
                        );
                      }}
        enableSwipeMonths={false}
        markedDates={{
          '2020-10-16':{customStyles:{container:{backgroundColor: '#04BF00'},
                                      text: {color:'#fff',fontWeight: 'bold'}
                        }},
          '2020-10-17':{customStyles:{container:{backgroundColor: '#04BF00'},
                                      text: {color:'#fff',fontWeight: 'bold'}
                        }},
           '2020-10-18':{customStyles:{container:{backgroundColor: '#04BF00'},
                                       text: {color:'#fff',fontWeight: 'bold'}
                         }},
           '2020-10-19':{customStyles:{container:{backgroundColor: '#04BF00'},
                                       text: {color:'#fff',fontWeight: 'bold'}
                         }},
         }}
         markingType={'custom'}
         style={{
          borderWidth: 0,
          borderColor: 'gray',
          height: 350
        }}
        theme={{
            backgroundColor: '#000',
            calendarBackground: '#000',
            textSectionTitleColor: '#515151',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00f53d',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#ffffff',
            todayBackgroundColor:"#0c20cd",
            todayBorderRadius:30,
            selectedDayColor:"#FFC926",
            dayTextColor: '#ffffff',
            textDisabledColor: '#8f8181',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#fff',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#fff',
            indicatorColor: '#fff',
            textDayFontFamily: fontFamily,
            textMonthFontFamily: fontFamily,
            textDayHeaderFontFamily: fontFamily,
            textDayFontWeight: '400',
            textMonthFontWeight: '700',
            textDayHeaderFontWeight: '400',
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 14
          }}
      />
    )
  }

  changeMonth=(arr)=>{
    console.log(arr,'kkkkk');
  }

  calendarlist=()=>{
    return(
      <CalendarList
          onVisibleMonthsChange={(months) => {this.changeMonth(months)}}
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled={true}
          horizontal={true}
          pagingEnabled={true}
          showScrollIndicator={true}
          markedDates={this.state.markedDates}
      />
    )
  }

  present=()=>{
    return(
      <View>
        <FlatList style={{}} data={this.state.presentdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View style={{width:width*0.2}}>
                <Text style={[styles.text,{color:'#fff',
                    fontSize:item.period=='PERIOD'?16:14,fontWeight:'700'}]}>{item.period}</Text>
              </View>
              <View style={{width:width*0.27}}>
                <Text style={[styles.text,{color:'#fff',fontSize:item.period=='PERIOD'?16:14,
                      fontWeight:'700'}]}>{item.subject}</Text>
              </View>
              <View style={{width:width*0.37}}>
                <Text style={[styles.text,{color:'#fff',fontSize:item.period=='PERIOD'?16:14,
                      fontWeight:'700'}]}>{item.faculty}</Text>
              </View>
            </View>

            <View style={{borderWidth:item.period=='PERIOD'?0:0.2,
                  borderColor:'#fff',marginVertical:20}}></View>
          </View>
        )}
       />
      </View>
    )
  }

  absent=()=>{
    return(
      <View>
        <FlatList style={{}} data={this.state.presentdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View style={{width:width*0.2}}>
                <Text style={[styles.text,{color:item.period=='PERIOD'?'#fff':'#C60000',
                    fontSize:item.period=='PERIOD'?16:14,fontWeight:'700'}]}>{item.period}</Text>
              </View>
              <View style={{width:width*0.27}}>
                <Text style={[styles.text,{color:item.period=='PERIOD'?'#fff':'#C60000',
                    fontSize:item.period=='PERIOD'?16:14,fontWeight:'700'}]}>{item.subject}</Text>
              </View>
              <View style={{width:width*0.37}}>
                <Text style={[styles.text,{color:item.period=='PERIOD'?'#fff':'#C60000',
                    fontSize:item.period=='PERIOD'?16:14,fontWeight:'700'}]}>{item.faculty}</Text>
              </View>
            </View>

            <View style={{borderWidth:item.period=='PERIOD'?0:0.2,
                  borderColor:'#fff',marginVertical:20}}></View>
          </View>
        )}
       />
      </View>
    )
  }

  partial=()=>{
    return(
      <View>
        <FlatList style={{}} data={this.state.presentdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index})=>(
          <View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View style={{width:width*0.2}}>
                <Text style={[styles.text,{color:item.period!='3'?'#fff':'#C60000',
                    fontSize:item.period=='PERIOD'?16:14,fontWeight:'700'}]}>{item.period}</Text>
              </View>
              <View style={{width:width*0.27}}>
                <Text style={[styles.text,{color:item.period!='3'?'#fff':'#C60000',
                    fontSize:item.period=='PERIOD'?16:14,fontWeight:'700'}]}>{item.subject}</Text>
              </View>
              <View style={{width:width*0.37}}>
                <Text style={[styles.text,{color:item.period!='3'?'#fff':'#C60000',
                    fontSize:item.period=='PERIOD'?16:14,fontWeight:'700'}]}>{item.faculty}</Text>
              </View>
            </View>

            <View style={{borderWidth:item.period=='PERIOD'?0:0.2,
                        borderColor:'#fff',marginVertical:20}}></View>
          </View>
        )}
       />
      </View>
    )
  }


  attendModal=()=>{
    return(
      <View>
        <Modal isVisible={this.state.attendance}
            animationIn="slideInUp"
            animationOut="slideOutDown" hasBackdrop={true}
            backdropColor={'transparent'}
            onBackdropPress={()=>{this.setState({attendance:false})}}>
            <View style={{paddingVertical:20,alignItems:'center',position:'absolute',
                            bottom:0,left:0,right:0,
                            paddingHorizontal:20,backgroundColor:'#444444',borderRadius:17,borderBottomRightRadius:0,borderBottomLeftRadius:0,
                            marginHorizontal:-10,marginVertical:-20}}>
              <FlatList
                  data={this.state.attend}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index})=>(
                  <TouchableOpacity style={{flex:1,flexDirection:'row',
                        justifyContent:'space-between',paddingVertical:10,marginHorizontal:20}}>
                      <Text style={[styles.text,{color:'#fff',fontSize:16,textAlign:'left',
                            paddingHorizontal:10,width:width*0.25}]}>{item.sub}</Text>
                      <Text style={[styles.text,{color:'#fff',fontSize:16,textAlign:'center',
                            paddingHorizontal:10,width:width*0.25}]}>{item.class}</Text>
                      <Text style={[styles.text,{color:'#fff',fontSize:16,textAlign:'center',
                            paddingHorizontal:10,width:width*0.27}]}>{item.att}</Text>
                  </TouchableOpacity>
                  )
                 }
              />
          </View>
        </Modal>
      </View>
    )
  }

  render() {
    let school =this.props.navigation.getParam('school',false)
    let date =this.state.date.toDateString()
    let date1=days[this.state.date.getDay()]+", "+this.state.date.getDate() + " "+ months[this.state.date.getMonth()] +" "+ this.state.date.getFullYear();

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
          <Headers navigation={this.props.navigation} name={'ATTENDANCE'}
            screen={'ProfileAttendance'}/>

          {!school &&<TouchableOpacity style={{padding:10,position:'absolute',top:30,right:20,zIndex:1}}
                      onPress={()=>{this.setState({attendance:true})}}>
                      <Foundation name={'list'}color={'#fff'} size={22} />
            </TouchableOpacity>}

            <ScrollView style={{flex:1,paddingVertical:20,}}>
              <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',
                    textAlign:'center'}]}>{date}</Text>
              <View style={{marginHorizontal:15}}>
                {this.calendars()}
                <View style={{marginHorizontal:30}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',
                                alignItems:'center',marginVertical:10}}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',
                                alignItems:'center',paddingHorizontal:10}}>
                        <View style={{height:20,width:20,backgroundColor:'#04BF00'}}></View>
                        <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'400',
                                  paddingHorizontal:10}]}>PRESENT</Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'space-between',
                                  alignItems:'center',paddingHorizontal:10}}>
                        <View style={{height:20,width:20,backgroundColor:'#C60000'}}></View>
                        <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'400',
                                  paddingHorizontal:10}]}>ABSENT</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',
                                  alignItems:'center',marginVertical:10}}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',
                                  alignItems:'center',paddingHorizontal:10}}>
                        <View style={{height:20,width:20,backgroundColor:'#515151'}}></View>
                        <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'400',
                                  paddingHorizontal:10}]}>HOLYDAY</Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'space-between',
                                  alignItems:'center',paddingHorizontal:10}}>
                        <View style={{height:20,width:20,backgroundColor:'#C37500'}}></View>
                        <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'400',
                                  paddingHorizontal:10}]}>PARTIAL</Text>
                      </View>
                    </View>
                </View>
                <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700',
                        textAlign:'center',paddingVertical:10}]}>{date1}</Text>
                <View>
                {this.state.holyday&&<Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700',
                        textAlign:'center'}]}>DECLARED AS HOLIDAY</Text>}

                {this.state.present&&<View style={{marginHorizontal:10}}>{this.present()}</View>}
                {this.state.absent&&<View style={{marginHorizontal:10}}>{this.absent()}</View>}
                {this.state.partial&&<View style={{marginHorizontal:10}}>{this.partial()}</View>}
                </View>

              </View>
            </ScrollView>
            {!school&&<View>{this.attendModal()}</View>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAttendance);
