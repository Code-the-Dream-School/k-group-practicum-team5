import BasicAlert from "./BasicAlert";

function InfoAlert({ message }: { message: string }) {
  return <BasicAlert message={message} severity="info" />;
}

export default InfoAlert;
