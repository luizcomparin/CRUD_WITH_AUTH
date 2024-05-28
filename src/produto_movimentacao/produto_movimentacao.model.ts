import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { FuncionarioModel } from "../funcionario/funcionario.model";
import { HistoricoProdutoEstoqueModel } from "../historico_produto_estoque/historico_produto_estoque.model";
import { ProdutoModel } from "../produto/produto.model";

@Entity({ name: "tb_produto_movimentacao" })
export class ProdutoMovimentacaoModel {

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ManyToOne(() => ProdutoModel, (produto) => produto.produto_movimentacoes, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_produto' })
	id_produto?: ProdutoModel | string;

	@ManyToOne(() => FuncionarioModel, (item) => item.produto_movimentacoes, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_funcionario' })
	id_funcionario?: FuncionarioModel | string;

	// @ManyToOne(() => LancamentoVendaModel, (item) => item.historico_movimentacaos, { onDelete: 'CASCADE' })
	// @JoinColumn({ name: 'id_lancamento_venda' })
	// id_lancamento_venda?: LancamentoVendaModel | string;

	@Column({ type: 'timestamp' })
	criado_em?: Date;

	@Column()
	type: string; // enum (entrada, saida)

	@Column()
	quantidade: string;

	public constructor(init?: Partial<ProdutoModel>) {
		Object.assign(this, init);
	}

}
