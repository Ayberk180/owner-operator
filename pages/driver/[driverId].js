import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { findDriver, getComments, uploadComment } from '../../services/driver'
import formatRelative from 'date-fns/formatRelative'
import Navbar from '../../navbar'


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
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <div className="flex flex-col  min-h-screen w-3/5 border-2 border-x-gray-200">
          {driver && <div className='flex flex-col items-center mt-12 text-4xl'>
            <p>{driver.driverName}</p>
            <p>License Class: {driver.cdlClass}</p>
            <p>License State: {driver.cdlState}</p>
          </div>}
        
          <div className='flex flex-col p-32 text-xl'>
            <p className='text-3xl font-semibold'>Comments</p>
            {comments &&  comments.map((comment) => {
              console.log(comment)
              return (
                <div key={comment._id} className='border-t-2 border-gray-200'>
                  <p className='flex flex-row text-xl'>
                    {comment.createdBy} 
                    <p className='pl-2 text-lg text-gray-400'> {formatRelative(comment.createdAt, new Date())}</p>
                  </p>
                  <p className='pl-10'>{comment.body}</p>
                </div>
              )
            })}
          
            <form className="h-80  w-[700px] rounded-[12px] bg-white pt-4" onSubmit={onSubmit}>
                <p className="text-2xl font-semibold ">Add Comment</p> 
                  <textarea value={body} onChange={event => setBody(event.target.value)} className="h-40 px-3 text-sm py-1 mt-2 outline-none border-pink-300 w-full resize-none border rounded-lg placeholder:text-sm" placeholder="Add your comments here" />
                <div className="flex justify-between mt-2"> 
                  <button className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600">Submit comment</button>
                  <p className="text-sm text-blue-900 ">Enter atleast 15 characters</p>
                </div>
            </form>
            </div>
        </div>
      </div>
    </div>
    
  )
}
