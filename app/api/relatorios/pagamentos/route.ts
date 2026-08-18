import { pagamentoController } from "@/src/controllers/pagamento-controller";

export async function GET() {
  return pagamentoController();
}