const API_URL = import.meta.env.VITE_API_URL


const fetchUserBookings = async (uid)=>{
  try{
    const response = await fetch(`${API_URL}/user/bookings/${uid}`)
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

export {fetchUserBookings}