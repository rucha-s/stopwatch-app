import "@/styles/style.scss";
import type { AppProps } from "next/app";
// import Wrapper from "@/components/Wrapper";


export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  )
}
