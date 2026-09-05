import { NodeProps } from "reactflow"
import { ApiResponse } from "../api"

export type ModuleApiEntry<T extends ModuleInstance> = Omit<T, "id" | "type" | "label" | "destinations">

export interface ModuleListResponse<T> {
   entries: T[]
}

export interface ModuleGetResponse<T> {
   entry: T | null
}

export interface ModuleCreateResponse {
   id: number
}

export type ModuleListApiResponse<T extends ModuleInstance> = ApiResponse<ModuleListResponse<ModuleApiEntry<T>>>
export type ModuleGetApiResponse<T extends ModuleInstance> = ApiResponse<ModuleGetResponse<ModuleApiEntry<T>>>
export type ModuleCreateApiResponse = ApiResponse<ModuleCreateResponse>

export type DetailProps<T extends ModuleInstance> =  {
   module: Module<T>
}

export type ListProps<T extends ModuleInstance> = {
   module: Module<T>
}

export type Module<T extends ModuleInstance> = {
   type?: string,
   label: string,
   iconClass: string,
   API: ModuleAPI<T>,
   List?: (props : ListProps<T>) => React.JSX.Element,
   Detail: (props: DetailProps<T>)  => React.JSX.Element,
   Node?: (props: NodeProps) => React.JSX.Element,
   instance? : T,
}

type ModuleType = 
   'inbound_routes' |
   'extensions' |
   'announcements' |
   'dynamic_destinations' |
   'ivrs' |
   'custom_applications' |
   'custom_contexts' |
   'parking_lots' |
   'callbacks' |
   'ring_groups' |
   'queues' |
   'outbound_routes' |
   'time_conditions' |
   'languages' |
   'nightmodes' |
   'trunks'
   
type Destination = {
   type: 'normal',
   module: ModuleInstance,
}

export interface ModuleInstance {
   id: number,
   type: ModuleType,
   label: string,
   destinations: {
      [key: string] : ModuleInstance
   },
}

export interface ModuleAPI<T> {
   list: () => Promise<T[]>,
   get: (id: number) => Promise<T | null>,
   post: (module: T) => Promise<void>,
   put: (module: T) => Promise<void>,
   destroy: (id: number) => Promise<void>,
}