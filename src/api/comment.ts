import client from "./client";
import type { ApiResponse, CommentDTO } from "./types";

// 단일 댓글(답글) 조회
export async function fetchComment(commentId: number): Promise<CommentDTO | null> {
    try {
        const { data } = await client.get<any, ApiResponse<CommentDTO>>(
            `/api/comments/${commentId}`
        );
        return data;
    } catch (error) {
        console.error(`Failed to fetch comment ${commentId}`, error);
        return null;
    }
}
