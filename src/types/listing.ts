// 숙소 리스팅 타입 정의
export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  spaceType: string;
  location: {
    country: string;
    province: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postalCode: string;
  };
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  photos: string[];
  pricing: {
    basePrice: number;
    weekendPremium: number;
  };
  discounts: {
    newListing: boolean;
    weekly: boolean;
    monthly: boolean;
  };
  bookingSettings: 'review' | 'instant';
  guestRequirements: 'experienced' | 'anyone';
  safetyInfo: Record<string, { checked: boolean; description: string }>;
  isBusiness: boolean;
  createdAt: string;
  status: 'draft' | 'published';
}

// 기본 숙소 데이터 (빈 상태)
export const defaultListing: Omit<Listing, 'id' | 'createdAt'> = {
  title: '',
  description: '',
  category: '',
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
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  amenities: [],
  photos: [],
  pricing: {
    basePrice: 50000,
    weekendPremium: 0,
  },
  discounts: {
    newListing: false,
    weekly: false,
    monthly: false,
  },
  bookingSettings: 'review',
  guestRequirements: 'experienced',
  safetyInfo: {},
  isBusiness: false,
  status: 'draft',
};

