import React, { createContext, useContext, useMemo, useState } from "react";
import { UserProfile, userProfile } from "./data";

type EditableProfile = Pick<
  UserProfile,
  "name" | "email" | "phone" | "birthDate"
>;

type ProfileContextValue = {
  profile: UserProfile;
  updateProfile: (updates: EditableProfile) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState(userProfile);

  const value = useMemo(
    () => ({
      profile,
      updateProfile: (updates: EditableProfile) =>
        setProfile((current) => ({
          ...current,
          ...updates,
          avatarInitial: updates.name.trim().charAt(0).toUpperCase(),
        })),
    }),
    [profile],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
}
