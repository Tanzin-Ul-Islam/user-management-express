import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdateUser() {
    let { id } = useParams()
    let history = useHistory();
    let [name, setName] = useState("")
    let [userName, setUserName] = useState("")
    let [email, setEmail] = useState("")
    let [phone, setPhone] = useState("")
    let [address, setAddress] = useState("")
    let [website, setWebsite] = useState("")
    useEffect(() => {
        userData();
    }, [])
    let userData = async () => {
        await axios.get('http://localhost:3002/users/' + id).then(response => {
            let data = response.data
            setName(data.name);
            setUserName(data.userName);
            setEmail(data.email);
            setPhone(data.phone);
            setAddress(data.address);
            setWebsite(data.website);
        }).catch(error => {
            console.log(error);
        })
    }
    async function updateData(e) {
        e.preventDefault();
        try {
            let data = {
                name: name,
                userName: userName,
                email: email,
                phone: phone,
                address: address,
                website: website,
            };
            await axios.put('http://localhost:3002/users/' + id, data).then((response) => {
                if (response.status == 200) {
                    swal({
                        title: "Success",
                        text: "User updated successfully.",
                        icon: "success",
                    });
                    history.push('/')
                } else {
                    swal({
                        title: "Error",
                        text: "Something went wrong!! please try again.",
                        icon: "error",
                    });
                }
            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form className='mb-5' onSubmit={(e) => { updateData(e) }}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" className="form-control" value={userName} onChange={(e) => { setUserName(e.target.value) }} placeholder="user name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder="phone" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="address" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Website</label>
                    <input type="text" className="form-control" value={website} onChange={(e) => { setWebsite(e.target.value) }} placeholder="website" />
                </div>
                <div className="mb-3">
                    <button type='submit' className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    )
}
