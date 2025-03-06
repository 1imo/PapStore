import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logInfo, logError } from '@/lib/LoggingService';

export async function GET() {
    try {
        // Remove the admin token cookie
        const cookieStore = await cookies();
        await cookieStore.delete({
            name: 'admin_token',
            path: '/',
        });

        await logInfo('Admin logout successful');

        // Redirect to login page
        return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL));
    } catch (error) {
        await logError('Admin logout error', { error });
        return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL));
    }
}