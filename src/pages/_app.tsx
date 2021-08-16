import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import Router from 'next/router';

import { theme } from '../styles/theme'
import Sidebar from '../components/Sidebar'

import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; //styles of nprogress

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Sidebar>
        <Component {...pageProps} />
      </Sidebar>
    </ChakraProvider>
  )
}
export default MyApp
