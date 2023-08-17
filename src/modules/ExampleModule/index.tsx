import List from "./List"
import Detail from "./Detail"
import Node from "./Node"
import API, { ExampleInstance } from "./API"
import { Module } from "../types"

export default {
   label: "Example Module",
   iconClass: "i-carbon-user",
   List,
   Node,
   Detail,
   API
} as Module<ExampleInstance>