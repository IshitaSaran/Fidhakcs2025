"use client"


import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, ArrowRightIcon, Activity, FileText, BookIcon as BookJournal, Heart } from "lucide-react"


export default function Home() {
 const [currentTestimonial, setCurrentTestimonial] = useState(0)


 // Auto-rotate testimonials every 5 seconds
 useEffect(() => {
   const interval = setInterval(() => {
     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
   }, 5000)
   return () => clearInterval(interval)
 }, [])


 const nextTestimonial = () => {
   setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
 }


 const prevTestimonial = () => {
   setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
 }


 return (
   <div className="space-y-16 py-8">
     {/* Hero Section */}
     <section className="flex flex-col items-center justify-center gap-8 md:gap-16 mb-16">
       <div className="w-full max-w-4xl">
         <img
           src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-19%20at%209.24.18%E2%80%AFPM-zWQAE76gttOcJmJIVwMaE77bWWKy6i.png"
           alt="More Than Ready - Helping women apply with confidence"
           className="w-full h-auto rounded-lg"
         />
       </div>
       <div className="flex flex-wrap gap-4 justify-center">
         <Button size="lg" asChild className="rounded-full px-6 bg-pink-500 hover:bg-pink-600">
           <Link href="/survey">
             Take Assessment <ArrowRightIcon className="ml-2 h-4 w-4" />
           </Link>
         </Button>
         <Button
           size="lg"
           variant="outline"
           asChild
           className="rounded-full px-6 border-pink-300 text-pink-700 hover:bg-pink-50"
         >
           <Link href="/about">Learn More</Link>
         </Button>
       </div>
     </section>


     {/* Features Section */}
     <section className="space-y-8">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <Link href="/survey" className="block group">
           <div className="relative">
             <div className="blob-shape bg-pink-100 w-full aspect-square absolute transform group-hover:scale-105 transition-transform"></div>
             <div className="relative z-10 p-6 flex flex-col items-center text-center h-full">
               <div className="bg-white rounded-full p-4 shadow-md mb-4">
                 <Activity className="h-8 w-8 text-pink-500" />
               </div>
               <h3 className="text-xl font-medium mb-2 font-serif">Readiness Assessment</h3>
               <p className="text-muted-foreground">
                 Take our survey to assess your skills and discover how ready you really are.
               </p>
               <div className="mt-4 text-pink-500 font-medium">Try it →</div>
             </div>
           </div>
         </Link>


         <Link href="/resume-parser" className="block group">
           <div className="relative">
             <div className="wavy-shape bg-purple-100 w-full aspect-square absolute transform group-hover:scale-105 transition-transform"></div>
             <div className="relative z-10 p-6 flex flex-col items-center text-center h-full">
               <div className="bg-white rounded-full p-4 shadow-md mb-4">
                 <FileText className="h-8 w-8 text-purple-500" />
               </div>
               <h3 className="text-xl font-medium mb-2 font-serif">Resume Parser</h3>
               <p className="text-muted-foreground">
                 Upload your resume and compare it to job descriptions to see how well you match.
               </p>
               <div className="mt-4 text-purple-500 font-medium">Try it →</div>
             </div>
           </div>
         </Link>


         <Link href="/journal" className="block group">
           <div className="relative">
             <div className="cloud-shape bg-indigo-100 w-full aspect-square absolute transform group-hover:scale-105 transition-transform"></div>
             <div className="relative z-10 p-6 flex flex-col items-center text-center h-full">
               <div className="bg-white rounded-full p-4 shadow-md mb-4">
                 <BookJournal className="h-8 w-8 text-indigo-500" />
               </div>
               <h3 className="text-xl font-medium mb-2 font-serif">Application Journal</h3>
               <p className="text-muted-foreground">
                 Document your journey with personal reflections.
               </p>
               <div className="mt-4 text-indigo-500 font-medium">Try it →</div>
             </div>
           </div>
         </Link>


         <Link href="/confidence-chat" className="block group">
           <div className="relative">
             <div className="blob-shape bg-rose-100 w-full aspect-square absolute transform group-hover:scale-105 transition-transform"></div>
             <div className="relative z-10 p-6 flex flex-col items-center text-center h-full">
               <div className="bg-white rounded-full p-4 shadow-md mb-4">
                 <Heart className="h-8 w-8 text-rose-500" />
               </div>
               <h3 className="text-xl font-medium mb-2 font-serif">Confidence Coach</h3>
               <p className="text-muted-foreground">
                 Chat with our lovely coach to overcome job search anxiety and get the role you deserve.
               </p>
               <div className="mt-4 text-rose-500 font-medium">Try it →</div>
             </div>
           </div>
         </Link>
       </div>
     </section>


     {/* Testimonials Carousel Section */}
     <section className="space-y-8">
       <h2 className="text-3xl font-serif font-bold text-center">Success Stories</h2>
       <div className="relative">
         <div className="overflow-hidden">
           <div
             className="flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
           >
             {testimonials.map((testimonial, index) => (
               <div key={index} className="w-full flex-shrink-0 px-4">
                 <TestimonialCard name={testimonial.name} role={testimonial.role} quote={testimonial.quote} />
               </div>
             ))}
           </div>
         </div>


         <div className="flex justify-center items-center mt-6 gap-2">
           <Button
             variant="outline"
             size="icon"
             onClick={prevTestimonial}
             className="rounded-full border-pink-300 text-pink-500 hover:bg-pink-50"
           >
             <ArrowLeft className="h-4 w-4" />
           </Button>


           <div className="flex gap-2">
             {testimonials.map((_, index) => (
               <button
                 key={index}
                 className={`w-3 h-3 rounded-full transition-colors ${
                   currentTestimonial === index ? "bg-pink-500" : "bg-pink-200"
                 }`}
                 onClick={() => setCurrentTestimonial(index)}
               />
             ))}
           </div>


           <Button
             variant="outline"
             size="icon"
             onClick={nextTestimonial}
             className="rounded-full border-pink-300 text-pink-500 hover:bg-pink-50"
           >
             <ArrowRight className="h-4 w-4" />
           </Button>
         </div>
       </div>
     </section>


     {/* CTA Section */}
     <section className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 p-8 rounded-xl text-center space-y-6">
       <h2 className="text-3xl font-serif font-bold">Join Our Community</h2>
       <Button size="lg" asChild className="rounded-full px-8 bg-pink-500 hover:bg-pink-600">
         <Link href="/survey">
           Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
         </Link>
       </Button>
     </section>


     {/* Footer */}
     <footer className="border-t py-6 text-center text-sm text-muted-foreground">
       <p className="flex items-center justify-center gap-1">
         Made with <Heart className="h-4 w-4 text-pink-500 fill-pink-500" /> by Nikunj, Ishita, and Nitya | FidHacks
         2025
       </p>
     </footer>
   </div>
 )
}


// Expanded testimonials array
const testimonials = [
 {
   name: "Sarah J.",
   role: "Software Engineer",
   quote: "I only met 60% of the qualifications but applied anyway. Now I'm thriving in my dream job!",
 },
 {
   name: "Maya T.",
   role: "Marketing Director",
   quote: "More Than Ready gave me the confidence to apply for a leadership position I thought was out of reach.",
 },
 {
   name: "Priya M.",
   role: "Data Scientist",
   quote:
     "I was hesitant to apply for roles requiring 5+ years of experience when I only had 3. The confidence coach helped me recognize my value, and I landed a senior position!",
 },
 {
   name: "Jessica K.",
   role: "Product Manager",
   quote:
     "The resume parser showed me exactly what keywords I was missing. After updating my resume, I started getting interviews for positions I previously thought were beyond my reach.",
 },
 {
   name: "Zoe W.",
   role: "UX Designer",
   quote:
     "Keeping an application journal helped me see patterns in my job search and improve my approach. I'm now working at a company I love with a team that values my contributions.",
 },
]


function TestimonialCard({ name, role, quote }) {
 return (
   <Card className="transition-all hover:shadow-md h-full border-2 border-pink-200 overflow-hidden">
     <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100 rounded-bl-full opacity-50"></div>
     <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-100 rounded-tr-full opacity-50"></div>
     <CardContent className="pt-6 space-y-4 relative z-10">
       <div className="flex items-center gap-4">
         <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold shadow-md">
           {name.charAt(0)}
         </div>
         <div>
           <h3 className="font-semibold font-serif">{name}</h3>
           <p className="text-sm text-muted-foreground">{role}</p>
         </div>
       </div>
       <p className="italic bg-white/50 p-4 rounded-lg border border-pink-100">"{quote}"</p>
     </CardContent>
   </Card>
 )
}


