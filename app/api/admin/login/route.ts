import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logInfo, logError } from '@/lib/LoggingService';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin123'; // Fixed nullish coalescing
const TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }

        // Create a simple token (enhance security in production)
        const token = Buffer.from(Date.now().toString()).toString('base64');

        // Set the cookie
        const cookieStore = await cookies();
        await cookieStore.set({
            name: 'admin_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: TOKEN_EXPIRY,
            path: '/',
        });

        await logInfo('Admin login successful');

        return NextResponse.json({ success: true });
    } catch (error) {
        await logError('Admin login error', { error });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 