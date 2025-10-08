import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient(request);
    const body = await request.json();
    const { name, position, image, bio } = body;

    const { data, error } = await supabase
      .from('team_members')
      .update({ name, position, image, bio })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient(request);
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
