import React from "react";

function BookingsPage({ bookings }) {
  return (
    <div>
      <h1>Bookings</h1>
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-item">
            <p>Booking ID: {booking._id}</p>
            <p>Pet Sitter: {booking.sitterId}</p>
            <p>Pet Owner: {booking.ownerId}</p>
            <p>
              Start Date:{" "}
              {new Date(booking.startDate).toLocaleDateString("de-DE")}
            </p>
            <p>
              End Date: {new Date(booking.endDate).toLocaleDateString("de-DE")}
            </p>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}

export default BookingsPage;
