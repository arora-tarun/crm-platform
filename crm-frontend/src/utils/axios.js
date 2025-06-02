import axios from 'axios';

axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/user`, { withCredentials: true })
  .then(response => {
    // handle success
  })
  .catch(error => {
    // handle error
  });

export default instance;
