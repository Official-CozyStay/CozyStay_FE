import axios from "axios";

export type BookingCreateRequest = {
    accommodationId: number;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
};

export type BookingResponse = {
    bookingId: number;
    accommodationId: number;
    guestId: number;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
    totalPrice: string;
    bookingStatus: string;
};

export async function createBooking(req: BookingCreateRequest){
    const res = await axios.post<BookingResponse>("/api/bookings", req);
    return res.data;
}

