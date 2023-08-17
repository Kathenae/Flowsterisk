import BaseList from "./BaseList"
import BaseNode from "./BaseNode"
import { Module, ModuleInstance } from "./types"

const modules = {}  as {
   [key : string] : Module<ModuleInstance>
}

const imports = import.meta.glob('./*/index.tsx', {eager: true})
for (const path in imports){
   const { default : module } = (await imports[path]) as { default : Module<ModuleInstance> }

   // module type will be derived from the path
   module.type = path.split("/")[1]

   // use BaseNode if module does not define a Node component
   if(!module.Node){
      module.Node = BaseNode
   }

   // use BaseList if module does not define a List component
   if(!module.List){
      module.List = BaseList
   }

   modules[module.type] = module 
}

export default modules