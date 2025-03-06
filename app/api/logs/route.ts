import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { level, message, metadata } = await request.json();

        await prisma.log.create({
            data: {
                level,
                message,
                metadata: metadata ? JSON.stringify(metadata) : null,
                source: 'client',
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to create log:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 