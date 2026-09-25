import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultVehicles,
  userProfile,
  type UserProfile,
  type Vehicle,
} from "./data";

type EditableProfile = Pick<
  UserProfile,
  "name" | "email" | "phone" | "birthDate"
>;

type ProfileContextValue = {
  profile: UserProfile;
  vehicles: Vehicle[];
  defaultVehicle: Vehicle | undefined;
  updateProfile: (updates: EditableProfile) => void;
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  setDefaultVehicle: (vehicleId: string) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState(userProfile);
  const [vehicles, setVehicles] = useState<Vehicle[]>(defaultVehicles);

  const defaultVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.isDefault) ?? vehicles[0],
    [vehicles],
  );

  useEffect(() => {
    if (!defaultVehicle) {
      return;
    }

    setProfile((current) => ({
      ...current,
      vehicle: `${defaultVehicle.name} · ${defaultVehicle.batteryKwh} kWh`,
    }));
  }, [defaultVehicle]);

  const value = useMemo(
    () => ({
      profile,
      vehicles,
      defaultVehicle,
      updateProfile: (updates: EditableProfile) =>
        setProfile((current) => ({
          ...current,
          ...updates,
          avatarInitial: updates.name.trim().charAt(0).toUpperCase(),
        })),
      addVehicle: (vehicle: Omit<Vehicle, "id">) => {
        const normalizedVehicle: Vehicle = {
          ...vehicle,
          id: `vehicle-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        };

        setVehicles((current) => {
          const nextVehicles = current.map((entry) => ({
            ...entry,
            isDefault: vehicle.isDefault ? false : entry.isDefault,
          }));

          if (vehicle.isDefault) {
            return [normalizedVehicle, ...nextVehicles];
          }

          return [...nextVehicles, normalizedVehicle];
        });
      },
      setDefaultVehicle: (vehicleId: string) => {
        setVehicles((current) =>
          current.map((vehicle) => ({
            ...vehicle,
            isDefault: vehicle.id === vehicleId,
          })),
        );
      },
    }),
    [defaultVehicle, profile, vehicles],
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
