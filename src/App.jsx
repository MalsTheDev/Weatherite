import React, { useState } from 'react'
import { WiDaySunny } from 'weather-icons-react';
import { WiHumidity } from 'weather-icons-react';
import { WiWindDeg } from 'weather-icons-react';
import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify';

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [isWeather, setIsWeather] = useState(false)

  const search = e => {
    if(e.key === "Enter") {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + import.meta.env.VITE_OPEN_WEATHER_API)  
        .then(res => res.json())
        .then(result => {
          console.log(result);
          if(result.message) {
            setWeather(weather)
            toast("City name is incorrect!")
          } else {
            setWeather(result)
            setCity('')
            setIsWeather(true)
            console.log(weather)
          }
        })
        .catch(err => console.log(err))
      }
    }


  return (
    <div className={`flex items-center flex-col ${weather.main?.temp > 16 ? 'bg-hot' : 'bg-cold'} transition-all h-screen w-screen bg-cover bg-center overflow-x-hidden `}>
      <input value={city} type="text" className='mx-auto mb-20 rounded-b-xl w-64 text-2xl p-2 outline-none focus:bg-white transition-all' placeholder='Town...' onChange={e => setCity(e.target.value)} onKeyPress={search}  />
      {isWeather ?
      <div className='flex flex-col items-center h-fit w-fit px-5 md:px-24 xl:px-32 bg-black bg-opacity-60 rounded-2xl mb-20'>
        <h1 className='text-4xl text-white m-10 font-mono'>{weather.name}{weather.sys.country ? `, ${weather.sys.country}` : '' }</h1>
        <div className='flex mb-10 flex-col items-center'>
          <h1 className='text-5xl m-3 md:mb-10 xl:mb-20 text-white'>{weather.main.temp}°C</h1>
          <h2 className='text-[2.5rem] font-thin uppercase text-white flex items-center'>{weather.weather[0].main} <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" /></h2>
        </div>
        <div className='flex h-fit w-full justify-between px-4 my-10'>
          <div className='flex items-center w-fit'>
            <h1 className='text-white text-2xl font-mono md:text-4xl'>{weather.main.temp_min}°C</h1>
            <ArrowDownIcon className='h-8 w-8 text-white mx-4 md:h-12 md:w-12' />
          </div>
          <div className='flex items-center w-fit'>
            <ArrowDownIcon className='h-8 w-8 text-white rotate-180 mx-4 md:h-12 md:w-12' />
            <h1 className='text-white text-2xl font-mono md:text-4xl'>{weather.main.temp_max}°C</h1>
          </div>
        </div>
        <div className='flex h-fit w-full justify-between px-5 my-10'>
          <div className='flex items-center w-fit'>
            <h1 className='text-white text-4xl font-mono'>{weather.wind.deg}</h1>
            <WiWindDeg className='h-12 w-12 text-white mx-5' />
          </div>
          <div className='flex items-center w-fit'>
            <WiHumidity className='h-12 w-12 text-white rotate-180 mx-5' />
            <h1 className='text-white text-4xl font-mono'>{weather.main.humidity}%</h1>
          </div>
        </div>
      </div>
       : ''}
        <h1 className='my-2 text-lg text-white font-bold bg-black bg-opacity-40 p-2 rounded-xl absolute right-0 bottom-0 m-5'>Created by <a href="https://malsthedev.vercel.app" className='text-blue-400'>MalsTheDev</a></h1>
    </div>
  )
  }
export default App