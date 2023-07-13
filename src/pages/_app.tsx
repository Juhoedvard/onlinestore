import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { NavBar } from "~/components/NavBar";
import { Footer } from "~/components/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  console.log(session)
  return (
    <SessionProvider session={session}>
      <NavBar/>
      <Component {...pageProps} />
      <Footer/>
    </SessionProvider>

  );
};

export default api.withTRPC(MyApp);
