import client from "./client";
import type { BookingResponse, HostBookingListItemResponse } from "./types";

/**
 * 사용자의 예약 목록 조회
 */
export async function fetchUserBookings(): Promise<BookingResponse[]> {
    const response = await client.get<BookingResponse[]>(`/api/bookings`) as unknown as BookingResponse[];
    return response;
}

/**
 * 호스트의 내 숙소 예약 목록 조회
 */
export async function fetchHostBookings(): Promise<HostBookingListItemResponse[]> {
    const response = await client.get<HostBookingListItemResponse[]>(`/api/bookings/host`) as unknown as HostBookingListItemResponse[];
    return response;
}
