import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logInfo, logError } from '@/lib/LoggingService';

export async function PUT(
    request: Request,
    { params }
) {
    try {
        const id = parseInt(params.id);
        const data = await request.json();

        const service = await prisma.service.update({
            where: { id },
            data,
        });

        await logInfo('Service updated', { serviceId: id });

        return NextResponse.json({ service });
    } catch (error) {
        await logError('Failed to update service', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }
) {
    try {
        const id = parseInt(params.id);

        await prisma.service.delete({
            where: { id },
        });

        await logInfo('Service deleted', { serviceId: id });

        return NextResponse.json({ success: true });
    } catch (error) {
        await logError('Failed to delete service', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 