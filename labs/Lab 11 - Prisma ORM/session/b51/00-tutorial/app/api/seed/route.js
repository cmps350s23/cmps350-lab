import * as repo from "@/utilities/repository";

export async function POST(request) {
  return new Response(await repo.seed());
}
