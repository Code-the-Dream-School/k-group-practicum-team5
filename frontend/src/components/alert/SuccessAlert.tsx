import BasicAlert from "./BasicAlert";

function SuccessAlert({ message }: { message: string }) {
  return <BasicAlert message={message} severity="success" />;
}

export default SuccessAlert;
