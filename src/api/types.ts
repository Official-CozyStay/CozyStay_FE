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
  // Note: Backend sample doesn't include author info yet, but we'll keep it for UI if added later
  author?: {
    userId: number;
    nickName: string;
    profileImageUrl?: string | null;
  };
};

export type UserReviewDTO = {
  targetGuestId: number;
  bookingId: number;
  rating: number;
  reviewComment: string;
};

export type PublicUserProfileResponse = {
  id: number;
  nickName: string;
  profileImageUrl: string | null;
  grade: string;
  reviewCount: number;
};

// Existing types preserved or adapted
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
  bedrooms: number;
  beds: number;
  bathrooms: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFeePercentage: number;
  instantBooking: boolean;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  images: AccommodationImageDTO[];
  amenities: AmenityDTO[];
  reviewSummary: {
    average: number;
    count: number;
  };
  host: HostDTO;
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
