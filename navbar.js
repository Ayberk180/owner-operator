import React from 'react'
import Link from 'next/link'
import Dropdown from './dropdown'
import DropdownRender from './dropdown'


export default function Navbar() {
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3 shadow-md">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
            pink Color
          </a>
        </div>
        <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
              <li className="nav-item">
                <Link href="/addUser">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 y-2 px-4 rounded" >Add Driver</button>
                </Link>              
              </li>
              <li className="nav-item">
                <Link href="/addUser">
                  <button className=" text-white font-bold mt-3 y-2 px-4 rounded" >Profile</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/addUser">
                  <button className="text-white font-bold mt-3 y-2 px-4 rounded" >Logout</button>
                </Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}
