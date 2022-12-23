import apisauce from 'apisauce';

const api = apisauce.create({
  // baseURL: 'https://warm-ridge-41160.herokuapp.com/api',
  baseURL: `${process.env.NEXT_PUBLIC_APP_BASE_API}/api`,
});

export default api;

