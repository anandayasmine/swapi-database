import axios from 'axios';

export default async function getDataPeople(params = {}) {

  const config = {
    method: 'get',
    url: 'https://swapi.dev/api/people/'+(params?.page ? '?page='+params?.page :''),
    responseType: 'json',
  }

  const data = new axios(config)
    .then(async response => {
    console.log("🚀 ~ file: getDataPeople.js ~ line 13 ~ getDataPeople ~ response", response)

      const _err = 0
      const status = response?.status
      const payload = response?.data

      return { _err, status, payload }

    })
    .catch(err => {

      console.log("🚀 ~ file: hello.js ~ line 15 ~ handler ~ err", err)

      const _err = 1
      const status = 400
      const message = "Error!"
      return { _err, status, message }

    })

  return data

}
