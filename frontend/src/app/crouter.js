// src/utils/router.js

import { useRouter as useNextRouter } from 'next/router';

let cachedRouter;

export function useRouter() {
  if (!cachedRouter) {
    cachedRouter = useNextRouter();
  }
  return cachedRouter;
}
