import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import * as Realm from "realm-web"
import { realmApp } from '../config/realm';


export default function mLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();
 
    const onSubmit = async event => {
        event.preventDefault()
        // const REALM_APP_ID = "owner-operator-rarbp"
        // const app = new Realm.App({id: REALM_APP_ID})
        const credentials = Realm.Credentials.emailPassword(email,password)

        try{
            const user = await realmApp.logIn(credentials)
            if (realmApp.currentUser)
                router.push('/dashboard')
        }catch(error){
            alert('Invalid Email/Password combination')
        }
      };

  return (
    <form className='flex flex-col p-5 align-items-center' onSubmit={onSubmit}>
        <label>Sign In</label>
        <input className='outline outline-1 p-2' placeholder='Email: ' value={email} onChange={event => setEmail(event.target.value)} />
        <input className='outline outline-1 p-2' placeholder='Password: ' value={password} type="password" onChange={event => setPassword(event.target.value)}/>
        <button>Submit</button>
        <Link href="/mSignUp">Create Account</Link>
    </form>

  )
}
