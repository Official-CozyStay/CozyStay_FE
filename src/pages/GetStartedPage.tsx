export default function GetStartedPage() {
  return (
    <section className="get-started">
      <h3>개발 빠르게 시작하기</h3>
      <ol>
        <li>
          <code>src/pages</code>, <code>src/components</code> 생성
        </li>
        <li>
          <code>api/axiosInstance.ts</code> 구성
        </li>
        <li>
          환경변수는 <code>.env</code>에 <code>VITE_*</code> 접두사로
        </li>
      </ol>
      <div className="note">
        라우트는 나중에 코드 스플리팅(React.lazy)로 분할 가능합니다.
      </div>
    </section>
  );
}
