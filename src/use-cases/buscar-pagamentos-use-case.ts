import { PagamentoRepository } from "../db/repositories/pagamento-repository";

export async function buscarPagamentosUseCase() {
  const pagamentoRepository = new PagamentoRepository();

  return pagamentoRepository.findAll();
}