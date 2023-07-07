import React from "react";

function BookingsPage({ bookings }) {
  return (
    <div className="booking-box">
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-item">
            <p>Booking ID: {booking._id}</p>
            <p>Pet Sitter: {booking.sitterId.username}</p>
            <p>Start Date: {booking.startDate}</p>
            <p>End Date: {booking.endDate}</p>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}

export default BookingsPage;
