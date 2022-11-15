import { CDBContainer, CDBSpinner } from "cdbreact";
import React from "react";

const Loading = () => {
  return (
    <CDBContainer className="my-3">
      <CDBSpinner multicolor />
    </CDBContainer>
  );
};

export default Loading;
