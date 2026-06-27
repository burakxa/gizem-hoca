import { createClient } from '@supabase/supabase-js'

    const supabaseUrl = 'https://rslnhtwfcwqaqvywurry.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzbG5odHdmY3dxYXF2eXd1cnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5Njc1MjUsImV4cCI6MjA0MTU0MzUyNX0.w3Z5y1n2a4B12s_PgR2FvO4JkE3VoFz2Fz9aWJWfWc0'

    export const supabase = createClient(supabaseUrl, supabaseAnonKey)