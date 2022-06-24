import { getDomainLocale } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import * as Realm from "realm-web"
import NonUserNavbar from '../components/nonUserNavbar';
import { realmApp } from '../config/realm';


export default function mLogin() {
    const [email, setEmail] = useState("")
    const [resetEmail, setResetEmail] = useState("")
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

    const sendReset = async event => {
        const email = "ayberk180@gmail.com"
        console.log(resetEmail)
        try{
            await realmApp.emailPasswordAuth.sendResetPasswordEmail(resetEmail)
        }catch(error){
            console.log(error)
            alert(error)
        }
    }
  return (
      <div>
          <NonUserNavbar/>
        <form className='flex flex-col p-5 align-items-center'onSubmit={onSubmit}>
            <label>Sign In</label>
            <input className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Email: ' value={email} onChange={event => setEmail(event.target.value)} />
            <input className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Password: ' value={password} type="password" onChange={event => setPassword(event.target.value)}/>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
            {/* <Link href="/mSignUp">Create Account</Link> */}
            <Link href="/forgotPassword">Forgot your password?</Link>
        </form>

        <div className='flex flex-col align-items-center'>
            <form className='flex flex-col align-items-center outline p-20' onSubmit={sendReset}>
                <p>Enter email of account to be reset:</p>
                <input className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={resetEmail} onChange={event => setResetEmail(event.target.value)} placeholder="Ex. John Doe" />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Send Reset Link</button>
            </form>
        </div>
      </div>

  )
}
