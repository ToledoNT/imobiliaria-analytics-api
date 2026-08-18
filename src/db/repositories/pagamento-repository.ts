import { prisma } from "@/app/lib/prisma";

export class PagamentoRepository {
  async findAll() {
    return prisma.pagamento.findMany({
      include: {
        imovel: {
          include: {
            tipo_imovel: true,
          },
        },
      },
    });
  }
}