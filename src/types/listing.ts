// 숙소 리스팅 타입 정의
export type SpaceType = 'entire_place' | 'private_room' | 'shared_room' | '';

export interface Listing {
  id: string;
  title: string;
  description: string;
  spaceType: SpaceType;
  location: {
    country: string;
    province: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postalCode: string;
    latitude?: number;
    longitude?: number;
  };
  guests: number; // maxGuests
  rooms: number; // roomCount (방 수)
  bedrooms: number; // bedroomCount
  beds: number; // bedCount
  bathrooms: number; // bathroomCount
  // 가전제품 개수 (백엔드 필수 항목)
  appliances: {
    airConditioner: number;
    hairDryer: number;
    refrigerator: number;
    television: number;
    washer: number;
    dryer: number;
  };
  // 편의시설 (boolean 값들)
  amenities: {
    wifi: boolean;
    parking: boolean;
    pet: boolean;
    kitchen: boolean;
  };
  // 추가 편의시설 목록 (API 3번용)
  extraAmenities: string[];
  photos: string[];
  pricing: {
    basePrice: number; // pricePerNight
    cleaningFee?: number;
  };
  bookingSettings: 'review' | 'instant'; // instantBooking
  checkInTime?: string;
  checkOutTime?: string;
  createdAt: string;
  status: 'draft' | 'published';
}

// 기본 숙소 데이터 (빈 상태)
export const defaultListing: Omit<Listing, 'id' | 'createdAt'> = {
  title: '',
  description: '',
  spaceType: '',
  location: {
    country: '한국',
    province: '',
    city: '',
    district: '',
    streetAddress: '',
    detailAddress: '',
    postalCode: '',
  },
  guests: 1,
  rooms: 1,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  appliances: {
    airConditioner: 1,
    hairDryer: 1,
    refrigerator: 1,
    television: 1,
    washer: 1,
    dryer: 0,
  },
  amenities: {
    wifi: false,
    parking: false,
    pet: false,
    kitchen: false,
  },
  extraAmenities: [],
  photos: [],
  pricing: {
    basePrice: 0,
    cleaningFee: 0,
  },
  bookingSettings: 'review',
  checkInTime: '15:00',
  checkOutTime: '11:00',
  status: 'draft',
};
