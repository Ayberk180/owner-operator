import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import {searchDriver, driverList} from '../services/driver'
import DriverComponent from './DriverComponent'
import { realmApp } from '../config/realm'
import Navbar from '../components/navbar'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

export default function dashboard() {
  const [drivers, setDrivers] = useState()
  const [query, setQuery] = useState("")
  const [visible, setVisible] = useState(9)
  const [debouncedQuery] = useDebounce(query, 500)
  const [hamburger, setHamburger] = useState(true)
  const router = useRouter()
  
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3)
  }

  useEffect(async () => {      
    if(!realmApp.currentUser){
      router.push('/')
      alert('Must be signed in')
    }

    try{
      
      console.log('Trying to call drivers')
      const allDrivers = await driverList()
      console.log('After calling drivers: ', allDrivers)
      setDrivers(allDrivers)

      //reset visible results on every search
      setVisible(9)
      
      if (debouncedQuery != ""){
        const searchResult = await searchDriver(debouncedQuery)
        setDrivers(searchResult)
        
    }
    }catch(error){
      console.error(error);
    }
  }, [debouncedQuery])

  const onSubmit = async event => {
    event.preventDefault()
    try{
      const logout = await realmApp.currentUser.logOut()
        .then(router.push('/'))
    }catch (error){
      console.log(error)
    }  
  }

  function hamburgerClick(){
    setHamburger(!hamburger)
    console.log(hamburger)
  }

  if(!realmApp.currentUser){
    return null
  }
  return (
    <div>
{/* NavBar */}
    <Navbar/>
{/* NavBar */}
    
      <div className='flex flex-col align-items-center lg:p-5 sm:p-2'>
        <input className='outline-gray-300 focus:outline-gray-600 md:w-4/5 lg:w-3/5 w-11/12 outline h-10 pl-3 rounded-2xl outline-2 '  onChange={e => {setQuery(e.target.value)}} placeholder='Search'/>
        {console.log('component rendered')}      
        {console.log('Drivers:', drivers)} 
        <div className='md:w-4/5 lg:w-3/5 w-11/12 mt-2 flex flex-col justify-items-center'>     
          {drivers && drivers.slice(0,visible).map((driver, index) => {
            // console.log(driver)
            return (
              <div key={index} className=''>

                <Link  href={`driver/${driver._id}`} passHref>
                  <div>
                    <DriverComponent key={driver._id} driver={driver} /> 
                  </div>
                </Link>
                
              </div>
            )
          })}  
          <button hidden={(drivers && visible > drivers.length)} className="bg-white text-emerald-600 font-bold mt-3 y-2 px-4 rounded " onClick={showMoreItems}>Load More</button>
        </div>          
        
        <form className='p-2' onSubmit={onSubmit}>
        </form>
      </div>
    </div>
  )
}
