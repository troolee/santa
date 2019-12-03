import { ObjectId } from "bson";
import { strToNodeId, nodeIdToStr } from "./strings/nodeId";

export interface INodeId {
  kind: string;
  id: ObjectId;
}

export default class NodeId implements INodeId {
  public static fromString(s: string): NodeId {
    const {kind, id} = strToNodeId(s);
    return new NodeId(kind, id);
  }

  public static fromNodeId({kind, id}: INodeId) {
    return new NodeId(kind, id);
  }

  public constructor(
    public kind: string,
    public id: ObjectId,
  ) {
  }

  public asString(): string {
    return nodeIdToStr(this);
  }

  public toString(): string {
    return `[NodeId ${this.kind}:${this.id.toHexString()}]`;
  }
}
