import { vendasPorMesController } from "@/src/controllers/relatorio-controller";

export async function GET() {
  return vendasPorMesController();
}
