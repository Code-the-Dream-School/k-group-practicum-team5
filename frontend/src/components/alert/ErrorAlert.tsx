import BasicAlert from "./BasicAlert";

function ErrorAlert({ message }: { message: string }) {
  return <BasicAlert message={message} severity="error" />;
}

export default ErrorAlert;
