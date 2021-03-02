import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'



export default function Sidebar() {
    
    const [currencies, setCurrencies] = useState([])
    
    useEffect(() => {
        const getCurrencies = async () => {
            
            const res = await axios.get("https://api.exchangeratesapi.io/latest")
            const data = res.data.rates

            const arrData = Object.keys(data)

            console.log(data)
            console.log("Object.keys",arrData)

            setCurrencies(arrData)
            
        }
        getCurrencies()
    }, [])

        console.log(currencies)
    
    return (
        <div>
            <ul class="divide-y divide-gray-300">
            {
                currencies.map((e,id)=>{
                    return (
                        <li class="p-4 hover:bg-gray-50 cursor-pointer">

                        <Link key={id} to={`/${e}`}>{e}</Link>
                        </li>


                    )
                })
            }
            </ul>

        </div>
    )
}
