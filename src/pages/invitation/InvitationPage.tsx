import { useParams } from "react-router-dom";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const InvitationPage = () => {
    const { token } = useParams<{token : string}>();

    const [status, setStatus] = useState<Status>("idle");
    const [message, setMessage] = useState<string>("");

    const respond = async(action: "accept" | "decline") => {
        if(!token){
            setStatus("error");
            setMessage("유효하지 않은 초대 링크입니다.");
            return;
        }
        try{
            setStatus("loading");
            setMessage("");

            const response = await fetch(
                `${API_BASE}/api/booking-guests/invitations/${token}/${action}`,
                {
                    method: "POST",
                }
            );

            if(!response.ok){
                const text = await response.text();
                throw new Error(text || "요청에 실패했습니다.");
            }

            setStatus("success");
            setMessage(
                action === "accept"
                ?"초대를 수락했습니다."
                :"초대를 거절했습니다."
            );
        }catch (error){
            setStatus("error");
            setMessage(
                error instanceof Error ? error.message : "오류가 발생했습니다."
            );
        }
    };

    return (
        <div style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
            <h2>예약 동반자 초대</h2>

            {status === "idle" &&(
                <>
                    <p>초대에 응답을 선택해주세요.</p>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button onClick={()=> respond("accept")}>수락</button>
                        <button onClick={()=> respond("decline")}>거절</button>
                    </div>
                </>
            )}

            {status === "loading" && <p>처리 중입니다...</p>}

            {status === "success" && <p style={{ color : "green" }}>{message}</p>}

            {status === "error" && <p style={{ color : "crimson" }}>{message}</p>}

        </div>
    );
};

export default InvitationPage;
