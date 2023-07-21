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
import { API_URL } from "../config/config.index";
import remove from "../assets/remove.png"

function ProfilePage() {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [addReview, setAddReviews] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [startAvailableDate, setStartAvailableDate] = useState(null);
  const [endAvailableDate, setEndAvailableDate] = useState(null);

  useEffect(() => {
    fetchCurrentUserData();
  }, [userId, addReview]);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const { data } = await axios.get(`${API_URL}/api/users/${user._id}`);
          console.log("fetched data", data);
          if (data.favorites.includes(userId)) {
            setFavorite(true);
          }
        } catch (err) {
          console.log("fetch user data error", err);
        }
      };
      fetchUserData();
    }
  }, [user, userId]);

  useEffect(() => {
    if (currentUser && currentUser.bookings) {
      const dates = currentUser.bookings.map((booking) => {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);
        return { start, end };
      });
      setBookedDates(dates);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.availability) {
      const dates = currentUser.availability.map((date) => {
        const start = new Date(date.startDate);
        const end = new Date(date.endDate);
        return { start, end };
      });
      setAvailableDates(dates);
    }
  }, [currentUser]);

  const handleFavoriteClick = async () => {
    try {
      if (favorite) {
        const response = await axios.put(`${API_URL}/api/favorites/${userId}`, {
          userIdToRemove: user._id,
        });
        console.log("favorite removed", response.data);
      } else {
        const response = await axios.put(`${API_URL}/api/favorites/${userId}`, {
          userIdToAdd: user._id,
        });
        console.log("favorite added", response.data);
      }
      setFavorite(!favorite);
    } catch (err) {
      console.log("update favorites error", err);
    }
  };

  const fetchCurrentUserData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/${userId}`);
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
        ownerId: user._id,
        sitterId: userId,
        startDate: startDate,
        endDate: endDate,
      };

      // Check if the selected dates overlap with existing bookings
      const overlappingBookings = currentUser.bookings.filter((booking) => {
        const bookingStartDate = new Date(booking.startDate);
        const bookingEndDate = new Date(booking.endDate);
        return (
          (startDate >= bookingStartDate && startDate <= bookingEndDate) ||
          (endDate >= bookingStartDate && endDate <= bookingEndDate) ||
          (startDate <= bookingStartDate && endDate >= bookingEndDate)
        );
      });

      if (overlappingBookings.length > 0) {
        setBookingError("Selected dates overlap with existing bookings.");
        return;
      }

      // Check if the selected dates overlap with available dates

      const overlappingAvailableDates = availableDates.filter(
        (availableDate) => {
          const availableStartDate = new Date(availableDate.start);
          const availableEndDate = new Date(availableDate.end);
          return startDate >= availableStartDate && endDate <= availableEndDate;
        }
      );

      if (overlappingAvailableDates.length === 0) {
        setBookingError("Selected dates are not within available dates.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/bookings`,
        bookingPayload
      );
      console.log("Booking created:", response.data);
      fetchCurrentUserData();
      setBookingSuccess(true);
      setBookingError(null);
    } catch (error) {
      console.log("Booking error:", error.response.data);
      setBookingError("An error occurred while creating the booking.");
    }
  };

  // handle available dates changes
  const handleAvailableDateChange = (date) => {
    if (date instanceof Date) {
      // Single date selected
      setStartAvailableDate(date);
      setEndAvailableDate(null);
    } else if (Array.isArray(date)) {
      // Date range selected
      setStartAvailableDate(date[0]);
      setEndAvailableDate(date[1]);
    }
  };

  // handle available dates submit
  const handleAvailableDatesSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!startAvailableDate || !endAvailableDate) {
        setBookingError("Please select start and end dates.");
        return;
      }

      const availableDatesPayload = {
        userId: userId,
        startDate: startAvailableDate,
        endDate: endAvailableDate,
      };

      const response = await axios.post(
        `${API_URL}/api/availableDates`,
        availableDatesPayload
      );
      console.log("Available dates set:", response.data);
      fetchCurrentUserData();
    } catch (error) {
      console.log("Setting available dates error:", error.response.data);
    }
  };

  const handleRemoveAvailability = async (bookingId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/availableDates/${bookingId}`
      );
      console.log("Available date removed:", response.data);
      fetchCurrentUserData();
    } catch (error) {
      console.log("Remove available date error:", error);
    }
  };

  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const isBooked = bookedDates.some(
        (bookedDate) => date >= bookedDate.start && date <= bookedDate.end
      );
      const isAvailable = availableDates.some(
        (availableDate) =>
          date >= availableDate.start && date <= availableDate.end
      );

      if (isBooked) {
        return <div className="booked-date-indicator"></div>;
      }

      if (isAvailable) {
        return <div className="available-date-indicator"></div>;
      }
    }

    return null;
  };

  if (!user) {
    return "Loading...";
  }

  return (
    <div className="profilepage">
      <img
        className="profileImg"
        src={!currentUser.img ? imgPlaceholder : currentUser.img}
        alt={currentUser.username}
      />
      <h1>{currentUser.username}</h1>
      {currentUser.postalCode && <p>{currentUser.postalCode}</p>}
      {userId !== user._id && (
        <img
          className={favorite ? "coloredHeart" : "blackHeart"}
          src={heart}
          alt="heart"
          onClick={handleFavoriteClick}
        />
      )}
      {userId === user._id && (
        <Link className="edit-profile-link" to={`/edit/${userId}`}>
          Edit Profile
        </Link>
      )}
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
        <ReviewBox
          reviews={currentUser.reviews}
          setAddReviews={setAddReviews}
          fetchCurrentUserDate={fetchCurrentUserData}
        />
      </div>
      <div>
        <MyPetsBox pets={currentUser.pets} />
      </div>
      {userId === user._id && currentUser.isSitter && <BookingsPage bookings={currentUser.bookings} />}

      {userId === user._id && currentUser.isSitter &&(
        <>
          <div className="pet-box">
          <h2>Set your availability</h2>
            <div className="available-dates">
          <Calendar
            onChange={handleAvailableDateChange}
            value={[startAvailableDate, endAvailableDate]}
            selectRange={true}
            tileContent={renderTileContent} // Custom tile content function
          />
          <span className="indicator-red">🟥already booked dates</span>
          <span className="indicator-green">🟩available dates</span>
          <button
            className="available-date-btn"
            onClick={handleAvailableDatesSubmit}
          >
            Add Available Dates
          </button>
        </div>
        </div>
          <div className="pet-box">
          <h2>My available Dates</h2>
            <div className="available-dates">
              <div className="all-pets">
                {currentUser.availability &&
                currentUser.availability.length > 0 ? (
                  currentUser.availability.map((booking) => (
                    <div key={booking._id} className="each-pet-box">
                      <p>
                        Start Date:{" "}
                        {new Date(booking.startDate).toLocaleDateString(
                          "de-DE"
                        )}
                      </p>
                      <p>
                        End Date:{" "}
                        {new Date(booking.endDate).toLocaleDateString("de-DE")}
                      </p>
                      <button
                        className="delete-dates"
                        onClick={() => handleRemoveAvailability(booking._id)}
                      >
                      <img src={remove} alt="delete"></img>
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No bookings found.</p>
                )}
              </div>
            </div>{" "}
          </div>

        </>
      )}
      {/*Add React Calendar*/}
      {userId !== user._id && currentUser.isSitter && (
        <div>
          <h2 className="text-center">Book a service</h2>
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={[startDate, endDate]}
              selectRange={true}
              tileContent={renderTileContent} // Custom tile content function
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
            <div className="direction-column text-center">
              <span className="indicator-red">🟥already booked dates</span>
              <span className="indicator-green">🟩available dates</span>
            </div>

            <div className="contact-btns">
              <Link>Chat with me</Link>
              <button onClick={handleBookingSubmit}>Book</button>
            </div>

            {bookingError && <p className="error-message">{bookingError}</p>}
            {bookingSuccess && (
              <p className="success-message">Booking created successfully!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
