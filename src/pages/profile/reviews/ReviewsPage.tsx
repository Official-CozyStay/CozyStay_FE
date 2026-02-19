import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleHeader from "@/components/SimpleHeader";
import {
  PageContainer,
  ContentWrapper,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbCurrent,
  PageTitle,
  TabContainer,
  Tab,
  SectionTitle,
  SectionDescription,
  Divider,
} from "./reviews.styles";

type TabKey = "about-me" | "by-me";

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("by-me");

  return (
    <PageContainer>
      <SimpleHeader />

      <ContentWrapper>
        <Breadcrumb>
          <BreadcrumbLink onClick={() => navigate("/profile")}>
            프로필
          </BreadcrumbLink>
          <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
          <BreadcrumbCurrent>후기</BreadcrumbCurrent>
        </Breadcrumb>

        <PageTitle>내가 작성한 후기</PageTitle>

        <TabContainer>
          <Tab
            $active={activeTab === "about-me"}
            onClick={() => setActiveTab("about-me")}
          >
            나에 대한 후기
          </Tab>
          <Tab
            $active={activeTab === "by-me"}
            onClick={() => setActiveTab("by-me")}
          >
            내가 작성한 후기
          </Tab>
        </TabContainer>

        {activeTab === "by-me" && (
          <>
            <SectionTitle>작성해야 할 후기</SectionTitle>
            <SectionDescription>
              현재 작성할 후기가 없습니다. 여행을 한번 다녀올 때가 된 것 같네요!
            </SectionDescription>

            <Divider />

            <SectionTitle>내가 작성한 후기</SectionTitle>
            <SectionDescription>
              아직 후기를 남기지 않으셨습니다.
            </SectionDescription>
          </>
        )}

        {activeTab === "about-me" && (
          <>
            <SectionTitle>나에 대한 후기</SectionTitle>
            <SectionDescription>
              아직 받은 후기가 없습니다.
            </SectionDescription>
          </>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default ReviewsPage;
