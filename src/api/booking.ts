import client from "./client";
import type { BookingResponse } from "./types";

/**
 * 사용자의 예약 목록 조회
 */
export async function fetchUserBookings(): Promise<BookingResponse[]> {
    const response = await client.get<BookingResponse[]>(`/api/bookings`) as unknown as BookingResponse[];
    return response;
}
