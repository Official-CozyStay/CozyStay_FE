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

export type HostDTO = {
  userId: number;
  nickName: string;
  profileImageUrl?: string | null;
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
  reviewSummary: ReviewSummaryDTO;
  host: HostDTO;
};
