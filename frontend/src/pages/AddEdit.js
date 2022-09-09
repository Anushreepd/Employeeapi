import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AddEdit.css';
import { toast } from 'react-toastify';


const initialState = {
    fname: "",
    lname: "",
    email: "",
    contact: "",
    dob: "",
};



const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const { fname, lname, email, contact, dob } = initialState;
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id]);

    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
            setState({ ...response.data[0] });
        }
    }

    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    // const handleInputChangeDob=(e)=>{
    //     setState({ ...state, [e.target.dob]: e.target.value });
    // }

    const addUser = async (data) => {
        const response = await axios.post("http://localhost:5000/user", data);
        if (response.status === 200) {
            toast.success(response.data);
        }
    };

    const updateUser = async (data, id) => {
        const response = await axios.put(`http://localhost:5000/user/${id}`, data);
        if (response.status === 200) {
            toast.success(response.data);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const selected = new Date(state.dob).getFullYear();
        const now = new Date().getFullYear();
        const age_now = now - selected;
        console.log(state.dob)
        if(age_now > 18)
        {
            if(!id)
            {
                addUser(state);  
            }
            else {
                updateUser(state, id)
            }
            setTimeout(200);
        }
        else
        {
        toast.error("Less than 18 years");
        }

    }
    
    

    /* const validateDate = (value) => {
        const selected = new Date(value).getFullYear();
        const now = new Date().getFullYear();
        const age_now = now - selected;
        console.log(value)
        if(age_now < 18)
        {
        toast.error("Less than 18 years");
        }
      };
      */

    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{ padding: "15px", maxwidth: "400px", alignContent: "center" }} onSubmit={handleSubmit}>

               <h2>Employee Details</h2>
                <label htmlFor="fname"> First Name</label> <br></br>
                <input type="text" id="fname" name="fname" onChange={handleInputChange} placeholder="Enter First Name..." required="required" defaultValue={fname} pattern="[A-Za-z]*" min={6} max={25} /><br></br>

                <label htmlFor="lname">Last Name</label> <br></br>
                <input type="text" id="lname" name="lname" onChange={handleInputChange} placeholder="Enter Second Name..." required="required" defaultValue={lname} pattern="[A-Za-z]*" /><br></br>

                <label htmlFor="email">Email</label> <br></br>
                <input type="email" id="email" name="email" onChange={handleInputChange} placeholder="Enter Email Address..." required="required" defaultValue={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.com" />   <br></br>

                <label htmlFor="contact">Contact</label>   <br></br>
                <input type="number" id="contact" name="contact" onChange={handleInputChange} required="required" placeholder="Enter Phone number..." defaultValue={contact} pattern="[0-9]*" /> <br></br>

                <label htmlfor="dob">Employee Date of Birth </label><br></br>
                <input id="dob" type="date" class="form-control date-input" name="dob" onChange={handleInputChange} /*valid ={validateDate(dob)}*/ placeholder="Enter Date Of Birth..." required="required" defaultValue={dob} />
                <span class="btn btn-default">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>

                <b><input type="submit" value={id ? "UPDATE USER" : "ADD"} /></b>
            </form>
        </div>
    )
}
export default AddEdit; 