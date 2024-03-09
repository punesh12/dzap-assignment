
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';


const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Web3ReactProvider getLibrary={getLibrary}>
  <App />
</Web3ReactProvider>,
)
