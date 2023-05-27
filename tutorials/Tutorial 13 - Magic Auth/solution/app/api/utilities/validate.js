import { cookies } from "next/headers";
import magic from "@/app/api/utilities/magic";

export async function validate(token) {
  try {
    const _token = token ?? cookies()?.get("token")?.value;
    if (_token) {
      await magic.token.validate(_token);
      const metadata = await magic.users.getMetadataByToken(_token);
      return metadata.email;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
}
