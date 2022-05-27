import { NetworkFirst } from 'workbox-strategies';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: 'navigation',
  })
);

registerRoute(navigationRoute);
