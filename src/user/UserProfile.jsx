import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from "axios";
export default function UserProfile() {
    let { id } = useParams();
    let [data, setData] = useState([]);
    useEffect(() => {
        getData();
    })
    async function getData() {
        try {
            await axios.get('http://localhost:3002/users/' + id).then((response) => {
                setData(response.data)
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div class="card text-center">
            <div class="card-header">
                <h4>{data.name} Profile</h4>
            </div>
            <div class="card-body">
                <p class="card-text"><strong style={{'margin-right': '5px'}}>Name:</strong>{data.name ? data.name : "Not availabel"}</p>
                <p class="card-text"><strong style={{'margin-right': '5px'}}>User Name:</strong>{data.userName ? data.userName : "Not availabel"}</p>
                <p class="card-text"><strong style={{'margin-right': '5px'}}>Email:</strong>{data.email ? data.email : "Not availabel"}</p>
                <p class="card-text"><strong style={{'margin-right': '5px'}}>Phone:</strong>{data.phone ? data.phone : "Not availabel"}</p>
                <p class="card-text"><strong style={{'margin-right': '5px'}}>Address:</strong>{data.address ? data.address : "Not availabel"}</p>
                <p class="card-text"><strong style={{'margin-right': '5px'}}>Website:</strong>{data.website ? data.website : "Not availabel"}</p>
                <Link to="/" class="btn btn-primary">Go to home</Link>
            </div>
            <div class="card-footer text-muted">
            </div>
        </div>
    )
}
