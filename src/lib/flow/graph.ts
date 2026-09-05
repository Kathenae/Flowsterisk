import { Edge, Node } from "reactflow"
import { ModuleInstance } from "../../modules/types"
import api from "../../api"

type Graph = {
    nodes: Node<ModuleInstance>[]
    edges: Edge<ModuleInstance>[]
}

export async function construct(route_id: number): Promise<Graph> {
    const response = await api.get(`/modules/inboud_routes/{route_id}`)
    if(response.status == 'failure') {
        throw new Error("route not found")
    }

    // TODO
    return {
        nodes: [],
        edges: [],
    }
}


async function constructModuleGraph(fromModule: ModuleInstance): Promise<ModuleInstance> {
    // TODO
    return fromModule
}