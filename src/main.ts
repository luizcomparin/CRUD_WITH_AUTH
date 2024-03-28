import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.setGlobalPrefix('/api/v1')
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
	//   app.useGlobalFilters(new ErrorFilter(loggerService))
	const config = new DocumentBuilder()
		.setTitle('API - CRUD e Auth')
		.setDescription('Endpoints para login, cadastro e CRUD com validação. Feito por Luiz do Verde.')
		.setVersion('1.0')
		.addBearerAuth()
		.addSecurityRequirements('bearer')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(3000);
	console.log('Running on port 3000')
}
bootstrap();
