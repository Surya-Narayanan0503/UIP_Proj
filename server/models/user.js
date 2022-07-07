const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  followers: [String],
  following: [String]
})

const User = mongoose.model("User", userSchema);


async function getUsers() {
  return await User.find({});
}

async function register(username, password) {
  const user = await getUser(username);
  if (user) throw Error('Username already in use');

  bcrypt.genSalt(10, function (_, Salt) {
    bcrypt.hash(password, Salt, async function (err, hash) {
      if (err) {
        return console.log('Cannot encrypt');
      }
      User.create({
        username: username,
        password: hash,
        followers: [],
        following: []
      }).then(value => {
        return value;
      });
    })
  });
}

async function login(username, password) {
  const user = await getUser(username);
  if (!user) throw Error('Error founding User');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect Password");
  }
  return user;
}


async function updatePassword(id, password) {
  const user = await User.updateOne({ "_id": id }, { $set: { password: password } });
  return user;
}

async function deleteUser(id) {
  await User.findByIdAndRemove(id);
};

async function getUser(username) {
  return await User.findOne({ "username": username });
}

async function followSomeone(followerId, followingId) {
  let followingUser = await User.findById(followerId);
  let userToBeFollowed = await User.findById(followingId)

  if (followingUser == null || userToBeFollowed == null) {
    throw new Error("User Not Found");
  }

  await User.findByIdAndUpdate(followingId, {
    username: userToBeFollowed.username,
    password: userToBeFollowed.password,
    following: [...userToBeFollowed.following],
    followers: [...userToBeFollowed.followers, followerId]
  }, { new: true });

  let followingUserUpdated = await User.findByIdAndUpdate(followerId, {
    username: followingUser.username,
    password: followingUser.password,
    followers: [...followingUser.followers],
    following: [...followingUser.following, followingId]
  }, { new: true });

  return followingUserUpdated;
}


async function unfollowSomeone(followerId, followingId) {
  let followingUser = await User.findById(followerId);
  let userToBeFollowed = await User.findById(followingId)

  if (followingUser == null || userToBeFollowed == null) {
    throw new Error("User Not Found");
  }

  await User.findByIdAndUpdate(followingId, {
    username: userToBeFollowed.username,
    password: userToBeFollowed.password,
    following: [...userToBeFollowed.following],
    followers: [...userToBeFollowed.followers].filter(e => e !== followerId)
  }, { new: true });

  let followingUserUpdated = await User.findByIdAndUpdate(followerId, {
    username: followingUser.username,
    password: followingUser.password,
    followers: [...followingUser.followers],
    following: [...followingUser.following].filter(e => e !== followingId)
  }, { new: true });

  return followingUserUpdated;
}

module.exports = {
  register, login, updatePassword, deleteUser, followSomeone, getUsers, unfollowSomeone
};