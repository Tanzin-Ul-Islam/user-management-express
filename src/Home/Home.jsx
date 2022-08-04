import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
export default function Home() {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    getUserData();
  }, []);
  async function getUserData() {
    try {
      await axios.get('http://localhost:3001/api/user').then((response) => {
        console.log(response);
        setUsers(response.data.data.reverse())
      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error)
    }
  }
  async function deleteUser(id) {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {
            await axios.delete('http://localhost:3002/users/' + id).then((response) => {
              getUserData();
            }).catch((error) => {
              console.log(error);
            })
          } else {
            swal("Your imaginary file is safe!");
          }
        });
    } catch (error) {

    }
  }
  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">SL</th>
            <th scope="col">Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((el, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{el.name}</td>
                  <td>{el.user_name}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td>{el.website}</td>
                  <td>
                    <Link className='btn btn-primary btn-sm' style={{ 'margin-right': '5px' }} to={"/user-profile/" + el.id}><i class="fa-solid fa-eye"></i></Link>
                    <Link className='btn btn-success btn-sm' style={{ 'margin-right': '5px' }} to={"/update-user/" + el.id}><i class="fa-solid fa-pen-to-square"></i></Link>
                    <button className='btn btn-danger btn-sm' onClick={() => {
                      deleteUser(el.id)
                    }}><i class="fa-solid fa-trash-can"></i></button>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
    </div>
  )
}
