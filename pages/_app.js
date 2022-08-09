import "../styles/globals.css";
import { WalletProvider } from "../context/WalletProvider";

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;
