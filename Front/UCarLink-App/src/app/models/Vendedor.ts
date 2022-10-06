import { Loja } from "./Loja";

export interface Vendedor {
  idVendedor: number;
  nome: string;
  loja: Loja;
}
