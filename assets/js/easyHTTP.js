// **
// * EasyHTTP Library
// * Library for making HTTP requests
// *
// * @version 3.0.0
// * @author Daniel Landon
// * @license MIT
// *
// **

class EasyHTTP {
  // make get request
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  // make post request
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const resData = await response.json();
    return resData;
  }

  // make update/put request
  async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const resData = await response.json();
    return resData;
  }

  // make delete request
  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    const resData = await 'Resource Deleted...';
    return resData;
  }

  // end of class
}