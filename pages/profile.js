import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/useAuth'
import { useToast } from '../components/Toast'
import { supabase } from '../lib/supabase'

const MAX_AVATAR_SIZE_MB = 2

export default function Profile() {
  const router = useRouter()
  const toast = useToast()
  const { user, updateUserProfile } = useAuth()
  const [saving, setSaving] = useState(false)
  const [avatarData, setAvatarData] = useState('')
  const [about, setAbout] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    country: '',
    major: '',
    email: '',
  })

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    setForm({
      fullName: user.name || '',
      country: user.country || '',
      major: user.major || '',
      email: user.email || '',
    })

    setAvatarData(user.avatarData || '')
    setAbout(user.about || '')
  }, [router, user])

  async function handleSave() {
    if (!user) return
    setSaving(true)
    try {
      const payload = {
        id: user.id,
        email: form.email,
        full_name: form.fullName.trim(),
        country: form.country.trim(),
        major: form.major.trim(),
      }
      const { error } = await supabase.from('profiles').upsert(payload)
      if (error) throw error

      const { error: metaError } = await supabase.auth.updateUser({
        data: {
          full_name: payload.full_name,
          about: about.trim(),
          avatar_data: avatarData || '',
        },
      })
      if (metaError) throw metaError

      updateUserProfile({
        name: payload.full_name || user.name,
        country: payload.country,
        major: payload.major,
        about: about.trim(),
        avatarData: avatarData || '',
      })

      toast('Profile updated successfully ✅', 'success')
    } catch (err) {
      toast(err?.message || 'Could not save profile', 'error')
    } finally {
      setSaving(false)
    }
  }

  function handleAvatarUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const maxBytes = MAX_AVATAR_SIZE_MB * 1024 * 1024
    if (file.size > maxBytes) {
      toast(`Please use an image smaller than ${MAX_AVATAR_SIZE_MB}MB.`, 'error')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const nextAvatar = typeof reader.result === 'string' ? reader.result : ''
      setAvatarData(nextAvatar)
      toast('Profile photo updated.', 'success')
    }
    reader.readAsDataURL(file)
  }

  if (!user) return null

  return (
    <div className="main-wrap">
      <section className="page-banner">
        <div className="page-banner-inner">
          <div>
            <div className="page-title">My <em>Profile</em></div>
            <div className="page-sub">Manage your photo and personal information.</div>
          </div>
        </div>
      </section>

      <div className="page-body">
        <div className="profile-card">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              {avatarData ? (
                <img src={avatarData} alt={`${form.fullName || 'Student'} profile`} />
              ) : (
                <span>{(form.fullName || 'U').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <label className="btn btn-outline profile-upload-btn">
              <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
              <i className="fas fa-upload" /> Upload Photo
            </label>
          </div>

          <div className="profile-form-grid">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                value={form.fullName}
                onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" value={form.email} disabled />
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                className="form-input"
                value={form.country}
                onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                placeholder="e.g., Nigeria"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Major / Department</label>
              <input
                className="form-input"
                value={form.major}
                onChange={(e) => setForm((prev) => ({ ...prev, major: e.target.value }))}
                placeholder="e.g., Computer Science"
              />
            </div>
            <div className="form-group profile-about">
              <label className="form-label">About You</label>
              <textarea
                className="form-input"
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Share a short bio, interests, or goals."
              />
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-ghost" onClick={() => router.push('/dashboard')}>Back to Dashboard</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
