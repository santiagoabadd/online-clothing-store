import React, { useState } from "react";
import AuthForm from "../auth/AuthForm";
import { NavBar } from "../features/navbar/NavBar";


export default function AuthPage() {

     const [cartOpen, setCartOpen] = useState<boolean>(false);
    
      const handleOpenCart = () => {
        
      };
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50">
        <NavBar onOpenCart={handleOpenCart}/>
      <AuthForm/>
    </div>
  )
}

