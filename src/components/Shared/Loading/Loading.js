import { CDBContainer, CDBSpinner } from "cdbreact";

const Loading = () => {
  return (
    <CDBContainer className="my-3">
      <CDBSpinner multicolor />
    </CDBContainer>
  );
};

export default Loading;
