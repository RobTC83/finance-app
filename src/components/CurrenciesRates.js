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
                    borderColor: "blue",
                    pointRadius:5,
                    pointBackgroundColor:"red"


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

    return (

        <div>

<div>
                <input 
                    type="date"
                    onChange={(e) => {handleDate(e)}}
                    value={date.startDate}
                    name="startDate"
                />
                <input 
                    type="date"
                    onChange={(e) => {handleDate(e)}}
                    value={date.endDate}
                    name="endDate"
                />
            </div>

            {
                loading ?
                    <h1>Cargando...</h1>
                    :

            

            <Line data={data}/>

        }

            
        </div>
    )
}
