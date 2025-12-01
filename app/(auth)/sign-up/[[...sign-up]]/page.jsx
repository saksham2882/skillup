import { SignUp } from "@clerk/nextjs";
import Background from "../../_components/Background";

export default function Page() {
  return (
    <Background>
      <SignUp />
    </Background>
  );
}
