import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export function createServerClient(request?: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  let accessToken = '';

  if (request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      accessToken = authHeader.replace('Bearer ', '');
    }
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: accessToken ? {
        Authorization: `Bearer ${accessToken}`
      } : {}
    },
    auth: {
      persistSession: false
    }
  });
}
