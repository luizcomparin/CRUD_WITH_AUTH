import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { FuncionarioModel } from "../funcionario/funcionario.model";
import { ProdutoModel } from "../produto/produto.model";

@Entity({ name: "tb_historico_produto_estoque" })
export class HistoricoProdutoEstoqueModel {

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ type: 'timestamp' })
	criado_em?: Date;

	@Column()
	preco_custo: string;

	@Column()
	preco_venda: string;

	@Column()
	porcentagem_lucro: string;

	// @OneToMany(() => AssistenciaEntity, (assistencia) => assistencia.atendente_id, { cascade: true })
	// assistencias?: AssistenciaEntity[]

	@ManyToOne(() => FuncionarioModel, (funcionario) => funcionario.historico_produto_estoques, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_funcionario' })
	id_funcionario?: FuncionarioModel | string;

	@ManyToOne(() => ProdutoModel, (produto) => produto.historico_produto_estoques, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_produto' })
	id_produto?: ProdutoModel | string;

	public constructor(init?: Partial<HistoricoProdutoEstoqueModel>) {
		Object.assign(this, init);
	}

}
