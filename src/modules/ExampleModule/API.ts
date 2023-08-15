// API endpoints for module CRUD Operations

async function list()
{
   console.log("List Example")

   return [
      {id: 1, label: "Item 1"},
      {id: 1, label: "Item 1"},
      {id: 1, label: "Item 1"},
      {id: 1, label: "Item 1"},
   ] as unknown[] 
}

async function get(id : number)
{
   console.log("Get Example: ", id)
   
   return {id: 1, label: "Item 1"}
}

async function post(module : unknown)
{
   console.log("Post Example: ", module)
}

async function put(module : unknown)
{
   console.log("Put Example: ", module)
}

async function destroy(id : number)
{
   console.log("Destroy Example", id)
}

export default {
   list,
   get,
   post,
   put,
   destroy,
}