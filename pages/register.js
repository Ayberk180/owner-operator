import Router, {useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { createUserData, deactivateToken, getTokens, registerUser } from '../services/user'
import * as Realm from "realm-web"
import { realmApp } from '../config/realm'
import NonUserNavbar from '../components/nonUserNavbar'


export default function register() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [confPass, setConfPass] = useState("")
    const [refToken, setRefToken] = useState("")
    const router = useRouter()
    
    useEffect(async () => {
        if(router.isReady){
            setRefToken(router.query.token)
        }
    },[router.isReady])

    async function register(){
        const tokenArray = await getTokens()
        
        console.log(email)
        console.log(pass)
        console.log(refToken)

        for (let token of tokenArray){
            if (refToken == token.tokenId){
                if (pass == confPass && token.active == false) {
                    await registerUser(email, pass)
                    await deactivateToken(refToken)
                    const credentials = Realm.Credentials.emailPassword(email, pass)
                    
                    try{
                        const user = await realmApp.logIn(credentials)
                        if (realmApp.currentUser)
                            createUserData(realmApp.currentUser.id, firstName,lastName)
                            Router.push('/dashboard')
                    }catch(error){
                        alert(error)
                    }
                }else{
                    alert("Conditions not met")
            }
        }
    }
        }
        

    console.log(pass)
    function handleSubmit(){
        const tokenArray = getTokens()

        if(pass==confPass){}
    }
  return ( 
      <div>

        <NonUserNavbar/>
        <div className='flex justify-center'>
            <div className="w-full h-full max-w-xs">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                    <label className="block text-gray-700 text-sm font-bold mb-2" >Invited By: {refToken}</label>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >First Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={firstName} onChange={event => setFirstName(event.target.value)} placeholder="Ex. John" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >Last Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={lastName} onChange={event => setLastName(event.target.value)} placeholder="Ex. Smith" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >Email Address</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={event => setEmail(event.target.value)} placeholder="Ex. JohnSmith@email.com" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >Password</label>
                        <input className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type='password' value={pass} onChange={event => setPass(event.target.value)} placeholder="Enter Password" />
                        
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >Confirm Password</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='password' value={confPass} onChange={event => setConfPass(event.target.value)} placeholder="Enter Password" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={register}>Create Account</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}
