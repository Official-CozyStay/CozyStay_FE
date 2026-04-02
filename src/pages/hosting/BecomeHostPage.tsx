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
import HostDetails from './steps/HostDetails';
import Alert from '@/components/Alert/Alert';
import type { Listing } from '@/types/listing';
import { defaultListing } from '@/types/listing';
import {
  createAccommodation,
  createAccommodationDetails,
  createAccommodationAmenities,
  publishAccommodation,
} from '@/api/accommodation';
import type {
  AccommodationTypeAPI,
  CreateAccommodationRequest,
  CreateAccommodationDetailsRequest,
  CreateAmenityRequest,
} from '@/api/types';

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
  {
    component: HostDetails,
    showProgress: true,
    nextLabel: '리스팅 만들기',
    needsData: true,
  },
];

// 스텝 인덱스 (STEPS 배열 순서와 일치)
const STEP = {
  OVERVIEW: 0,
  PHASE1_INTRO: 1,
  SPACE_TYPE: 2,
  GUEST_CAPACITY: 3,
  PHASE2_INTRO: 4,
  AMENITIES: 5,
  PHOTOS: 6,
  TITLE: 7,
  DESCRIPTION: 8,
  PHASE3_INTRO: 9,
  BOOKING_SETTINGS: 10,
  HOST_DETAILS: 11,
};

// 스텝별 필수 항목 유효성 검사
const validateStep = (step: number, data: Partial<Listing>): string | null => {
  switch (step) {
    case STEP.SPACE_TYPE:
      if (!data.spaceType) return '숙소 유형을 선택해주세요.';
      break;
    case STEP.GUEST_CAPACITY:
      if (!data.guests || data.guests < 1)
        return '최대 수용 인원을 설정해주세요.';
      break;
    case STEP.AMENITIES: {
      const amenities = data.amenities;
      const extra = data.extraAmenities || [];
      const hasAny = amenities && Object.values(amenities).some(Boolean);
      if (!hasAny && extra.length === 0)
        return '편의시설을 최소 1개 이상 선택해주세요.\n(숙소 게시에 필수 항목입니다.)';
      break;
    }
    // TODO: 사진 필수 검사 - 백엔드 S3 연동 협의 후 활성화
    // case STEP.PHOTOS:
    //   if (!data.photos || data.photos.length === 0)
    //     return '사진을 최소 1장 이상 추가해주세요.\n(숙소 게시에 필수 항목입니다.)';
    //   break;
    case STEP.TITLE:
      if (!data.title?.trim()) return '숙소 이름을 입력해주세요.';
      break;
    case STEP.HOST_DETAILS:
      if (!data.location?.streetAddress?.trim())
        return '주소를 검색하여 숙소 위치를 설정해주세요.';
      if (!data.location?.city?.trim())
        return '주소 검색을 통해 도시 정보를 입력해주세요.';
      break;
  }
  return null;
};

// 프론트 spaceType을 백엔드 API 타입으로 변환
const toAccommodationTypeAPI = (spaceType: string): AccommodationTypeAPI => {
  const mapping: Record<string, AccommodationTypeAPI> = {
    entire_place: 'ENTIRE_PLACE',
    private_room: 'PRIVATE_ROOM',
    shared_room: 'SHARED_ROOM',
  };
  return mapping[spaceType] || 'ENTIRE_PLACE';
};

const BecomeHostPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [listingData, setListingData] =
    useState<Partial<Listing>>(defaultListing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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

  const handleNext = async () => {
    const validationError = validateStep(currentStep, listingData);
    if (validationError) {
      setAlertMessage(validationError);
      return;
    }

    if (isLastStep) {
      setIsSubmitting(true);

      try {
        // 1. 숙소 생성 API 호출
        const location = listingData.location || {
          country: '한국',
          province: '',
          city: '',
          district: '',
          streetAddress: '',
          detailAddress: '',
          postalCode: '',
        };

        const accommodationRequest: CreateAccommodationRequest = {
          title: listingData.title || '새로운 숙소',
          description: listingData.description || '',
          accommodationType: toAccommodationTypeAPI(
            listingData.spaceType || '',
          ),
          address: `${location.streetAddress} ${location.detailAddress}`.trim(),
          city: location.city || location.district || '',
          state: location.province,
          country: location.country,
          postalCode: location.postalCode,
          latitude: location.latitude,
          longitude: location.longitude,
          maxGuests: listingData.guests || 1,
          pricePerNight: listingData.pricing?.basePrice || 50000,
          cleaningFee: listingData.pricing?.cleaningFee || 0,
          serviceFeePercentage: 5.0,
          instantBooking: listingData.bookingSettings === 'instant',
          checkInTime: listingData.checkInTime || '15:00:00',
          checkOutTime: listingData.checkOutTime || '11:00:00',
        };

        const accommodationResponse =
          await createAccommodation(accommodationRequest);
        const accommodationId = accommodationResponse.accommodationId;

        // 2. 숙소 상세정보 등록 API 호출
        const appliances = listingData.appliances || {
          airConditioner: 1,
          hairDryer: 1,
          refrigerator: 1,
          television: 1,
          washer: 1,
          dryer: 0,
        };
        const amenities = listingData.amenities || {
          wifi: false,
          parking: false,
          pet: false,
          kitchen: false,
        };

        const detailsRequest: CreateAccommodationDetailsRequest = {
          roomCount: listingData.rooms || 1,
          bedroomCount: listingData.bedrooms || 1,
          bedCount: listingData.beds || 1,
          bathroomCount: listingData.bathrooms || 1,
          airConditionerCount: appliances.airConditioner,
          hairDryerCount: appliances.hairDryer,
          refrigeratorCount: appliances.refrigerator,
          televisionCount: appliances.television,
          washerCount: appliances.washer,
          dryerCount: appliances.dryer,
          wifiAvailable: amenities.wifi,
          parkingAvailable: amenities.parking,
          petAvailable: amenities.pet,
          kitchenAvailable: amenities.kitchen,
        };

        await createAccommodationDetails(accommodationId, detailsRequest);

        // 3. 추가 편의시설이 있으면 등록
        const extraAmenities = listingData.extraAmenities || [];
        if (extraAmenities.length > 0) {
          const amenitiesRequest: CreateAmenityRequest[] = extraAmenities.map(
            (name) => ({
              name,
              icon: name.toLowerCase().replace(/\s+/g, '_'),
              category: 'EXTRA',
            }),
          );
          await createAccommodationAmenities(accommodationId, amenitiesRequest);
        }

        // 4. 이미지 업로드는 S3 연동 후 구현 예정
        // const photos = listingData.photos || [];
        // if (photos.length > 0) { ... }

        // 5. 숙소 발행
        await publishAccommodation(accommodationId);

        // 성공 시 메인 페이지로 이동
        navigate('/');
      } catch (error) {
        console.error('숙소 등록 실패:', error);
        setAlertMessage('숙소 등록에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
      }
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
    <>
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      <HostingRegistrationLayout
        currentStep={currentProgressStep}
        totalSteps={totalProgressSteps}
        onNext={handleNext}
        onBack={handleBack}
        backDisabled={currentStep === 0}
        nextDisabled={isSubmitting}
        nextLabel={
          isSubmitting ? '등록 중...' : (stepConfig.nextLabel ?? '다음')
        }
        showProgressBar={stepConfig.showProgress}
      >
        {renderStep()}
      </HostingRegistrationLayout>
    </>
  );
};

export default BecomeHostPage;
