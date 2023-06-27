import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5005/api/users/${user._id}`);
        console.log("fetched data", data);
        setCurrentUser(data);
      } catch (err) {
        console.log("fetch user data error", err);
      }
    };
    fetchUserData();
  }, [user]);
  if(!currentUser){return("loading")}

  return <div>{currentUser.username}</div>;
}

export default ProfilePage;