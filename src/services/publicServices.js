import AppRoutes from "../routes/AppRoutes";

const API_URL = import.meta.env.VITE_API_URL;

const fetchServices = async (cursor, category) => {
  try {
    console.log(cursor);
    const response = await fetch(
      `${API_URL}/public/services?cursor=${cursor}&limit=4&category=${category}`,
    );
    const data = await response.json();
    if (!data.success) {
      throw new Error("Unable to fetch Provider");
    }
    return data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const fetchProviders = async (cursor) => {
  try {
    const response = await fetch(
      `${API_URL}/public/providers?cursor=${cursor}`,
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

const fetchProvider = async (id) => {
  try {
    const response = await fetch(`${API_URL}/public/providers/${id}`);
    const data = await response.json();
    if (!data.success) {
      throw new Error("Unable to fetch Provider");
    }
    return data.provider;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const fetchFeaturedProviders = async () => {
  const response = await fetch(`${API_URL}/public/providers/featured`);
  const data = await response.json();

  return data.providers;
};
export { fetchServices, fetchProvider, fetchProviders, fetchFeaturedProviders };
