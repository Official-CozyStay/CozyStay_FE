import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAccommodationStore } from "@/store/accommodationStore.ts";
import { nightsBetween, calcTotal } from "../../utils/price";

import BookingSummaryCard from "./components/BookngSummaryCard";
import PaymentMethodSection from "./components/PaymentMethodSection";
import type { PaymentMethod } from "./components/PaymentMethodSection";
import HostMessageSection from "./components/HostMessageSection";
import RequestConfirmSection from "./components/RequestConfirmSection";

export default function PaymentPage(){
    const{ id } = useParams<{ id: string } >();
    const [searchParams] = useSearchParams();
    const { detail, loading, error, load } = useAccommodationStore();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD");
    const [hostMessage, setHostMessage] = useState("");

    const checkIn = searchParams.get("checkin");
    const checkOut = searchParams.get("checkout");
    const guests = Number(searchParams.get("numberOfGuests") ?? 1);

    useEffect(() => {
        if(id) load(id);
    }, [id, load]);

    const nights = nightsBetween(checkIn ?? undefined, checkOut ?? undefined);

    const price = useMemo(() => {
        if(!detail || !checkIn || !checkOut || nights <= 0) return null;
        return calcTotal(nights, detail.pricePerNight, detail.cleaningFee, detail.serviceFeePercentage);
    }, [detail, checkIn, checkOut, nights]);

    if(!id) return <div>잘못된 접근</div>;
    if (loading) return <div>불러오는 중...</div>;
    if (error) return <div>에러: {error}</div>;
    if (!detail) return <div>데이터 없음</div>;

    const HEADER_OFFSET = 80;

    return(
        <div style = {{ display : "grid", gridTemplateColumns : "360px minmax(0,700px)",
            gap: 24, padding: 24, paddingTop : 24+HEADER_OFFSET,
            justifyContent : "center"}}>
        {/*  예약 숙소 요약 카드  */}
            <BookingSummaryCard
                title={detail.title}
                thumbnailUrl={detail.images?.[0]?.imageUrl}
                averageRating={5.0}
                reviewCount={4}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                nights={nights}
                pricePerNight={detail.pricePerNight}
                total={price?.total}
            />
            {/* 오른쪽: 3개 섹션 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <PaymentMethodSection value={paymentMethod} onChange={setPaymentMethod} />

                <HostMessageSection value={hostMessage} onChange={setHostMessage} hostName="현진" />

                <RequestConfirmSection
                    disabled={!price || !checkIn || !checkOut || guests < 1 || guests > detail.maxGuests}
                    onSubmit={() => {
                        // 4단계에서 예약 생성 API 붙이는 자리
                        alert(`예약 요청! 결제수단:${paymentMethod}, 메시지:${hostMessage}`);
                    }}
                />
            </div>
        </div>
    )



}