import { validate } from "@/app/api/utilities/validate";

export async function GET(request) {
  try {
    const email = await validate();
    if (email) {
      // authorization can be implemented over here
      // return Response.json("403 Forbidden.", { status: 403 });
      return Response.json({ secret: "42" }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return Response.json("401 Unauthorized.", { status: 401 });
  }
}
