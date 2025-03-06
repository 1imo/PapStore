import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logInfo, logError } from '@/lib/LoggingService';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const inquiry = await prisma.inquiry.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
                service: data.service || null,
                marketing: data.marketing || false,
                responded: false
            },
        });

        await logInfo('New inquiry created', { inquiryId: inquiry.id });

        return NextResponse.json({ inquiry });
    } catch (error) {
        await logError('Failed to create inquiry', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 