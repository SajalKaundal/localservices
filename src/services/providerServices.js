const API_URL = import.meta.env.VITE_API_URL;

const fetchServices = async (_id) => {
  try {
    const response = await fetch(`${API_URL}/provider/${_id}/services`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.services;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const fetchService = async (pid,sid) => {
  try{
    const response = await fetch(`${API_URL}/provider/${pid}/services/${sid}`)
    const data = await response.json()

    if(!data.success){
      throw new Error("Fetching Service Failed")
    }

    return data.service
  }catch(err){
    console.error(err.message)
    throw err
  }
}

const addService = async (pid, service) => {
  try {
    const response = await fetch(`${API_URL}/provider/${pid}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to add service");
    }

    return data;
  } catch (err) {
    console.error(err.message);
    throw err; // important if caller needs to handle it
  }
};

const deleteService = async (pid,sid) => {
  try {
    const response = await fetch(`${API_URL}/provider/${pid}/services/${sid}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Service not Deleted");
    }
    return data.deletedService;
  } catch (err) {
    console.error(err.message);
    throw err
  }
};

const updateService = async (pid,sid,service) => {
  try{
    const response = await fetch(`${API_URL}/provider/${pid}/services/${sid}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(service)
    })
    const data = await response.json()
    return data.service;
  }catch(err){
    console.error(err.message)
    throw err
  }
}

export { fetchServices, addService, deleteService, fetchService,updateService };
