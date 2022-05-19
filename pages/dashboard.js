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
    if(!realmApp.currentUser){
      router.push('/')
      alert('Must be signed in')
    }

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


  if(!realmApp.currentUser){
    return null
  }
  return (
    <div>
{/* NavBar */}
      <div className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-emerald-600 mb-3 shadow-md">
        <div className="px-4 w-full flex flex-wrap items-center">
          <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
              Owner-Operator
            </a>
          </div>
          <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
                <li className="nav-item">
                  <Link href="/addUser">
                    <button className="bg-blue-500 hover:bg-blue-700 outline outline-1 text-white font-bold mt-3 y-2 px-4 rounded" >Add Driver</button>
                  </Link>              
                </li>
                <li className="nav-item">
                  <Link href="/profile">
                    <button className=" text-white font-bold mt-3 y-2 px-4 rounded" >Profile</button>
                  </Link>
                </li>
                <li className="nav-item">
                    <button className="text-white font-bold mt-3 y-2 px-4 rounded" onClick={onSubmit}>Logout</button>
                </li>
            </ul>
          </div>
        </div>
      </div>
{/* NavBar */}
      <div className='flex flex-col align-items-center p-5 '>
        <input className='outline outline-gray-300 focus:outline-gray-600 w-2/5 h-10 pl-3 rounded-2xl outline-2 '  onChange={e => {setQuery(e.target.value)}} placeholder='Search'/>
        <Link href="/addUser">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 y-2 px-4 rounded" >Add Driver</button>
        </Link>
        {console.log('component rendered')}      
        {console.log('Drivers:', drivers)} 
        <div className='grid grid-cols-3'>     
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
