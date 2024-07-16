import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://raeafhtcusrrspuydzzc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZWFmaHRjdXNycnNwdXlkenpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExNDEyMTAsImV4cCI6MjAzNjcxNzIxMH0.Gd0yfmSc_LfvH1xiOtdTm7v4C2cmUPOIdFkFyfIh6a0')