import "@styles/app.scss";
import "@styles/globals.scss";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import { QueryClient, QueryClientProvider } from "react-query";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "one minute",
    mm: "%d minutes",
    h: "one hour",
    hh: "%d hours",
    d: "one day",
    dd: "%d days",
    M: "one month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

const queryClient = new QueryClient();

function Application({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default Application;
