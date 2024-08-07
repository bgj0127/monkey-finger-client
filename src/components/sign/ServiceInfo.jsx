import "../../styles/ServiceInfo.css";

const ServiceInfo = () => {
  return (
    <>
      <div id="info_container">
        <h1>Monkey Finger</h1>
        <p>
          <a href="https://monkeytype.com/" target="_blank">
            <strong className="link_strong">Monkeytype</strong>
          </a>
          을 이용하고 있다면 누구나 사용가능한 타자연습기록 분석 사이트 입니다.
        </p>
        <p>
          <a href="https://monkeytype.com/" target="_blank">
            <strong className="link_strong">Monkeytype</strong>
          </a>
          에서 제공하는 csv 파일을 업로드하면 똑똑한 원숭이 비서🐵가 여러분의 타자연습기록을 분석합니다.
        </p>
        <p></p>
      </div>
    </>
  );
};

export default ServiceInfo;
