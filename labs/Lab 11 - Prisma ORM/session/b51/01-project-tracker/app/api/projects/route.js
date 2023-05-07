import * as repo from "@/utilities/repository";

export async function GET(request) {
  return Response.json(await repo.readProjects());
}
