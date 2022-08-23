import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from"axios";
import { toast } from 'react-toastify';
import "./Home.css";

const Home = () => {
    const [users, setData] = useState([]);
    
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users");
        if(response.status === 200) {
            setData(response.data)
        }
    };

    const onDeleteUser = async (id) => {
        if(window.confirm("Are you sure to delete the data")){
            const response = await axios.delete(`http://localhost:5000/user/${id}`);
            if(response.status === 200){
                toast.success(response.data);
                getUsers();
            }
        }

    };
  //  console.log("data=>", data);

    return (
        <div style={{marginTop: "50px"}}>
            <center>
                <h2>Employee Details</h2>
         <table className='styled-table' border= "1px" cellPadding= "10px">
         <thead bgcolor='#DDEEEE'>
            <tr>
                <th style={{textAlign: "center"}}>NO.</th>
                <th style={{textAlign: "center"}}> First Name</th>
                <th style={{textAlign: "center"}}> Last Name</th>
                <th style={{textAlign: "center"}}>Email</th>
                <th style={{textAlign: "center"}}>Contact</th>
                <th style={{textAlign: "center"}}>Date Of Birth</th>
                <th style={{textAlign: "center"}}>Action</th>
            </tr>
         </thead>

         <tbody>
            {users.map((item, index) => {
                return(
                    <tr key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>{item.fname}</td>
                        <td>{item.lname}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>{item.dob}</td>
                        <td>
                            <Link to={`/update/${item.id}`}>
                            <button className='btn btn-edit'>Edit</button></Link>
                            
                            <button className='btn btn-delete' onClick={() => onDeleteUser(item.id)}>Delete</button>

                            <Link to={`/view/${item.id}`}>
                            <button className='btn btn-view'>View</button></Link>
                        </td>

                    </tr>
                );
            })}
         </tbody>
         </table>
         </center>
         </div>
    )
}
export default Home;