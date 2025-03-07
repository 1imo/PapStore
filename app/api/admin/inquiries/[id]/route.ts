import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logInfo, logError } from '@/lib/LoggingService';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } } & { searchParams: URLSearchParams }
) {
    try {
        const id = parseInt(params.id);
        const { responded } = await request.json();

        const inquiry = await prisma.inquiry.update({
            where: { id },
            data: {
                responded,
                respondedAt: responded ? new Date() : null,
            },
        });

        await logInfo('Inquiry updated', { inquiryId: id });

        return NextResponse.json({ inquiry });
    } catch (error) {
        await logError('Failed to update inquiry', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 