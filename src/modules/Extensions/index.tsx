import List from "./List"
import Detail from "./Detail"
import API, { ExtensionInstance } from "./API"
import { Module } from "../types"

export default {
   label: "Extensions",
   iconClass: "i-carbon-phone-voice",
   List,
   Detail,
   API
} as Module<ExtensionInstance>