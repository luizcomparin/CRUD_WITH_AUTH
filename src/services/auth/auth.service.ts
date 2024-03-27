import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../dtos/auth/login.dto';
import { RegisterUserDto } from '../../dtos/auth/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas-mongoose/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../../dtos/auth/updateUser.dto';

interface UserWithId extends User {
	_id: string
}

@Injectable()
export class AuthService {

	constructor(
		private jwtService: JwtService,
		@InjectModel(User.name)
		private userModel: Model<User>,
	) { }

	async login(loginDto: LoginDto) {
		const userFound = await this.userModel.findOne<UserWithId>({ email: loginDto.email });
		console.log('userFound', userFound)

		if (!userFound) {
			throw new NotFoundException();
		}
		if (userFound.password !== loginDto.password) {
			throw new UnauthorizedException();
		}
		const accessToken = await this.jwtService.signAsync(loginDto)
		return { accessToken };
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

	async deleteById(_id: string) {
		const deletedUser = await this.userModel.deleteOne(
			{ _id: _id.toString() }
		)
		return deletedUser;
	}

	async deleteAll() {
		return await this.userModel.deleteMany();
	}

}
