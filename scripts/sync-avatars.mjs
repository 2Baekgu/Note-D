/**
 * Copies the picture Google gave each account into its profile row, for
 * anyone whose profile has none.
 *
 *   npm run sync-avatars
 *
 * Sign-in does this by itself now; this catches accounts that signed in
 * before it did, and anyone whose picture the seed had overwritten.
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const { data: list, error: listError } = await supabase.auth.admin.listUsers();
if (listError) {
  console.error("could not read accounts:", listError.message);
  process.exit(1);
}

const { data: profiles, error: profileError } = await supabase
  .from("profiles")
  .select("id, handle, profile_image");
if (profileError) {
  console.error("could not read profiles:", profileError.message);
  process.exit(1);
}

let filled = 0;
let kept = 0;
let missing = 0;

for (const profile of profiles) {
  if (profile.profile_image) {
    kept += 1;
    continue;
  }
  const account = list.users.find((u) => u.id === profile.id);
  const meta = account?.user_metadata ?? {};
  const picture = meta.avatar_url || meta.picture;

  if (!picture) {
    missing += 1;
    console.log(`  · ${profile.handle}: no picture on the account yet`);
    continue;
  }

  const { error } = await supabase
    .from("profiles")
    .update({ profile_image: picture })
    .eq("id", profile.id);

  if (error) console.warn(`  ! ${profile.handle}: ${error.message}`);
  else {
    filled += 1;
    console.log(`  ✓ ${profile.handle}`);
  }
}

console.log(`filled ${filled}, already set ${kept}, no picture available ${missing}`);
