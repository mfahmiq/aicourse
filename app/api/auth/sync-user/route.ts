import { auth, clerkClient } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        full_name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        avatar_url: user.imageUrl,
        created_at: user.createdAt,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'id'
      });

    if (error) {
      console.error('Error syncing user:', error);
      return new NextResponse('Error syncing user', { status: 500 });
    }

    return new NextResponse('User synced successfully', { status: 200 });
  } catch (error) {
    console.error('Error in sync-user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
