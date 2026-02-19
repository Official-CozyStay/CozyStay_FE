import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  PageHeader,
  Logo,
  LogoText,
  HeaderLeft,
  HeaderRight,
  HostingButton,
  ProfileIconButton,
  MenuButton,
  ContentWrapper,
  ProfileImageSection,
  AvatarWrapper,
  AvatarCircle,
  AddPhotoButton,
  MainContent,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  LearnMoreLink,
  ProfileGrid,
  ProfileItem,
  ProfileItemText,
  IntroBox,
  IntroPlaceholder,
  IntroAddLink,
  Divider,
  TravelHeader,
  ToggleSwitch,
  TravelStamps,
  StampCard,
  StampIcon,
  StampLabel,
  EditStampsButton,
  InterestTags,
  AddInterestButton,
  SelectedInterestTag,
  AddInterestTextButton,
  Footer,
  CompleteButton,
} from "./profileEdit.styles";
import {
  Menu,
  Camera,
  Briefcase,
  MapPin,
  Lightbulb,
  PawPrint,
  Calendar,
  GraduationCap,
  Sparkles,
  Music,
  Clock,
  BookOpen,
  Heart,
  Globe,
  Plus,
  Sun,
  Plane,
  Luggage,
} from "lucide-react";
import logo from "@/assets/images/logo.svg";
import { InterestModal } from "@/components/InterestModal";
import { TextInputModal } from "@/components/TextInputModal";
import { BirthYearModal } from "@/components/BirthYearModal";
import { LanguageModal } from "@/components/LanguageModal";
import { ResidenceModal } from "@/components/ResidenceModal";

// 프로필 항목 타입 정의
type ProfileItemId =
  | "job"
  | "dreamDestination"
  | "funFact"
  | "pets"
  | "birthYear"
  | "school"
  | "uselessTalent"
  | "highSchoolSong"
  | "hobby"
  | "biographyTitle"
  | "favorites"
  | "languages"
  | "residence";

// 텍스트 입력 모달용 항목 (languages, residence, birthYear 제외)
type TextInputProfileItemId = Exclude<ProfileItemId, "languages" | "residence" | "birthYear">;

// 프로필 항목별 모달 설정 데이터 (텍스트 입력용)
interface ProfileModalConfig {
  title: string;
  description: string;
  placeholder: string;
  maxLength: number;
}

const PROFILE_MODAL_CONFIG: Record<TextInputProfileItemId, ProfileModalConfig> = {
  job: {
    title: "어떤 일을 하시나요?",
    description:
      "어떤 직업을 가지고 계신지 알려주세요. 직업이 따로 없다면, 인생에서 추구하는 목표를 알려주셔도 좋습니다. 예: 간호사, 아이 4명을 키우는 부모, 은퇴한 서퍼.",
    placeholder: "직업:",
    maxLength: 20,
  },
  dreamDestination: {
    title: "언젠가 꼭 여행해 보고 싶은 장소는 어디인가요?",
    description:
      "버킷리스트에 포함된 장소나 가까운 시일 내에 가보고 싶은 여행지가 있다면 알려주세요.",
    placeholder: "꼭 여행해 보고 싶은 장소:",
    maxLength: 40,
  },
  funFact: {
    title: "본인에 관한 흥미로운 사실이 있나요?",
    description:
      '겉으로만 봐서는 쉽게 짐작할 수 없는 나만의 특별한 점이나 재미난 경험을 공유해 주세요. 예: "뮤직비디오에 출연한 적이 있어요."/"저글링을 할 수 있어요."',
    placeholder: "나에 관한 흥미로운 사실:",
    maxLength: 40,
  },
  pets: {
    title: "반려동물과 함께 지내시나요?",
    description:
      "반려동물을 키우신다면 이름을 알려주세요. 예: 치즈 태비 고양이 '노랑이'/빠른 거북이 '레오'",
    placeholder: "반려동물:",
    maxLength: 40,
  },
  school: {
    title: "어느 학교를 다니셨나요?",
    description: "홈스쿨링, 고등학교, 직업학교 등 출신 학교를 소개해 주세요.",
    placeholder: "출신 학교:",
    maxLength: 40,
  },
  uselessTalent: {
    title: "내가 가진 여러 재능 중 가장 쓸모없는 것은 무엇인가요?",
    description:
      '딱히 쓸 데는 없지만 정말 잘하는 일이 있다면 알려주세요. 예: "한 손으로 카드를 섞을 수 있어요."',
    placeholder: "내가 가진 쓸모없는 재능:",
    maxLength: 40,
  },
  highSchoolSong: {
    title: "고등학생일 때 가장 좋아했던 노래는 무엇인가요?",
    description:
      "10대 시절이라 부끄러울 수도 있지만, 그래도 그 당시 즐겨 들었던 음악을 알려주세요.",
    placeholder: "고등학생일 때 가장 좋아했던 노래:",
    maxLength: 40,
  },
  hobby: {
    title: "어떤 일에 많은 시간을 할애하고 계신가요?",
    description:
      '자유 시간이 있으면 주로 어떤 활동이나 취미를 즐기시는지 알려주세요. 예: "고양이 동영상 보기"/"체스 게임"',
    placeholder: "취미:",
    maxLength: 40,
  },
  biographyTitle: {
    title: "자서전을 쓴다면 제목을 어떻게 지으시겠어요?",
    description:
      "내 삶을 다룬 일대기가 있다면, 어떤 제목이 어울릴까요? 예: '타고난 방랑자' 또는 '반려동물 엄마의 연대기'",
    placeholder: "자서전 제목:",
    maxLength: 40,
  },
  favorites: {
    title: "가장 좋아하는 것은 무엇인가요?",
    description:
      "아무리 해도 질리지 않을 정도로 내 마음을 사로잡는 것이 있다면 알려주세요. 예: 매운 떡볶이 먹기",
    placeholder: "좋아하는 것:",
    maxLength: 40,
  },
};

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showTravelStamps, setShowTravelStamps] = useState(false);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [activeProfileModal, setActiveProfileModal] = useState<TextInputProfileItemId | null>(null);
  const [isBirthYearModalOpen, setIsBirthYearModalOpen] = useState(false);
  const [showBirthDecade, setShowBirthDecade] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isResidenceModalOpen, setIsResidenceModalOpen] = useState(false);
  const [residence, setResidence] = useState("");
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [introduction, setIntroduction] = useState("");

  // 프로필 항목별 값 상태 (나중에 API 연동 시 대체)
  const [profileValues, setProfileValues] = useState<Record<TextInputProfileItemId, string>>({
    job: "",
    dreamDestination: "",
    funFact: "",
    pets: "",
    school: "",
    uselessTalent: "",
    highSchoolSong: "",
    hobby: "",
    biographyTitle: "",
    favorites: "",
  });

  // 임시 사용자 데이터
  const user = {
    name: "예은",
    initial: "예",
  };

  // 관심사 라벨 매핑 (나중에 API 연동 시 대체)
  const interestLabels: Record<string, string> = {
    food: "맛집",
    photography: "사진 촬영",
    shopping: "쇼핑",
    outdoor: "야외활동",
    liveMusic: "라이브 음악",
    museum: "박물관",
    cooking: "요리",
    animals: "동물",
    culture: "문화 체험",
    coffee: "커피",
    walking: "걷기",
    movies: "영화",
    reading: "독서",
    art: "예술",
    history: "역사",
    wine: "와인",
    karate: "가라데",
    architecture: "건축",
    horseRacing: "경마",
    golf: "골프",
    cycling: "자전거",
  };

  // 프로필 항목 데이터 (id 추가)
  const profileItems: { id: ProfileItemId; icon: React.ElementType; label: string }[] = [
    { id: "job", icon: Briefcase, label: "직업" },
    { id: "dreamDestination", icon: MapPin, label: "꼭 여행해 보고 싶은 장소" },
    { id: "funFact", icon: Lightbulb, label: "나에 관한 흥미로운 사실" },
    { id: "pets", icon: PawPrint, label: "반려동물" },
    { id: "birthYear", icon: Calendar, label: "출생 연도" },
    { id: "school", icon: GraduationCap, label: "출신 학교" },
    { id: "uselessTalent", icon: Sparkles, label: "내가 가진 쓸모없는 재능" },
    { id: "highSchoolSong", icon: Music, label: "고등학생일 때 가장 좋아했던 노래" },
    { id: "hobby", icon: Clock, label: "취미" },
    { id: "biographyTitle", icon: BookOpen, label: "자서전 제목" },
    { id: "favorites", icon: Heart, label: "좋아하는 것" },
    { id: "languages", icon: Globe, label: "구사 언어" },
    { id: "residence", icon: Globe, label: "거주지" },
  ];

  // 프로필 항목 클릭 핸들러
  const handleProfileItemClick = (id: ProfileItemId) => {
    if (id === "birthYear") {
      setIsBirthYearModalOpen(true);
    } else if (id === "languages") {
      setIsLanguageModalOpen(true);
    } else if (id === "residence") {
      setIsResidenceModalOpen(true);
    } else {
      setActiveProfileModal(id);
    }
  };

  // 프로필 항목 저장 핸들러
  const handleProfileValueSave = (id: TextInputProfileItemId, value: string) => {
    setProfileValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 여행 스탬프 데이터
  const travelStamps = [
    { icon: Globe, label: "다음 여행지", shape: "square" as const },
    { icon: Sun, label: "다음 여행지", shape: "rounded" as const },
    { icon: Plane, label: "다음 여행지", shape: "hexagon" as const },
    { icon: Luggage, label: "다음 여행지", shape: "circle" as const },
  ];

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleHostingClick = () => {
    navigate("/hosting");
  };

  const handleComplete = () => {
    navigate("/profile");
  };

  // 이미지 업로드 버튼 클릭 핸들러
  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 파일인지 확인
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하만 가능합니다.");
        return;
      }

      // 미리보기 URL 생성
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <HeaderLeft onClick={handleLogoClick}>
          <Logo src={logo} alt="CozyStay Logo" />
          <LogoText>CozyStay</LogoText>
        </HeaderLeft>

        <HeaderRight>
          <HostingButton onClick={handleHostingClick}>호스팅 하기</HostingButton>
          <ProfileIconButton>{user.initial}</ProfileIconButton>
          <MenuButton>
            <Menu size={18} />
          </MenuButton>
        </HeaderRight>
      </PageHeader>

      <ContentWrapper>
        {/* 왼쪽: 프로필 이미지 */}
        <ProfileImageSection>
          <AvatarWrapper>
            <AvatarCircle $size="lg">
              {profileImage ? (
                <img src={profileImage} alt="프로필 이미지" />
              ) : (
                user.initial
              )}
            </AvatarCircle>
            <AddPhotoButton onClick={handleAddPhotoClick}>
              <Camera size={16} />
              {profileImage ? "변경" : "추가"}
            </AddPhotoButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </AvatarWrapper>
        </ProfileImageSection>

        {/* 오른쪽: 메인 콘텐츠 */}
        <MainContent>
          {/* 프로필 섹션 */}
          <Section>
            <SectionHeader>
              <SectionTitle>프로필</SectionTitle>
              <SectionDescription>
                커뮤니티 신뢰 구축을 위해 프로필 정보가 호스트와 게스트에게 공개되며,
                CozyStay 플랫폼 전반에도 프로필이 표시될 수 있습니다.{" "}
                <LearnMoreLink>자세히 알아보기</LearnMoreLink>
              </SectionDescription>
            </SectionHeader>

            <ProfileGrid>
              {profileItems.map((item) => {
                const Icon = item.icon;
                
                // 항목별 표시 텍스트 결정
                let displayText = item.label;
                
                if (item.id === "birthYear") {
                  displayText = showBirthDecade ? "00년대생" : item.label;
                } else if (item.id === "languages") {
                  displayText = selectedLanguages.length > 0
                    ? selectedLanguages.join(", ")
                    : item.label;
                } else if (item.id === "residence") {
                  displayText = residence || item.label;
                } else {
                  const value = profileValues[item.id as TextInputProfileItemId];
                  displayText = value || item.label;
                }
                
                return (
                  <ProfileItem
                    key={item.id}
                    onClick={() => handleProfileItemClick(item.id)}
                  >
                    <Icon size={20} />
                    <ProfileItemText>
                      {displayText}
                    </ProfileItemText>
                  </ProfileItem>
                );
              })}
            </ProfileGrid>
          </Section>

          <Divider />

          {/* 자기소개 섹션 */}
          <Section>
            <SectionHeader>
              <SectionTitle>자기소개</SectionTitle>
            </SectionHeader>

            <IntroBox onClick={() => setIsIntroModalOpen(true)} style={{ cursor: "pointer" }}>
              {introduction ? (
                <IntroPlaceholder style={{ color: "inherit" }}>{introduction}</IntroPlaceholder>
              ) : (
                <>
                  <IntroPlaceholder>재치를 발휘해 작성해 보세요.</IntroPlaceholder>
                  <IntroAddLink>자기소개 추가</IntroAddLink>
                </>
              )}
            </IntroBox>
          </Section>

          <Divider />

          {/* 지금까지 가본 여행지 섹션 */}
          <Section>
            <TravelHeader>
              <SectionHeader>
                <SectionTitle>지금까지 가본 여행지</SectionTitle>
                <SectionDescription>
                  프로필에서 다른 사람에게 표시할 스탬프를 선택하세요.
                </SectionDescription>
              </SectionHeader>
              <ToggleSwitch
                $active={showTravelStamps}
                onClick={() => setShowTravelStamps(!showTravelStamps)}
              />
            </TravelHeader>

            <TravelStamps>
              {travelStamps.map((stamp, index) => {
                const Icon = stamp.icon;
                return (
                  <StampCard key={index}>
                    <StampIcon $shape={stamp.shape}>
                      <Icon size={32} />
                    </StampIcon>
                    <StampLabel>{stamp.label}</StampLabel>
                  </StampCard>
                );
              })}
            </TravelStamps>

            <EditStampsButton>여행 스탬프 수정</EditStampsButton>
          </Section>

          <Divider />

          {/* 관심사 섹션 */}
          <Section>
            <SectionHeader>
              <SectionTitle>관심사</SectionTitle>
              <SectionDescription>
                프로필에 관심 분야를 추가하여 다른 게스트 및 호스트와의 공통점을
                찾아보세요.
              </SectionDescription>
            </SectionHeader>

            <InterestTags>
              {selectedInterests.map((interestId) => (
                <SelectedInterestTag key={interestId}>
                  {interestLabels[interestId] || interestId}
                </SelectedInterestTag>
              ))}
              <AddInterestButton onClick={() => setIsInterestModalOpen(true)}>
                <Plus size={24} />
              </AddInterestButton>
              {selectedInterests.length < 2 && (
                <AddInterestButton onClick={() => setIsInterestModalOpen(true)}>
                  <Plus size={24} />
                </AddInterestButton>
              )}
              {selectedInterests.length < 1 && (
                <AddInterestButton onClick={() => setIsInterestModalOpen(true)}>
                  <Plus size={24} />
                </AddInterestButton>
              )}
            </InterestTags>

            <AddInterestTextButton onClick={() => setIsInterestModalOpen(true)}>
              관심 분야 추가하기
            </AddInterestTextButton>
          </Section>
        </MainContent>
      </ContentWrapper>

      {/* 하단 완료 버튼 */}
      <Footer>
        <CompleteButton onClick={handleComplete}>완료</CompleteButton>
      </Footer>

      {/* 관심사 모달 */}
      <InterestModal
        isOpen={isInterestModalOpen}
        onClose={() => setIsInterestModalOpen(false)}
        selectedInterests={selectedInterests}
        onSave={setSelectedInterests}
      />

      {/* 프로필 항목 텍스트 입력 모달 */}
      {activeProfileModal && (
        <TextInputModal
          isOpen={!!activeProfileModal}
          onClose={() => setActiveProfileModal(null)}
          title={PROFILE_MODAL_CONFIG[activeProfileModal].title}
          description={PROFILE_MODAL_CONFIG[activeProfileModal].description}
          placeholder={PROFILE_MODAL_CONFIG[activeProfileModal].placeholder}
          maxLength={PROFILE_MODAL_CONFIG[activeProfileModal].maxLength}
          value={profileValues[activeProfileModal]}
          onSave={(value) => handleProfileValueSave(activeProfileModal, value)}
        />
      )}

      {/* 출생 연도 모달 */}
      <BirthYearModal
        isOpen={isBirthYearModalOpen}
        onClose={() => setIsBirthYearModalOpen(false)}
        showBirthDecade={showBirthDecade}
        onSave={setShowBirthDecade}
      />

      {/* 구사 언어 모달 */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        selectedLanguages={selectedLanguages}
        onSave={setSelectedLanguages}
      />

      {/* 거주지 모달 */}
      <ResidenceModal
        isOpen={isResidenceModalOpen}
        onClose={() => setIsResidenceModalOpen(false)}
        selectedResidence={residence}
        onSave={setResidence}
      />

      {/* 자기소개 모달 */}
      <TextInputModal
        isOpen={isIntroModalOpen}
        onClose={() => setIsIntroModalOpen(false)}
        title="호스트 소개"
        description="호스트 또는 게스트가 회원님에 대해 알 수 있도록 간략하게 자기소개를 해주세요."
        maxLength={500}
        value={introduction}
        onSave={setIntroduction}
        multiline
        titleUnderline
      />
    </PageContainer>
  );
};

export default ProfileEditPage;

