import { useState } from 'react'

import stats from './data/stats.json'
import names from './data/names.json'

function SidePanel({allhooks}){

    const [category,setCategory,choiceStates,setChoiceStates] = allhooks;

    function catChange(e){
        setCategory(e.target.value)
        setChoiceStates(Object.keys(stats[category]).reduce((arr,curr)=>(arr[curr]=false,arr),{}))
    }

    function clickHandler(choice){
        setChoiceStates(previousState=>{return {...previousState,[choice]:!previousState[choice]}})
    }

    const categoryItems = Object.keys(names).map(nickname=>
        <option key={nickname} value={nickname}>{names[nickname]}</option>
    );
    const choiceItems = Object.keys(stats[category]).map(choice=>
        <TypeHH choice={choice} key={choice} ison={choiceStates[choice]} clickHandler={()=>clickHandler(choice)}/>
    );

    return (
        <div className='sidepanel'>
            <h1 className='title'>Percentage of households</h1>
            <select id="cat" className='catselect' value={category} onChange={catChange}>
                {categoryItems}
            </select>
            {choiceItems}
        </div>
    )
}

function TypeHH({choice,ison,clickHandler}){
    return(
        <button className='choices' value={choice} ison={String(ison)} onClick={clickHandler}>{choice}</button>
    )
}

export default SidePanel