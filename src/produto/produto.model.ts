import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { FuncionarioModel } from "../funcionario/funcionario.model";
import { HistoricoProdutoEstoqueModel } from "../historico_produto_estoque/historico_produto_estoque.model";
import { ProdutoMovimentacaoModel } from "../produto_movimentacao/produto_movimentacao.model";

@Entity({ name: "tb_produto" })
export class ProdutoModel {

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@OneToMany(() => HistoricoProdutoEstoqueModel, (hist) => hist.id_produto, { cascade: true })
	historico_produto_estoques?: HistoricoProdutoEstoqueModel[]

	@OneToMany(() => ProdutoMovimentacaoModel, (hist) => hist.id_produto, { cascade: true })
	produto_movimentacoes?: ProdutoMovimentacaoModel[]

	@Column({ type: 'timestamp' })
	criado_em?: Date;

	@Column()
	nome: string;

	@Column()
	preco_custo: string;

	@Column()
	url_image: string;

	@Column()
	porcentagem_lucro: string;

	@Column()
	quantidade: string;

	@Column()
	codigo_barras: string;

	@Column()
	und_medida: string; // enum(kg, und)

	@Column()
	peso_medida: string; // double || null

	public constructor(init?: Partial<ProdutoModel>) {
		Object.assign(this, init);
	}

}
