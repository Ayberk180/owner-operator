import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { addDriver } from '../services/driver'


export default function addUser() {
    const [driverName, setName] = useState("")
    const [driverDOB, setDOB] = useState("")
    const [cdlClass, setClass] = useState("")
    const [cdlState, setState] = useState("")
    const router = useRouter();


    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await addDriver(driverName, driverDOB, cdlClass, cdlState)
            router.push("/dashboard")
        }catch(error){
            console.log(error);
        }
    }

    return (
      <div className='flex justify-center'>
        <div className="w-full h-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >Driver Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={driverName} onChange={event => setName(event.target.value)} placeholder="Ex. John Doe" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >Driver Date of Birth</label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="date" value={driverDOB} onChange={event => setDOB(event.target.value)} placeholder="YYYY-MM-DD" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >CDL Class</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={cdlClass} onChange={event => setClass(event.target.value)} placeholder="Class A, B, C" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >CDL State</label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={cdlState} onChange={event => setState(event.target.value)} placeholder="NJ, NY, CA" />
                </div>
                <div className="flex items-center justify-center">
                    <button href="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
      </div>
  )
}
