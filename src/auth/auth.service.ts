import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterUserDto } from './dtos/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../_mongoose/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { LoginResponse } from '../responses/login.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface UserWithId extends User {
	_id: string
}

@Injectable()
export class AuthService {

	constructor(
		private jwtService: JwtService,
		@InjectRepository(CriancaEntity)
		private criancaRepository: Repository<CriancaEntity>,
	) { }

	async login(loginDto: LoginDto): Promise<LoginResponse> {
		const userFound = await this.userModel.findOne<UserWithId>({ email: loginDto.email });
		console.log('userFound', userFound)

		if (!userFound) {
			throw new NotFoundException();
		}
		if (userFound.password !== loginDto.password) {
			throw new UnauthorizedException();
		}
		const accessToken = await this.jwtService.signAsync(loginDto)
		const user = { _id: userFound._id, fullName: userFound.fullName, email: userFound.email }
		return { accessToken, user };
	}

	async register(registerDto: RegisterUserDto) {
		const userFound = await this.userModel.findOne<UserWithId>({ email: registerDto.email });

		if (userFound) {
			throw new HttpException('Existent Email', HttpStatus.CONFLICT);
		}
		const createdUser = new this.userModel(registerDto);
		return createdUser.save();
	}

	async update(updateDto: UpdateUserDto) {
		const userFound = await this.userModel.findOne<UserWithId>({ _id: updateDto._id.toString() });

		if (!userFound) {
			throw new NotFoundException();
		}
		const updatedUser = await this.userModel.replaceOne(
			{ _id: updateDto._id.toString() },
			updateDto
		)
		return updatedUser;
	}

	getByIdOrException(id: string) {
		const crianca = await this.criancaRepository.findOne({
			where: { id },
			relations: this.criancaRelations
		})
		if (!crianca) throw new HttpException(ErrorMessageEnum.NOT_FOUND, HttpStatus.NOT_FOUND, { description: `Criança não encontrada com id '${id}'.` })
		return crianca
	}
}

	async deleteById(_id: string): mongodb.DeleteResult {
	const crianca = await this.getByIdOrException(id);
	const excluido = this.criancaRepository.remove(crianca)
	return excluido
}

	// async deleteAll() {
	// 	return await this.userModel.deleteMany();
	// }

}
