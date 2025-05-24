import Plot from 'react-plotly.js'
import {useRef} from 'react'

function ChoroMap({data,geojson,locations,lochooks}){
    const [focusLoc,setFocusLoc] = lochooks;

    function clickHandler(e){
        const clickloc = e["points"][0]["location"];
        if (clickloc===focusLoc){
            setFocusLoc("")
        }
        else{
            setFocusLoc(clickloc)
        }
    }

    return(
        <div className='map'>
            <Plot className='map-plot' data={[
                {
                type:'choropleth',
                geojson: geojson,
                locations:locations,
                featureidkey:'properties.ADM1_PCODE',
                z:data,
                zmin:0,
                zmax:100,
                selectedpoints:focusLoc===""?null:[locations.indexOf(focusLoc)], //defined selectedpoints instead of turning "select" clickmode to ensure agreement between selected/focusLoc
                unselected:{marker:{opacity:0.5}},
                selected:{marker:{opacity:1}},
                name:"",
                text:geojson["features"].map(feat=>feat["properties"]["ADM1_EN"]),
                hoverinfo:"text+z",
                hovertemplate:"%{text}: %{z:.2f}%",
                marker:{line:{width:0.5}},
                locationmode:'geojson-id',
                colorbar:{len:0.8,x:0,thickness:10},
                colorscale:'YlOrRd',
                opacity:1
                }
            ]}
            layout = {{
                geo:{
                    showframe: false,
                    showcoastlines: false,
                    bgcolor:"white",
                    projection: {
                        type: 'mercator',
                        scale:1
                    },
                    lonaxis:{range:[115.5,129]},
                    lataxis:{range:[3.7,22]},
                    domain:{lat:{range:[0,1]},lon:{range:[0,1]}}
                },
                paper_bgcolor:'white',
                plot_bgcolor:'white',
                margin:{b:5,t:5,l:5,r:5},
                dragmode:false,
                clickmode:'event' //remove select to ensure agreement between selected/focusLoc
            }}

            config = {{
                displayModeBar: false,
                responsive: true,
                scrollZoom:false
            }}
            onClick={clickHandler}
            />
        </div>
    )
}

export default ChoroMap