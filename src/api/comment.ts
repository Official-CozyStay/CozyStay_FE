import client from './client';
import type { ApiResponse, CommentDTO } from './types';

// 단일 댓글(답글) 조회
export async function fetchComment(
  commentId: number,
): Promise<CommentDTO | null> {
  // 입력값 검증: 숫자가 아니거나 유효하지 않은 경우 요청 방지 (Path Traversal 방지)
  if (!commentId || isNaN(commentId) || commentId <= 0) {
    console.error(`Invalid commentId: ${commentId}`);
    return null;
  }

  try {
    const response = (await client.get<ApiResponse<CommentDTO>>(
      `/api/comments/${commentId}`,
    )) as unknown as ApiResponse<CommentDTO>;
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch comment ${commentId}`, error);
    return null;
  }
}
