import Keycloak from 'keycloak-js'
import { KeycloakProvider } from 'react-keycloak'
import SpinningLoader from '../components/SpinningLoader'

const keycloak = Keycloak<'native'>({
  clientId: 'small-crypto-web',
  realm: 'SmallCrypto',
  url: 'http://localhost:3010/auth/',
})

export default ({ children }) => {
  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={{
        onLoad: 'login-required',
        checkLoginIframe: false,
      }}
      LoadingComponent={<SpinningLoader/>}
    >
      {children}
    </KeycloakProvider>
  )
}
