import { logError } from './LoggingService';

export class ErrorService {
    private static instance: ErrorService;

    private constructor() {
        // Private constructor to enforce singleton
        this.setupGlobalHandlers();
    }

    public static getInstance(): ErrorService {
        if (!ErrorService.instance) {
            ErrorService.instance = new ErrorService();
        }
        return ErrorService.instance;
    }

    private setupGlobalHandlers() {
        if (typeof window !== 'undefined') {
            // Browser-side error handling
            window.addEventListener('error', (event) => {
                this.handleError(event.error);
            });

            window.addEventListener('unhandledrejection', (event) => {
                this.handleError(event.reason);
            });
        } else {
            // Server-side error handling
            process.on('uncaughtException', (error) => {
                this.handleError(error);
            });

            process.on('unhandledRejection', (reason) => {
                this.handleError(reason as Error);
            });
        }
    }

    public async handleError(error: Error) {
        // Skip 404 errors
        if (error.message.includes('404') || error.message.toLowerCase().includes('not found')) {
            return;
        }

        await logError('Uncaught error', {
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
    }
} 