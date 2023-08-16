// API endpoints for module CRUD Operations

async function list()
{
   console.log("List Example")

   return [
      {id: 1, label: "Item 1"},
      {id: 2, label: "Item 2"},
      {id: 3, label: "Item 3"},
      {id: 4, label: "Item 4"},
      {id: 5, label: "Item 5"},
      {id: 6, label: "Item 6"},
      {id: 7, label: "Item 7"},
      {id: 8, label: "Item 8"},
      {id: 9, label: "Item 9"},
      {id: 10, label: "Item 10"},
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