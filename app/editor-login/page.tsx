import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginForm from "./login.form";
import { Metadata } from "next";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: "Web Editor Login"
}

export default async function Page() {
  const headersList = await headers();
  const forwardedProto = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");

  // Check if the connection is secure
  const isSecure = forwardedProto === "https" || (host && host.startsWith("localhost"));

  if (!isSecure) {
    return (
      <div className="p-8 md:p-20 flex flex-col gap-2 items-center">
        <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faRightToBracket} /> Login</h1>
        <h2 className="text-xl font-semibold">Error</h2>
        <p>This page requires a secure connection (HTTPS).</p>
      </div>
    );
  }

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