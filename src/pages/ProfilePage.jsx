import { Camera, CheckCircle2, User } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MemberLayout } from "../components";
import { mockMember } from "../data/memberMock";

function ProfilePage() {
  const [values, setValues] = useState(mockMember);
  const [savedProfile, setSavedProfile] = useState(mockMember);
  const [avatarPreview, setAvatarPreview] = useState(mockMember.avatar);
  const [isSaved, setIsSaved] = useState(false);

  const avatarInitial = useMemo(
    () => values.name.trim().charAt(0).toUpperCase() || "U",
    [values.name],
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setIsSaved(false);
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextAvatarUrl = URL.createObjectURL(file);
    setAvatarPreview(nextAvatarUrl);
    setValues((current) => ({ ...current, avatar: nextAvatarUrl }));
    setIsSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSavedProfile({ ...values, avatar: avatarPreview });
    setIsSaved(true);
    toast.success("Profile updated successfully");
  }

  return (
    <MemberLayout title="Profile">
      <form className="member-card profile-form" onSubmit={handleSubmit}>
        <div className="profile-avatar-row">
          <div className="profile-avatar-preview" aria-label="Profile image">
            {avatarPreview ? (
              <img src={avatarPreview} alt={savedProfile.name} />
            ) : (
              <span aria-hidden="true">{avatarInitial || <User />}</span>
            )}
          </div>
          <div>
            <label className="member-secondary-button">
              <Camera aria-hidden="true" />
              Upload profile image
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
            <p className="member-help-text">
              JPG or PNG is recommended. A default avatar appears when no image
              is uploaded.
            </p>
          </div>
        </div>

        <div className="member-form-grid">
          <label className="member-field">
            Name
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="member-field">
            Username
            <input
              name="username"
              value={values.username}
              onChange={handleChange}
              required
            />
          </label>
          <label className="member-field member-field-wide">
            Email
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="member-field member-field-wide">
            Bio
            <textarea name="bio" value={values.bio} onChange={handleChange} />
          </label>
        </div>

        {isSaved && (
          <p className="member-success" role="status">
            <CheckCircle2 aria-hidden="true" />
            Profile saved successfully
          </p>
        )}

        <div className="member-form-actions">
          <button type="submit" className="member-primary-button">
            Save profile
          </button>
        </div>
      </form>
    </MemberLayout>
  );
}

export default ProfilePage;
