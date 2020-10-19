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

const dropdown=[{label: 'CLASS I', value: 'CLASS I'},
                {label: 'CLASS II', value: 'CLASS II'},
                {label: 'CLASS III', value: 'CLASS III'},]

const subjects=[{name:'MATHS',color1:'#FF0000',data:[20,30,70,10],
                 color:(opacity=1)=>`rgba(255,0,0,${opacity})`,},
                {name:'SCIENCE',color1:'#FFE500',data:[40,50,90,20],
                 color:(opacity=1)=>`rgba(255,230,0,${opacity})`},
                {name:'SOCIAL',color1:'#04B600',data:[10,20,90,40],
                color:(opacity=1)=>`rgba(4,182,0,${opacity})`},
                {name:'ENGLISH',color1:'#001AFF',data:[30,50,40,20],
                color:(opacity=1)=>`rgba(0,26,255,${opacity})`},
                {name:'KANNDA',color1:'#FF4D00',data:[40,50,90,20],
                color:(opacity=1)=>`rgba(255,77,0,${opacity})`,},
                {name:'HINDI',color1:'#10E9DC',data:[40,20,90,60],
                color:(opacity=1)=>`rgba(16,233,220,${opacity})`,},]
const data = {labels: ["1", "2", "3", "4", "5", "6","7","8"],
                  datasets: [
                    {
                      data: [20, 45, 28, 80, 99, 43,20,70]
                    }
                  ]
                };
const sections =[{pk:1,name:'SEC A',click:false},{pk:2,name:'SEC B',click:false},
                  {pk:3,name:'SEC C',click:false},{pk:4,name:'ALL',click:false}]

class SchoolStafStatistics extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

  constructor(props) {
    super(props);
    this.state={

        dropdown : dropdown,
        data:[40,50,90,20],
        color:(opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        color1:(opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        subjects:subjects,
        sections:sections,
        drop:'',
        test:'',
      }
    }

 componentDidMount(){
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
 clickSection=(item,index)=>{
   this.state.sections[index].click = !this.state.sections[index].click
   this.setState({sections})
   this.setState({itemindex:item.pk})
 }

secTion=()=>{
  return(
        <View style={{margin:10,marginVertical:20}}>
          <FlatList data={this.state.sections} keyExtractor={(item, index) => index.toString()} horizontal={true} renderItem={({item, index})=>(
            <TouchableOpacity onPress={()=>{this.clickSection(item,index)}} style={{width:width*0.2,borderRadius:10,margin:7,paddingVertical:10,borderColor:(item.click==true&&this.state.itemindex==item.pk)?'#333333':'#fff',borderWidth:0.5,alignItems:'center',flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:(item.click==true&&this.state.itemindex==item.pk)?'#333333':'#000'}}>
                <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',paddingHorizontal:10}]}>{item.name}</Text>
            </TouchableOpacity>
            )}
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
      <Headers navigation={this.props.navigation} name={'STATISTICS'}
          screen={'SchoolStafStatistics'}/>
            <ScrollView contenContainerStyle={{flex:1,alignItems:'center',backgroundColor:'#000'}}>
              {this.dropdown()}
              {this.secTion()}
              {this.chart()}
                <View style={{marginVertical:20}}>
                <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700',textAlign:'center'}]}>X AXIS-EXAM TYPE</Text>
                <Text style={[styles.text,{color:'#fff',fontSize:16,fontWeight:'700',textAlign:'center'}]}>Y AXIS-AVERAGE PERCENTAGE OF CLASS</Text>
                </View>

                <View style={{marginVertical:20,marginHorizontal:20}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:35}}>
                <Text style={[styles.text,{color:'#ff0000',fontSize:16,fontWeight:'700',textAlign:'center'}]}>0-35 %:4</Text>
                <Text style={[styles.text,{color:'#ff7a00',fontSize:16,fontWeight:'700',textAlign:'center'}]}>35-60 %:10</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:35,marginTop:10}}>
                <Text style={[styles.text,{color:'#ffd600',fontSize:16,fontWeight:'700',textAlign:'center'}]}>60-85 %:10</Text>
                <Text style={[styles.text,{color:'#61ff00',fontSize:16,fontWeight:'700',textAlign:'center'}]}>85-100 %:10</Text>
                </View>
                </View>

                {this.view1()}

                <View style={{marginHorizontal:25}}>
                <TouchableOpacity  onPress={()=>{this.setState({color:this.state.color1,data:[40,50,90,20]})}} style={{borderRadius:10,paddingVertical:10,paddingHorizontal:0,borderColor:'#fff',borderWidth:0.5,alignItems:'center',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <View style={{backgroundColor:'#fff',height:10,width:10}}></View>
                    <Text style={[styles.text,{color:'#fff',fontSize:14,fontWeight:'700',paddingHorizontal:10}]}>AVERAGE OF ALL THE SUBJECT</Text>
                </TouchableOpacity>
                </View>


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
    return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolStafStatistics);
