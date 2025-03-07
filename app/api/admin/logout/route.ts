import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { logInfo, logError } from '@/lib/LoggingService';

export async function GET() {
    try {
        // Remove the admin token cookie
        const cookieStore = await cookies();
        cookieStore.delete('admin_token');

        await logInfo('Admin logout successful');

        // Get host from request headers
        const headersList = await headers();
        const protocol = headersList.get('x-forwarded-proto') || 'http';
        const host = headersList.get('host');
        const url = new URL('/admin/login', `${protocol}://${host}`);

        return NextResponse.redirect(url);
    } catch (error) {
        await logError('Admin logout error', { error });
        // Use same header logic in error case
        const headersList = await headers();
        const protocol = headersList.get('x-forwarded-proto') || 'http';
        const host = headersList.get('host');
        const url = new URL('/admin/login', `${protocol}://${host}`);

        return NextResponse.redirect(url);
    }
}