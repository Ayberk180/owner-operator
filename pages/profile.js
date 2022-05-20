import { formatRelative } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { getMyComments } from '../services/driver'
import { getUserId, userEmail } from '../services/user'

function profile() {

  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('')
  const [myComments, setMyComments] = useState([])


  useEffect(async () => {
    setUsername(await userEmail())
    setMyComments(await getMyComments(await getUserId()))

    
  }, [userId])

  
  console.log(myComments)
  const invite = async event => {

  }
  

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col  min-h-screen w-3/5 border-2 border-x-gray-200'>
        <p className='flex flex-col items-center mt-12 text-4xl'>Hi, {username.email}!</p>
          <div className='flex flex-col items-center mt-12 text-2xl'>
            <p>Invite a new member</p>
            <form className='w-2/5 flex flex-row'>
              <input className="px-3 text-sm py-1 mt-2 outline-none  w-full resize-none border rounded-lg placeholder:text-sm" placeholder="Enter Email" />
              <div className="flex justify-between mt-2"> 
                <button className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600">Submit comment</button>
              </div>
            </form>
            <p className='mt-20'> Change Password</p>
            <form className='w-2/5 '>
              <input className="px-3 text-sm py-1 mt-2 outline-none  w-full resize-none border rounded-lg placeholder:text-sm" placeholder="Current password" />
              <input className="px-3 text-sm py-1 mt-2 outline-none  w-full resize-none border rounded-lg placeholder:text-sm" placeholder="New password" />
              <input className="px-3 text-sm py-1 mt-2 outline-none  w-full resize-none border rounded-lg placeholder:text-sm" placeholder="Repeat new password" />
              <div className="flex justify-center mt-2"> 
                <button className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600">Submit comment</button>
              </div>
            </form>
            <p className='text-2xl mt-20'>My Comments</p>
            {myComments &&  myComments.map((comment) => {
              console.log(comment)
              return (
                <div key={comment._id} className='  flex flex-col items-center mt-12 text-2xl border-t-2 border-gray-200'>
                  <p className='flex flex-row text-xl'>
                    Comment about {comment.driverId} 
                    <p className='pl-2 text-lg text-gray-400'> {formatRelative(comment.createdAt, new Date())}</p>
                  </p>
                  <p className='pl-10'>{comment.body}</p>
                </div>
              )
            })}
          </div>
      </div>
    </div>
  )
}

export default profile