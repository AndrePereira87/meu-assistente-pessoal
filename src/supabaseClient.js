import { createClient } from '@supabase/supabase-js'

// Vais buscar estes dois valores ao teu painel do Supabase
// (Settings -> API -> Project URL & anon public key)
const supabaseUrl = 'https://qstqfivkgmyhqnocacxd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdHFmaXZrZ215aHFub2NhY3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNjMyOTksImV4cCI6MjA5NDkzOTI5OX0.Yasi5-Fqcmyi0WAEmKxI9rsXmRyoFxFKoXPgMV_1A_I'

export const supabase = createClient(supabaseUrl, supabaseKey)