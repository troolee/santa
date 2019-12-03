import { IContext } from "../../../graph/context";
import { nodeIdToStr } from "../../../lib/utils/strings/nodeId";

export default {
  user: (root: any, args: any, {user}: IContext) => user && {
    id: nodeIdToStr({kind: 'User', id: user._id}),
    name: user.name,
    picture: user.picture,
  },
};
