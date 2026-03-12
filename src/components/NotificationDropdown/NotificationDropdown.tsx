import { useRef, useEffect, useState } from "react";
import { getMyInvitations, acceptInvitation, declineInvitation, type MyInvitationResponse } from "@/api/booking";
import {
    DropdownContainer,
    DropdownHeader,
    NotificationList,
    NotificationItem,
    NotificationText,
    NotificationTime,
    ButtonGroup,
    AcceptButton,
    DeclineButton,
    EmptyState,
} from "./NotificationDropdown.styles";

type NotificationDropdownProps = {
    onClose: () => void;
    buttonRef?: React.RefObject<HTMLButtonElement | null>;
};

const NotificationDropdown = ({ onClose, buttonRef }: NotificationDropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [notifications, setNotifications] = useState<MyInvitationResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                setLoading(true);
                const data = await getMyInvitations("PENDING");
                setNotifications(data.content || []);
            } catch (err) {
                console.error("Failed to fetch invitations:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInvitations();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isClickInsideDropdown = dropdownRef.current?.contains(target);
            const isClickOnButton = buttonRef?.current?.contains(target);

            if (!isClickInsideDropdown && !isClickOnButton) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose, buttonRef]);

    const handleAccept = async (bookingGuestId: number) => {
        try {
            await acceptInvitation(bookingGuestId);
            alert("초대를 수락했습니다!");
            setNotifications(prev => prev.filter(n => n.bookingGuestId !== bookingGuestId));
        } catch (error) {
            console.error(error);
            alert("수락 처리 중 오류가 발생했습니다.");
        }
    };

    const handleDecline = async (bookingGuestId: number) => {
        try {
            await declineInvitation(bookingGuestId);
            alert("초대를 거절했습니다.");
            setNotifications(prev => prev.filter(n => n.bookingGuestId !== bookingGuestId));
        } catch (error) {
            console.error(error);
            alert("거절 처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <DropdownContainer ref={dropdownRef}>
            <DropdownHeader>알림</DropdownHeader>

            {loading ? (
                <EmptyState>로딩 중...</EmptyState>
            ) : notifications.length === 0 ? (
                <EmptyState>새로운 알림이 없습니다.</EmptyState>
            ) : (
                <NotificationList>
                    {notifications.map((noti) => (
                        <NotificationItem key={noti.bookingGuestId}>
                            <NotificationText>
                                예약 일정 (<strong>{noti.checkInDate}</strong> ~ <strong>{noti.checkOutDate}</strong>)에 동반 게스트로 초대되었습니다.
                            </NotificationText>
                            <NotificationTime>{new Date(noti.invitedAt).toLocaleString()}</NotificationTime>
                            <ButtonGroup>
                                <AcceptButton onClick={() => handleAccept(noti.bookingGuestId)}>
                                    수락
                                </AcceptButton>
                                <DeclineButton onClick={() => handleDecline(noti.bookingGuestId)}>
                                    거절
                                </DeclineButton>
                            </ButtonGroup>
                        </NotificationItem>
                    ))}
                </NotificationList>
            )}
        </DropdownContainer>
    );
};

export default NotificationDropdown;
