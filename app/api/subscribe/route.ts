import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logInfo, logError } from '@/lib/LoggingService';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Try to create a new subscriber
        const subscriber = await prisma.subscriber.create({
            data: {
                email,
                active: true
            },
        });

        await logInfo('New subscriber added from banner', { email });

        return NextResponse.json({
            success: true,
            subscriber
        });
    } catch (error) {
        // Check if the error is due to duplicate email
        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return NextResponse.json(
                { error: 'Email already subscribed' },
                { status: 409 }
            );
        }

        await logError('Failed to create subscriber', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 