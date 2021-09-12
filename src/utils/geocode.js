const request=require('postman-request')
const geoCode=(place,callback)=>{
    const mapboxToken='pk.eyJ1IjoiYm9kaGlzYXR0d2E0NSIsImEiOiJja3Mwc3RiM2YwODQ2Mm5yeWhuNnZqNnBnIn0.u-5Uxh9TL388hlQ0HHX7xg'
    const fwGeocodeurl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${mapboxToken}&limit=1`
    request({url: fwGeocodeurl,json: true},(error,{body,statusCode}={})=>{
        if(error){
            callback('Unable to connect to Geocoding Service!!!',undefined)
        }else if(statusCode===404){
            callback('Something went wrong...Please search again with correct address text!!!',undefined)
        }else if(!body.features.length){
                callback('Address not found!!!',undefined)
        }else{
            callback(undefined,{
                placeName:body.features[0].place_name,
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1]
            })
        }
    })
}

module.exports=geoCode