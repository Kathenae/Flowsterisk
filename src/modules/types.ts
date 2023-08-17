import { NodeProps } from "reactflow"

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

export interface ModuleInstance {
   id: number,
   type: string,
   label: string,
   destinations: {
      [key: string] : ModuleInstance
   },
   [key : string] : unknown
}

export interface ModuleAPI<T> {
   list: () => Promise<T[]>,
   get: (id: number) => Promise<T | null>,
   post: (module: T) => Promise<void>,
   put: (module: T) => Promise<void>,
   destroy: (id: number) => Promise<void>,
}