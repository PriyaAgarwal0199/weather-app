const request = require('postman-request');
const geocodeUrl = "http://api.positionstack.com/v1/forward?access_key=9f5a6819ce706bc83946bf4738dd0c83&query=";
let latitude;
let longitude;
const geocode = (address,cb)=>{
    const url = `${geocodeUrl}${encodeURIComponent(address)}`
    
    request({ url, json: true }, function (error, {body}) {
        
          if (error) {
            cb("Unable to connect to location service.")
          } 
          else if(body.data.length===0){//encodeURIComponent(address)
                cb("Unable to find location in geocode.")
          }
          else {
            latitude = body?.data[0]?.latitude;
            longitude = body?.data[0]?.longitude;
            location = body?.data[0]?.label;
            const dataBody = {
                latitude,
                longitude,
                location
            } 
            
            cb(undefined,dataBody)
          }
        });
}

module.exports = geocode