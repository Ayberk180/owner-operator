import { realmApp } from "../config/realm";
import * as Realm from "realm-web"

// Search for a driver
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

// List Drivers
export function driverList() {
        console.log('This is whats empty')
        const drivers =  realmApp.currentUser.mongoClient('mongodb-atlas').db('Owner-Operator').collection('drivers').find({})
        return drivers
    
    
}

// Create Driver
export async function addDriver(driverName, driverDOB, cdlClass, cdlState) {
    const newDriver = await realmApp.currentUser.mongoClient('mongodb-atlas').db('Owner-Operator').collection('drivers').insertOne(
        {
            "driverName" :  driverName,
            "dob": driverDOB,
            "cdlClass": cdlClass,
            "cdlState": cdlState
        })
        
    return newDriver
    
}

// Comment on Driver
export async function uploadComment(driverId, body) {
    const newItem = {
        "driverId": driverId,
        "body": body,
        "createdBy": realmApp.currentUser.id,
        "createdAt": new Date()
      };
  
      const uploadComment = await realmApp.currentUser.mongoClient('mongodb-atlas').db('Owner-Operator').collection('comments').insertOne(newItem)
        .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
        //.catch(err => console.error(`Failed to insert item: ${err}`))
}

// List Comments
export async function getComments(driverId) {
  const comments = await realmApp.currentUser.mongoClient('mongodb-atlas').db('Owner-Operator').collection('comments').find({ driverId: driverId})
  return comments
}

export async function getMyComments(userId) {
  const comments = await realmApp.currentUser.mongoClient('mongodb-atlas').db('Owner-Operator').collection('comments').find({ createdBy: userId})
  console.log(userId)
  return comments
}

// Find Driver
export async function findDriver(driverId) {
    const driver = await realmApp.currentUser.mongoClient('mongodb-atlas').db('Owner-Operator').collection('drivers').findOne({ _id: new Realm.BSON.ObjectID(driverId) })
    return driver
}