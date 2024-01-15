import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
          <QueryClientProvider client={queryClient}>

     <Home />
     </QueryClientProvider>

    </div>
  );
}

export default App;
