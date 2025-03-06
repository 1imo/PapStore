'use server';

import { prisma } from './prisma';

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

export async function createLog(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>,
    source: string = 'system'
) {
    try {
        await prisma.log.create({
            data: {
                level,
                message,
                metadata: metadata ? JSON.stringify(metadata) : null,
                source,
            },
        });
    } catch (error) {
        console.error('Failed to create log:', error);
    }
}

export async function logInfo(message: string, metadata?: Record<string, any>) {
    return createLog('INFO', message, metadata);
}

export async function logWarn(message: string, metadata?: Record<string, any>) {
    return createLog('WARN', message, metadata);
}

export async function logError(message: string, metadata?: Record<string, any>) {
    return createLog('ERROR', message, metadata);
}

export async function getRecentLogs(
    limit: number = 100,
    level?: LogLevel,
    source?: string
) {
    const where = {
        ...(level && { level }),
        ...(source && { source }),
    };

    return prisma.log.findMany({
        where,
        orderBy: {
            createdAt: 'desc',
        },
        take: limit,
    });
}

export async function clearOldLogs(daysToKeep: number = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    return prisma.log.deleteMany({
        where: {
            createdAt: {
                lt: cutoffDate,
            },
        },
    });
} 