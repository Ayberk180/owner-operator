import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import * as  Realm from 'realm-web'

function useProtect(){
    const router = useRouter()
    const REALM_APP_ID = "owner-operator-rarbp"
    const app = new Realm.App({id: REALM_APP_ID})

    useEffect(async () => {      
        if(!app.currentUser){
        router.push('/notLoggedIn')
        }
    })

    if(!app.currentUser){
    return null
    }
}