import { QueryClient, QueryClientProvider } from "react-query";
import Home from "pages/home";

// Initialze the client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
