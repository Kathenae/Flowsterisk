// API endpoints for module CRUD Operations

import api from "../../api"
import { ModuleInstance } from "../types"

export interface ExtensionInstance extends ModuleInstance {
   absent_secretary: "no" | "yes"
   accountcode: null | string
   answermode: string
   call_limit: number
   call_waiting: "yes" | "no"
   cid_on_diversions: string
   class_of_service_id: number
   dial_profile_id: number
   dictate_auto_send: "yes" | "no"
   dictate_enable: "yes" | "no"
   dictate_format: "yes" | "no"
   dynamic_external_cid: "yes" | "no"
   dynamic_routing: "yes" | "no"
   email: string
   emergency_cid: string
   enabled_pa: string
   extension: string
   extension_id: number
   external_cid: string | null
   features_password: string
   generate_hints: "yes" | "no"
   hot_desking: "yes" | "no"
   incoming_rec: "yes" | "no"
   internal_cid: string
   internal_rec: "yes" | "no"
   language: string
   lock: "yes" | "no"
   mailbox: string
   music_group_id: number
   name: string
   nospy: string
   notify_missed_calls: string | null
   outgoing_rec: "yes" | "no"
   pinless: "yes" | "no"
   portal_password: string | null
   rec_on_demand: "yes" | "no"
   ringtime: number
   secretary: string | null
   sendcid: "yes" | "no"
   sms_number_id: number | null
   tenant_id: number
}

async function list() : Promise<ExtensionInstance[]>
{
   const response = await api.get('modules/ombu_extensions/')
   const extensions : ExtensionInstance[] = []
   
   if(!response.error){
      console.log(response)
      response.entries.forEach((entry : ExtensionInstance) => {
         const extension : ExtensionInstance = {
            ...entry,
            type: "Extensions",
            id: entry.extension_id,
            label: entry.name,
            destinations: {},
         }

         extensions.push(extension)
      })
   }

   return extensions
}

async function get(id : number) : Promise<ExtensionInstance | null>
{
   console.log("Get Example: ", id)

   return null;
}

async function post(module : ExtensionInstance)
{
   console.log("Post Example: ", module)
}

async function put(module : ExtensionInstance)
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