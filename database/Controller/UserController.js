const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../UserSchema/UserSchema");

const getAllUser = async (req, res) => {
    const user = await User.find();
    res.send({
        status: "success",
        data: user,
    })
}

const getAllUserOne = async (req, res) => {
    const userOne = await User.findById(req.params.id);
    res.send({
        status: "success",
        data: userOne,
    })
}


const createUser = async (req, res) => {
    const hashNumber = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(req.body.password, hashNumber);
    req.body.password = hashPassword
    const create = await User.create({ ...req.body });
    res.send({
        status: true,
        data: create,
        message: "User Created Successfully"
    })
}


const updateUser = async (req, res) => {
    const update = await User.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, { new: true });
    res.send({
        status: true,
        data: update,
        message: "User Updated Successfully"
    })
}

const deleteUser = async (req, res) => {
    const deleuser = await User.findByIdAndDelete(req.params.id);
    res.send({
        status: true,
        data: deleuser,
        message: "User Deleted Successfully"
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        const matchPassword = await bcrypt.compareSync(password, user.password);
        if (matchPassword) {
            const generateToken = await jwt.sign({
                data: user
            }, "JFKJEKLJREKLNHRKLEJTHRJKLTHEJL");
            res.send({
                status: true,
                data: user,
                message: "User Login Successfully",
                token: generateToken
            });
        } else {
            res.send({
                status: false,
                message: "Password Not Match"
            })
        }
    } else {
        res.send({
            status: false,
            message: "User Not Found"
        })
    }
}

module.exports = {
    getAllUser,
    getAllUserOne,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}


