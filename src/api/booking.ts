import client from './client';
import type {
  BookingCreateRequest,
  BookingResponse,
  HostBookingListItemResponse,
  InviteGuestRequest,
  InviteGuestResponse,
  PageResponse,
  MyInvitationResponse,
  BookingGuestConnectionResponse,
} from './types';

export type {
  BookingCreateRequest,
  BookingResponse,
  HostBookingListItemResponse,
  InviteGuestRequest,
  InviteGuestResponse,
  PageResponse,
  MyInvitationResponse,
  BookingGuestConnectionResponse,
};

/**
 * 사용자의 예약 목록 조회
 */
export async function fetchUserBookings(
  status?: string,
): Promise<BookingResponse[]> {
  const params = status ? { status } : {};
  const response = (await client.get(`/api/bookings`, {
    params,
  })) as BookingResponse[];
  return response;
}

/**
 * 내가 동반자로 참여한 예약 목록 조회
 */
export async function fetchCompanionBookings(): Promise<BookingResponse[]> {
  const response = (await client.get(
    `/api/booking-guests/me/bookings`,
  )) as BookingResponse[];
  return response;
}

/**
 * 호스트의 내 숙소 예약 목록 조회
 */
export async function fetchHostBookings(
  status?: string,
): Promise<HostBookingListItemResponse[]> {
  const params = status ? { status } : {};
  const response = (await client.get(`/api/bookings/host`, {
    params,
  })) as HostBookingListItemResponse[];
  return response;
}

/**
 * 예약 생성
 */
export async function createBooking(
  req: BookingCreateRequest,
): Promise<BookingResponse> {
  const response = (await client.post(`/api/bookings`, req)) as BookingResponse;
  return response;
}

/**
 * 게스트 초대
 */
export async function inviteGuest(
  bookingId: number,
  data: InviteGuestRequest,
): Promise<InviteGuestResponse> {
  const response = (await client.post(
    `/api/bookings/${bookingId}/guests`,
    data,
  )) as InviteGuestResponse;
  return response;
}

/**
 * 내 초대 목록 조회
 */
export async function getMyInvitations(
  status?: string,
): Promise<PageResponse<MyInvitationResponse>> {
  const params = status ? { status } : {};
  const response = (await client.get(`/api/booking-guests/me`, {
    params,
  })) as PageResponse<MyInvitationResponse>;
  return response;
}

/**
 * 내 인연 목록 조회
 */
export async function getBookingGuestConnections(): Promise<
  BookingGuestConnectionResponse[]
> {
  const response = (await client.get(
    `/api/booking-guests/connections`,
  )) as BookingGuestConnectionResponse[];
  return response;
}

/**
 * 초대 수락
 */
export async function acceptInvitation(bookingGuestId: number): Promise<void> {
  await client.patch(`/api/booking-guests/${bookingGuestId}/accept`);
}

/**
 * 초대 거절
 */
export async function declineInvitation(bookingGuestId: number): Promise<void> {
  await client.patch(`/api/booking-guests/${bookingGuestId}/decline`);
}
