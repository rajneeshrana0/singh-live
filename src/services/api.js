import apiConnector from './apiConnector';

// Account APIs
export const addSoldStock = async (data) => {
  try {
    const response = await apiConnector.post('/account/add', data);
    return response.data;
  } catch (error) {
    console.error('Error adding sold stock:', error);
    throw error;
  }
};

export const getAllStores = async () => {
  try {
    const response = await apiConnector.get('/account/all');
    return response.data;
  } catch (error) {
    console.error('Error getting all stores:', error);
    throw error;
  }
};

// Product APIs
export const addProduct = async (data) => {
  try {
    const response = await apiConnector.post('/product/add', data);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await apiConnector.get('/product/all');
    return response.data;
  } catch (error) {
    console.error('Error getting all products:', error);
    throw error;
  }
};

// Add more API functions as needed following the structure above

// Authentication APIs
export const login = async (data) => {
  try {
    const response = await apiConnector.post('/login', data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiConnector.get('/logout');
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

// Quality APIs
export const createQuality = async (data) => {
  try {
    const response = await apiConnector.post('/qualities', data);
    return response.data;
  } catch (error) {
    console.error('Error creating quality:', error);
    throw error;
  }
};

export const getAllQualities = async () => {
  try {
    const response = await apiConnector.get('/qualities');
    return response.data;
  } catch (error) {
    console.error('Error getting all qualities:', error);
    throw error;
  }
};

// Party APIs
export const getAllParties = async () => {
  try {
    const response = await apiConnector.get('/parties');
    return response.data;
  } catch (error) {
    console.error('Error getting all parties:', error);
    throw error;
  }
};

// Add more API functions as needed following the structure above
