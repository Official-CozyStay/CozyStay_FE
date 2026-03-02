import client from "./client";
import type { BookingResponse, ApiResponse } from "./types";

/**
 * 사용자의 예약 목록 조회
 */
export async function fetchUserBookings(): Promise<BookingResponse[]> {
    const response = await client.get<ApiResponse<BookingResponse[]>>(`/api/bookings`) as unknown as ApiResponse<BookingResponse[]>;
    return response.data;
}
