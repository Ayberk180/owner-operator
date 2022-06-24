import React from 'react'

export default function DriverComponent(props) {
    // console.log(props)
  return (
    <div>
        <a href="#" className="block w-full p-2 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className='flex'>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">{props.driver.driverName}</h5>   
                {/* <p className="font-normal text-gray-700 dark:text-gray-400">Date of Birth: {props.children[1].driver_DOB}</p> */}
                <p className="font-normal mt-1 ml-10 text-gray-700 dark:text-gray-400">Class: {props.driver.cdlClass}</p>
                <p className="font-normal ml-10 mt-1 text-gray-700 dark:text-gray-400">State: {props.driver.cdlState}</p>
            </div>
        </a>
    </div>
  )
}
