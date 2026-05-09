const API_URL = import.meta.env.VITE_API_URL

const createOrder = async (id)=> {
  try{
    const response = await fetch(`${API_URL}/payments/create-order`,
      {method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({bookingId:id})
      }
    )
    const data = await response.json()
    if(!data.success){
      // console.log(order)
      throw new Error("Unable to process the transaction")
    }
    return data.order
  }catch(err){
    console.error(err.message)
    throw err
  }
}

export {createOrder}