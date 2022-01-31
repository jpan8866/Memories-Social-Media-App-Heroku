// this is basically an api, interacts between app and database

// import our db model to implement the controller logics below
import PostMessage from '../models/postMessage';

// get all posts
// note that can also use .then.catch syntax
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);

    // return json of array of all msgs we have
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// adding posts
export const createPost = async (req, res) => {
  // get the request body
  const post = req.body;
  // create item
  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    // return the json of newPost
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = (req, res) => {
  // extract id from request
  const _id = req.params.id;
  const post = req.body;

  // perform update and return new post
  // note that post from front end doesn't have id, thus add it in
  PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    .then((newPost) => res.json(newPost))
    .catch((err) => res.status(404).send('No post with the id'));
};

export const deletePost = (req, res) => {
  // extract id from request
  const _id = req.params.id;
  PostMessage.findByIdAndDelete(_id)
    .then(() => res.json({ message: 'post deleted successfully' }))
    .catch((err) =>
      res.status(404).json({ message: 'No post with this id found' }),
    );
};

// below uses async await, but same as above .then.catch
export const likePost = async (req, res) => {
  // extract id from request
  const _id = req.params.id;
  // Note that because we are only incrementing the number of likes,
  // we don't need to pass in a whole new post as in updatePost
  // first find the post and simply increment the like count

  try {
    const post = await PostMessage.findById(_id);
    const newLikePost = await PostMessage.findByIdAndUpdate(
      _id,
      { likeCount: post.likeCount + 1 },
      { new: true },
    );
    res.status(200).json(newLikePost);
  } catch (error) {
    res.status(404).json({ message: 'id not found' });
  }
};
