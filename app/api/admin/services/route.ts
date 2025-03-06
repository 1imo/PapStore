import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logInfo, logError } from '@/lib/LoggingService';

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        });

        await logInfo('Services fetched');

        return NextResponse.json({ services });
    } catch (error) {
        await logError('Failed to fetch services', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const service = await prisma.service.create({
            data,
        });

        await logInfo('New service created', { serviceId: service.id });

        return NextResponse.json({ service });
    } catch (error) {
        await logError('Failed to create service', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 