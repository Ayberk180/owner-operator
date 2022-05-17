import * as Realm from "realm-web"
import { realmApp } from './config/realm'
const REALM_APP_ID = "owner-operator-rarbp"
const app = new Realm.App({id: REALM_APP_ID})

export async function searchDriver(param) {
    const searchDriver = await realmApp.currentUser.mongoClient('mongodb-atlas')
          .db('Owner-Operator')
          .collection('drivers')
          .aggregate([
            {
              $search: {
                index: 'SearchDriver',
                text: {
                  query: param,
                  path: {
                    'wildcard': '*'
                  },
                  fuzzy: {}
                }
              }
            }
          ])

    return searchDriver
}

export async function driverList() {
    const drivers = await realmApp.currentUser.mongoClient('mongodb-atlas').db('Owner-Operator').collection('drivers').find({})
    return drivers
}

export async function addDriver(driverName, driverDOB, cdlClass, cdlState) {
    try{
        const newDriver = await realmApp.currentUser.mongoClient('mongodb-atlas').db('Owner-Operator').collection('drivers').insertOne(
            {
                "driverName" :  driverName,
                "dob": driverDOB,
                "cdlClass": cdlClass,
                "cdlState": cdlState
            })
        return newDriver
    }catch(error){
        return error
    }
    
}