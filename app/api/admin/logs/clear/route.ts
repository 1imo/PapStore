import { NextResponse } from 'next/server';
import { clearOldLogs, logInfo, logError } from '@/lib/LoggingService';

export async function POST() {
    try {
        const result = await clearOldLogs(30);

        await logInfo('Old logs cleared', {
            count: result.count
        });

        return NextResponse.json({ success: true, count: result.count });
    } catch (error) {
        await logError('Failed to clear old logs', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 