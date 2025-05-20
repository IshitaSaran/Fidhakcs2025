"use client"


import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"


export default function ConfidenceChatPage() {
 const [messages, setMessages] = useState([
   {
     id: 1,
     role: "bot",
     content:
       "Hi there! I'm your confidence coach. I'm here to help you feel more ready for your job search journey. What's on your mind today?",
     timestamp: new Date(),
   },
 ])
 const [input, setInput] = useState("")
 const [isTyping, setIsTyping] = useState(false)
 const [confidenceLevel, setConfidenceLevel] = useState(1) // Start with 1 out of 5 hearts
 const messagesEndRef = useRef(null)


 // Auto-scroll to bottom of messages
 useEffect(() => {
   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
 }, [messages])


 // No longer saving to localStorage - reset on page refresh


 const handleSendMessage = (e) => {
   e.preventDefault()
   if (!input.trim()) return


   // Add user message
   const userMessage = {
     id: messages.length + 1,
     role: "user",
     content: input,
     timestamp: new Date(),
   }
   setMessages((prev) => [...prev, userMessage])
   setInput("")
   setIsTyping(true)


   // Simulate bot thinking
   setTimeout(
     () => {
       const botResponse = generateBotResponse(input)
       setMessages((prev) => [...prev, botResponse])
       setIsTyping(false)


       // Potentially increase confidence based on interaction
       if (shouldIncreaseConfidence(input, botResponse.content)) {
         increaseConfidence()
       }
     },
     1000 + Math.random() * 1000,
   ) // Random delay between 1-2 seconds
 }


 const generateBotResponse = (userInput) => {
   const userText = userInput.toLowerCase()


   // Check for common confidence issues
   if (
     userText.includes("not qualified") ||
     userText.includes("underqualified") ||
     userText.includes("not enough experience")
   ) {
     return {
       id: messages.length + 2,
       role: "bot",
       content:
         "Remember that job requirements are often wish lists, not strict requirements. Studies show that women typically apply only when they meet 100% of qualifications, while men apply at 60%. You don't need to be 100% qualified to be successful in a role. What specific qualifications are you concerned about?",
       timestamp: new Date(),
     }
   }


   if (userText.includes("rejected") || userText.includes("no response") || userText.includes("didn't get")) {
     return {
       id: messages.length + 2,
       role: "bot",
       content:
         "Rejection is a normal part of the job search process and doesn't reflect your worth or potential. Even the most qualified candidates face rejection. Each application is a learning opportunity. What's one thing you could try differently in your next application?",
       timestamp: new Date(),
     }
   }


   if (
     userText.includes("interview") &&
     (userText.includes("nervous") || userText.includes("anxious") || userText.includes("scared"))
   ) {
     return {
       id: messages.length + 2,
       role: "bot",
       content:
         "Interview nerves are completely normal! Even experienced professionals get nervous. Try reframing the interview as a two-way conversation to see if the company is right for you. Have you prepared any questions to ask them?",
       timestamp: new Date(),
     }
   }


   if (userText.includes("imposter") || userText.includes("fraud") || userText.includes("fake it")) {
     return {
       id: messages.length + 2,
       role: "bot",
       content:
         "Imposter syndrome affects many professionals, especially women. Remember that feeling like an imposter often means you're challenging yourself and growing. What specific accomplishment are you most proud of in your career or education so far?",
       timestamp: new Date(),
     }
   }


   // General encouragement responses
   const encouragementResponses = [
     "You're taking important steps by reflecting on your career journey. What's one small action you could take today to move forward?",
     "Remember that growth happens outside your comfort zone. What's something that feels slightly uncomfortable but exciting about your job search?",
     "Your worth isn't defined by your job title or qualifications. What unique perspectives or strengths do you bring to the table?",
     "Taking action before feeling completely ready is a superpower. Can you think of a time when you did something before feeling 100% ready, and it worked out?",
     "Progress isn't always linear. What's one small win you've had recently that you can celebrate?",
     "You don't have to have everything figured out. What's one small step you can take toward your goals?",
     "Your journey is unique to you. What values are most important to you in your career?",
   ]


   return {
     id: messages.length + 2,
     role: "bot",
     content: encouragementResponses[Math.floor(Math.random() * encouragementResponses.length)],
     timestamp: new Date(),
   }
 }


 const shouldIncreaseConfidence = (userInput, botResponse) => {
   // Check if this interaction should increase confidence
   // This is a simple implementation - in a real app, this would be more sophisticated


   const positiveUserPhrases = ["thank", "helped", "better", "good", "great", "useful", "appreciate"]
   const userHasPositive = positiveUserPhrases.some((phrase) => userInput.toLowerCase().includes(phrase))


   // Randomly increase confidence occasionally to simulate progress
   const randomIncrease = Math.random() > 0.7


   return userHasPositive || randomIncrease
 }


 const increaseConfidence = () => {
   setConfidenceLevel((prev) => Math.min(prev + 1, 5))
 }


 const formatTime = (date) => {
   return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
 }


 // Get confidence level text
 const getConfidenceLevelText = () => {
   switch (confidenceLevel) {
     case 1:
       return "Starting Out"
     case 2:
       return "Building Confidence"
     case 3:
       return "Growing Steadily"
     case 4:
       return "Almost There"
     case 5:
       return "Fully Confident"
     default:
       return "Building Confidence"
   }
 }


 return (
   <div className="h-[calc(100vh-4rem)] flex flex-col">
     <Card className="flex-1 flex flex-col rounded-none border-x-0">
       <CardHeader className="pb-3 border-b">
         <CardTitle>Confidence Coach</CardTitle>
         <CardDescription>Share your thoughts, concerns, or questions about your job search</CardDescription>
       </CardHeader>


       <CardContent className="flex-1 overflow-hidden p-0">
         <ScrollArea className="h-full px-4 py-4">
           <div className="space-y-4">
             {messages.map((message) => (
               <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                 <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                   <Avatar className={message.role === "bot" ? "bg-primary" : "bg-muted"}>
                     <AvatarFallback>{message.role === "bot" ? "CC" : "ME"}</AvatarFallback>
                   </Avatar>
                   <div>
                     <div
                       className={`rounded-lg p-4 ${
                         message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                       }`}
                     >
                       <p className="text-sm">{message.content}</p>
                     </div>
                     <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
                   </div>
                 </div>
               </div>
             ))}


             {isTyping && (
               <div className="flex justify-start">
                 <div className="flex gap-3 max-w-[80%]">
                   <Avatar className="bg-primary">
                     <AvatarFallback>CC</AvatarFallback>
                   </Avatar>
                   <div>
                     <div className="rounded-lg p-4 bg-muted">
                       <div className="flex space-x-2">
                         <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                         <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                         <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             )}


             <div ref={messagesEndRef} />
           </div>
         </ScrollArea>
       </CardContent>


       <CardFooter className="border-t pt-4 flex-col gap-4">
         {confidenceLevel === 5 && (
           <Alert className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200">
             <AlertDescription className="font-medium text-center">
               Congratulations! You are ready and prepared to apply for this job!
             </AlertDescription>
           </Alert>
         )}


         <div className="flex justify-center items-center gap-3">
           <div className="flex space-x-1">
             {[1, 2, 3, 4, 5].map((level) => (
               <Heart
                 key={level}
                 className={`h-6 w-6 ${
                   level <= confidenceLevel ? "fill-pink-500 text-pink-500" : "fill-none text-muted-foreground"
                 }`}
               />
             ))}
           </div>
           <span className="text-sm font-medium text-muted-foreground">
             Confidence Level: {getConfidenceLevelText()}
           </span>
         </div>


         <form onSubmit={handleSendMessage} className="flex-1 w-full">
           <div className="flex gap-2">
             <Input
               placeholder="Type your message..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
               disabled={isTyping}
               className="flex-1"
             />
             <Button type="submit" disabled={!input.trim() || isTyping}>
               Send
             </Button>
           </div>
         </form>
       </CardFooter>
     </Card>
   </div>
 )
}
