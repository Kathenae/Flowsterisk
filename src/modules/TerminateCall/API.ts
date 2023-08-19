// API endpoints for module CRUD Operations

import { ModuleInstance } from "../types"

export interface TerminateCallInstance extends ModuleInstance {
   mode: "hangup" | "music_on_hold" | "ringback" | "busy" | "congestion"
}

const instances: TerminateCallInstance[] = [
   {
      id: 1,
      label: "Hangup",
      mode: "hangup",
      type: "TerminateCall",
      destinations: {}
   },
   {
      id: 2,
      label: "Music On hold",
      mode: "music_on_hold",
      type: "TerminateCall",
      destinations: {}
   },
   {
      id: 3,
      label: "Ringback",
      mode: "ringback",
      type: "TerminateCall",
      destinations: {}
   },
   {
      id: 4,
      label: "Busy",
      mode: "busy",
      type: "TerminateCall",
      destinations: {}
   },
   {
      id: 5,
      label: "Congestion",
      mode: "congestion",
      type: "TerminateCall",
      destinations: {}
   },
]

async function list() : Promise<TerminateCallInstance[]>
{
   return instances
}

async function get(id : number) : Promise<TerminateCallInstance | null>
{
   const foundInstance = instances.find(m => m.id === id) ?? null
   return foundInstance;
}

async function post(module : TerminateCallInstance)
{
   console.log("Post Terminate Call: ", module)
}

async function put(module : TerminateCallInstance)
{
   console.log("Put Terminate Call: ", module)
}

async function destroy(id : number)
{
   console.log("Destroy Terminate Call", id)
}

export default {
   list,
   get,
   post,
   put,
   destroy,
}