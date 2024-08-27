import mongoose = require('mongoose')

import { JwtPayload } from 'jsonwebtoken';

interface IPayloadJWT extends JwtPayload {
  id: mongoose.Schema.Types.ObjectId
  email: string
}

export = IPayloadJWT
