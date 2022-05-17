import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import {searchDriver, driverList} from '../services/driver'
import DriverComponent from './DriverComponent'
import { realmApp } from '../config/realm'
import Navbar from '../navbar'

export default function dashboard() {
  const [drivers, setDrivers] = useState()
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 500)
  const router = useRouter()
  
  useEffect(async () => {      
    // if(!app.currentUser){
    //   router.push('/')
    // }

    try{
      
      console.log('Trying to call drivers')
      const allDrivers = await driverList()
      console.log('After calling drivers: ', allDrivers)
      setDrivers(allDrivers)
    
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


  // if(!app.currentUser){
  //   return null
  // }
  return (
    <div>
      <Navbar />
      <div className='flex flex-col align-items-center p-5 '>
          <input className='outline outline-black w-2/5 h-10 rounded-2xl outline-2 '  onChange={e => {setQuery(e.target.value)}} placeholder='Search'/>
          <Link href="/addUser">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 y-2 px-4 rounded" >Add Driver</button>
          </Link>
        {console.log('component rendered')}      
        {console.log('Drivers:', drivers)} 
        <div className='grid gap-4 grid-cols-3'>     
          {drivers && drivers.map((driver, index) => {
            // console.log(driver)
            return (
              
                <Link key={index} href={`driver/${driver._id}`} passHref>
                  <div>
                    <DriverComponent key={driver._id} driver={driver} /> 
                  </div>
                </Link>
            )
          })}
        </div>
        <form className='p-2' onSubmit={onSubmit}>
          <button>logout</button>
        </form>
      </div>
    </div>
  )
}
