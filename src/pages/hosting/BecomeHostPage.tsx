import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HostingRegistrationLayout from '@/layouts/HostingRegistrationLayout/HostingRegistrationLayout';
import Overview from './steps/Overview';
import Phase1Intro from './steps/Phase1Intro';
import SpaceType from './steps/SpaceType';
import GuestCapacity from './steps/GuestCapacity';
import Phase2Intro from './steps/Phase2Intro';
import Amenities from './steps/Amenities';
import Photos from './steps/Photos';
import TitleStep from './steps/Title';
import Description from './steps/Description';
import Phase3Intro from './steps/Phase3Intro';
import BookingSettings from './steps/BookingSettings';
import Pricing from './steps/Pricing';
import HostDetails from './steps/HostDetails';
import { saveListing, generateId } from '@/utils/listingStorage';
import type { Listing } from '@/types/listing';
import { defaultListing } from '@/types/listing';

// 스텝 props 타입
export interface StepProps {
  data: Partial<Listing>;
  onDataChange: (newData: Partial<Listing>) => void;
}

interface StepConfig {
  component: React.ComponentType<StepProps> | React.ComponentType;
  showProgress: boolean;
  nextLabel?: string;
  needsData: boolean;
}

// 스텝 설정 배열 - 백엔드 API에 맞게 정리
const STEPS: StepConfig[] = [
  // Phase 0: 시작
  {
    component: Overview,
    showProgress: false,
    nextLabel: '시작하기',
    needsData: false,
  },

  // Phase 1: 숙소 기본 정보
  { component: Phase1Intro, showProgress: true, needsData: false },
  { component: SpaceType, showProgress: true, needsData: true },
  { component: GuestCapacity, showProgress: true, needsData: true },

  // Phase 2: 편의시설 & 사진
  { component: Phase2Intro, showProgress: true, needsData: false },
  { component: Amenities, showProgress: true, needsData: true },
  { component: Photos, showProgress: true, needsData: true },
  { component: TitleStep, showProgress: true, needsData: true },
  { component: Description, showProgress: true, needsData: true },

  // Phase 3: 가격 & 마무리
  { component: Phase3Intro, showProgress: true, needsData: false },
  { component: BookingSettings, showProgress: true, needsData: true },
  { component: Pricing, showProgress: true, needsData: true },
  {
    component: HostDetails,
    showProgress: true,
    nextLabel: '리스팅 만들기',
    needsData: true,
  },
];

const BecomeHostPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [listingData, setListingData] =
    useState<Partial<Listing>>(defaultListing);

  const stepConfig = STEPS[currentStep];
  const StepComponent = stepConfig.component;
  const isLastStep = currentStep === STEPS.length - 1;

  // 프로그레스 바에 표시될 스텝만 필터링하여 계산
  const totalProgressSteps = STEPS.filter((step) => step.showProgress).length;
  const currentProgressStep = STEPS.slice(0, currentStep + 1).filter(
    (step) => step.showProgress,
  ).length;

  const handleDataChange = (newData: Partial<Listing>) => {
    setListingData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // 마지막 스텝: 실제 입력된 데이터를 취합하여 저장
      const finalListing: Listing = {
        id: generateId(),
        title: listingData.title || '새로운 숙소',
        description: listingData.description || '',
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
        rooms: listingData.rooms || 1,
        bedrooms: listingData.bedrooms || 1,
        beds: listingData.beds || 1,
        bathrooms: listingData.bathrooms || 1,
        appliances: listingData.appliances || {
          airConditioner: 1,
          hairDryer: 1,
          refrigerator: 1,
          television: 1,
          washer: 1,
          dryer: 0,
        },
        amenities: listingData.amenities || {
          wifi: false,
          parking: false,
          pet: false,
          kitchen: false,
        },
        extraAmenities: listingData.extraAmenities || [],
        photos: listingData.photos || [],
        pricing: listingData.pricing || {
          basePrice: 50000,
        },
        bookingSettings: listingData.bookingSettings || 'review',
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

  const renderStep = () => {
    const Component = StepComponent as React.ComponentType<StepProps>;
    if (stepConfig.needsData) {
      return <Component data={listingData} onDataChange={handleDataChange} />;
    }
    const SimpleComponent = StepComponent as React.ComponentType;
    return <SimpleComponent />;
  };

  return (
    <HostingRegistrationLayout
      currentStep={currentProgressStep}
      totalSteps={totalProgressSteps}
      onNext={handleNext}
      onBack={handleBack}
      backDisabled={currentStep === 0}
      nextLabel={stepConfig.nextLabel ?? '다음'}
      showProgressBar={stepConfig.showProgress}
    >
      {renderStep()}
    </HostingRegistrationLayout>
  );
};

export default BecomeHostPage;
