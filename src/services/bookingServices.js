import { SiD } from "react-icons/si"

const API_URL = import.meta.env.VITE_API_URL


const fetchUserBookings = async (uid,upComingBookings=false)=>{
  try{
    const response = await fetch(`${API_URL}/user/bookings/${uid}/?upComingBookings=${upComingBookings}`)
    const data = await response.json()
    if(!data.success){
      throw new Error("Unable to fetch bookings")
    }
    return data.bookings
  }catch(err){
    console.error(err.message)
    throw err
  }
}

const fetchServiceDetails = async (sid=undefined,pid) => {
  try{
    if(sid){
      const response = await fetch(`${API_URL}/provider/${pid}/services/${sid}`)
      const data = await response.json()
      if(!data.success){
        throw new Error("Unable to fetch service")
      }
      return [data.service]
    }
    else{
       const response = await fetch(`${API_URL}/provider/${pid}/services`)
      const data = await response.json()
      if(!data.success){
        throw new Error("Unable to fetch service")
      }
      return data.services
    }
  }catch(err){
    console.error(err.message)
    throw err
  }

}

const createBooking = async (booking)=>{
  try{

  }catch
}
export {fetchUserBookings,fetchServiceDetails}