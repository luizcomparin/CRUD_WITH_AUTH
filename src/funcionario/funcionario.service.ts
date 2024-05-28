import { ErrorMessageEnum } from './../_core/error-handling/enums/error-message.enum';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FuncionarioModel } from './funcionario.model';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { IPaginationOptions } from '../_core/pagination/IPaginationOptions.interface';
import { Pagination } from '../_core/pagination/pagination.response';
import runQueryWithPagination from '../_core/pagination/runQueryWithPagination.function';

@Injectable()
export class FuncionarioService {

	constructor(
		@InjectRepository(FuncionarioModel)
		private funcionarioModel: Repository<FuncionarioModel>,
	) { }

	private criancaRelations: FindOptionsRelations<FuncionarioModel> = {
		atendente_id: true,
		assistencias: true,
		gestante_id: true,
		situacao_gestante_id: {
			parceiro_id: true,
		},
	}

	async consultarTodos(order: string, orderByColumn: string, paginationOptions: IPaginationOptions): Promise<Pagination<FuncionarioModel>> {
		if (order !== "ASC" && order !== "DESC") throw new HttpException(ErrorMessageEnum.BAD_REQUEST, HttpStatus.BAD_REQUEST, { description: `Order deve ser 'ASC' ou 'DESC'.` })
		const queryBuilder = this.funcionarioModel.createQueryBuilder('crianca')
		queryBuilder.orderBy(`crianca.${orderByColumn}`, order)
		return await runQueryWithPagination<FuncionarioModel>(queryBuilder, paginationOptions)
	}

	async consultarPorIdOuErro(id: string): Promise<FuncionarioModel> {
		const crianca = await this.funcionarioModel.findOne({
			where: { id },
			relations: this.criancaRelations
		})
		if (!crianca) throw new HttpException(ErrorMessageEnum.NOT_FOUND, HttpStatus.NOT_FOUND, { description: `Criança não encontrada com id '${id}'.` })
		return crianca
	}

	async getAll() {
		const allFuncionarios = await this.funcionarioModel.find();
		return allFuncionarios;
	}

	async create(funcionarioDto: CreateFuncionarioDto) {
		// const createdFuncionario = await this.funcionarioModel.create(funcionarioDto)
		const createdFuncionario = new this.funcionarioModel(funcionarioDto)
		return createdFuncionario.save()
	}

	async update(updateDto: UpdateFuncionarioDto) {
		const userFound = await this.funcionarioModel.findOne<FuncionarioWithId>({ _id: updateDto._id.toString() });

		if (!userFound) {
			throw new NotFoundException();
		}
		const updatedUser = await this.funcionarioModel.updateOne(
			{ _id: updateDto._id.toString() },
			updateDto
		)
		return updatedUser;
	}

	async deleteById(_id: string) {
		const deletedUser = await this.funcionarioModel.deleteOne(
			{ _id: _id.toString() }
		)
		return deletedUser;
	}

	async deleteAll() {
		return await this.funcionarioModel.deleteMany();
	}

}
