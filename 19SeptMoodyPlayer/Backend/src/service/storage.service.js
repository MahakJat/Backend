let ImageKit = require("imagekit");
let mongoose = require("mongoose")
let imagekit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})


//for uploading the music file to imagekit cloud storage provider

function uploadFile(file){
    return new Promise((resolve,reject) =>{ //we are using promise because the image.upload method don't use the await function so we cant use async await
        imagekit.upload({  //upload has two parameter
            file:file.buffer, //actual data of the file is in buffer,
            fileName: new mongoose.Types.ObjectId().toString(),//random id
            // fileName:Math.random().toString(36).substring(10), //giving random name to the file //to avoid same name
            folder:"MoodyPlayer"//the folder where you what the file to be stored 
        },(error,result)=>{
           if(error){
            reject(error)
           }else{
            resolve(result); //returns the url why which we can access file
           }
        })
    })
}

module.exports = uploadFile

//postman sent file to the server => server uploads the file on imagekit  => imagekit then imagekit returns the url to access the music