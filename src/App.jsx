import { useState, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SidePanel from './SidePanel'
import ChoroMap from './ChoroMap'
import Pie from './Pie'
import geojson from './data/regions.json'
import stats from './data/stats.json'
import names from './data/names.json'

const locations = geojson["features"].map(feat=>feat["properties"]["ADM1_PCODE"]);
const numfeats = geojson.features.length;
const locationNames = Object.fromEntries(geojson["features"].map(feat=>[feat["properties"]["ADM1_PCODE"],feat["properties"]["ADM1_EN"]]));
console.log(locationNames);

function App() {
  const [category,setCategory] = useState(Object.keys(names)[0]);
  const [choiceStates,setChoiceStates] = useState(Object.keys(stats[category]).reduce((arr,curr)=>(arr[curr]=false,arr),{}));
  const [focusLoc,setFocusLoc] = useState("");

  function computeData(states){
    const newState = locations.map((loc)=>{
      const cat = Object.keys(states)[0];
      const choices = Object.keys(states[cat]);
      var sum = 0;
      for (let i=0;i<choices.length;i++){
        if (states[cat][choices[i]]){
          sum += stats[cat][choices[i]][loc]
        }
      }
      return 100*sum/stats["total"][loc];
    })
    return newState
  }

  function computePie(cat){ //lalagyan pa ng event handler for clicking sa map
    const data = {}
    const choices = Object.keys(stats[cat]);
    if (focusLoc==""){
    return Object.fromEntries(choices.map((k)=>{
      return [k,locations.reduce((sum,loc)=>sum+stats[cat][k][loc],0)]
    }));
    }
    else{
      return Object.fromEntries(choices.map((k)=>[k,stats[cat][k][focusLoc]]));
    }
  }

  const data = computeData({[category]:choiceStates})
  const piedata = computePie(category)

  return (
    <div className='container'>
      <SidePanel allhooks={[category,setCategory,choiceStates,setChoiceStates]} />
      <ChoroMap data={data} geojson={geojson} locations={locations} lochooks={[focusLoc,setFocusLoc]}/>
      <Pie data ={piedata} categoryName={names[category]} focusLocName={focusLoc===""?"":locationNames[focusLoc]}/>
    </div>
  )
}

export default App
