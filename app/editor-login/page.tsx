import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginForm from "./login.form";

export default function Page() {
  return (
    <div className="p-8 md:p-20 flex flex-col gap-2 items-center">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faRightToBracket} /> Login</h1>
      <p className="mb-2">Log in to the Web Editor.</p>
      {process.env.WEBEDITOR !== "true" && (
        <p>Web editor is disabled.</p>
      )}
      {process.env.WEBEDITOR === "true" && <LoginForm />}
    </div>
  );
}