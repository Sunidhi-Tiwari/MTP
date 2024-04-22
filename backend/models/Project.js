const mongoose = require("mongoose");
const {Schema} = mongoose;

const projectSchema = new Schema({
  title: { type: String, required: true },
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  desc: { type: String, required: true },
  student: { type: String, required: true },
  prof: { type: String, required: true },
  domain: { type: String, required: true },
  urls: { type: Object, default:{} },
  image: { type: String, default:"" },
  status: { type: String, default: "pending" },
  date:{type: Date, default: Date.now}
});

module.exports = mongoose.model('projects', projectSchema);
