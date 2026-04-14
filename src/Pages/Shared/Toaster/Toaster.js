import { Toast, ToastContainer } from "react-bootstrap";
const Toaster = ({ variant, message, show, setShow }) => {
  return (
    <ToastContainer className="m-5" position="top-end">
      <Toast
        bg={`${variant} text-white`}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />

          <strong className="me-auto">Bootstrap</strong>
          <small>3 seconds ago</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toaster;
