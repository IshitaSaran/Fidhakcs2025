import "@/app/globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import { cn } from "@/lib/utils"


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })


export const metadata = {
 title: "More Than Ready",
 description: "Helping women apply with confidence, even at 60%",
}


export default function RootLayout({ children }) {
 return (
   <html lang="en" suppressHydrationWarning>
     <body className={cn(inter.className, playfair.variable, "min-h-screen bg-background font-sans")}>
       <ThemeProvider attribute="class" defaultTheme="light">
         <Header />
         <main className="container mx-auto px-4 py-6">{children}</main>
         <Toaster />
       </ThemeProvider>
     </body>
   </html>
 )
}
