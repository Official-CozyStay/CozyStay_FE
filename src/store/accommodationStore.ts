import { create } from "zustand";
import { fetchAccommodationDetail } from "../api/accommodation.ts";
import type { AccommodationDetailDTO } from "../api/types";

type State = {
    detail?: AccommodationDetailDTO;
    loading?: boolean;
    error?: string;

    checkIn?: string; // 'YYYY-MM-DD'
    checkOut?: string; //'YYYY-MM-DD'
    guests: number;
};

type Actions = {
    load: (id: string) => Promise<void>;
    setDates: (checkIn?: string, checkOut?: string) => void;
    setGuests: (n: number) => void;
    reset: () => void;
};

export const useAccommodationStore = create<State & Actions>((set)=>({
    detail: undefined, // 선택된 숙소의 모든 정보
    loading: false, // 정보를 가져오는 중인지 표시
    error: undefined, // 가져오다가 문제가 생겼는지 표시

    checkIn: undefined,
    checkOut: undefined,
    guests: 1,

    // 서버(목업)에서 상세 불러오기
    load: async(id: string) => {
        set({loading: true, error: undefined});
        try {
            const data = await fetchAccommodationDetail(id);
            set({ detail: data, loading: false });
        }
        catch(e: unknown){
            let message = "불러오기 실패";
            if(e instanceof Error) message = e.message;
            set({error: message});
        }
        finally{
            set({loading: false});
        }
    },

    setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
    setGuests: (n) => set({guests: n}),
    reset: () =>
        set({
            detail: undefined,
            loading: false,
            error: undefined,
            checkIn: undefined,
            checkOut: undefined,
            guests: 1,
        }),
}));