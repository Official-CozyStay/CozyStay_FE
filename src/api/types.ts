export type AccommodationType = 'entire_place' | 'private_room' | 'shared_room';

// 백엔드 API에서 사용하는 대문자 ENUM
export type AccommodationTypeAPI =
  | 'ENTIRE_PLACE'
  | 'PRIVATE_ROOM'
  | 'SHARED_ROOM';

// ============================================
// 숙소 등록 API Request/Response DTOs
// ============================================

// [POST] /api/accommodations - 숙소 생성 요청
export type CreateAccommodationRequest = {
  title: string;
  description: string;
  accommodationType: AccommodationTypeAPI;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  maxGuests: number;
  pricePerNight: number;
  cleaningFee?: number;
  serviceFeePercentage?: number;
  instantBooking: boolean;
  checkInTime?: string;
  checkOutTime?: string;
};

// [POST] /api/accommodations - 숙소 생성 응답
export type CreateAccommodationResponse = {
  accommodationId: number;
  accommodationName: string;
  accommodationImage: string;
  accommodationPrice: number;
};

// [POST] /api/accommodations/details/{id} - 상세정보 등록 요청
export type CreateAccommodationDetailsRequest = {
  roomCount: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  airConditionerCount: number;
  hairDryerCount: number;
  refrigeratorCount: number;
  televisionCount: number;
  washerCount: number;
  dryerCount: number;
  wifiAvailable: boolean;
  parkingAvailable: boolean;
  petAvailable: boolean;
  kitchenAvailable: boolean;
};

// [POST] /api/accommodations/details/{id} - 상세정보 등록 응답
export type CreateAccommodationDetailsResponse = {
  message: string;
  accommodationId: number;
};

// [POST] /api/accommodations/amenities/{id} - 편의시설 추가 요청
export type CreateAmenityRequest = {
  name: string;
  icon: string;
  category: string;
};

// [POST] /api/accommodations/amenities/{id} - 편의시설 추가 응답
export type CreateAmenitiesResponse = {
  accommodationId: number;
  count: number;
  message: string;
};

// [POST] /api/accommodations/images/{id} - 이미지 추가 요청
export type CreateImageRequest = {
  imageUrl: string;
  displayOrder: number;
  isPrimary: boolean;
};

// [POST] /api/accommodations/images/{id} - 이미지 추가 응답
export type CreateImagesResponse = {
  accommodationId: number;
  imageId: number[];
  message: string;
};

// [GET] /api/accommodations - 숙소 목록 조회 응답
export type AccommodationListItemDTO = {
  accommodationId: number;
  accommodationName: string;
  accommodationImage: string | null;
  accommodationPrice: number;
};

export type AccommodationImageDTO = {
  imageId: number;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
};

export type AmenityDTO = {
  amenityId: number;
  name: string;
  icon?: string | null;
  category?: string | null;
};

export type ReviewSummaryDTO = {
  average: number;
  count: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T;
};

export type HostDTO = {
  userId: number;
  nickName: string;
  profileImageUrl?: string | null;
};

export type CommentDTO = {
  commentId: number;
  content: string;
  authorId: number;
  authorNickname: string;
  authorProfileImage: string | null;
  createdAt: string;
  updatedAt: string;
};

export type HostelReviewDTO = {
  id: number;
  bookingId: number;
  userNickName: string;
  userProfileImageUrl: string | null;
  ratingOverall: number;
  ratingCleanliness: number;
  ratingAccuracy: number;
  ratingCheckin: number;
  ratingCommunication: number;
  ratingLocation: number;
  reviewComment: string;
  comment?: CommentDTO | null;
};

export type UserReviewDTO = {
  id?: number;
  targetGuestId: number;
  bookingId: number;
  userNickName?: string;
  userProfileImageUrl?: string | null;
  rating: number;
  reviewComment: string;
  comment?: CommentDTO | null;
};

export type UserReviewCreateRequest = {
  targetGuestId: number;
  bookingId: number;
  rating: number;
  reviewComment: string;
};

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
  totalPrice: number;
  bookingStatus: string;
};

export type HostBookingListItemResponse = {
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
};

export type AccommodationReviewRequest = {
  bookingId: number;
  ratingOverall: number;
  ratingCleanliness: number;
  ratingAccuracy: number;
  ratingCheckin: number;
  ratingCommunication: number;
  ratingLocation: number;
  reviewComment: string;
};

export type AccommodationReviewResponse = {
  id: number;
  bookingId: number;
  ratingOverall: number;
  ratingCleanliness: number;
  ratingAccuracy: number;
  ratingCheckin: number;
  ratingCommunication: number;
  ratingLocation: number;
  reviewComment: string;
  comment?: CommentDTO | null;
};

export type PublicUserProfileResponse = {
  id: number;
  nickName: string;
  profileImageUrl: string | null;
  grade: string;
  reviewCount: number;
};

export type AccommodationDetailInfoDTO = {
  summary?: string;
  space?: string;
  access?: string;
  notes?: string;
  // Assuming these numeric fields are inside detail info based on typical patterns,
  // as they are missing from the top-level DTO provided by the user.
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
};

export type AccommodationDetailDTO = {
  accommodationId: number;
  hostId: number;
  hostNickname: string;
  hostProfileImageUrl?: string | null;
  title: string;
  description: string;
  accommodationType: AccommodationType;
  address: string;
  city: string;
  state?: string | null;
  country: string;
  postalCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  maxGuests: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFeePercentage: number;
  instantBooking: boolean;
  checkInTime?: string | null;
  checkOutTime?: string | null;

  detail?: AccommodationDetailInfoDTO | null;

  images: AccommodationImageDTO[];
  amenities: AmenityDTO[];

  reviewSummary?: ReviewSummaryDTO;

  // Frontend specific or optional fields if needed for compatibility (e.g. from reviews)
  // host: HostDTO; // Removing this as backend only sends hostId
};

export type ReviewRatingBreakdown = {
  cleanliness: number;
  accuracy: number;
  communication: number;
  location: number;
  checkIn: number;
  value: number;
};

// UI legacy compatibility (will be refactored)
export type ReviewDTO = {
  reviewId: number;
  author: {
    userId: number;
    nickName: string;
    profileImageUrl?: string | null;
  };
  rating: number;
  content: string;
  createdAt: string;
  accommodationName?: string;
  reply?: CommentDTO | null; // 답글 (댓글)
};

export type ReviewListResponse = {
  reviews: ReviewDTO[];
  summary: {
    average: number;
    count: number;
  };
  breakdown?: ReviewRatingBreakdown;
};

export type ReviewSummryDTO = {
  average: number;
  count: number;
};

export interface InviteGuestRequest {
  guestUserId?: number;
  guestName?: string;
  guestEmail: string;
  guestPhone?: string;
  guestIdentityValid?: boolean;
}

export interface InviteGuestResponse {
  bookingGuestId: number;
  invitationStatus: string;
  invitedAt: string;
}

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
