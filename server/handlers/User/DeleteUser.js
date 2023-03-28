const User = require('../../models/UsersModel');

const deleteUser = async(req,res,next) => {
    let users;
    try{
        users = await User.deleteOne().exec();

        if(!users)
        return res.json({
            message: "No users found!",
        });
    } catch (err) {
        return res.json({
            message:"Error! Could not delete user!",err:err
        });
    }
    res.json({
        message:"Users:" ,
        users: users,
    });
};
module.exports = deleteUser;