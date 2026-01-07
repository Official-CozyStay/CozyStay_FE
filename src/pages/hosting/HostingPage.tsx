import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HostingHeader from '@/components/HostingHeader/HostingHeader';
import { getListings } from '@/utils/listingStorage';
import type { Listing } from '@/types/listing';
import {
  HostingContainer,
  TabSection,
  TabButton,
  ContentArea,
  EmptyTitle,
  EmptyDesc,
  ActionButton,
  EmptyIcon,
  ListingsSection,
  SectionHeader,
  SectionTitle,
  AddListingButton,
  ListingsGrid,
  ListingCard,
  ListingImagePlaceholder,
  ListingInfo,
  ListingTitle,
  ListingLocation,
  ListingPrice,
  ListingStatus,
} from './hosting.styles';

const HostingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today');
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    // localStorage에서 리스팅 불러오기
    const savedListings = getListings();
    setListings(savedListings);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  // 리스팅이 없을 때
  if (listings.length === 0) {
    return (
      <>
        <HostingHeader />
        <HostingContainer>
          <TabSection>
            <TabButton
              $active={activeTab === 'today'}
              onClick={() => setActiveTab('today')}
            >
              오늘
            </TabButton>
            <TabButton
              $active={activeTab === 'upcoming'}
              onClick={() => setActiveTab('upcoming')}
            >
              예정
            </TabButton>
          </TabSection>

          <ContentArea>
            <EmptyIcon>📖</EmptyIcon>
            {activeTab === 'today' ? (
              <>
                <EmptyTitle>예약이 없습니다</EmptyTitle>
                <EmptyDesc>
                  예약을 받으려면 리스팅 등록을 완료하셔야 합니다.
                </EmptyDesc>
              </>
            ) : (
              <>
                <EmptyTitle>예정된 예약이 없습니다</EmptyTitle>
                <EmptyDesc>
                  예약을 받으려면 리스팅 등록을 완료하셔야 합니다.
                </EmptyDesc>
              </>
            )}
            <ActionButton onClick={() => navigate('/hosting/become-a-host')}>
              리스팅 등록 완료하기
            </ActionButton>
          </ContentArea>
        </HostingContainer>
      </>
    );
  }

  // 리스팅이 있을 때
  return (
    <>
      <HostingHeader />
      <HostingContainer>
        <TabSection>
          <TabButton
            $active={activeTab === 'today'}
            onClick={() => setActiveTab('today')}
          >
            오늘
          </TabButton>
          <TabButton
            $active={activeTab === 'upcoming'}
            onClick={() => setActiveTab('upcoming')}
          >
            예정
          </TabButton>
        </TabSection>

        <ListingsSection>
          <SectionHeader>
            <SectionTitle>내 숙소 ({listings.length})</SectionTitle>
            <AddListingButton onClick={() => navigate('/hosting/become-a-host')}>
              + 새 숙소 등록
            </AddListingButton>
          </SectionHeader>

          <ListingsGrid>
            {listings.map((listing) => (
              <ListingCard key={listing.id}>
                <ListingImagePlaceholder>
                  🏠
                </ListingImagePlaceholder>
                <ListingInfo>
                  <ListingTitle>{listing.title}</ListingTitle>
                  <ListingLocation>
                    {listing.location.province} {listing.location.district}
                  </ListingLocation>
                  <ListingPrice>
                    ₩{formatPrice(listing.pricing.basePrice)} <span>/ 박</span>
                  </ListingPrice>
                  <ListingStatus $status={listing.status}>
                    {listing.status === 'published' ? '게시됨' : '임시저장'}
                  </ListingStatus>
                </ListingInfo>
              </ListingCard>
            ))}
          </ListingsGrid>
        </ListingsSection>
      </HostingContainer>
    </>
  );
};

export default HostingPage;

