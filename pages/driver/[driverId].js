import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { deleteComment, findDriver, getComments, uploadComment } from '../../services/driver'
import formatRelative from 'date-fns/formatRelative'
import Navbar from '../../components/navbar'
import { getUserDetails } from '../../services/user'
import { realmApp } from '../../config/realm'
import { AiOutlineClose } from 'react-icons/ai'


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

  async function delComment(id, e) {
    e.preventDefault()
    const deleting = await deleteComment(id)
    router.reload(window.location.pathname)
    
  }


  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <div className="flex flex-col  min-h-screen w-4/5 lg:w-3/5">
          {driver && <div className='flex flex-col items-center mt-12 text-2xl md:text-4xl'>
            <p>{driver.driverName}</p>
            <p>License Class: {driver.cdlClass}</p>
            <p>License State: {driver.cdlState}</p>
          </div>}
        
          <div className='flex flex-col text-xl'>
            <p className='text-3xl font-semibold'>Comments</p>
            {comments &&  comments.map((comment) => {
              //call function here
              console.log("comment here", comment.createdBy)
              const user = getUserDetails(comment.createdBy)
              // console.log(comment._id)
              
              if (comment.createdBy == realmApp.currentUser.id) {
                console.log("they are the same")
              }
              return (
                  <div key={comment._id} className='border-t-1 flex rounded-xl my-1 outline outline-gray-100'>
                    <div className=''>
                      <div className=''>
                        <div className='flex pl-2 flex-row text-sm md:text-xl '>
                          {user.firstname || "Should have a Name"} 
                          <p className='pl-2 text-xs md:text-lg text-gray-400'> {formatRelative(comment.createdAt, new Date())}</p>
                        </div>
                        
                      </div>
                      <p className='pl-10 text-sm md:text-xl'>{comment.body}</p>
                    </div>
                    <button className='ml-auto md:px-4 bg-red-400 text-sm text-white rounded-r-xl px-1 transition-all cursor-pointer hover:bg-red-600' hidden={!(comment.createdBy == realmApp.currentUser.id)} onClick={e => {delComment(comment._id, e)}}>
                      Delete
                    </button>
                  </div>
              )
            })}
          
            <form className="h-80  w-full rounded-[12px] bg-white pt-4" onSubmit={onSubmit}>
                <p className="text-2xl font-semibold ">Add Comment</p> 
                  <textarea value={body} onChange={event => setBody(event.target.value)} className="h-40 px-3 text-sm py-1 mt-2 outline-none border-pink-300 w-full resize-none border rounded-lg placeholder:text-sm" placeholder="Add your comments here" />
                <div className="flex justify-between mt-2"> 
                  <button className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600">Submit comment</button>
                </div>
            </form>
            </div>
        </div>
      </div>
    </div>
    
  )
}
