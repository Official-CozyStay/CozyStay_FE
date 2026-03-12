import client from "./client";

export interface HostBookingListItemResponse {
    bookingId: number;
    accommodationId: number;
    accommodationTitle: string;
    guestId: number;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
    status: string;
    totalPrice: number;
    createdAt: string;
}

export const fetchHostBookings = async (
    status?: string
): Promise<HostBookingListItemResponse[]> => {
    const params = status ? { status } : {};
    const response = await client.get<HostBookingListItemResponse[]>("/api/bookings", { params }) as unknown as HostBookingListItemResponse[];
    return response;
};

export interface InviteGuestRequest {
    guestUserId?: number;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guestIdentityValid: boolean;
}

export interface InviteGuestResponse {
    bookingGuestId: number;
    invitationStatus: string;
    invitedAt: string;
}

export const inviteGuest = async (
    bookingId: number,
    data: InviteGuestRequest
): Promise<InviteGuestResponse> => {
    const response = await client.post<InviteGuestResponse>(
        `/api/bookings/${bookingId}/guests`,
        data
    ) as unknown as InviteGuestResponse;
    return response;
};

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export interface MyInvitationResponse {
    bookingGuestId: number;
    bookingId: number;
    checkInDate: string;
    checkOutDate: string;
    invitationStatus: string;
    invitedAt: string;
    respondedAt?: string;
}

export const getMyInvitations = async (status?: string): Promise<PageResponse<MyInvitationResponse>> => {
    const params = status ? { status } : {};
    const response = await client.get<PageResponse<MyInvitationResponse>>("/api/booking-guests/me", { params }) as unknown as PageResponse<MyInvitationResponse>;
    return response;
};

export const acceptInvitation = async (bookingGuestId: number): Promise<void> => {
    await client.patch(`/api/booking-guests/${bookingGuestId}/accept`);
};

export const declineInvitation = async (bookingGuestId: number): Promise<void> => {
    await client.patch(`/api/booking-guests/${bookingGuestId}/decline`);
};
