import User from "../models/userModel.js";
export const registerUser = async (req, res) => {
  const { username, firstname, lastname, password, confirmpassword } = req.body;
  if (!username || !firstname || !lastname || !password || !confirmpassword) {
    res.status(400).json({ message: "Please fill all fields" });
  } else {
    if (password !== confirmpassword) {
      res
        .status(400)
        .json({ message: "password and confirm password does not match" });
    } else {
      const isExists = await User.findOne({ username });
      if (isExists) {
        return res.status(400).json({ message: "username already exists" });
      } else {
        const user = await User.create({
          username,
          firstname,
          lastname,
          password,
        });

        const token = user.getJWTToken();
        res.status(201).json({ user, token });
      }
    }
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(403).json({ message: "Please fill all fields" });
  } else {
    const user = await User.findOne({ username }).select("+password");
    if (user) {
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect)
        res.status(400).json({ message: "username or password is incorrect" });
      else {
        const token = user.getJWTToken();
        return res.status(201).json({ user, token });
      }
    } else {
      res.status(400).json({ message: "username does not exist" });
    }
  }
};
