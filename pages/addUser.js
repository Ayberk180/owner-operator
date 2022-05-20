import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Dropdown from 'react-dropdown'
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
            if (driverName.trim().length && driverDOB.trim().length && cdlClass.trim().length && cdlState.trim().length !== 0) {
                await addDriver(driverName, driverDOB, cdlClass, cdlState)
                router.push("/dashboard")
            }else{
                alert('Missing Inputs')
            }
        }catch(error){
            console.log(error);
        }
    }

    const states = [" ","AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT",
                    "NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]
    const classes = [" ","A","B","C"]
    const defaultState = states[0]
    const defaultClass = classes[0]

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
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-400 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="date" value={driverDOB} onChange={event => setDOB(event.target.value)} placeholder="YYYY-MM-DD" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >CDL Class</label>
                    <Dropdown className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" options={classes} onChange={event => setClass(event.value)} placeholder="Select a Class" />
                    
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >CDL State</label>
                    <Dropdown className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" options={states} onChange={event => setState(event.value)} placeholder="Select a State" />
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
