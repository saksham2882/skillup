import { SignIn } from "@clerk/nextjs";
import Background from "../../_components/Background";

export default function Page() {
  return (
    <Background>
      <SignIn />
    </Background>
  );
}
