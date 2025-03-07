import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logError, logInfo } from '@/lib/LoggingService';

export async function GET() {
    try {
        const subscribers = await prisma.subscriber.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Create CSV content
        const headers = ['Email', 'Name', 'Joined Date', 'Status'];
        const rows = subscribers.map(sub => [
            `"${sub.email.replace(/"/g, '""')}"`,
            `"${(sub.name || '').replace(/"/g, '""')}"`,
            `"${new Date(sub.createdAt).toLocaleDateString()}"`,
            `"${sub.active ? 'Active' : 'Inactive'}"`
        ]);

        const csvContent = [
            headers.map(h => `"${h}"`).join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        await logInfo('Subscribers CSV exported');

        return new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="subscribers_${new Date().toISOString().split('T')[0]}.csv"`,
            },
        });
    } catch (error) {
        await logError('Failed to export subscribers to CSV', { error });
        return NextResponse.json(
            { error: 'Failed to export subscribers' },
            { status: 500 }
        );
    }
} 