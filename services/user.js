import { realmApp } from "../config/realm"
import * as Realm from "realm-web"
import randomstring, { generate } from 'randomstring'

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
    const userId = realmApp.currentUser.id
    return userId
}

export async function resetPassword(){
    const email = "ayberk180@gmail.com"
    await realmApp.emailPasswordAuth.sendResetPasswordEmail({ email });
  }

export async function storeToken(token){        

    const uploadToken = await realmApp.currentUser.mongoClient('mongodb-atlas'). db('Owner-Operator').collection('registration-tokens').insertOne(
        {
            "tokenId" : token,
            "active" : false,
            "createdBy" : realmApp.currentUser.id,
            "createdOn" : new Date
        }
    )
    
    return uploadToken
}

export async function getTokens(){
    console.log("pretokenArray")
    const tokenArray = await realmApp.currentUser.mongoClient('mongodb-atlas'). db('Owner-Operator').collection('registration-tokens').find({}, {projection: {tokenId:1, active:1, _id:0}})
    console.log("tokenArray")
    return tokenArray
}

export async function registerUser(email, password, firstName, lastName){
    console.log("hello?")
    try{
        await realmApp.emailPasswordAuth.registerUser({email, password})
        
    }catch(error){
        console.log(error);
        return error
    }

}
export async function createUserData(userId, firstName, lastName){
    await realmApp.currentUser.mongoClient('mongodb-atlas'). db('Owner-Operator').collection('user-data').insertOne(
            { 
                userId: userId,
                firstName: firstName,
                lastName: lastName,

            }  // Set the logged in user's favorite color to purple
      );
}

export async function deactivateToken(tokenId){
    const updateToken = await realmApp.currentUser.mongoClient('mongodb-atlas'). db('Owner-Operator').collection('registration-tokens').updateOne({tokenId:tokenId}, {$set: {active:true}})
}

export async function getUserDetails(userId){
    const user = await realmApp.currentUser.mongoClient('mongodb-atlas'). db('Owner-Operator').collection('user-data').findOne({})
    console.log("id: " ,user.userId)
    return user
}

// Invite users by email
// export async function sendInvite() {
//     const transporter = nodemailer.createTransport({})
// }