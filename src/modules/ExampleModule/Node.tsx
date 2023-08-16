// Node that will be used to render the module in the flow view

import { NodeProps } from "reactflow";
import BaseNode from "../../components/BaseNode";

export default function Node(props : NodeProps) {

   return (
      <BaseNode 
         {...props}
      />
   )
}