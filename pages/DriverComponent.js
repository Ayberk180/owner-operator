import React from 'react'

export default function DriverComponent(props) {
    // console.log(props)
  return (
    <div className='p-5'>
        <a href="#" className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.driver.driverName}</h5>   
                {/* <p className="font-normal text-gray-700 dark:text-gray-400">Date of Birth: {props.children[1].driver_DOB}</p> */}
                <p className="font-normal text-gray-700 dark:text-gray-400">CDL Type: {props.driver.cdlClass}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">CDL State: {props.driver.cdlState}</p>
            </div>
            <div>
                <p>Complaint:</p>
            </div>
        </a>

        {/* <div className='text-red-700'>
            <p>{props.children[1].driver_name}</p>
        </div> */}
    </div>
  )
}
