import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { findDriver, getComments, uploadComment } from '../../services/driver'
import formatRelative from 'date-fns/formatRelative'


export default function DriverInfo(props) {

  const router = useRouter()
  const [comments, setComments] = useState()
  const [driver, setDriver] = useState()
  const driverId = router.query.driverId
  
  useEffect(async () => {
      if (!driverId) return;
      try {
        const driver = await findDriver(driverId)
        setDriver(driver)

        //Sort this when timestamps are included
        const comments = await getComments(driverId)
        setComments(comments)
      } catch (error) {
        console.error(error);
      }
  }, [driverId])
  
  
  const [body, setBody] = useState('')
  const onSubmit = async event => {
    
    event.preventDefault()

    try{
      const createComment = uploadComment(driverId, body)
      window.location.reload()
    }catch(error) {
      console.error(`Failed to insert item: ${err}`)
    }

  }



  return (
    <div className="flex flex-col items-center min-h-screen bg-[#ccc]">
      {driver && <div className='flex flex-col items-center text-4xl'>
        <p>{driver.driverName}</p>
        <p>{driver.cdlType}</p>
        <p>{driver.cdlState}</p>
      </div>}
      <div className='flex flex-col items-center text-xl'>
        <p className='text-2xl pt-10'>Comments:</p>
        {comments &&  comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>Body: {comment.body}</p>
              <p>Date: {formatRelative(comment.createdAt, new Date())}</p>
              <p>By: {comment.createdBy}</p>
            </div>
          )
        })}
      </div>
        <form className="h-80 px-7 w-[700px] rounded-[12px] bg-white p-4" onSubmit={onSubmit}>
            <p className="text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black">Add Comment/Questions</p> 
              <textarea value={body} onChange={event => setBody(event.target.value)} className="h-40 px-3 text-sm py-1 mt-2 outline-none border-pink-300 w-full resize-none border rounded-lg placeholder:text-sm" placeholder="Add your comments here" />
            <div className="flex justify-between mt-2"> 
              <button className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600">Submit comment</button>
              <p className="text-sm text-blue-900 ">Enter atleast 15 characters</p>
            </div>
        </form>
    </div>
    
  )
}
