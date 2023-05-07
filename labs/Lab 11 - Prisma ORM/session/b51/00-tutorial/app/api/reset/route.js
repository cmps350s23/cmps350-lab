import * as repo from "@/utilities/repository";

export async function GET(request) {
  return new Response(await repo.seed());
}
