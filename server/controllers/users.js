import {v4 as uuid} from "uuid";

let users = [];
export const getUsers = (req,res) => {
    res.send(users);
};

export const createUsers = (req,res) => {
    const user = req.body;

    users.push({...user,id: uuid()});
    res.send("user added successfully");
};

export const getUser = (req,res) => {
    const singleUser = users.filter((user) => user.id === req.params.id);
    res.send(singleUser);
};

export const DeleteUser = (req,res) => {
    users  = users.filter((user) => user.id !== req.params.id);
    res.send("user deleted successfully");
}


export const updateUser = (req,res) => {
    const user = users.find((user)=> user.id === req.params.id);
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.email = req.body.email;
    user.contact = req.body.contact;
    user.dob = req.body.dob;
    res.send("User Updated Successfully");

    
 }
