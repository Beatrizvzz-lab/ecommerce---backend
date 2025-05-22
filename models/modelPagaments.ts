
export interface Pagaments {
    userId: string;
    products: {
      productId: string;
      quantidade: number;
    }[];
    totaldaCompra: number;
    MetodoDePagamento: 'pix' | 'boleto' | 'cartao';
    status: 'pendente' | 'pago' | 'cancelado';
    createdAt?: Date;
  }
  