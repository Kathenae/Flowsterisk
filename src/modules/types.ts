export interface ListProps {
   filter: string,
}

export interface Module {
   id: string,
   type: string,
   label: string,
   destinations: {
      [key: string] : Module
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