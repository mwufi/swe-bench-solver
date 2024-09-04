import './App.css'
import SWEBenchViewer from './components/SWEBenchViewer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SWE-bench Dataset Viewer</h1>
      </header>
      <main>
        <SWEBenchViewer />
      </main>
    </div>
  )
}

export default App