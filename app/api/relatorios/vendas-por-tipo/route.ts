import { vendasPorTipoController } from "@/src/controllers/relatorio-controller";

export async function GET() {
  return vendasPorTipoController();
}