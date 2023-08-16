const BASE_URL = "http://45.77.65.24/flow/php/"
const AUTH_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2OTExNTU2MjIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY5MTE1NTYyMiwiZXhwIjoxNzIyNzc4MDIyLCJ1c2VyTmFtZSI6ImFkbWluIiwicG9ydGFsVXNlciI6ZmFsc2UsInN1cGVyQWRtaW4iOnRydWV9.fz2GwWSM--7waoUbZY8mHqoulUc0X425mRHgvgdN5F32DJd9rgc6aCRtsb84Z4DfBDqIJG9rZmCSHsbhYmsyjQ"

async function request(url : string, options? : RequestInit){
   const response =  await fetch(BASE_URL + url, {
      headers: {
         "Content-Type" : "application/json",
         "Authentication" : AUTH_TOKEN,
         "Tenant-ID" : "1",
      },
      mode: "cors",
      method: "GET",
      ...options,
   })

   return await response.json()
}

async function get(url : string){
   return await request(url)
}

async function post(url : string, data? : any){
   return await request(url, {
      method: "POST",
      body: JSON.stringify(data)
   })
}

async function put(url: string, data?: any){
   return await request(url, {
      method: "PUT",
      body: JSON.stringify(data)
   })
}

async function destroy(url: string){
   return await request(url, {
      method: "DELETE",
   })
}

export default {
   get,
   post,
   put,
   destroy
}