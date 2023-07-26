import { useState } from 'react'
import Accordion from "../Accordion";
import Input from "../Input";
import BaseModule from "./BaseModule";
import Checkbox from '../Checkbox';

type ExtensionForm = {
   [key: string]: string | number | boolean
}

export default function Extension() {

   const [data, setData] = useState({
      extension_name: "",
      extension_number: "",
      extension_email: "",
      extension_password: "",
      account_code: "",
      user_device: "",
      max_contacts: 5,
      device_password: "",
      device_description: "",
      ring_device: true,
      internal_cid_name: "",
      internal_cid_number: "",
      external_cid_name: "",
      external_cid_number: "",
      emergency_cid_name: "",
      emergency_cid_number: "",
   })

   const setValue = (value : ExtensionForm) => {
      setData((data) => ({...data, ...value}))
   }

   const tabs = {
      General: (<>
         <Accordion className="mt-0 !border-t-0" label="User">
            <div>
               <label htmlFor="extension_name">User Name</label>
               <Input type="text" name="extension_name" value={data.extension_name} onChange={(evt) => setValue({extension_name: evt.target.value})} />
            </div>
            <div className="mt-3">
               <label htmlFor="extension_number">Extension Number</label>
               <Input type="number" name="extension_number" value={data.extension_number} onChange={(evt) => setValue({extension_number: evt.target.value})}/>
            </div>
            <div className="mt-3">
               <label htmlFor="extension_password">Feature Password</label>
               <Input type="text" name="extension_password" value={data.extension_password} onChange={(evt) => setValue({extension_password: evt.target.value})}/>
            </div>
            <div className="mt-3">
               <label htmlFor="account_code">Account Code</label>
               <Input type="number" name="account_code" value={data.account_code} onChange={(evt) => setValue({account_code: evt.target.value})}/>
            </div>
            <div className="mt-3">
               <label htmlFor="extension_email">Email Address</label>
               <Input type="email" name="extension_email" value={data.extension_email} onChange={(evt) => setValue({extension_email: evt.target.value})}/>
            </div>
         </Accordion>

         <Accordion label="Device Configuration">
            <div>
               <label htmlFor="user_device">User Device</label>
               <Input type="number" name="user_device" value={data.user_device} onChange={(evt) => setValue({user_device: evt.target.value})}/>
            </div>
            <div className="mt-4">
               <label htmlFor="max_contacts">Max Contacts</label>
               <Input type="number" name="max_contacts" value={data.max_contacts} onChange={(evt) => setValue({max_contacts: evt.target.value})}/>
            </div>
            <div className="mt-3">
               <label htmlFor="device_password">Password</label>
               <Input type="password" name="device_password" value={data.device_password} onChange={(evt) => setValue({device_password: evt.target.value})}/>
            </div>
            <div className="mt-3">
               <label htmlFor="device_description">Device Description</label>
               <Input type="text" name="device_description" value={data.device_description} onChange={(evt) => setValue({device_description: evt.target.value})}/>
            </div>
            <div className="mt-3">
               <label htmlFor="extension_number">Ring Device</label>
               <Checkbox checked={data.ring_device} onToggle={() => setValue({ring_device: !data.ring_device})}/>
            </div>
         </Accordion>

         <Accordion label="CID Settings">
            <div>
               <label htmlFor="internal_cid_name">Internal CID</label>
               <div className="grid grid-cols-2 space-x-2">
                  <Input type="text" name="internal_cid_name" placeholder="Name" value={data.internal_cid_name} onChange={(evt) => setValue({internal_cid_name: evt.target.value})}/>
                  <Input type="number" name="internal_cid_number" placeholder="Number" value={data.internal_cid_number} onChange={(evt) => setValue({internal_cid_number: evt.target.value})}/>
               </div>
            </div>
            <div className="mt-3">
               <label htmlFor="internal_cid_name">External CID</label>
               <div className="grid grid-cols-2 space-x-2">
                  <Input type="text" name="external_cid_name" placeholder="Name" value={data.external_cid_name} onChange={(evt) => setValue({external_cid_name: evt.target.value})}/>
                  <Input type="number" name="external_cid_number" placeholder="Number" value={data.external_cid_number} onChange={(evt) => setValue({external_cid_number: evt.target.value})}/>
               </div>
            </div>
            <div className="mt-3">
               <label htmlFor="internal_cid_name">Emergency CID</label>
               <div className="grid grid-cols-2 space-x-2">
                  <Input type="text" name="emergency_cid_name" placeholder="Name" value={data.emergency_cid_name} onChange={(evt) => setValue({emergency_cid_name: evt.target.value})}/>
                  <Input type="number" name="emergency_cid_number" placeholder="Number" value={data.emergency_cid_number} onChange={(evt) => setValue({emergency_cid_number: evt.target.value})}/>
               </div>
            </div>
         </Accordion>
      </>),
      Voicemail: (
         <>Voicemail</>
      ),

   }
   return (
      <BaseModule
         label="Extension"
         tabs={tabs}
      />
   )
}