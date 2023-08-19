import Detail from "./Detail"
import API, { TerminateCallInstance } from "./API"
import { Module } from "../types"

export default {
   label: "Terminate Call",
   iconClass: "i-carbon-phone-off",
   Detail,
   API,
} as Module<TerminateCallInstance>