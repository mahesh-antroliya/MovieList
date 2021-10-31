import axios from 'axios';
import Contstant, {API_KEY} from '../config/constant';

export function login(username) {
 
  return new Promise((resolve, reject) => {
    const url = Contstant.loginURL + '?username=' + username
    axios({
      method: 'GET',
      url: url
    })
      .then(response => {
        console.log('res',response)
        if (response.data.length>0) {
          resolve(response.data);

        }
        reject(response.data);
      })
      .catch(error => {
        console.log('er',error);
        if (error.response) {
          reject(error.response.data);
        }
        if (!error.status)
          error.message = 'Check your internet connection and try again';
        reject(error);
      });
  });
}

export function getMovieList(searchTerm,page) {
 
  return new Promise((resolve, reject) => {
    const url = Contstant.movieListURL + '&s=' + searchTerm + "&page=" + page;
    console.log(url)
    axios({
      method: 'GET',
      url: url
    })
      .then(response => {
        console.log('res',response)
        if (response.status==200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        console.log('er',error);
        if (error.response) {
          reject(error.response.data);
        }
        if (!error.status)
          error.message = 'Check your internet connection and try again';
        reject(error);
      });
  });
}

