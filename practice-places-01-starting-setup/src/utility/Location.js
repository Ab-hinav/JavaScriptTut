const GOOGLE_API_KEY = 'AIzaSyDSFhmf_sME3be3PKImOtsmBqeAXnflMXw';

export async function getCurrentPosition(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(" the maps api didnt return lat long");
  }

  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }

  const cordinates = data.results[0].geometry.location;
  return cordinates;
}

export async function getAddressFromPosition(coords){
    
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`);

    if (!response.ok) {
        throw new Error(" the maps api didnt return lat long");
    }
    
    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const address = data.results[0].formatted_address;
    
    return address;
}
