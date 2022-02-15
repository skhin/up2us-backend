const User = require("../model/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//REGISTER USER

exports.signup = async (req, res) => {
  console.log(req.body);
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const { userName, password, email } = req.body;
    const hash_password = await bcrypt.hash(password, 6);

    const newUser = new User({ userName, hash_password, email });

    await newUser.save(0);
    res.status(201).json({ message: "User Registration Success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong with User Registration" + error });
  }
};

// LOGIN USER

exports.signin = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isMatch = await bcrypt.compare(
        req.body.password,
        user.hash_password
      );
      if (isMatch) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });

        const { _id, userName, email } = user;

        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({ token, user: { _id, userName, email } });
      } else {
        res.status(400).json({ message: "Sign In Invalid" });
      }
    } else {
      res.status(400).json({ message: "Sign In Invalid" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong with LOG IN" });
  }
};
