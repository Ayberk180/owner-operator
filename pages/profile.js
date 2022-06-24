import { formatRelative } from 'date-fns'
import Link from 'next/link'
import randomstring from 'randomstring'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { realmApp } from '../config/realm'
import { findDriver, getMyComments, test } from '../services/driver'
import { getUserId, userEmail, resetPassword, generateToken, storeToken } from '../services/user'

function profile() {

  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('')
  const [visible, setVisible] = useState(1)
  const [myComments, setMyComments] = useState([])
  const [token, setToken] = useState('')

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3)
  }

  useEffect(async () => {
    setUsername(await userEmail())
    setMyComments(await getMyComments(await getUserId()))
    
    // const test = await test(await getMyComments())
  }, [userId])

  const copy = async () => {
    await navigator.clipboard.writeText(token);
    alert('Text copied');
  }

  async function getDriver(driverId) {
    try{
      // console.log( await findDriver(driverId))
      const driver = await findDriver(driverId)
      return driver
    }catch(error){
      console.log(error)
    }
  }

  function geneToken(){
    const genToken = randomstring.generate()
    const url = "http://localhost:3000/register?token=" + genToken
    console.log(url)
    storeToken(genToken)
    return setToken(url)
}

  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <div className='flex flex-col  min-h-screen lg:w-4/5  border-2 border-x-gray-200'>
          <p className='flex flex-col items-center mt-12 text-4xl'>Hi, {username.email}!</p>
            <div className='flex flex-col items-center mt-12 text-2xl'>
              <div className='w-4/5 sm:w-4/5 grid justify-items-center'>
                <p className='text-3xl'>Invite a new member</p>
                <p>Click below to generate new URL and send to new member</p>
              </div>
              <form className='w-4/5 lg:w-3/5'>
                <p className=" text-xs md:text-sm py-1 mt-2 outline-none h-8 w-full resize-none border rounded-lg " disabled={true} >{token}</p>
                <div className="flex justify-center mt-2"> 
                  <button className="h-12 mr-2  w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600" type="button" onClick={geneToken}> Generate Link</button>
                  <button className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600" type="button" onClick={copy}>Copy To Clipboard</button>
                </div>
              </form>
              <p className='mt-20'> Change Password</p>
              <form className='w-4/5 lg:w-2/5 '>
                <input className="px-3 text-sm py-1 mt-2 outline-none  w-full resize-none border rounded-lg placeholder:text-sm" placeholder="Current password" />
                <input className="px-3 text-sm py-1 mt-2 outline-none  w-full resize-none border rounded-lg placeholder:text-sm" placeholder="New password" />
                <input className="px-3 text-sm py-1 mt-2 outline-none  w-full resize-none border rounded-lg placeholder:text-sm" placeholder="Repeat new password" />
                <div className="flex justify-center mt-2"> 
                  <button className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600">Change Password</button>
                </div>
              </form>
              <p className='text-2xl mt-20'>My Comments</p>
              {myComments &&  myComments.slice(0,visible).map((comment) => {
                console.log(realmApp.currentUser)
                return (
                  <div key={comment._id} className='  flex flex-col items-center mt-12 text-2xl border-t-2 border-gray-200'>
                    <div className='flex flex-row text-xl'>
                      Comment about&nbsp;
                      <Link href={'/driver/' + comment.driverId}>{comment.driverName || "untitled"}</Link> 
                      <p className='pl-2 text-lg text-gray-400'> {formatRelative(comment.createdAt, new Date())}</p>
                    </div>
                    <p className='pl-10'>{comment.body}</p>
                  </div>
                )
              })}
                  <button hidden={(visible > myComments.length)} className="bg-white text-emerald-600 font-bold mt-3 y-2 px-4 rounded" onClick={showMoreItems}>Load More</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default profile