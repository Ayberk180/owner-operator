import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import * as  Realm from 'realm-web'

export default function logged_in() {
  const router = useRouter()
  const REALM_APP_ID = "owner-operator-rarbp"
  const app = new Realm.App({id: REALM_APP_ID})
  
  useEffect(async () => {      
    if(!app.currentUser){
      router.push('/')
    }
  })
  if(!app.currentUser){
    return null
  }

  const onSubmit = async event => {
    event.preventDefault()
      
    try{
      const logout = await app.currentUser.logOut()
        .then(router.push('/'))
    }catch (error){
      console.log(error)
    }
  } 

  return (
    <div className='flex flex-col align-items-center p-5'>
      logged in
      <form onSubmit={onSubmit}>
        <button>logout</button>
      </form>
    </div>

  )
}
