const getToken = () => {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const token = tokenFromLocalStorage ? (JSON.parse(tokenFromLocalStorage) as string) : '';
  return token;
};

export default getToken;
