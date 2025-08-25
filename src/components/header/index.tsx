import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../public/logo.svg'
import { LiaGamepadSolid } from 'react-icons/lia';


export function Header() {
  return (
    <header className="bg-gray-100 w-full h-24">
        <div className=" max-w-screen-xl mx-auto flex justify-center items-center h-24 sm:justify-between"> 
           <nav className=" flex justify-center items-center gap-4">
                <Link href="/">              
                     <Image 
                        src={logo} alt="logo" 
                        quality={100}
                        priority={true}
                        className="w-full"
                        />
                </Link>

                <Link href="/">              
                   Games 
                </Link>
                
                <Link href="/profile">              
                   Perfil  
                </Link>
           </nav>
           <div className="hidden sm:flex justify-center items-center ">
              <Link href="">              
                <LiaGamepadSolid size={34} color="#475569" />  
              </Link>
           </div>
        </div>
    </header>
  );
}