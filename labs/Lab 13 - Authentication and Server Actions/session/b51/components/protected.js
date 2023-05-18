import { useRouter } from "next/navigation";

export default function Protected({ children, email }) {
  const router = useRouter();
  if (!email) {
    //authenticate
    router.push("/login");
  }
  return children;
}
