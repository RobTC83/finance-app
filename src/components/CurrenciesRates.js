import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Line} from 'react-chartjs-2'



export default function CurrenciesRates() {

    const [data, setData] = useState({})
    const [loading,setLoading] = useState(true)

    const [date,setDate] = useState({
        startDate: "2020-01-01",
        endDate: "2020-02-28"

    })

    const {currency} = useParams()
    
    useEffect(()=>{

        const getRates = async (cur) =>{
            
            const res = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${cur}`)

            const rates = await res.data.rates
            console.log("rates", rates)

            const labels = Object.keys(rates)
            console.log("labels:", labels)

            const dataValues = Object.keys(rates).map((e,i)=>{
                    return(
                        rates[e][cur] 
                    )
            })
            // voy a tener todos los datos del API y ponerlo en la gráfica
            setData({
                labels: labels,

                datasets:[{
                    label: "Tipo de Cambio",
                    data: dataValues,
                    borderColor: "#F39C12",
                    pointRadius:2,
                    pointBackgroundColor:"#A04000",
                    fontColor:"black",
                    backgroundColor:"#D4EFDF",
                    options: {
                            responsive: true,
                         maintainAspectRatio : false,
                         tooltips: {
                            backgroundColor: "rgba(0,0,0,0.8)",
                            bodyAlign: "left",
                            bodyFontColor: "#fff",
                            bodySpacing: 2,
                            borderColor: "rgba(0,0,0,0)",
                            borderWidth: 0,
                            caretPadding: 2,
                            caretSize: 5,
                            cornerRadius: 6,
                            custom: null,
                            displayColors: true,
                            enabled: true,
                            footerAlign: "left",
                            footerFontColor: "#fff",
                            footerFontStyle: "bold",
                            footerMarginTop: 6,
                            footerSpacing: 2,
                            intersect: true,
                            mode: "nearest",
                            multiKeyBackground: "#fff",
                            position: "average",
                            titleAlign: "left",
                            titleFontColor: "#fff",
                            titleFontStyle: "bold",
                            titleMarginBottom: 6,
                            titleSpacing: 2,
                            xPadding: 6,
                            yPadding: 6,
                          }
                       }



                }],

                



            })
            setLoading(false)


        }

        getRates(currency)

    },[currency,date])

    const handleDate = (e) => {
        console.log(e.target.value)
        setDate({
            ...date,
            [e.target.name]:[e.target.value]
        })
    }

    console.log(date)

    const options = {
        maintainAspectRatio: false	// Don't maintain w/h ratio

    }

    return (

        <div>

<div>

    
        <div>
            <label class="m-3">Fecha de inicio:</label>
            <input 
                    class="m-3 p-3 border rounded-lg"
                    type="date"
                    onChange={(e) => {handleDate(e)}}
                    value={date.startDate}
                    name="startDate"
            />
        </div>
        <div>
            <label class="m-3">Fecha de fin:</label>
            <input 
                    class="m-3 p-3 border rounded-lg"
                    type="date"
                    onChange={(e) => {handleDate(e)}}
                    value={date.endDate}
                    name="endDate"
            />
        </div>

 
                
                
            </div>

            {
                loading ?
                    <h1>Cargando...</h1>
                    :

            
            <div class=" border p-3 m-3" width="1000">
                    <article className="canvas-container">
                        <Line data={data} options={options}/>
                    </article>
            </div>

        }

            
        </div>
    )
}
