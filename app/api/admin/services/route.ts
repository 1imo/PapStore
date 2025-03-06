import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logInfo, logError } from '@/lib/LoggingService';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const [services, total] = await Promise.all([
            prisma.service.findMany({
                orderBy: {
                    order: 'asc',
                },
                skip,
                take: limit,
            }),
            prisma.service.count(),
        ]);

        await logInfo('Services fetched');

        return NextResponse.json({ services, total });
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