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
import DropDownPicker from 'react-native-dropdown-picker';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const themeColor = settings.themeColor
const url = settings.url
const fontFamily=settings.fontFamily
const tabs = [{name:'GENERAL'},
              {name:'MY CLASS'}]

const questionpapers=[{img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},
                     {img:require('../assets/ques.jpeg'),name:'Post Handling'},]

const dropdown=[{label: 'ALL SEMESTERS', value: 'ALL SEMESTERS'},{label: 'SEM I', value: 'SEM I'},
                {label: 'SEM II', value: 'SEM II'},{label: 'SEM III', value: 'SEM III'},
                {label: 'SEM IV', value: 'SEM IV'},{label: 'SEM V', value: 'SEM V'},
                {label: 'SEM VI', value: 'SEM VI'},{label: 'SEM VII', value: 'SEM VII'},
                {label: 'SEM VIII', value: 'SEM VIII'},]

const droptest=[{label: 'TEST-1', value: 'TEST-1'},{label: 'TEST-1', value: 'TEST-1'},
                {label: 'TEST-1', value: 'TEST-1'}]

const subjects=[{name:'MATHS',color1:'#FF0000',data:[20,30,70,10],
                 color:(opacity=1)=>`rgba(255,0,0,1)`,},
                {name:'SCIENCE',color1:'#FFE500',data:[40,50,90,20],
                 color:(opacity=1)=>`rgba(255,230,0,1)`},
                {name:'SOCIAL',color1:'#04B600',data:[10,20,90,40],
                color:(opacity=1)=>`rgba(4,182,0,1)`},
                {name:'ENGLISH',color1:'#001AFF',data:[30,50,40,20],
                color:(opacity=1)=>`rgba(0,26,255,1)`},
                {name:'KANNDA',color1:'#FF4D00',data:[40,50,90,20],
                color:(opacity=1)=>`rgba(255,77,0,1)`,},
                {name:'HINDI',color1:'#10E9DC',data:[40,20,90,60],
                color:(opacity=1)=>`rgba(16,233,220,1)`,},]
const data = {labels: ["1", "2", "3", "4", "5", "6","7","8"],
                  datasets: [
                    {
                      data: [20, 45, 28, 80, 99, 43,20,70]
                    }
                  ]
                };
class StaticsAcademic extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={
      questionpapers:questionpapers,
        dropdown : dropdown,
        data:[40,50,90,20],
        color:(opacity = 1) => `rgba(255, 255, 255, 1)`,
        color1:(opacity = 1) => `rgba(255, 255, 255, 1)`,
        subjects:subjects,
        droptest:droptest,
        drop:'',
        test:'',
      }
    }

 componentDidMount(){
 }

 questionPapers=()=>{
   return(
     <View style={{marginVertical:15,marginHorizontal:10}}>
       <FlatList  data={this.state.questionpapers} numColumns={3} keyExtractor={(item, index) => index.toString()} renderItem={({item, index})=>(
         <TouchableOpacity style={{borderRadius:7,marginHorizontal:10}}>
            <View>
             <Image source={(item.img)} style={{height:width*0.3,width:width*0.27,borderRadius:7}}/>
             <Text style={[styles.text,{color:'#fff',fontSize:12,paddingVertical:4,fontWeight:'700',textAlign:'center'}]}>{item.name}</Text>
           </View>
         </TouchableOpacity>
       )}/>
     </View>
   )
 }
 dropTest=()=>{
   return(
     <View style={{justifyContent:'flex-end',marginVertical:20,alignSelf:'flex-end',marginHorizontal:20}}>
     <DropDownPicker
           items={this.state.droptest}
           defaultNull={ null}
           dropDownStyle={{backgroundColor:'#333333',borderWidth:0}}
           defaultValue={this.state.test}
           placeholder="CHOOSE"
           arrowColor={'#fff'}
           dropDownMaxHeight={width}
           style={{backgroundColor:'#333333',borderWidth:1,borderColor:'#333333'}}
           placeholderStyle={{fontWeight: 'bold',color:'#fff'}}
           labelStyle={{fontSize: 14, color: '#fff'}}
           containerStyle={{height: 40,width:width*0.4}}
           onChangeItem={item => this.setState({
               test: item.value
           })}
       />
     </View>
   )
 }
 dropdown=()=>{
   return(
     <View style={{justifyContent:'flex-end',marginVertical:20,alignSelf:'flex-end',marginHorizontal:20}}>
     <DropDownPicker
           items={this.state.dropdown}
           defaultNull={ null}
           dropDownStyle={{backgroundColor:'#333333',borderWidth:0}}
           defaultValue={this.state.drop}
           placeholder="CHOOSE"
           arrowColor={'#fff'}
           dropDownMaxHeight={width}
           style={{backgroundColor:'#333333',borderWidth:1,borderColor:'#333333'}}
           placeholderStyle={{fontWeight: 'bold',color:'#fff'}}
           labelStyle={{fontSize: 14, color: '#fff'}}
           containerStyle={{height: 40,width:width*0.4}}
           onChangeItem={item => this.setState({
               drop: item.value
           })}
       />
     </View>
   )
 }

 chart=()=>{
   return(
     <View style={{alignItems:'center',justifyContent:'center',marginHorizontal:6,marginVertical:10}}>
          <LineChart
            data={{labels: ["TEST 1", "EXAM 1", "TEST 2", "FINAL"],
                   datasets: [{data: this.state.data}]
                 }}
            height={width*0.7}
            width={width*0.8}
            withHorizontalLines
            withVerticalLines
            fromZero={true}
            yAxisInterval={20}
            chartConfig={{
              useShadowColorFromDataset:false,
              backgroundGradientFromOpacity:0,
              backgroundGradientToOpacity:0,
              backgroundColor: "#000000",
              decimalPlaces: 0,
              color: this.state.color,//(opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {borderRadius: 0,borderWidth:1,borderColor:'#fff'},
              propsForDots: {r: "4",strokeWidth: "8",stroke: this.state.color,},
              propsForBackgroundLines:{color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,}
            }}

            strokeColor={this.state.color}
            yLabelsOffset={50}
            xLabelsOffset={0}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            withOuterLines={false}
            withInnerLines={false}
            withDots
            withShadow={false}
            segments={9}
          />
         </View>
   )
 }

 barChart=()=>{
   return(
     <View>
     <BarChart
      data={data}
      width={width*0.95}
      height={width*0.7}
      yAxisLabel=""
      fromZero={true}
      chartConfig={{  backgroundColor: "#000000",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {borderRadius: 0,borderWidth:1,borderColor:'#fff'},
        propsForDots: {r: "2",strokeWidth: "2",stroke: this.state.color,},
        propsForBackgroundLines:{color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,},
        fillShadowGradient: "#0090F8",
        fillShadowGradientOpacity: 1,
      }}
      useShadowColorFromDataset={false}
      showValuesOnTopOfBars
      showBarTops
      withOuterLines={true}
      withInnerLines={false}
      barColors={'#10E9DC'}
      withHorizontalLines={true}
      withVerticalLines={true}
      showLegend
    />
     </View>
   )

 }

view1=()=>{
  return(
    <View style={{margin:10,marginVertical:20}}>
      <FlatList data={this.state.subjects} keyExtractor={(item, index) => index.toString()} numColumns={3} renderItem={({item, index})=>(
        <TouchableOpacity onPress={()=>{this.setState({color:item.color,data:item.data})}} style={{width:width*0.27,borderRadius:10,margin:10,paddingVertical:10,borderColor:'#fff',borderWidth:0.5,alignItems:'center',flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
            <View style={{backgroundColor:item.color1,height:10,width:10}}></View>
            <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',paddingHorizontal:10}]}>{item.name}</Text>
        </TouchableOpacity>
        )}
      />
    </View>
  )
}
  render() {

    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
            <ScrollView contenContainerStyle={{flex:1,alignItems:'center',backgroundColor:'#000'}}>
              {this.state.drop=='ALL SEMESTERS'?<View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                {this.dropTest()}
                {this.dropdown()}
                </View></View>:<View>{this.dropdown()}</View>
              }

              {this.state.drop=='ALL SEMESTERS'&&
                <View>
                {this.barChart()}
                </View>
              }
              {this.state.drop!='ALL SEMESTERS'&&
                <View>
                {this.chart()}
                </View>
              }
              {this.state.drop!='ALL SEMESTERS'&&
                <View>
                <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',textAlign:'center'}]}>X AXIS-EXAM TYPE</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',textAlign:'center'}]}>Y AXIS-PERCENTAGE</Text>
                </View>
              }
              {this.state.drop=='ALL SEMESTERS'&&
                <View style={{marginVertical:20}}>
                <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700',textAlign:'center'}]}>X AXIS-SEMESTER</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700',textAlign:'center'}]}>Y AXIS-AVERAGE PERCENTAGE</Text>
                </View>
              }

              {this.state.drop!='ALL SEMESTERS'&&
                <View >
                {this.view1()}
                </View>
              }
              {this.state.drop!='ALL SEMESTERS'&&
                <View style={{marginHorizontal:25}}>
                <TouchableOpacity  onPress={()=>{this.setState({color:this.state.color1,data:[40,50,90,20]})}} style={{borderRadius:10,paddingVertical:10,paddingHorizontal:0,borderColor:'#fff',borderWidth:0.5,alignItems:'center',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <View style={{backgroundColor:'#fff',height:10,width:10}}></View>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',paddingHorizontal:10}]}>AVERAGE OF ALL THE SUBJECT</Text>
                </TouchableOpacity>
                </View>
              }

            </ScrollView>
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
  return{}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticsAcademic);
