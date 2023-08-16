import List from "./List"
import Detail from "./Detail"
import Node from "./Node"
import API, { ExtensionInstance } from "./API"
import { Module } from "../types"

export default {
   label: "Extensions",
   iconClass: "i-carbon-phone-voice",
   List,
   Node,
   Detail,
   API
} as Module<ExtensionInstance>