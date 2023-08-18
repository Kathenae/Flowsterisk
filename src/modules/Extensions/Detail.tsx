// Component that will be used to show and edit the module details in the inspector, either when selected on the flow view or module picker

import { useState } from "react";
import Tabs from "../../components/Tabs";
import Accordion from "../../components/Accordion";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import { ExtensionInstance } from "./API";
import Button from "../../components/Button";
import { useInspectorStore } from "../../pages/Flow/InspectorStore";
import { DetailProps } from "../types";

function parseCallerId(cidString: string | null | undefined){
   if(!cidString){
      return null
   }

   const startBracketIndex = cidString.indexOf("<");
   const endBracketIndex = cidString.indexOf(">");
 
   if (startBracketIndex >= 0 && endBracketIndex > startBracketIndex) {
     const name = cidString.substring(0, startBracketIndex).trim().replace("\"", "").replace("\"", "");
     const number = cidString.substring(startBracketIndex + 1, endBracketIndex).trim();
     return {name, number}
   }
 
   return null;
}

export default function Detail({ module } : DetailProps<ExtensionInstance>){

   const [formData, setFormData] = useState({...module.instance})
   const [callerIds, setCallerIds] = useState({
      internal: {
         name: parseCallerId(module.instance?.internal_cid)?.name,
         number: parseCallerId(module.instance?.internal_cid)?.number,
      },
      external: {
         name: parseCallerId(module.instance?.external_cid)?.name,
         number: parseCallerId(module.instance?.external_cid)?.number,
      },
      emergency: {
         name: parseCallerId(module.instance?.emergency_cid)?.name,
         number: parseCallerId(module.instance?.emergency_cid)?.number,
      },
   })

   const toggleInspector = useInspectorStore((state) => state.toggle)

   const setFormValue = (value : Partial<ExtensionInstance>) => {
      setFormData((data) => ({...data, ...value}))
   }

   const setCallerIdValue = (type: "internal" | "external" | "emergency", key: "name" | "number", value: string | number) => {
      const new_cid = {
         ...callerIds[type],
         [key]: value,
      }
      setCallerIds({
         ...callerIds,
         [type]: new_cid
      })

      // // Use extension name if not set
      // if(!new_cid.name){
      //    new_cid.name = formData.name
      // }

      // // Use extension number if not set
      // if(!new_cid.number){
      //    new_cid.number = formData.extension
      // }

      setFormValue({[type + "_cid"] : `"${new_cid.name}" <${new_cid.number}>`})
   }

   const handleSubmit = () => {
      console.log(handleSubmit)
   }

   const handleCancel = () => {
      toggleInspector()
   }

   return (
      <>

         <Tabs>
            <Tabs.Panel name='General'>
               <>
                  <Accordion className="mt-0 !border-t-0" label="User">
                     <div>
                        <label htmlFor="extension_name">User Name</label>
                        <Input type="text" name="extension_name" value={formData.name ?? ''} onChange={(evt) => setFormValue({ name: evt.target.value })} />
                     </div>
                     <div className="mt-3">
                        <label htmlFor="extension_number">Extension Number</label>
                        <Input type="number" name="extension_number" value={formData.extension ?? ''} onChange={(evt) => setFormValue({ extension: evt.target.value })} />
                     </div>
                     <div className="mt-3">
                        <label htmlFor="extension_password">Feature Password</label>
                        <Input type="text" name="extension_password" value={formData.features_password ?? ''} onChange={(evt) => setFormValue({ features_password: evt.target.value })} />
                     </div>
                     <div className="mt-3">
                        <label htmlFor="account_code">Account Code</label>
                        <Input type="number" name="account_code" value={formData.accountcode ?? ''} onChange={(evt) => setFormValue({ accountcode: evt.target.value })} />
                     </div>
                     <div className="mt-3">
                        <label htmlFor="extension_email">Email Address</label>
                        <Input type="email" name="extension_email" value={formData.email ?? ''} onChange={(evt) => setFormValue({ email: evt.target.value })} />
                     </div>
                  </Accordion>

                  <Accordion label="Device Configuration">
               <div>
                  <label htmlFor="user_device">User Device</label>
                  <Input type="number" name="user_device" />
               </div>
               <div className="mt-4">
                  <label htmlFor="max_contacts">Max Contacts</label>
                  <Input type="number" name="max_contacts" />
               </div>
               <div className="mt-3">
                  <label htmlFor="device_password">Password</label>
                  <Input type="password" name="device_password" />
               </div>
               <div className="mt-3">
                  <label htmlFor="device_description">Device Description</label>
                  <Input type="text" name="device_description" />
               </div>
               <div className="mt-3">
                  <label htmlFor="extension_number">Ring Device</label>
                  <Checkbox />
               </div>
            </Accordion>

                  <Accordion label="CID Settings">
                     <div>
                        <label htmlFor="internal_cid_name">Internal CID</label>
                        <div className="grid grid-cols-2 space-x-2">
                           <Input type="text" name="internal_cid_name" placeholder="Name" value={callerIds.internal.name ?? ''} onChange={(evt) => setCallerIdValue("internal", "name", evt.target.value)} />
                           <Input type="number" name="internal_cid_number" placeholder="Number" value={callerIds.internal.number ?? ''} onChange={(evt) => setCallerIdValue("internal", "number", evt.target.value)} />
                        </div>
                     </div>
                     <div className="mt-3">
                        <label htmlFor="internal_cid_name">External CID</label>
                        <div className="grid grid-cols-2 space-x-2">
                           <Input type="text" name="external_cid_name" placeholder="Name" value={callerIds.external.name ?? ''} onChange={(evt) => setCallerIdValue("external", "name", evt.target.value)} />
                           <Input type="number" name="external_cid_number" placeholder="Number" value={callerIds.external.number ?? ''} onChange={(evt) => setCallerIdValue("external", "number", evt.target.value)} />
                        </div>
                     </div>
                     <div className="mt-3">
                        <label htmlFor="internal_cid_name">Emergency CID</label>
                        <div className="grid grid-cols-2 space-x-2">
                           <Input type="text" name="emergency_cid_name" placeholder="Name" value={callerIds.emergency.name ?? ''} onChange={(evt) => setCallerIdValue("emergency", "name", evt.target.value)} />
                           <Input type="number" name="emergency_cid_number" placeholder="Number" value={callerIds.emergency.number ?? ''} onChange={(evt) => setCallerIdValue("emergency", "number", evt.target.value)} />
                        </div>
                     </div>
                  </Accordion>
               </>
            </Tabs.Panel>
            <Tabs.Panel name='Voicemail'>
               <>Voicemail</>
            </Tabs.Panel>
         </Tabs>
         <div className="mt-4 space-x-2 px-2 flex justify-end absolute bottom-0 bg-white dark:bg-dark-400 w-full py-2 border-t-2 border-gray-200 dark:border-dark-100">
            <Button className="w-24" primary onClick={handleSubmit}>Update</Button>
            <Button className="w-24" danger onClick={handleCancel}>Cancel</Button>
         </div>
      </>
   )
}
