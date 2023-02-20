import axios, { AxiosError } from 'axios';

export const getUkrainianCities = async () => {
  try {
    const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country: 'ukraine' });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error as AxiosError;
  }
};

export const getCountriesAndCities = async () => {
  try {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries/');
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error as AxiosError;
  }
};
