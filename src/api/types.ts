export type AccommodationType = "entire_place" | "private_room" | "shared_room";

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
  targetGuestId: number;
  bookingId: number;
  rating: number;
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
  breakdown?: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
};
