// this is aliased in webpack config based on server/client build
import axios from 'axios';
import { createAPI } from 'create-api'

export function fetchItems () {
  return new Promise ( (resolve, reject) => {
    console.log ("Api.fetchItems")

    // imagine you do an axios/fetch to your own API here... we simulate
    // by using setTimeout
    const data = [
      { id : 0, value : 'hello' },
      { id : 1, value : 'world' }
    ];

    // just a useless hack which will display third item named client or server
    // depending on who is rendering the content
    const api = createAPI()
    data.push ({ id: 2, value : api.onServer ? 'server' : 'client' })

    // NOTE: uncomment next line for fastest performance
    // return resolve (data);

    axios('https://randomuser.me/api/?results=10').then ((randomUsers) => {
      for (const item of randomUsers.data.results) {
        data.push ({ id : 'axios-' + data.length, value : item.login.username });
      }

      // add an additional delay
      setTimeout (() => resolve (data), 1000)
    });

  });
}
