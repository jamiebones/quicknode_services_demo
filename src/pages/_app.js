import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://winter-flashy-bridge.matic-testnet.discover.quiknode.pro/ae69ff1f85e5879c93c84e0f03e49290688bbe6a/`,
      }),
      stallTimeout: 1000,
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "QuickNode Scaling App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
