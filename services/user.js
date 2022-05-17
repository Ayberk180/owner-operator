import { realmApp } from "../config/realm"
import * as Realm from "realm-web"


//create user and logout
export async function driverList() {
    const logout = await app.currentUser.logOut()
    return drivers
}

export async function userSignIn(email, password) {

    const credentials = Realm.Credentials.emailPassword(email,password)

    const user = await realmApp.logIn(credentials)
    if (app.currentUser)
        router.push('/dashboard')
}