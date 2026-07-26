import { Toast, ToastContainer } from "react-bootstrap";

const Toaster = ({ toast, show, setShow }) => {
  return (
    <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1050 }}>
      <Toast
        bg={toast?.variant || "info"}
        className={toast?.variant !== "light" ? "text-white" : "text-dark"}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{toast?.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toaster;
