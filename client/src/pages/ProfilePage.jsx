import { Camera, CheckCircle2, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { MemberLayout } from "../components";
import { mockMember } from "../data/memberMock";
import { useAuth } from "../hooks/useAuth";
import { updateProfileOnServer } from "../services/profileApi";

function getProfileValues(user) {
  return {
    name: user?.name || mockMember.name,
    username: user?.username || mockMember.username,
    email: user?.email || mockMember.email,
    bio: user?.bio || mockMember.bio,
    avatar: user?.profilePic || user?.avatar || mockMember.avatar,
  };
}

function ProfilePage() {
  const { updateProfile, user } = useAuth();
  const [values, setValues] = useState(() => getProfileValues(user));
  const [savedProfile, setSavedProfile] = useState(() =>
    getProfileValues(user),
  );
  const [avatarPreview, setAvatarPreview] = useState(
    () => getProfileValues(user).avatar,
  );
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const avatarInitial = useMemo(
    () => values.name.trim().charAt(0).toUpperCase() || "U",
    [values.name],
  );

  useEffect(
    () => () => {
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    },
    [avatarPreview],
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setIsSaved(false);
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      event.target.value = "";
      setImageFile(null);
      toast.error("Please upload a JPEG, PNG, GIF or WebP image");
      return;
    }

    if (file.size > maxSize) {
      event.target.value = "";
      setImageFile(null);
      toast.error("Profile image must be smaller than 5MB");
      return;
    }

    setImageFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setIsSaved(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setIsSaved(false);

    try {
      const result = await updateProfileOnServer({
        name: values.name.trim(),
        username: values.username.trim(),
        imageFile,
      });
      const nextAvatar = result.user.profilePic || avatarPreview;
      const nextProfile = {
        ...values,
        name: result.user.name,
        username: result.user.username,
        email: result.user.email || values.email,
        avatar: nextAvatar,
      };

      setValues(nextProfile);
      setSavedProfile(nextProfile);
      setAvatarPreview(nextAvatar);
      setImageFile(null);
      updateProfile({
        ...result.user,
        bio: nextProfile.bio,
      });
      setIsSaved(true);
      toast.success("Profile updated successfully");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update profile. Please try again.";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
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
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleAvatarChange}
                disabled={isSaving}
              />
            </label>
            <p className="member-help-text">
              JPEG, PNG, GIF or WebP up to 5MB. A default avatar appears when
              no image is uploaded.
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
              readOnly
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
          <button
            type="submit"
            className="member-primary-button"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save profile"}
          </button>
        </div>
      </form>
    </MemberLayout>
  );
}

export default ProfilePage;
