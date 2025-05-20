import { CardFooter } from "@/components/ui/card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


export default function Loading() {
 return (
   <div className="h-[calc(100vh-4rem)] flex flex-col">
     <Card className="flex-1 flex flex-col rounded-none border-x-0">
       <CardHeader className="pb-3 border-b">
         <CardTitle>Confidence Coach</CardTitle>
         <Skeleton className="h-4 w-3/4" />
       </CardHeader>


       <CardContent className="flex-1 overflow-hidden p-4">
         <div className="space-y-4 h-full">
           <div className="flex justify-start">
             <div className="flex gap-3 max-w-[80%]">
               <Skeleton className="h-10 w-10 rounded-full" />
               <div>
                 <Skeleton className="h-24 w-64 rounded-lg" />
                 <Skeleton className="h-3 w-16 mt-1" />
               </div>
             </div>
           </div>


           <div className="flex justify-end">
             <div className="flex gap-3 max-w-[80%] flex-row-reverse">
               <Skeleton className="h-10 w-10 rounded-full" />
               <div>
                 <Skeleton className="h-16 w-48 rounded-lg" />
                 <Skeleton className="h-3 w-16 mt-1 ml-auto" />
               </div>
             </div>
           </div>


           <div className="flex justify-start">
             <div className="flex gap-3 max-w-[80%]">
               <Skeleton className="h-10 w-10 rounded-full" />
               <div>
                 <Skeleton className="h-20 w-72 rounded-lg" />
                 <Skeleton className="h-3 w-16 mt-1" />
               </div>
             </div>
           </div>
         </div>
       </CardContent>


       <CardFooter className="border-t pt-4 flex-col gap-4">
         <div className="flex justify-center items-center gap-3">
           <Skeleton className="h-6 w-32" />
         </div>
         <Skeleton className="h-10 w-full" />
       </CardFooter>
     </Card>
   </div>
 )
}
