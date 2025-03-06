import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logError, logInfo } from '@/lib/LoggingService';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json();
        const id = parseInt(params.id);

        const subscriber = await prisma.subscriber.update({
            where: { id },
            data: { active: data.active }
        });

        await logInfo('Subscriber updated', { subscriberId: id });

        return NextResponse.json({ subscriber });
    } catch (error) {
        await logError('Failed to update subscriber', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 