import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  //console.log("desde el servidor");
  res.render("chat", {});
});

export default router;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);


//guardando referencias
const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  const story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // asignando id para cada persona
  });

  story1.save(function (err) {
    if (err) return handleError(err);

  });
});

Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
  });

  Story.findOne({ title: 'Casino Royale' }, function(error, story) {
  if (error) {
    return handleError(error);
  }
  story.author = author;
  console.log(story.author.name);
});

story.populated('author');
story.author._id;

story.depopulate('author');
story.populated('author');

story.author instanceof ObjectId;
story.author._id;

await Person.deleteMany({ name: 'Ian Fleming' });

const story = await Story.findOne({ title: 'Casino Royale' }).populate('author');
story.author;

Story.
  findOne({ title: /casino royale/i }).
  populate('author', 'name').
  exec(function (err, story) {
    if (err) return handleError(err);

    console.log('The author is %s', story.author.name);

    console.log('The authors age is %s', story.author.age);
  });

Story.find().populate({ path: 'fans', select: 'email' });

const db1 = mongoose.createConnection('mongodb://127.0.0.1:27000/db1');
const db2 = mongoose.createConnection('mongodb://127.0.0.1:27001/db2');

const conversationSchema = new Schema({ numMessages: Number });
const Conversation = db2.model('Conversation', conversationSchema);

const eventSchema = new Schema({
  name: String,
  conversation: {
    type: ObjectId,
    ref: Conversation // `ref` is a **Model class**, not a string
  }
});
const Event = db1.model('Event', eventSchema);

const events = await Event.
  find().
  populate('conversation');

  const commentSchema = new Schema({
  body: { type: String, required: true },
  doc: {
    type: Schema.Types.ObjectId,
    required: true,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'docModel'
  },
  docModel: {
    type: String,
    required: true,
    enum: ['BlogPost', 'Product']
  }
});

const Product = mongoose.model('Product', new Schema({ name: String }));
const BlogPost = mongoose.model('BlogPost', new Schema({ title: String }));
const Comment = mongoose.model('Comment', commentSchema);

const book = await Product.create({ name: 'The Count of Monte Cristo' });
const post = await BlogPost.create({ title: 'Top 10 French Novels' });

const commentOnBook = await Comment.create({
  body: 'Great read',
  doc: book._id,
  docModel: 'Product'
});

const commentOnPost = await Comment.create({
  body: 'Very informative',
  doc: post._id,
  docModel: 'BlogPost'
});


const comments = await Comment.find().populate('doc').sort({ body: 1 });
comments[0].doc.name;
comments[1].doc.title;

const AuthorSchema = new Schema({
  name: String
});

const BlogPostSchema = new Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  comments: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    content: String
  }]
});

const PersonSchema = new Schema({
  name: String,
  band: String
});

const BandSchema = new Schema({
  name: String
});
BandSchema.virtual('numMembers', {
  ref: 'Person', // The model to use
  localField: 'name', // Find people where `localField`
  foreignField: 'band', // is equal to `foreignField`
  count: true // And only get the number of docs
});

// Later
const doc = await Band.findOne({ name: 'Motley Crue' }).
  populate('numMembers');
doc.numMembers;