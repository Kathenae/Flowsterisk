// API endpoints for module CRUD Operations

import { ModuleInstance } from "../types"

export type ExampleInstance = ModuleInstance & {
   // DB attributes and destinations go here go here
}

async function list() : Promise<ExampleInstance[]> 
{
   console.log("List Example")

   return [
      {type: "ExampleModule", destinations: {}, id: 1, label: "Item 1"},
      {type: "ExampleModule", destinations: {}, id: 2, label: "Item 2"},
      {type: "ExampleModule", destinations: {}, id: 3, label: "Item 3"},
      {type: "ExampleModule", destinations: {}, id: 4, label: "Item 4"},
      {type: "ExampleModule", destinations: {}, id: 5, label: "Item 5"},
      {type: "ExampleModule", destinations: {}, id: 6, label: "Item 6"},
      {type: "ExampleModule", destinations: {}, id: 7, label: "Item 7"},
      {type: "ExampleModule", destinations: {}, id: 8, label: "Item 8"},
      {type: "ExampleModule", destinations: {}, id: 9, label: "Item 9"},
      {type: "ExampleModule", destinations: {}, id: 10, label: "Item 10"},
   ] 
}

async function get(id : number) : Promise<ExampleInstance | null>
{
   console.log("Get Example: ", id)
   
   return null;
}

async function post(module : ExampleInstance)
{
   console.log("Post Example: ", module)
}

async function put(module : ExampleInstance)
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