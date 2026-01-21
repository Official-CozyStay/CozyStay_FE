import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HostingRegistrationLayout from '@/layouts/HostingRegistrationLayout/HostingRegistrationLayout';
import Overview from './steps/Overview';
import Phase1Intro from './steps/Phase1Intro';
import CategorySelect from './steps/CategorySelect';
import SpaceType from './steps/SpaceType';
import Location from './steps/Location';
import GuestCapacity from './steps/GuestCapacity';
import Bathrooms from './steps/Bathrooms';
import Occupants from './steps/Occupants';
import Phase2Intro from './steps/Phase2Intro';
import Amenities from './steps/Amenities';
import Photos from './steps/Photos';
import TitleStep from './steps/Title';
import Description from './steps/Description';
import Phase3Intro from './steps/Phase3Intro';
import BookingSettings from './steps/BookingSettings';
import GuestRequirements from './steps/GuestRequirements';
import Pricing from './steps/Pricing';
import WeekendPricing from './steps/WeekendPricing';
import Discounts from './steps/Discounts';
import SafetyInfo from './steps/SafetyInfo';
import HostDetails from './steps/HostDetails';
import { saveListing, generateId } from '@/utils/listingStorage';
import type { Listing } from '@/types/listing';
import { defaultListing } from '@/types/listing';

// 스텝 props 타입
export interface StepProps {
  data: Partial<Listing>;
  onDataChange: (newData: Partial<Listing>) => void;
}

// 스텝 설정 배열 - 순서 변경, 추가/삭제가 쉬움
const STEPS = [
  // Phase 0: 시작
  { component: Overview, showProgress: false, nextLabel: '시작하기', needsData: false },
  
  // Phase 1: 숙소 정보
  { component: Phase1Intro, showProgress: true, needsData: false },
  { component: CategorySelect, showProgress: true, needsData: true },
  { component: SpaceType, showProgress: true, needsData: true },
  { component: Location, showProgress: true, needsData: true },
  { component: GuestCapacity, showProgress: true, needsData: true },
  { component: Bathrooms, showProgress: true, needsData: true },
  { component: Occupants, showProgress: true, needsData: true },
  
  // Phase 2: 매력 어필
  { component: Phase2Intro, showProgress: true, needsData: false },
  { component: Amenities, showProgress: true, needsData: true },
  { component: Photos, showProgress: true, needsData: true },
  { component: TitleStep, showProgress: true, needsData: true },
  { component: Description, showProgress: true, needsData: true },
  
  // Phase 3: 마무리
  { component: Phase3Intro, showProgress: true, needsData: false },
  { component: BookingSettings, showProgress: true, needsData: true },
  { component: GuestRequirements, showProgress: true, needsData: true },
  { component: Pricing, showProgress: true, needsData: true },
  { component: WeekendPricing, showProgress: true, needsData: true },
  { component: Discounts, showProgress: true, needsData: true },
  { component: SafetyInfo, showProgress: true, needsData: true },
  { component: HostDetails, showProgress: true, nextLabel: '리스팅 만들기', needsData: true },
] as const;

const BecomeHostPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [listingData, setListingData] = useState<Partial<Listing>>(defaultListing);
  
  const totalSteps = STEPS.length - 1; // 인덱스 기준
  const stepConfig = STEPS[currentStep];
  const StepComponent = stepConfig.component;
  const isLastStep = currentStep === totalSteps;

  const handleDataChange = (newData: Partial<Listing>) => {
    setListingData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // 마지막 스텝: 실제 입력된 데이터를 취합하여 저장
      const finalListing: Listing = {
        id: generateId(),
        title: listingData.title || '새로운 숙소',
        description: listingData.description || '',
        category: listingData.category || '',
        spaceType: listingData.spaceType || '',
        location: listingData.location || {
          country: '한국',
          province: '',
          city: '',
          district: '',
          streetAddress: '',
          detailAddress: '',
          postalCode: '',
        },
        guests: listingData.guests || 1,
        bedrooms: listingData.bedrooms || 1,
        beds: listingData.beds || 1,
        bathrooms: listingData.bathrooms || 1,
        amenities: listingData.amenities || [],
        photos: listingData.photos || [],
        pricing: listingData.pricing || {
          basePrice: 50000,
          weekendPremium: 0,
        },
        discounts: listingData.discounts || {
          newListing: false,
          weekly: false,
          monthly: false,
        },
        bookingSettings: listingData.bookingSettings || 'review',
        guestRequirements: listingData.guestRequirements || 'experienced',
        safetyInfo: listingData.safetyInfo || {},
        isBusiness: listingData.isBusiness || false,
        createdAt: new Date().toISOString(),
        status: 'published',
      };
      
      saveListing(finalListing);
      navigate('/hosting');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <HostingRegistrationLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onBack={handleBack}
      backDisabled={currentStep === 0}
      nextLabel={stepConfig.nextLabel ?? '다음'}
      showProgressBar={stepConfig.showProgress}
    >
      {stepConfig.needsData ? (
        <StepComponent data={listingData} onDataChange={handleDataChange} />
      ) : (
        <StepComponent />
      )}
    </HostingRegistrationLayout>
  );
};

export default BecomeHostPage;
