import EachBooking from "../components/EachBooking";
import { Link } from "react-router-dom";

function BookingsPage({ bookings }) {
  const currentDate = new Date();

  return (
    <div>
      <div className="pet-box">
        <h2 className="pet-box-h2">Bookings</h2>
        <div className="all-pets">
          {bookings && bookings.length > 0 ? (
            bookings
            .filter(booking => new Date(booking.endDate) > currentDate)
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
            .map((booking) => (
              <Link
                className="pet-link"
                to={`/profile/${booking.ownerId}`}
                target="_top"
                key={booking._id}
              >
                <EachBooking
                  key={booking._id}
                  ownerId={booking.ownerId}
                  startDate={booking.startDate}
                  endDate={booking.endDate}
                />
              </Link>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingsPage;
