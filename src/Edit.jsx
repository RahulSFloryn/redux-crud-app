import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "./UserReducer";

export default function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const existingUser = users.filter((f) => f.id == id);
  const [name, email] = [
    existingUser[0]?.name || "",
    existingUser[0]?.email || "",
  ];
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(updatedName);
    dispatch(
      updateUser({
        id: id,
        name: updatedName,
        email: updatedEmail,
      })
    );
    navigate("/");
  };

  return (
    <>
      {" "}
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-secondary text-white p-5">
          <h3>Update user</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="eail">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </div>{" "}
            <br />
            <button className="btn btn-info">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
