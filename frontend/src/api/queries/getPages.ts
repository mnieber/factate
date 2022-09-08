import fetch from 'node-fetch';

export const getPages = () => {
  return fetch('pages.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(function (response: any) {
    return response.json();
  });
};
