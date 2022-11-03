import User from "../models/userModel.js";

export const getUser = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(500).json({ message: "something went wrong" });
  const user = await User.findById(id);
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).json({ message: "no such user" });
  }
};

export const getAllUser = async (req, res) => {
  const users = await User.find();
  if (users) {
    return res.status(200).json(users);
  } else {
    return res.status(404).json({ message: "no users" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { data, currentUserAdminStatus } = req.body;
  try {
    if (!id) {
      res.json(500).json({ message: "Internal server error" });
    } else {
      if (data._id === id || currentUserAdminStatus) {
        const user = await User.findByIdAndUpdate(id, req.body.data, {
          new: true,
        });
        if (user) {
          const token = user.getJWTToken();
          return res.status(200).json({ user, token });
        } else {
          return res
            .status(500)
            .json({ message: "something went wrong while updating the user" });
        }
      } else {
        return res.status(403).json({ message: "access denied" });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const updatePassword = async (req, res) => {
  const id = req.params.id;
  const {
    oldPassword,
    newPassword,
    currentUserId,
    confirmNewPassword,
    currentUserAdminStatus,
  } = req.body;
  if (
    !id ||
    !currentUserId ||
    !oldPassword ||
    !newPassword ||
    !confirmNewPassword
  ) {
    return res.status(400).json({ message: "bad request" });
  } else {
    if (id === currentUserId || currentUserAdminStatus) {
      const user = await User.findById(id).select("+password");
      if (user) {
        const isPasswordMatched = user.comparePassword(oldPassword);
        if (isPasswordMatched) {
          if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
          } else {
            user.password = newPassword;
            await user.save();
            return req.status(200).json(user);
          }
        } else {
          return res.status(400).json({ message: "Password is incorrect" });
        }
      } else {
        return res.status(400).json({ message: "User does not exist" });
      }
    } else {
      return res.status(403).json({ message: "access denied" });
    }
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserID, currentUserAdminStatus } = req.body;
  if (!id) {
    return res.status(500).json({ message: "Something went wrong" });
  } else {
    if (id.toString() === currentUserID.toString() || currentUserAdminStatus) {
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: "user deleted" });
    } else {
      return res.status(403).json({ message: "access denied" });
    }
  }
};

export const folowUser = async (req, res) => {
  const id = req.params.id; // id of user to be followed
  const { _id } = req.body.data;
  // do not allow user to folow himself
  if (id === _id) return res.status(403).json("not allowed");
  else {
    const userToBeFollowed = await User.findById(id);
    const followingUser = await User.findById(_id);
    // check whether user already follows that person or not
    if (!userToBeFollowed.followers.includes(_id)) {
      await userToBeFollowed.updateOne({ $push: { followers: _id } });
      await followingUser.updateOne({ $push: { following: id } });
      return res.status(200).json("user followed");
    } else {
      res.status(403).json("already followed");
    }
  }
};

export const unFollowUser = async (req, res) => {
  const id = req.params.id; // id of user to be unfollowed
  const { _id } = req.body.data;

  // do not allow user to unfolow himself
  if (id === _id) return res.status(403).json("forbidden");
  else {
    const userToBeUnFollowed = await User.findById(id);
    const unFollowingUser = await User.findById(_id);

    // ensure that following user should follow the person to unfollow
    if (userToBeUnFollowed.followers.includes(_id)) {
      await userToBeUnFollowed.updateOne({
        $pull: { followers: _id },
      });
      await unFollowingUser.updateOne({ $pull: { following: id } });
      return res.status(200).json("user unfollowed");
    } else {
      res.status(403).json("first follow to unfollow");
    }
  }
};
