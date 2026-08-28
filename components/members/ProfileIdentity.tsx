"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ChipButton } from "@/components/ui/Chip";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { uploadAvatar } from "@/lib/studio";

/** Name, role and bio — and, when it is your own page, a way to change them.
 *
 *  The picture arrives from Google on first sign-in. Anything set here wins
 *  from then on, which is why the sign-in sync only ever fills an empty one. */
export function ProfileIdentity({ member }: { member: User }) {
  const { user } = useAuth();
  const router = useRouter();
  const isMe = Boolean(user && user.id === member.id);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(member.name);
  const [title, setTitle] = useState(member.title);
  const [bio, setBio] = useState(member.bio);
  const [image, setImage] = useState(member.profileImage);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pickPhoto(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    const res = await uploadAvatar(file);
    setBusy(false);
    if (res.url) setImage(res.url);
    else setError(res.error ?? "업로드에 실패했습니다.");
  }

  async function save() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("데모 모드에서는 저장되지 않습니다. Supabase를 연결해주세요.");
      return;
    }
    if (!name.trim()) {
      setError("이름을 비워둘 수 없습니다.");
      return;
    }

    setBusy(true);
    setError(null);
    const { error: err } = await supabase
      .from("profiles")
      .update({
        name: name.trim(),
        title: title.trim(),
        bio: bio.trim(),
        profile_image: image,
      })
      .eq("id", member.id);
    setBusy(false);

    if (err) {
      setError(err.message);
      return;
    }
    setEditing(false);
    router.refresh();
  }

  function cancel() {
    setName(member.name);
    setTitle(member.title);
    setBio(member.bio);
    setImage(member.profileImage);
    setError(null);
    setEditing(false);
  }

  if (!editing) {
    return (
      <div>
        <div className="flex items-center gap-6">
          <Avatar name={member.name} src={member.profileImage} size="xl" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="t-h1">{member.name}</h1>
              {isMe && (
                <ChipButton size="sm" tone="outline" onClick={() => setEditing(true)}>
                  편집
                </ChipButton>
              )}
            </div>
            <p className="t-label mt-3 text-accent">{member.title}</p>
          </div>
        </div>

        <p className="t-body-lg mt-8 max-w-[52ch] text-ink-muted">{member.bio}</p>
      </div>
    );
  }

  return (
    <div className="surface p-6 sm:p-8">
      <p className="t-label text-ink-faint">프로필 편집</p>

      <div className="mt-6 flex items-center gap-6">
        <label className="group relative shrink-0 cursor-pointer" title="사진 바꾸기">
          <Avatar name={name} src={image} size="xl" />
          <span className="t-label absolute inset-0 flex items-center justify-center rounded-pill bg-[rgba(22,21,15,0.55)] text-center text-white opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100">
            바꾸기
          </span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              void pickPhoto(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>

        <div className="min-w-0 flex-1">
          <label htmlFor="p-name" className="t-label text-ink-faint">
            이름
          </label>
          <input
            id="p-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field mt-2"
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="p-title" className="t-label text-ink-faint">
          직업
        </label>
        <input
          id="p-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="UX Designer"
          className="field mt-2"
        />
      </div>

      <div className="mt-6">
        <label htmlFor="p-bio" className="t-label text-ink-faint">
          자기소개
        </label>
        <textarea
          id="p-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          placeholder="무엇에 관심이 있고, 무엇을 쓰는지 한두 문장으로."
          className="field mt-2 resize-y"
        />
      </div>

      {error && <p className="t-caption mt-4 text-accent">{error}</p>}

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={save} disabled={busy}>
          {busy ? "저장 중…" : "저장"}
        </Button>
        <Button variant="secondary" onClick={cancel} disabled={busy}>
          취소
        </Button>
      </div>
    </div>
  );
}
