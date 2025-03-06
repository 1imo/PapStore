import { NextResponse } from 'next/server';
import { getRecentLogs, logError } from '@/lib/LoggingService';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const level = searchParams.get('level');
        const source = searchParams.get('source');

        const logs = await getRecentLogs(100, level as any, source || undefined);

        return NextResponse.json({ logs });
    } catch (error) {
        await logError('Failed to fetch logs', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 