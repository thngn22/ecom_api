import mongoose = require('mongoose')

interface IAttributeModel extends mongoose.Document {
  attributes: mongoose.Schema.Types.Mixed
}

export = IAttributeModel
