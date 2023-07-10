import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import imgPlaceholder from "../assets/placeholder.png";
import { useParams } from "react-router-dom";
import heart from "../assets/heart.png";
import ReviewBox from "../components/ReviewBox";
import MyPetsBox from "../components/MyPetsBox";
import Calendar from "react-calendar";
import BookingsPage from "./BookingsPage";

function ProfilePage() {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [addReview,setAddReviews] = useState(null)

  useEffect(() => {
    fetchCurrentUserData();
  }, [userId,addReview]);

  useEffect(()=>{
    if(user){
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/api/users/${user._id}`
        );
        console.log("fetched data", data);
        if (data.favorites.includes(userId)) {
          setFavorite(true);
        }
      } catch (err) {
        console.log("fetch user data error", err);
      }
     
    }; fetchUserData()}
    
  },[user,userId])

  const handleFavoriteClick = async () => {
    try {
      if (favorite) {
        const response = await axios.put(
          `http://localhost:5005/api/favorites/${userId}`,
          {
            userIdToRemove: user._id,
          }
        );
        console.log("favorite removed", response.data);
      } else {
        const response = await axios.put(
          `http://localhost:5005/api/favorites/${userId}`,
          {
            userIdToAdd: user._id,
          }
        );
        console.log("favorite added", response.data);
      }
      setFavorite(!favorite);
    } catch (err) {
      console.log("update favorites error", err);
    }
  };

  const fetchCurrentUserData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5005/api/users/${userId}`
      );
      console.log("fetched data", data);
      setCurrentUser(data);
    } catch (err) {
      console.log("fetch user data error", err);
    }
  };

  if (!currentUser) {
    return "loading";
  }

  // handle date changes
  const handleDateChange = (date) => {
    if (date instanceof Date) {
      // Single date selected
      setStartDate(date);
      setEndDate(null);
    } else if (Array.isArray(date)) {
      // Date range selected
      setStartDate(date[0]);
      setEndDate(date[1]);
    }
  };

  // handle bookings submit
  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!startDate || !endDate) {
        setBookingError("Please select start and end dates.");
        return;
      }

      const bookingPayload = {
        sitterId: userId,
        startDate: startDate,
        endDate: endDate,
      };

      const response = await axios.post(
        "http://localhost:5005/api/bookings",
        bookingPayload
      );
      console.log("Booking created:", response.data);
      fetchCurrentUserData(); // Fetch updated currentUserData
    } catch (error) {
      console.log("Booking error:", error.response.data);
      setBookingError("An error occurred while creating the booking.");
    }
  };

  return (
    <div className="profilepage">
      <img
        className="profileImg"
        src={!currentUser.img ? imgPlaceholder : currentUser.img}
        alt={currentUser.username}
      />
      <h1>{currentUser.username} </h1>
      {currentUser.postalCode && <p>{currentUser.postalCode}</p>}
      {userId !== user._id && <img
        className={favorite ? "coloredHeart" : "blackHeart"}
        src={heart}
        alt="heart"
        onClick={handleFavoriteClick}
      />}
      {userId === user._id && <Link to={`/edit/${userId}`}>Edit Profile</Link>}
      <div className="aboutme-box">
        <h2>About me</h2>
        {!currentUser.description ? (
          <p>
            This user prefers mystery over biography, thus the description is on
            a permanent coffee break!
          </p>
        ) : (
          currentUser.description
        )}
      </div>
      <div>
        <ReviewBox reviews={currentUser.reviews} setAddReviews={setAddReviews}/>
      </div>
      <div>
        <MyPetsBox pets={currentUser.pets} />
      </div>
      <BookingsPage bookings={currentUser.bookings} />

      {/*Add React Calendar*/}
      <h1>React Calendar</h1>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={[startDate, endDate]}
          selectRange={true}
        />

        <div className="text-center">
          {startDate && endDate ? (
            <p>
              <span>Start:</span> {startDate.toDateString()} to{" "}
              {endDate.toDateString()}
            </p>
          ) : (
            <p>
              <span>Default selected date:</span> {date.toDateString()}
            </p>
          )}
        </div>

        <div className="contact-btns">
          <Link>Chat with me</Link>
          <button onClick={handleBookingSubmit}>Book</button>
        </div>

        {bookingError && <p className="error-message">{bookingError}</p>}
      </div>
    </div>
  );
}

export default ProfilePage;
