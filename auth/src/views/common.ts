import { JWT } from '@panva/jose';
import axios from 'axios';
import { ObjectId } from 'bson';
import express from 'express';
import _ from 'lodash';
import { authRsaKey } from 'src/lib/crypto';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  const {accessToken, userID} = req.body;
  if (!_.every([accessToken, userID])) {
    return res.die({
      error: 'Missing accessToken and/or userID',
    });
  }

  try {
    const response = await axios.get(`https://graph.facebook.com/v5.0/${encodeURIComponent(userID)}`, {
      params: {
        access_token: accessToken,
        fields: 'id,name,email',
      },
    });
    const {id, name, email} = response.data;

    const User = req.context.db.collection('User');
    let user = await User.findOne({'profiles.facebook.id': id});
    if (user ===  null) {
      user = {
        _id: new ObjectId(),
        name,
        email,
        joined: new Date(),
        profiles: {
          facebook: {id, name, email},
        },
      };
      await User.insertOne(user);
    } else {
      await User.updateOne(
        {_id: user._id},
        {
          $set: {
            name,
            email,
            profiles: {
              facebook: {id, name, email},
            },
          },
        },
      );
    }

    const token = JWT.sign({
      id: user._id,
      name: user.name,
    }, authRsaKey, {
      expiresIn: '1d',
    });

    res.ok({token});
  } catch (e) {
    const {error} = e.response.data;
    res.die({error: error ? error.message : undefined});
  }
});

export default router;
