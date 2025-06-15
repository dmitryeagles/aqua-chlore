import type { RouteLocationAsRelativeTyped, Router } from 'vue-router';

export const getRouteUrl = (router: Router, options: RouteLocationAsRelativeTyped) => {
  const routeHref = router.resolve(options).href;

  return `${window.location.origin}${routeHref}`;
};
