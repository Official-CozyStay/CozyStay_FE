import client from './client';
import type {
  FavoriteResponseDTO,
  FavoriteCreateRequestDTO,
  FavoriteCreateResponseDTO,
  FavoriteDetailResponseDTO,
  FavoriteUpdateRequestDTO,
} from './types';

const BASE = '/api/favorites';

function validateId(value: unknown, name: string): asserts value is string {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    throw new Error(`Invalid ${name}: ${value}`);
  }
}

/** 즐겨찾기 목록 조회 */
export async function fetchFavorites(): Promise<FavoriteResponseDTO[]> {
  const data = (await client.get(BASE)) as unknown as FavoriteResponseDTO[];
  return Array.isArray(data) ? data : [];
}

/** 즐겨찾기 상세 조회 */
export async function fetchFavoriteDetail(
  favoriteId: string,
): Promise<FavoriteDetailResponseDTO> {
  validateId(favoriteId, 'favoriteId');
  return (await client.get(
    `${BASE}/${encodeURIComponent(favoriteId)}`,
  )) as unknown as FavoriteDetailResponseDTO;
}

/** 즐겨찾기 생성 */
export async function createFavorite(
  request: FavoriteCreateRequestDTO,
): Promise<FavoriteCreateResponseDTO> {
  return (await client.post(
    BASE,
    request,
  )) as unknown as FavoriteCreateResponseDTO;
}

/** 즐겨찾기 수정 */
export async function updateFavorite(
  favoriteId: string,
  request: FavoriteUpdateRequestDTO,
): Promise<void> {
  validateId(favoriteId, 'favoriteId');
  await client.patch(`${BASE}/${encodeURIComponent(favoriteId)}`, request);
}

/** 즐겨찾기 삭제 */
export async function deleteFavorite(favoriteId: string): Promise<void> {
  validateId(favoriteId, 'favoriteId');
  await client.delete(`${BASE}/${encodeURIComponent(favoriteId)}`);
}

/** 즐겨찾기에 숙소 추가 */
export async function addAccommodationToFavorite(
  favoriteId: string,
  accommodationId: string,
): Promise<void> {
  validateId(favoriteId, 'favoriteId');
  validateId(accommodationId, 'accommodationId');
  await client.post(
    `${BASE}/${encodeURIComponent(favoriteId)}/accommodations/${encodeURIComponent(accommodationId)}`,
  );
}

/** 즐겨찾기에서 숙소 제거 */
export async function removeAccommodationFromFavorite(
  favoriteId: string,
  accommodationId: string,
): Promise<void> {
  validateId(favoriteId, 'favoriteId');
  validateId(accommodationId, 'accommodationId');
  await client.delete(
    `${BASE}/${encodeURIComponent(favoriteId)}/accommodations/${encodeURIComponent(accommodationId)}`,
  );
}
