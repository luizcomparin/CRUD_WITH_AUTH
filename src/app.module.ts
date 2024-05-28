import { Module, SetMetadata } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './_core/constants/constants';
import { RecordController } from './record/record.controller';
import { RecordService } from './record/record.service';
import { AuthGuard } from './_core/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './_mongoose/user.schema';
import { Record, RecordSchema } from './_mongoose/record.schema';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
        MongooseModule.forRoot('mongodb+srv://luizcomparin:ddoYZvMZaVHh9yNU@cluster0.58wcvwq.mongodb.net/crud-login-vitao?retryWrites=true&w=majority&appName=Cluster0'),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Record.name, schema: RecordSchema },
        ])
    ],
    controllers: [AuthController, RecordController],
    providers: [
        AuthService,
        RecordService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule { }
