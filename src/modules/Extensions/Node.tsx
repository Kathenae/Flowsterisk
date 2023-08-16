// Node that will be used to render the module in the flow view

import { NodeProps } from "reactflow";
import BaseModule from "../../components/Modules/BaseModule";

export default function Node(props : NodeProps) {

   return (
      <BaseModule {...props} />
   )
}