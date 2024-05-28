import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { HistoricoProdutoEstoqueModel } from "../historico_produto_estoque/historico_produto_estoque.model";
import { ProdutoMovimentacaoModel } from "../produto_movimentacao/produto_movimentacao.model";

@Entity({ name: "tb_funcionario" })
export class FuncionarioModel {

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@OneToMany(() => HistoricoProdutoEstoqueModel, (historico) => historico.id_funcionario, { cascade: true })
	historico_produto_estoques?: HistoricoProdutoEstoqueModel[]

	@OneToMany(() => ProdutoMovimentacaoModel, (historico) => historico.id_funcionario, { cascade: true })
	produto_movimentacoes?: ProdutoMovimentacaoModel[]

	@Column({ type: 'timestamp' })
	criado_em?: Date;

	@Column()
	nome: string;

	@Column({ default: true })
	ativo: boolean;

	public constructor(init?: Partial<FuncionarioModel>) {
		Object.assign(this, init);
	}

}
