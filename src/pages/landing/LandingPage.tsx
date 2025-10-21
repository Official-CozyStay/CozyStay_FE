import React from "react";
import {
  Container,
  Hero,
  HeroCard,
  HeroTitle,
  HeroDesc,
  HeroImageWrap,
  HeroImage,
  SearchForm,
  Field,
  FieldLabel,
  Input,
  Select,
  Grid2,
  Submit,
  Features,
  Feature,
  FeatureIcon,
  FeatureTitle,
  FeatureDesc,
  List,
  ListTitle,
  ListDesc,
  CardGrid,
  Card,
  Badge,
  CardImg,
  CardBody,
  CardTitle,
  CardMeta,
  CardPrice,
  LearnMoreButton,
  Faq,
  FaqGrid,
  FaqHeading,
  FaqItems,
  FaqItem,
  FaqQuestion,
  FaqAnswer,
} from "../landing/landing.styles";
import {
  ShieldCheck,
  Bath,
  CalendarFold,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import heroImg from "../../assets/images/hero.png";

const faqData = [
  {
    q: "에어비앤비는 무엇이며 어떻게 이용할 수 있나요?",
    a: "원하는 도시와 날짜, 인원을 입력해 숙소를 검색하고 예약할 수 있습니다. 예약 전 숙소 규정과 취소 정책을 꼭 확인하세요.",
  },
  {
    q: "검색 필터는 어떻게 이용하나요?",
    a: "가격, 편의시설, 침대/침실 수, 즉시예약 가능 여부 등 다양한 조건으로 결과를 좁힐 수 있습니다.",
  },
  {
    q: "호스트와 직접 만나야 하나요?",
    a: "셀프 체크인이 가능한 숙소도 많습니다. 체크인 방식은 숙소 상세 페이지에서 확인할 수 있어요.",
  },
  {
    q: "리스팅이나 호스트에 문제가 있어 예약을 취소해야 할 경우에는 어떻게 하나요?",
    a: "예약 내역에서 취소를 진행할 수 있습니다. 취소 수수료와 환불 규정은 숙소의 정책에 따라 달라집니다.",
  },
  {
    q: "더 자세히 알아보고 싶으세요?",
    a: "고객센터 도움말 센터에서 더 많은 질문과 답변, 가이드를 확인하실 수 있습니다.",
  },
] as const;

const FaqItemWithState = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <FaqItem>
      <FaqQuestion
        as="button"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={open ? "open" : ""}
      >
        {q}
        {open ? <ChevronUp /> : <ChevronDown />}
      </FaqQuestion>
      {open && <FaqAnswer>{a}</FaqAnswer>}
    </FaqItem>
  );
};

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Hero>
        <HeroCard>
          <HeroTitle>
            Seocho District의 호텔과
            <br />
            숙소를 찾아보세요
          </HeroTitle>
          <HeroDesc>
            나만을 위한 숙소부터 편리한 숙박에 유용한 넉넉한 공간까지,
            에어비앤비에서 다음 여행을 계획해 보세요.
          </HeroDesc>

          <SearchForm
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: 검색폼 api 연결
              alert("api 미연결 상태");
            }}
          >
            <Field>
              <FieldLabel>행선지</FieldLabel>
              <Input
                placeholder="반포동, 대한민국"
                defaultValue="반포동, 대한민국"
              />
            </Field>

            <Grid2>
              <Field>
                <FieldLabel>체크인</FieldLabel>
                <Input type="date" />
              </Field>
              <Field>
                <FieldLabel>체크아웃</FieldLabel>
                <Input type="date" />
              </Field>
            </Grid2>

            <Grid2>
              <Field>
                <FieldLabel>성인</FieldLabel>
                <Select defaultValue="2">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Select>
              </Field>
              <Field>
                <FieldLabel>어린이</FieldLabel>
                <Select defaultValue="0">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Select>
              </Field>
            </Grid2>

            <Submit type="submit">검색하기</Submit>
          </SearchForm>
        </HeroCard>

        <HeroImageWrap>
          <HeroImage src={heroImg} alt="city" />
        </HeroImageWrap>
      </Hero>
      <Features>
        <Feature>
          <FeatureIcon>
            <ShieldCheck />
          </FeatureIcon>
          <FeatureTitle>안심하고 예약하기</FeatureTitle>
          <FeatureDesc>
            에어비앤비 고객지원 서비스가 연중무휴 제공되며, 실제 숙박한 게스트의
            후기를 통해 숙소 결정에 도움이 되는 유용한 정보를 확인하실 수
            있습니다.
          </FeatureDesc>
        </Feature>
        <Feature>
          <FeatureIcon>
            <Bath />
          </FeatureIcon>
          <FeatureTitle>편의시설을 갖춘 숙소</FeatureTitle>
          <FeatureDesc>
            편안하고 완벽한 휴가를 위해 필요한 편의시설을 갖춘 숙소를
            둘러보세요.
          </FeatureDesc>
        </Feature>
        <Feature>
          <FeatureIcon>
            <CalendarFold />
          </FeatureIcon>
          <FeatureTitle>유연한 일정 변경</FeatureTitle>
          <FeatureDesc>
            편안하고 완벽한 휴가를 위해 필요한 편의시설을 갖춘 숙소를
            둘러보세요.
          </FeatureDesc>
        </Feature>
      </Features>
      {/* TODO: API 연결 (임시데이터 1) */}
      <List>
        <ListTitle>최고의 편안함을 누릴 수 있는 공간 전체 숙소</ListTitle>
        <ListDesc>
          주방, 와이파이, 대형 욕조 등이 완비된 숙소를 찾아보세요.
        </ListDesc>
        <CardGrid>
          {["게스트 선호", "게스트 선호", "게스트 선호", "슈퍼호스트"].map(
            (badge, i) => (
              <Card key={`room-${i}`}>
                <Badge>{badge}</Badge>
                <CardImg
                  src={`https://picsum.photos/seed/room${i}/600/400`}
                  alt=""
                />
                <CardBody>
                  <CardTitle>서울 · 모던 하우스 {i + 1}</CardTitle>
                  <CardMeta>최대 4인 · 침실 2개 · 욕실 1개</CardMeta>
                  <CardPrice>₩120,000 / 박</CardPrice>
                </CardBody>
              </Card>
            )
          )}
        </CardGrid>
        <LearnMoreButton>더 알아보기</LearnMoreButton>
      </List>
      {/* TODO: API 연결 (임시데이터 2) */}
      <List>
        <ListTitle>근사한 호텔의 개인실</ListTitle>
        <ListDesc>
          모든 필수시설을 갖춘 모텔, 스위트, 부티크 호텔을 찾아보세요.
        </ListDesc>

        <CardGrid>
          {["게스트 선호", "게스트 선호", "게스트 선호", "슈퍼호스트"].map(
            (badge, i) => (
              <Card key={`hotel-${i}`}>
                <Badge>{badge}</Badge>
                <CardImg
                  src={`https://picsum.photos/seed/hotel${i}/600/400`}
                  alt=""
                />
                <CardBody>
                  <CardTitle>서울 · 부티크 호텔 {i + 1}</CardTitle>
                  <CardMeta>최대 2인 · 침실 1개 · 욕실 1개</CardMeta>
                  <CardPrice>₩150,000 / 박</CardPrice>
                </CardBody>
              </Card>
            )
          )}
        </CardGrid>
        <LearnMoreButton>더 알아보기</LearnMoreButton>
      </List>
      <Faq>
        <FaqGrid>
          <FaqHeading>자주 묻는 질문과 답변</FaqHeading>
          <FaqItems>
            {faqData.map((item) => (
              <FaqItemWithState key={item.q} q={item.q} a={item.a} />
            ))}
          </FaqItems>
        </FaqGrid>
      </Faq>
    </Container>
  );
};

export default LandingPage;
