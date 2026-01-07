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
import { Listing } from '@/types/listing';

// 스텝 설정 배열 - 순서 변경, 추가/삭제가 쉬움
const STEPS = [
  // Phase 0: 시작
  { component: Overview, showProgress: false, nextLabel: '시작하기' },
  
  // Phase 1: 숙소 정보
  { component: Phase1Intro, showProgress: true },
  { component: CategorySelect, showProgress: true },
  { component: SpaceType, showProgress: true },
  { component: Location, showProgress: true },
  { component: GuestCapacity, showProgress: true },
  { component: Bathrooms, showProgress: true },
  { component: Occupants, showProgress: true },
  
  // Phase 2: 매력 어필
  { component: Phase2Intro, showProgress: true },
  { component: Amenities, showProgress: true },
  { component: Photos, showProgress: true },
  { component: TitleStep, showProgress: true },
  { component: Description, showProgress: true },
  
  // Phase 3: 마무리
  { component: Phase3Intro, showProgress: true },
  { component: BookingSettings, showProgress: true },
  { component: GuestRequirements, showProgress: true },
  { component: Pricing, showProgress: true },
  { component: WeekendPricing, showProgress: true },
  { component: Discounts, showProgress: true },
  { component: SafetyInfo, showProgress: true },
  { component: HostDetails, showProgress: true, nextLabel: '리스팅 만들기' },
] as const;

const BecomeHostPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const totalSteps = STEPS.length - 1; // 인덱스 기준
  const stepConfig = STEPS[currentStep];
  const StepComponent = stepConfig.component;
  const isLastStep = currentStep === totalSteps;

  const handleNext = () => {
    if (isLastStep) {
      // 마지막 스텝: 리스팅 저장 후 호스팅 페이지로 이동
      const newListing: Listing = {
        id: generateId(),
        title: '나의 새로운 숙소',
        description: '편안하고 아늑한 공간입니다.',
        category: '아파트',
        spaceType: '공간 전체',
        location: {
          country: '한국',
          province: '서울특별시',
          city: '',
          district: '강남구',
          streetAddress: '테헤란로 123',
          detailAddress: '',
          postalCode: '06234',
        },
        guests: 4,
        bedrooms: 2,
        beds: 2,
        bathrooms: 1,
        amenities: ['와이파이', '에어컨', '주방'],
        photos: [],
        pricing: {
          basePrice: 80000,
          weekendPremium: 20,
        },
        discounts: {
          newListing: true,
          weekly: false,
          monthly: false,
        },
        bookingSettings: 'review',
        guestRequirements: 'experienced',
        safetyInfo: {},
        isBusiness: false,
        createdAt: new Date().toISOString(),
        status: 'published',
      };
      
      saveListing(newListing);
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
      <StepComponent />
    </HostingRegistrationLayout>
  );
};

export default BecomeHostPage;
