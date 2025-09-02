import { Links, Meta, Outlet, Scripts } from "react-router";
import { AppProviders } from "./providers";
export default function Root() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="stylesheet" href="/assets/styles/styles.css" />
      </head>
      <body>
            <AppProviders>
              <Outlet />
            </AppProviders>
        <Scripts />
      </body>
    </html>
  );
}