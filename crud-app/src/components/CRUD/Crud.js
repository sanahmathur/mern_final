import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import Input from "@mui/material/Input";
import axios from "axios";


const Crud = (setLogin) => {
  const { id } = useParams("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [getuserdata, setUserdata] = useState([]);

  const [toggle, setToggle] = useState(false);
  const [user2, setUser2] = useState({
    userId: "",
    fname: "",
    lname: "",
    mobile: "",
    email: "",
  });

  const handle = (e) => {
    const { name, value } = e.target;
    setUser2({
      ...user2,
      [name]: value,
    });
  };

  const getItem = async () => {
    const email = JSON.parse(localStorage.getItem("email2"));
    if (!email) {
      navigate("/login");
    } else {
      await axios.get(`http://localhost:8000/api/${email}`).then((res) => {
        setUserdata(res.data.data);
      });
    }
  };

  const addItem = () => {
    const { fname, lname, email, mobile } = user2;

    const emailFromLocalStorage = JSON.parse(localStorage.getItem("email2"));
    console.log(typeof emailFromLocalStorage);
    console.log(typeof user2.email);
    if (emailFromLocalStorage !== user2.email) {
      setError("Email Didn't Match With Student's ID");
    } else {
      if (fname && lname && email && mobile) {
        axios
          .post("http://localhost:8000/additem", user2)
          .then((res) => console.log(res));
      } else {
        alert("Invalid Entries");
      }

      setUser2({
        userId: "",
        fname: "",
        lname: "",
        email: "",
        mobile: "",
      });
      setError("");
      getItem();
    }
  };
  const editItem = (id) => {
    console.log("Add");
    axios.get(`http://localhost:8000/showApi/${id}`).then((res) => {
      console.log(res.data.showData[0].fname);
      setUser2({
        fname: res.data.showData[0].fname,
        lname: res.data.showData[0].lname,
        email: res.data.showData[0].email,
        mobile: res.data.showData[0].mobile,
      });
      setToggle(true);
    });
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:8000/deleteApi/${id}`).then((res) => {
      getItem();
    });
  };

  const showData = (id) => {
    navigate("/crud");
  };

  useEffect(() => {
    getItem();
  }, []);

  const editActually = async (e) => {
    const { fname, lname, email, mobile } = user2;
    if (fname && lname && email && mobile) {
      await axios
        .patch(`http://localhost:8000/updateApi/${id}`, user2)
        .then((res) => console.log(res.data));
    } else {
      alert("Invalid Entries");
    }

    setUser2({
      fname: "",
      lname: "",
      email: "",
      mobile: "",
    });
    setToggle(false);
    getItem();
    navigate("/crud");
  };

  return (
    <>
      
      <div className="whole">
        <div className="container_crud">
          <h1 id="h11" style={{ textAlign: "center" }}>
            Student-List
          </h1>
        </div>
        <div className="cont2 mt-3 " style={{ textAlign: "center" }}>
          <Input
            className="crud_input"
            type="text_crud"
            placeholder=" First Name"
            name="fname"
            value={user2.fname}
            onChange={handle}
          />
          <br />
          <Input
            className="crud_input"
            type="text_crud"
            placeholder="Last Name"
            name="lname"
            value={user2.lname}
            onChange={handle}
          />
          <br />
          <Input
            className="crud_input"
            type="text_crud"
            placeholder="Mobile Number"
            name="mobile"
            value={user2.mobile}
            onChange={handle}
          />
          <br />
          <Input
            className="crud_input"
            type="text_crud"
            placeholder="Confirm the Student ID"
            name="email"
            value={user2.email}
            onChange={handle}
          />
          {error ? (
            <p style={{ color: "red" }} className="form-error">
              {error}
            </p>
          ) : null}

          <div className="mt-3">
            {toggle ? (
              <button
                className="btn btn-primary"
                onClick={editActually}
                style={{ width: "100px" }}
              >
                Edit
              </button>
            ) : (
              <button
                className="btn btn-success"
                style={{ width: "100px" }}
                onClick={addItem}
              >
                Add
              </button>
            )}
          </div>

          <table
            class="table"
            style={{
              margin: "auto",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{
                    border: "2px solid black",
                    borderBottom: "2px solid black",
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  ID
                </th>
                <th
                  scope="col"
                  style={{
                    border: "2px solid black",
                    borderBottom: "2px solid black",
                    width: "10%",
                  }}
                >
                  First Name{" "}
                </th>
                <th
                  scope="col"
                  style={{
                    border: "2px solid black",
                    borderBottom: "2px solid black",
                    width: "10%",
                  }}
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  style={{
                    border: "2px solid black",
                    borderBottom: "2px solid black",
                    width: "auto",
                  }}
                >
                  Mobile Number
                </th>
                <th
                  scope="col"
                  style={{
                    border: "2px solid black",
                    width: "30%",
                    borderBottom: "2px solid black",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((ele, index) => {
                return (
                  <>
                    <tr style={{ textAlign: "center" }}>
                      <th scope="row">{index + 1}</th>
                      <td>{ele.fname}</td>
                      {/* <td>{ele._id}</td> */}
                      <td>{ele.lname}</td>
                      <td>{ele.mobile}</td>
                      <td>
                        <NavLink to={`home/${ele._id}`}>
                          <button
                            className="btn btn-primary"
                            onClick={showData}
                            style={{ width: "100px" }}
                          >
                            Show
                          </button>
                        </NavLink>
                      </td>
                      {!toggle ? (
                        <td>
                          <NavLink to={`${ele._id}`}>
                            <button
                              className="btn btn-success"
                              onClick={() => editItem(ele._id)}
                              style={{ width: "100px" }}
                            >
                              Edit
                            </button>
                          </NavLink>
                        </td>
                      ) : null}

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteItem(ele._id)}} style={{ width: "100px" }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Crud;
