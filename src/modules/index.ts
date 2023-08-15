import ExampleModule from "./ExampleModule"
import { ModuleAPI } from "./types"

type ModuleDefs = {
   [key : string] : {
      API: ModuleAPI,
      List: () => React.JSX.Element,
      Detail: () => React.JSX.Element,
      Node: () => React.JSX.Element,
   }
}

export default 
{
   ExampleModule,

} as ModuleDefs