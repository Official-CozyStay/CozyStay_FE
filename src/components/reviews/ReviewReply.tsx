import styled from "styled-components";
import type { CommentDTO } from "../../api/types";
import { CornerDownRight } from "lucide-react";

interface Props {
    reply: CommentDTO;
}

export default function ReviewReply({ reply }: Props) {
    return (
        <Container>
            <IconWrapper>
                <CornerDownRight size={20} />
            </IconWrapper>
            <ContentBox>
                <Header>
                    <AuthorInfo>
                        <Avatar
                            src={reply.authorProfileImage || "https://via.placeholder.com/40"}
                            alt={reply.authorNickname}
                        />
                        <AuthorName>{reply.authorNickname} 님의 답글</AuthorName>
                    </AuthorInfo>
                    <Date>{reply.createdAt.split("T")[0]}</Date>
                </Header>
                <Body>{reply.content}</Body>
            </ContentBox>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-left: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: #f7f7f7; // Fallback or use correct theme token
  border-radius: ${({ theme }) => theme.radius.md};
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 4px;
`;

const ContentBox = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorName = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Date = styled.span`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Body = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: ${({ theme }) => theme.font.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: pre-wrap;
`;
