import { NodeProps } from "reactflow"

export type DetailProps<T> =  {
   module: Module<T>
}

export type Module<T> = {
   type?: string,
   label: string,
   iconClass: string,
   API: ModuleAPI,
   List: () => React.JSX.Element,
   Detail: (props: DetailProps<T>)  => React.JSX.Element,
   Node?: (props: NodeProps) => React.JSX.Element,
   instance? : T,
}

export interface ModuleInstance {
   id: number,
   type: string,
   label: string,
   destinations: {
      [key: string] : ModuleInstance
   },
   [key : string] : unknown
}

export interface ModuleAPI {
   list: () => Promise<unknown[]>,
   get: (id: number) => Promise<unknown>,
   post: (module: unknown) => Promise<void>,
   put: (module: unknown) => Promise<void>,
   destroy: (id: number) => Promise<void>,
}