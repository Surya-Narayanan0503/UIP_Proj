const express = require("express");
const User = require('../models/user');
const router = express.Router();

router
  .get('/getallusers', async (req, res) => {
    try {
      const users = await User.getUsers();
      res.send(users);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })
  .post('/login', async (req, res) => {
    try {
      const user = await User.login(req.body.username, req.body.password);
      res.send({ ...user, password: undefined });
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/register', async (req, res) => {
    try {
      const user = await User.register(req.body.username, req.body.password);
      res.send({ ...user, password: undefined });
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })

  .put('/update', async (req, res) => {
    try {
      const user = await User.updatePassword(req.body.id, req.body.password);
      res.send({ ...user, password: undefined });
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/follow', async (req, res) => {
    try {
      const user = await User.followSomeone(req.body.followerId, req.body.followingId);
      res.send({ ...user, password: undefined });
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/unfollow', async (req, res) => {
    try {
      const user = await User.unfollowSomeone(
        req.body.followerId, req.body.followingId
      );
      res.send({ ...user, password: undefined });
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete/:id', async (req, res) => {
    try {
      await User.deleteUser(req.params.id);
      res.send({ success: "Account deleted" });
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  });

module.exports = router;