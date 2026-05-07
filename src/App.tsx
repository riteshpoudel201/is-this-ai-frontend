import { GravityStarsBackground } from "./components/animate-ui/components/backgrounds/gravity-stars"
// import { BubbleBackground } from './components/animate-ui/components/backgrounds/bubble';
// import { GradientBackground } from '@/components/animate-ui/components/backgrounds/gradient';
import Navbar from "./components/Navbar"
import UploadForm from "./components/UploadForm"

const App = () => {
  return (
    <div className="bg-transparent w-screen h-screen p-4 space-y-6 overflow-y-auto">
      <Navbar />
      <UploadForm />
      <GravityStarsBackground className="absolute inset-0 -z-10 bg-black text-white flex items-center justify-center"/>
      
    </div>
  )
}

export default App
