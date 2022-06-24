import React, { useState } from 'react'
import Link from 'next/link'
import Dropdown from './dropdown'
import DropdownRender from './dropdown'
import { realmApp } from '../config/realm'
import { useRouter } from 'next/router'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'


export default function Navbar() {

  const router = useRouter()
  const [hamburger, setHamburger] = useState(true)


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

  return (

     <div className='mb-3'>
      <div className="flex flex-wrap items-center justify-between px-2 bg-emerald-600 shadow-md sticky top-0 z-0 ">
        <div className="p-3 px-4 w-full flex items-center ">
          <div className="float-left lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <Link href="/dashboard">
              <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                Owner-Operator
              </a>
            </Link>
          </div>
          <div className='lg:hidden ml-auto text-white' onClick={hamburgerClick}>
            {hamburger ? <AiOutlineMenu size={30} /> : <AiOutlineClose size={30}  />}
          </div>
          <div className="p-2 lg:flex flex-enditems-center hidden ml-auto lg:visible" id="example-navbar-warning">
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
                <li className="nav-item">
                  <Link href="/addDriver">
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
      <div className='bg-stone-600 lg:hidden' hidden={hamburger}> 
            <ul className=''>
                <Link href="/addDriver">
                  <li className="p-4 border-b border-gray-400 flex justify-center nav-item">
                    <button className="text-white font-bold mt-3 y-2 px-4 rounded" >Add Driver</button>
                  </li>
                </Link>              
                <Link href="/profile">
                  <li className="p-4 border-b border-gray-400 flex justify-center  nav-item">
                    <button className=" text-white font-bold mt-3 y-2 px-4 rounded" >Profile</button>
                  </li>
                </Link>
                  <li className="p-4 border-b border-gray-400 flex justify-center nav-item" onClick={onSubmit}>
                      <button className="text-white font-bold mt-3 y-2 px-4 rounded" >Logout</button>
                  </li>
              </ul>
          </div>
    </div>

  )
}
