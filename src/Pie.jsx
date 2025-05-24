import Plot from 'react-plotly.js'
import geojson from './data/regions.json'

function Pie({data,categoryName,focusLocName}){
    const values = Object.values(data);
    const labels = Object.keys(data);

    return(
        <div className='pie'>
            <Plot className='pie-plot' data={[
                {
                type:'pie',
                values: values,
                labels: labels,
                textinfo:'label',
                showlegend:false,
                textposition:'inside',
                insidetextfont:{color:'white'},
                textfont:{size:12},
                domain:{y:[0,1]},
                sort:false
                }
            ]}

            layout = {{
                paper_bgcolor:'white',
                plot_bgcolor:'white',
                margin:{b:10,t:60,r:20,l:20},
                title:{text:"Percent of households<br>("+categoryName+")",
                    font:{size:16},
                    automargin:true,
                    yref:'paper',
                    yanchor:'top',
                    subtitle:{text:focusLocName===""?"Philippines":focusLocName}
                }
            }}

            config = {{
                displayModeBar: false,
                responsive: true,
                scrollZoom:false
            }}
            />
        </div>
    )
}

export default Pie