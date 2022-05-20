import { realmApp } from "../config/realm"
import * as Realm from "realm-web"

//create user and logout
export async function driverList() {
    const logout = await realmApp.currentUser.logOut()
    return drivers
}

export async function userSignIn(email, password) {

    const credentials = Realm.Credentials.emailPassword(email,password)

    const user = await realmApp.logIn(credentials)
    if (app.currentUser)
        router.push('/dashboard')
}

export async function userEmail() {
    const userInfo = await realmApp.currentUser.profile
    return userInfo
}

export async function getUserId() {
    const userId = await realmApp.currentUser.id
    console.log(userId)
    return userId
}


// Invite users by email
// export async function sendInvite() {
//     const transporter = nodemailer.createTransport({})
// }