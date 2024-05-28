import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorMessageEnum } from '../enums/error-message.enum';
import ErrorResponse from '../error.response';
import { CommonResponse, StatusEnum } from 'src/controllers/responses/common/common.response';
import { ErrorLog } from '../../../mongodb/logger/schemas/error-log.schema';
import { LoggerService } from '../../../mongodb/logger/logger.service';

// Exemplo: https://github.com/nestjs/nest/issues/168
// Documentação: https://docs.nestjs.com/exception-filters#catch-everything
// Este filtro captura toda excessão (todo erro) lançada na aplicação.
@Catch()
export class ErrorFilter implements ExceptionFilter {
    constructor(
        @Inject(LoggerService)
        private loggerService: LoggerService,
    ) { }

    catch(error: Error | HttpException, host: ArgumentsHost) {
        console.log('Raw Error:', error)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const description = (error instanceof HttpException) ? (error as any).options.description : ''
        const errorMessage = (error instanceof BadRequestException)
            ? (error.getResponse() as any).message
            : error.message as ErrorMessageEnum

        let errorResponse = new CommonResponse<ErrorResponse>(
            StatusEnum.failure,
            errorMessage,
            new ErrorResponse({
                timestamp: new Date().toLocaleString(),
                path: request.url,
                request_obj: request.body,
                description,
                fullError: error.toString()
            })
        )
        console.log('Error Response:', errorResponse)

        const createErrorLogDto = new ErrorLog(request, errorResponse)

        // Creating error log registry in MongoDB.
        this.loggerService.createErrorLog(createErrorLogDto).then(res => console.log('Logged Error to MongoDB:', createErrorLogDto.original_url))

        return response.status(status).json(errorResponse)
    }
}
