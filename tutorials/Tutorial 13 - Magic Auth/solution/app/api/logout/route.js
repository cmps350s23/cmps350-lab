import { cookies } from "next/headers";

export async function GET(request) {
  try {
    cookies().set("token", undefined);
    return new Response("Success.", { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json("401 Unauthorized.", { status: 401 });
  }
}
