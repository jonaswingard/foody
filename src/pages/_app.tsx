import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import "@/styles/globals.css";
// import { wrapper } from "@/store/store";

const App = function App({ Component, pageProps }: AppProps) {
  // const { store, props } = wrapper.useWrappedStore(rest);
  // const store = useStore(pageProps.pageProps.initialReduxState);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};

export default App;
