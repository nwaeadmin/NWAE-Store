import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Resolver = (signedIn: boolean) => void;

interface AuthModalState {
  open: boolean;
  resolve: Resolver | null;
  /**
   * Open the auth modal and resolve with `true` once the user signs
   * in (or up), or `false` if they close the modal.
   */
  requireAuth: () => Promise<boolean>;
  closeModal: (signedIn: boolean) => void;
}

const Ctx = createContext<AuthModalState | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [resolve, setResolve] = useState<Resolver | null>(null);

  const requireAuth = useCallback(() => {
    return new Promise<boolean>((res) => {
      setResolve(() => res);
      setOpen(true);
    });
  }, []);

  const closeModal = useCallback(
    (signedIn: boolean) => {
      setOpen(false);
      if (resolve) resolve(signedIn);
      setResolve(null);
    },
    [resolve],
  );

  return (
    <Ctx.Provider value={{ open, resolve, requireAuth, closeModal }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuthModal must be used inside provider");
  return ctx;
}
