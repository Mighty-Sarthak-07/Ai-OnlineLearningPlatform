// Migration: add streak_days + last_active_date to users table
// Uses the neon serverless driver with the ws polyfill for Node.js
// Run: node scripts/migrate-streak.js

const { neon, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');

// Required for Node.js environment (not edge runtime)
neonConfig.webSocketConstructor = ws;

const DATABASE_URL = "postgresql://neondb_owner:npg_4qRINYC6EVcJ@ep-steep-darkness-a8jviqpl-pooler.eastus2.azure.neon.tech/online-learning-platform-with-Ai?sslmode=require";

async function migrate() {
  const sql = neon(DATABASE_URL);

  console.log('🚀 Running streak migration...');

  try {
    const r1 = await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS streak_days INTEGER NOT NULL DEFAULT 0`;
    console.log('✓ streak_days column added');
  } catch (e) {
    console.error('✗ streak_days:', e.message);
  }

  try {
    const r2 = await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active_date VARCHAR(10) NOT NULL DEFAULT ''`;
    console.log('✓ last_active_date column added');
  } catch (e) {
    console.error('✗ last_active_date:', e.message);
  }

  console.log('✅ Migration complete!');
  process.exit(0);
}

migrate().catch(e => {
  console.error('Fatal migration error:', e);
  process.exit(1);
});
