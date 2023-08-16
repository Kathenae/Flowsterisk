import { Module } from "./types"

const modules = {}  as {
   [key : string] : Module
}

const imports = import.meta.glob('./*/index.tsx', {eager: true})
for (const path in imports){
   const { default : module } = (await imports[path]) as { default : Module }

   // Make the name of the module directory be the name of its type
   const moduleName = path.split("/")[1]
   module.type = moduleName

   // Map the modules to list of modules
   modules[module.type] = module 
}

export default modules