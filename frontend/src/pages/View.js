import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./view.css"

const View = () => {
    const [user, setUser] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id]);

    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
            setUser({ ...response.data[0] });

        }
    }
    return (
        <div style={{ marginTop: "150px" }}>
            <div className="card">
                <div className=" card-header">
                    <p> Employee Contact Detail</p>
                </div>
                <div className='container'>
                    <strong> Id:</strong>
                    <span>{id}</span> <br /><br />
                    <strong> First name:</strong>
                    <span>{user && user.fname}</span> <br /><br />
                    <strong> Last Name:</strong>
                    <span>{user && user.lname}</span> <br /><br />
                    <strong> Email:</strong>
                    <span>{user && user.email}</span> <br /><br />
                    <strong> contact:</strong>
                    <span>{user && user.contact}</span> <br /><br />
                    <strong> dob:</strong>
                    <span>{user && user.dob}</span> <br /><br />
                    <Link to="/">
                        <button className='btn btn-edit'>Go Back</button>
                    </Link>
                </div></div></div>
    )
}
export default View;