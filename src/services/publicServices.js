const API_URL = import.meta.env.VITE_API_URL

const fetchProviders = async () => {
  try {
    const response = await fetch(`${API_URL}/public/providers`)
    const data = await response.json()
    if(!data.success){
      throw new Error("Unable to fetch Provider")

    }
    return data.providers
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const fetchProvider = async (id)=>{
  try{
    const response = await fetch(`${API_URL}/public/providers/${id}`)
    const data = await response.json()
    if(!data.success){
     throw new Error("Unable to fetch Provider")
    }
    return data.provider
  }catch(err){
    console.error(err.message)
    throw err
  }
}
export {fetchProviders ,fetchProvider}
