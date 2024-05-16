"use client";

import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { queryClientAtom } from "jotai-tanstack-query";
import { Provider } from "jotai/react";
import { useHydrateAtoms } from "jotai/react/utils";

import { queryClient } from "@/lib/queries/client";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";

const HydrateAtoms = ({ children }: React.PropsWithChildren) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return <> {children} </>;
};

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <HydrateAtoms>
            <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
          </HydrateAtoms>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      <Toaster closeButton />
      <Analytics />
      <TailwindIndicator />
    </ThemeProvider>
  );
}
