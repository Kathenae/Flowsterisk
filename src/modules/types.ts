export type Module = {
   type: string,
   label: string,
   iconClass: string,
   API: ModuleAPI,
   List: () => React.JSX.Element,
   Detail: () => React.JSX.Element,
   Node: () => React.JSX.Element,
}
export interface ModuleInstance {
   id: string,
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