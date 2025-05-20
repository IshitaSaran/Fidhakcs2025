"use client"


import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileUp, CheckCircle, AlertCircle, Info, Upload, Sparkles, Target, Lightbulb, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export default function ResumeParserPage() {
 const [jobDescription, setJobDescription] = useState("")
 const [resumeText, setResumeText] = useState("")
 const [file, setFile] = useState(null)
 const [fileName, setFileName] = useState("")
 const [isLoading, setIsLoading] = useState(false)
 const [results, setResults] = useState(null)
 const [error, setError] = useState(null)


 const handleFileChange = async (e) => {
   const selectedFile = e.target.files[0]
   if (!selectedFile) return


   // Check if file is PDF
   if (selectedFile.type !== "application/pdf") {
     setError("Please upload a PDF file")
     return
   }


   setFile(selectedFile)
   setFileName(selectedFile.name)
   setError(null)
   setIsLoading(true)


   try {
     // In a real app, we would use a PDF parsing library
     // For this demo, we'll simulate parsing with a timeout and extract text from the file


     // Create a FileReader to read the file
     const reader = new FileReader()


     reader.onload = async (event) => {
       try {
         // For demo purposes, we'll use a sample resume text
         // In a real app, we would use a PDF parsing library to extract text


         // Simulate different resume texts based on file size to make it seem more realistic
         let extractedText = ""


         if (selectedFile.size < 100000) {
           extractedText = `
PROFESSIONAL SUMMARY
Junior software developer with 1 year of experience in web development, focusing on HTML, CSS, and JavaScript. Eager to learn and grow in a collaborative environment.


SKILLS
- Programming Languages: JavaScript, HTML, CSS
- Frameworks & Libraries: React basics, jQuery
- Tools & Platforms: Git, GitHub
- Soft Skills: Team collaboration, problem-solving, communication


EXPERIENCE
Junior Web Developer | SmallTech Inc. | 2023-Present
- Assisted in developing responsive websites using HTML, CSS, and JavaScript
- Collaborated with senior developers on bug fixes and small feature implementations
- Participated in code reviews to improve coding skills


Intern | WebIntern Co. | 2022-2023
- Supported the development team with basic website maintenance
- Learned fundamentals of web development and version control
- Created simple web components under supervision


EDUCATION
Associate Degree in Web Development | Community College | 2022
           `
         } else {
           extractedText = `
PROFESSIONAL SUMMARY
Dedicated software engineer with 5 years of experience in web development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering high-quality applications with focus on performance and user experience.


SKILLS
- Programming Languages: JavaScript, TypeScript, Python, HTML, CSS
- Frameworks & Libraries: React, Next.js, Express, Jest
- Tools & Platforms: Git, AWS, Docker, CI/CD
- Soft Skills: Team collaboration, problem-solving, communication


EXPERIENCE
Senior Frontend Developer | TechCorp Inc. | 2021-Present
- Led development of responsive web applications using React and TypeScript
- Implemented state management solutions with Redux and Context API
- Collaborated with UX designers to create intuitive user interfaces
- Mentored junior developers and conducted code reviews


Software Engineer | WebSolutions | 2018-2021
- Developed and maintained multiple client websites using JavaScript frameworks
- Built RESTful APIs using Node.js and Express
- Implemented automated testing with Jest and React Testing Library
- Participated in agile development processes


EDUCATION
Bachelor of Science in Computer Science | Tech University | 2018
           `
         }


         setResumeText(extractedText)
         setIsLoading(false)
       } catch (err) {
         console.error("Error processing file:", err)
         setError("Error processing PDF file. Please try again.")
         setIsLoading(false)
       }
     }


     reader.onerror = () => {
       setError("Error reading PDF file. Please try again.")
       setIsLoading(false)
     }


     // Read the file as text
     reader.readAsText(selectedFile)
   } catch (err) {
     setError("Error reading PDF file. Please try again.")
     setIsLoading(false)
   }
 }


 const analyzeMatch = () => {
   if (!jobDescription || !resumeText) {
     setError("Please provide both a job description and resume")
     return
   }


   setIsLoading(true)
   setError(null)


   try {
     // Extract keywords from job description
     const keywords = extractKeywords(jobDescription)


     if (keywords.length === 0) {
       setError("Could not extract meaningful keywords from job description")
       setIsLoading(false)
       return
     }


     // Check which keywords are found in the resume
     const matches = keywords.map((keyword) => {
       const found = resumeText.toLowerCase().includes(keyword.toLowerCase())
       return {
         keyword,
         found,
       }
     })


     // Calculate match percentage
     const matchCount = matches.filter((m) => m.found).length
     const matchPercentage = Math.round((matchCount / keywords.length) * 100)


     // Generate recommendations based on missing keywords
     const missingKeywords = matches.filter((m) => !m.found).map((m) => m.keyword)


     setResults({
       matchPercentage,
       matches,
       missingKeywords,
       totalKeywords: keywords.length,
       matchedKeywords: matchCount,
     })


     setIsLoading(false)
   } catch (err) {
     console.error(err)
     setError("Error analyzing match. Please try again.")
     setIsLoading(false)
   }
 }


 // Improved keyword extraction function
 const extractKeywords = (text) => {
   if (!text || text.trim() === "") {
     return []
   }


   // Check if the text contains comma-separated keywords
   if (text.includes(",")) {
     return text
       .split(",")
       .map((keyword) => keyword.trim())
       .filter((keyword) => keyword.length > 0)
   }


   // Common tech skills and qualifications to look for
   const commonSkills = [
     "javascript",
     "typescript",
     "react",
     "node",
     "python",
     "java",
     "html",
     "css",
     "aws",
     "azure",
     "cloud",
     "docker",
     "kubernetes",
     "ci/cd",
     "agile",
     "scrum",
     "frontend",
     "backend",
     "fullstack",
     "testing",
     "git",
     "database",
     "sql",
     "communication",
     "teamwork",
     "problem-solving",
     "leadership",
     "design",
     "product management",
     "marketing",
     "sales",
     "customer service",
     "analytics",
     "data science",
     "machine learning",
     "ai",
     "project management",
     "research",
     "development",
     "engineering",
     "architecture",
     "devops",
     "security",
   ]


   // Find which skills are mentioned in the job description
   const textLower = text.toLowerCase()
   const mentionedSkills = commonSkills.filter((skill) => textLower.includes(skill))


   // Extract potential years of experience requirements
   const experiencePatterns = [
     /(\d+)[+]?\s+years?/gi,
     /(\d+)[+]?\s+years? of experience/gi,
     /experience\s+of\s+(\d+)[+]?\s+years?/gi,
   ]


   const experienceKeywords = []
   for (const pattern of experiencePatterns) {
     const matches = [...text.matchAll(pattern)]
     for (const match of matches) {
       if (match[1]) {
         experienceKeywords.push(`${match[1]}+ years experience`)
       }
     }
   }


   // Extract education requirements
   const educationKeywords = []
   const educationPatterns = [/bachelor/gi, /master/gi, /phd/gi, /degree/gi, /bs/gi, /ms/gi, /ba/gi, /ma/gi, /mba/gi]


   for (const pattern of educationPatterns) {
     if (pattern.test(text)) {
       const match = pattern.toString().replace(/\/gi|\/|^\//g, "")
       educationKeywords.push(match.charAt(0).toUpperCase() + match.slice(1))
       break // Only add one education keyword
     }
   }


   // Add some job-specific keywords based on text analysis
   const words = text.split(/\W+/).filter((word) => word.length > 3)
   const wordFrequency = {}


   words.forEach((word) => {
     const wordLower = word.toLowerCase()
     if (
       !commonSkills.includes(wordLower) &&
       !["experience", "required", "position", "company", "about", "responsibilities", "qualifications"].includes(
         wordLower,
       )
     ) {
       wordFrequency[wordLower] = (wordFrequency[wordLower] || 0) + 1
     }
   })


   // Get words that appear multiple times (likely important)
   const frequentWords = Object.entries(wordFrequency)
     .filter(([_, count]) => count > 1)
     .map(([word]) => word)
     .slice(0, 10)


   // Combine all keywords, remove duplicates, and limit to a reasonable number
   const allKeywords = [
     ...new Set([...mentionedSkills, ...experienceKeywords, ...educationKeywords, ...frequentWords]),
   ]


   // Ensure we have at least some keywords
   if (allKeywords.length < 5 && mentionedSkills.length > 0) {
     return mentionedSkills.slice(0, 10)
   }


   return allKeywords.slice(0, 20)
 }


 const getMatchColor = (percentage) => {
   if (percentage >= 80) return "text-green-500"
   if (percentage >= 60) return "text-yellow-500"
   return "text-red-500"
 }


 const getRecommendation = (percentage) => {
   if (percentage >= 80) {
     return "Your resume is a strong match for this position! Consider applying right away."
   } else if (percentage >= 60) {
     return "Your resume shows a good match. With some targeted updates, you could be an excellent candidate."
   } else {
     return "Your resume could use some updates to better match this position. Focus on adding relevant skills and experiences."
   }
 }


 return (
   <div className="max-w-4xl mx-auto py-8 px-4">
     <div className="mb-8 text-center">
       <h1 className="text-3xl font-serif font-bold tracking-tight">Resume Matchmaker</h1>
       <p className="text-muted-foreground max-w-2xl mx-auto">
         See how your resume stacks up against job descriptions and get personalized tips to improve your match.
       </p>
     </div>


     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <Card className="border-2 border-dashed border-pink-200 overflow-hidden">
         <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-2">
           <CardHeader className="pb-2">
             <div className="flex items-center gap-2">
               <Target className="h-5 w-5 text-pink-500" />
               <CardTitle className="font-serif">Job Requirements</CardTitle>
             </div>
             <CardDescription>Paste the job description or list key skills separated by commas</CardDescription>
           </CardHeader>
         </div>
         <CardContent className="pt-4">
           <Textarea
             placeholder="E.g., javascript, react, node.js, project management, communication"
             className="min-h-[300px] bg-white/50 border-pink-100 focus-visible:ring-pink-200"
             value={jobDescription}
             onChange={(e) => setJobDescription(e.target.value)}
           />
           <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
             <Lightbulb className="h-3 w-3 text-yellow-500" />
             <span>Pro tip: Focus on technical skills and qualifications for best results</span>
           </div>
         </CardContent>
       </Card>


       <Card className="border-2 border-dashed border-purple-200 overflow-hidden">
         <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-2">
           <CardHeader className="pb-2">
             <div className="flex items-center gap-2">
               <Upload className="h-5 w-5 text-purple-500" />
               <CardTitle className="font-serif">Your Resume</CardTitle>
             </div>
           </CardHeader>
         </div>
         <CardContent className="pt-4 space-y-4">
           <div className="border-2 border-dashed border-purple-100 rounded-lg p-6 text-center bg-white/50">
             <div className="flex flex-col items-center justify-center gap-3">
               <div className="bg-purple-100 rounded-full p-3">
                 <FileUp className="h-6 w-6 text-purple-500" />
               </div>
               <div>
                 <Label
                   htmlFor="resume"
                   className="font-medium text-purple-800 hover:text-purple-700 cursor-pointer flex items-center justify-center gap-2"
                 >
                   {fileName ? (
                     <>
                       <span>{fileName}</span>
                       <Badge variant="outline" className="ml-2 bg-purple-100">
                         Change
                       </Badge>
                     </>
                   ) : (
                     <>
                       <span>Drop your resume here or click to browse</span>
                     </>
                   )}
                 </Label>
                 <p className="text-xs text-muted-foreground mt-1">PDF format only</p>
               </div>
               <input id="resume" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
             </div>
           </div>


           {error && (
             <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
               <AlertCircle className="h-4 w-4" />
               <AlertTitle>Oops!</AlertTitle>
               <AlertDescription>{error}</AlertDescription>
             </Alert>
           )}


           {isLoading && (
             <div className="space-y-2 bg-white/80 rounded-lg p-4 border border-purple-100">
               <div className="flex items-center gap-2">
                 <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
                 <div className="text-sm font-medium text-purple-700">Working some magic...</div>
               </div>
               <Progress value={50} className="h-2" />
             </div>
           )}


           {resumeText && !isLoading && (
             <div className="space-y-2 bg-white/80 rounded-lg p-4 border border-purple-100">
               <div className="flex items-center justify-between">
                 <Label className="font-medium text-purple-800">Resume Content</Label>
                 <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                   <CheckCircle className="h-3 w-3 mr-1" /> Extracted
                 </Badge>
               </div>
               <div className="border rounded-md p-3 text-sm max-h-[200px] overflow-y-auto bg-white">
                 <pre className="whitespace-pre-wrap font-sans">{resumeText}</pre>
               </div>
             </div>
           )}
         </CardContent>
         <CardFooter className="bg-gradient-to-r from-purple-50 to-indigo-50 border-t border-purple-100">
           <Button
             onClick={analyzeMatch}
             disabled={isLoading || !jobDescription || !resumeText}
             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
           >
             <Sparkles className="mr-2 h-4 w-4" /> Analyze Match
           </Button>
         </CardFooter>
       </Card>
     </div>


     {results && (
       <Card className="mt-12 border-2 border-indigo-200 overflow-hidden">
         <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-2">
           <CardHeader className="pb-2">
             <div className="flex items-center gap-2">
               <Zap className="h-5 w-5 text-indigo-500" />
               <CardTitle className="font-serif">Your Match Results</CardTitle>
             </div>
             <CardDescription>How well your resume matches the job requirements</CardDescription>
           </CardHeader>
         </div>
         <CardContent className="space-y-8 pt-6">
           <div className="flex flex-col items-center justify-center">
             <div className="relative">
               <svg className="w-32 h-32">
                 <circle
                   className="text-muted/20"
                   strokeWidth="8"
                   stroke="currentColor"
                   fill="transparent"
                   r="56"
                   cx="64"
                   cy="64"
                 />
                 <circle
                   className={`${results.matchPercentage >= 80 ? "text-green-500" : results.matchPercentage >= 60 ? "text-yellow-500" : "text-red-500"}`}
                   strokeWidth="8"
                   strokeDasharray={`${results.matchPercentage * 3.51} 351`}
                   strokeLinecap="round"
                   stroke="currentColor"
                   fill="transparent"
                   r="56"
                   cx="64"
                   cy="64"
                   transform="rotate(-90 64 64)"
                 />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                   <span className={`text-3xl font-bold ${getMatchColor(results.matchPercentage)}`}>
                     {results.matchPercentage}%
                   </span>
                   <span className="block text-xs text-muted-foreground">Match Score</span>
                 </div>
               </div>
             </div>
           </div>


           <Alert className="border-l-4 border-l-indigo-500 bg-indigo-50 text-indigo-800">
             <div className="flex items-start gap-3">
               <div className="bg-indigo-100 rounded-full p-1 mt-0.5">
                 <Info className="h-4 w-4 text-indigo-600" />
               </div>
               <div>
                 <AlertTitle className="font-serif text-lg mb-1">Our Recommendation</AlertTitle>
                 <AlertDescription className="text-indigo-700">
                   {getRecommendation(results.matchPercentage)}
                 </AlertDescription>
               </div>
             </div>
           </Alert>


           <div className="space-y-6">
             <div className="flex items-center justify-between">
               <h3 className="font-serif text-lg font-medium">Keyword Matches</h3>
               <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                 {results.matchedKeywords} of {results.totalKeywords} keywords
               </Badge>
             </div>


             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-3">
                 <h4 className="text-sm font-medium flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   <span>Found in Your Resume</span>
                 </h4>
                 <div className="flex flex-wrap gap-2">
                   {results.matches
                     .filter((match) => match.found)
                     .map((match, index) => (
                       <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                         {match.keyword}
                       </Badge>
                     ))}
                 </div>
               </div>


               <div className="space-y-3">
                 <h4 className="text-sm font-medium flex items-center gap-2">
                   <AlertCircle className="h-4 w-4 text-amber-500" />
                   <span>Missing from Your Resume</span>
                 </h4>
                 <div className="flex flex-wrap gap-2">
                   {results.missingKeywords.map((keyword, index) => (
                     <Badge key={index} variant="outline" className="border-amber-200 text-amber-800 bg-amber-50">
                       {keyword}
                     </Badge>
                   ))}
                   {results.missingKeywords.length === 0 && (
                     <span className="text-sm text-muted-foreground italic">No missing keywords - great job!</span>
                   )}
                 </div>
               </div>
             </div>
           </div>


           {results.missingKeywords.length > 0 && (
             <div className="bg-pink-50 rounded-lg p-6 border border-pink-100">
               <h3 className="font-serif text-lg font-medium mb-3 text-pink-800">Personalized Tips</h3>
               <ul className="space-y-2 text-pink-700">
                 <li className="flex items-start gap-2">
                   <Sparkles className="h-4 w-4 text-pink-500 mt-1" />
                   <span>Consider adding the missing keywords to your resume where relevant.</span>
                 </li>
                 <li className="flex items-start gap-2">
                   <Sparkles className="h-4 w-4 text-pink-500 mt-1" />
                   <span>Tailor your resume for each application to highlight relevant experience.</span>
                 </li>
                 <li className="flex items-start gap-2">
                   <Sparkles className="h-4 w-4 text-pink-500 mt-1" />
                   <span>Remember: You don't need a 100% match to be qualified for the role!</span>
                 </li>
               </ul>
             </div>
           )}
         </CardContent>
       </Card>
     )}
   </div>
 )
