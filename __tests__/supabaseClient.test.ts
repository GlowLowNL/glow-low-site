const createClient = jest.fn();
jest.mock('@supabase/supabase-js', () => ({
  __esModule: true,
  createClient,
}));

describe('supabaseClient', () => {
  const url = 'https://example.supabase.co';
  const key = 'anonkey';

  beforeEach(() => {
    createClient.mockClear();
    process.env.NEXT_PUBLIC_SUPABASE_URL = url;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = key;
  });

  it('calls createClient with env vars', async () => {
    await import('../lib/supabaseClient');
    expect(createClient).toHaveBeenCalledWith(url, key);
  });
});
