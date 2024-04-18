const mongoose = require("mongoose");
const {Schema} = mongoose;

const projectSchema = new Schema({
  title: { type: String, required: true },
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  desc: { type: String, required: true },
  prof: { type: String, required: true },
  domain: { type: String, required: true },
  url: { type: String, required: true },
  urlDesc: { type: String, required: true },
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model('projects', projectSchema);
