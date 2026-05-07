import type { ReactNode } from "react"

interface NavbarProps {
  title?: ReactNode
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="flex justify-center items-center p-3 py-5 gap-1">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-michroma tracking-wider text-violet-700 text-center">Is this AI? </h1>
      <img src="/Robo.gif" className="scale-100" />
    </div>
  )
}

export default Navbar
