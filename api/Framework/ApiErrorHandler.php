<?php

namespace Api\Framework;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpException;
use Throwable;

class ApiErrorHandler
{
    public function __construct(private LoggerInterface $logger)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        Throwable $exception,
        bool $displayErrorDetails,
        bool $logErrors,
        bool $logErrorDetails
    ): ResponseInterface {
        if ($logErrors) {
            $this->logger->error($exception->getMessage(), [
                'exception' => $exception,
                'path' => $request->getUri()->getPath(),
                'method' => $request->getMethod(),
            ]);
        }

        $status = $exception instanceof HttpException
            ? $exception->getCode()
            : 500;
        $code = $exception instanceof HttpException
            ? 'HTTP_' . $status
            : 'INTERNAL_SERVER_ERROR';
        $message = $displayErrorDetails || $status < 500
            ? $exception->getMessage()
            : 'An internal error occurred.';

        return (new ApiResponse())
            ->failure($code, ['message' => $message])
            ->withStatus($status);
    }
}