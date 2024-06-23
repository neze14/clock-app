import React, { useEffect, useState } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import refreshIcon from './assets/icons/icon-refresh.svg';
import sunIcon from './assets/icons/icon-sun.svg';
import moonIcon from './assets/icons/icon-moon.svg';
import arrowUp from './assets/icons/icon-arrow-up.svg';

const App = () => {
  const [showMore, setShowMore] = useState(false);
  const [greeting, setGreeting] = useState('MORNING');
  const [backgroundImage, setBackgroundImage] = useState('day');

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const [abrv, setAbrv] = useState("");
  const [timezone, setTimezone] = useState("");
  const [dow, setDow] = useState(0);
  const [doy, setDoy] = useState(0);
  const [week, setWeek] = useState(0);

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const hour = new Date().getHours();
  const mins = new Date().getMinutes();
  const newMinute = mins < 10 ? `0${mins}` : mins;
  const newHour = hour < 10 ? `0${hour}` : hour;
  const time = `${newHour}:${newMinute}`;

  useEffect(() => {
    if (hour >= 18 && hour <= 23) {
      setGreeting('EVENING');
      setBackgroundImage('night');
    } else if (hour >= 12 && hour <= 17) {
      setGreeting('AFTERNOON')
      setBackgroundImage('day');
    } else {
      setGreeting('MORNING')
      setBackgroundImage('day');
    }
  }, [])

  async function randomQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random')
      const quote = await response.json()

      setQuote(quote?.content);
      setAuthor(quote?.author)
    } catch (error) {
      console.log(error)
    }
  }

  async function worldTime() {
    try {
      const response = await fetch('https://worldtimeapi.org/api/ip')
      const worldTime = await response.json();

      setAbrv(worldTime?.abbreviation);
      setTimezone(worldTime?.timezone);
      setDow(worldTime?.day_of_week);
      setDoy(worldTime?.day_of_year);
      setWeek(worldTime?.week_number);
    } catch (error) {
      console.log(error)
    }

  }

  async function getLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const loc = await response.json();

      setCity(loc?.city);
      setCountry(loc?.country_name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AOS.init();
    randomQuote()
    worldTime()
    getLocation()
  }, [])

  const styles = {
    'day': 'h-screen w-full bg-cover bg-no-repeat bg-center bg-day-mobile sm:bg-day-tablet md:bg-day-desktop overflow-hidden bg-stone-400 bg-blend-hard-light',
    'night': 'h-screen w-full bg-cover bg-no-repeat bg-center bg-night-mobile sm:bg-night-tablet md:bg-night-desktop overflow-hidden',
  }

  return (
    <main className={`${styles[backgroundImage]}`}>
      <div className='flex flex-col justify-between h-screen w-full overflow-none'>
        {showMore === false &&
          <div className='w-full h-fit flex gap-3 py-10 ml-[10%] md:w-[90%] relative'>
            {backgroundImage === 'day' &&
              <div className='absolute h-[55%] w-[80%] md:w-[55%] bg-slate-600 opacity-25 blur-sm rounded-md' />
            }
            <div className='w-[70%] md:w-[50%] flex flex-col gap-1 z-10 mt-2 pl-2'>
              <p className='inline-flex font-light'>"{quote}"</p>
              <p className='font-semibold capitalize'>{author}</p>
            </div>
            <img
              src={refreshIcon}
              className='h-6 w-6 rounded-lg cursor-pointer z-10 mt-2 '
              onClick={() => randomQuote()} />
          </div>
        }

        <div className='flex flex-col items-start gap-4 py-10 ml-[10%] md:w-[90%] xl:items-end xl:flex-row'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-1 items-center'>
              {backgroundImage === 'day'
                ? <img src={sunIcon} className='h-4 animate-spin' />
                : <img src={moonIcon} className='h-4' />}
              <p className='tracking-[0.2rem] text-xs md:text-[16px]'>GOOD {greeting}, IT'S CURRENTLY</p>
            </div>
            <div className="flex items-end gap-2 m-0">
              <p className='font-black text-[84px] lg:text-[124px] tracking-wide'>{time}</p>
              <p className='pb-6'>{abrv}</p>
            </div>
            <p className='font-bold text-lg tracking-wide'>IN {city.toLocaleUpperCase()}, {country.toLocaleUpperCase()}</p>
          </div>
          <div
            onClick={() => setShowMore(!showMore)}
            className='flex cursor-pointer xl:ml-[40%] gap-6 bg-white rounded-full pl-3 pr-1 py-1 items-center justify-evenly'>
            <p className='tracking-[0.3rem] text-gray-800'>{showMore === false ? 'MORE' : 'LESS'}</p>
            <img src={arrowUp} className={showMore === false ? 'h-12 rounded-full bg-gray-800' : 'h-12 rounded-full bg-gray-800 rotate-180'} />
          </div>
        </div>

        {showMore === true &&
          <div data-aos="fade-up" className={backgroundImage === 'day'
            ? ' text-black bg-stone-300 flex flex-col md:flex-row items-center justify-evenly py-20 px-4 md:px-20'
            : 'text-white bg-black flex flex-col md:flex-row items-center justify-evenly py-20 px-4 md:px-20'
          }>
            <div className='flex flex-col gap-6 w-full md:w-[40%]'>
              <div className='flex items-center justify-between md:gap-4 md:items-start md:justify-start md:flex-col'>
                <p className='font-light tracking-wide text-xs md:text-md'>CURRENT TIMEZONE</p>
                <p className='font-bold tracking-wide text-lg md:text-[32px] lg:text-[48px]'>{timezone}</p>
              </div>
              <div className='flex items-center justify-between md:gap-4 md:items-start md:justify-start md:flex-col'>
                <p className='font-light tracking-wide text-xs md:text-md'>DAY OF THE YEAR</p>
                <p className='font-bold tracking-wide text-lg md:text-[32px] lg:text-[48px]'>{doy}</p>
              </div>
            </div>

            <div className='flex flex-col gap-6 pt-6 md:pt-0 w-full md:w-[40%]'>
              <div className='flex items-center justify-between md:gap-4 md:items-start md:justify-start md:flex-col'>
                <p className='font-light tracking-wide text-xs md:text-md'>DAY OF THE WEEK</p>
                <p className='font-bold tracking-wide text-lg md:text-[32px] lg:text-[48px]'>{dow}</p>
              </div>
              <div className='flex items-center justify-between md:gap-4 md:items-start md:justify-start md:flex-col'>
                <p className='font-light tracking-wide text-xs md:text-md'>WEEK NUMBER</p>
                <p className='font-bold tracking-wide text-lg md:text-[32px] lg:text-[48px]'>{week}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </main>
  )
}

export default App
