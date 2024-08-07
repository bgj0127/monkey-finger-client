import "../styles/About.css";

const About = () => {
  return (
    <>
      <div id="about_container">
        <h2>타자연습 조회 및 분석 웹사이트</h2>
        <div>
          타자연습 기록을 시각적으로 확인하고, OpenAI의 분석을 통해 개인 맞춤형 피드백을 받을 수 있습니다.
          <hr />
          <h2>기술스택 </h2>
          <h3>백엔드</h3>
          <ul>
            <li>
              <strong>FastAPI</strong>: 고성능 비동기 웹 프레임워크로, API 서버를 구축하는 데 사용되었습니다.
            </li>
            <li>
              <strong>SQLAlchemy</strong>: Python의 ORM(Object-Relational Mapping) 라이브러리로, 데이터베이스 상호작용을
              간편하게 합니다.
            </li>
            <li>
              <strong>PostgreSQL</strong>: 관계형 데이터베이스로, 사용자 타자 기록을 저장하고 관리하는 데 사용됩니다.
            </li>
          </ul>
          <h3>프론트엔드</h3>
          <ul>
            <li>
              <strong>React</strong>: 사용자 인터페이스를 구성하는 데 사용된 JavaScript 라이브러리로, 빠르고 동적인 웹
              페이지를 만듭니다.
            </li>
            <li>
              <strong>ChartJS</strong>: 다양한 차트를 제공하는 JavaScript 라이브러리로, 타자 연습 기록을 시각화하는 데
              사용됩니다.
            </li>
          </ul>
          <hr />
          <h2>배포</h2>
          <h3>서버 및 DB</h3>
          <ul>
            <li>
              <strong>CloudType</strong>: FastAPI 서버와 PostgreSQL 데이터베이스는 CloudType을 통해 배포되었습니다. 이를
              통해 안정적이고 확장 가능한 서버 환경을 구축할 수 있습니다.
            </li>
          </ul>
          <h3>클라이언트</h3>
          <ul>
            <li>
              <strong>Netlify</strong>: React로 개발된 클라이언트 애플리케이션은 Netlify를 통해 배포되었습니다.
              Netlify는 빠른 배포와 쉬운 관리를 가능하게 합니다.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
