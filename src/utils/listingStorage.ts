import type { Listing } from '@/types/listing';

const LISTINGS_KEY = 'cozy_listings';
const DRAFT_KEY = 'cozy_listing_draft';

// 모든 리스팅 가져오기
export const getListings = (): Listing[] => {
  try {
    const data = localStorage.getItem(LISTINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// 리스팅 저장하기
export const saveListing = (listing: Listing): void => {
  const listings = getListings();
  const existingIndex = listings.findIndex((l) => l.id === listing.id);
  
  if (existingIndex >= 0) {
    listings[existingIndex] = listing;
  } else {
    listings.push(listing);
  }
  
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
};

// 리스팅 삭제하기
export const deleteListing = (id: string): void => {
  const listings = getListings();
  const filtered = listings.filter((l) => l.id !== id);
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(filtered));
};

// 임시 저장 (드래프트)
export const saveDraft = (data: Partial<Listing>): void => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
};

// 드래프트 가져오기
export const getDraft = (): Partial<Listing> | null => {
  try {
    const data = localStorage.getItem(DRAFT_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

// 드래프트 삭제
export const clearDraft = (): void => {
  localStorage.removeItem(DRAFT_KEY);
};

// 고유 ID 생성
export const generateId = (): string => {
  return `listing_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

