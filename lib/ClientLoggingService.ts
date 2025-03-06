'use client';

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

async function logToServer(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>
) {
    try {
        await fetch('/api/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                level,
                message,
                metadata,
            }),
        });
    } catch (error) {
        console.error('Failed to send log to server:', error);
    }
}

export class ClientLoggingService {
    static async info(message: string, metadata?: Record<string, any>) {
        return logToServer('INFO', message, metadata);
    }

    static async warn(message: string, metadata?: Record<string, any>) {
        return logToServer('WARN', message, metadata);
    }

    static async error(message: string, metadata?: Record<string, any>) {
        return logToServer('ERROR', message, metadata);
    }
} 