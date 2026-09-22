import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const STORAGE_KEY = "@flui/favorites";

interface FavoritesContextValue {
  favorites: Set<string>;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega os favoritos salvos assim que o app abre
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setFavorites(new Set(JSON.parse(raw) as string[]));
      } catch (err) {
        console.warn("Não foi possível carregar os favoritos", err);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  // Persiste toda vez que a lista mudar (depois do load inicial)
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Array.from(favorites)),
    ).catch((err) => console.warn("Não foi possível salvar os favoritos", err));
  }, [favorites, isLoaded]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite: (id: string) => favorites.has(id),
      toggleFavorite,
    }),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error(
      "useFavorites precisa ser usado dentro de um <FavoritesProvider>",
    );
  }
  return ctx;
}
