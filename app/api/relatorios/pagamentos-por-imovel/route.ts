import { pagamentosPorImovelController } from "@/src/controllers/relatorio-controller";

export async function GET() {
  return pagamentosPorImovelController();
}