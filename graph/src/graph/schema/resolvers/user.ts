import { IContext } from "../../../graph/context";
import { nodeIdToStr } from "../../../lib/utils/strings/nodeId";

export default {
  user: (root: any, args: any, {user}: IContext) => user && {
    id: nodeIdToStr({kind: 'User', id: user._id}),
    name: user.name,
    picture: `https://graph.facebook.com/v5.0/${user.profiles.facebook.id}/picture?type=square&width=100&redirect=true`,
  },
};
