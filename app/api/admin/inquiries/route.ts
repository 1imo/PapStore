import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logInfo, logError } from '@/lib/LoggingService';

export async function GET() {
    try {
        const inquiries = await prisma.inquiry.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        await logInfo('Inquiries fetched');

        return NextResponse.json({ inquiries });
    } catch (error) {
        await logError('Failed to fetch inquiries', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 