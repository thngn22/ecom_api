import mongoose = require('mongoose')

interface IUserModel extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  status: 'active' | 'inactive';
  verify: boolean;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export = IUserModel
