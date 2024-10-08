"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function QuestionSec() {

  const { toast } = useToast()

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    qsn: ""
  })

  async function sendQsn() {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/post`, input);
      setInput({ qsn: "" });
      return true; 
    } catch (error) {
      console.error('Error posting question:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <section className="w-full h-screen py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ask Me Anything</h1>
            <p className="text-muted-foreground md:text-xl">
              Have a question? Submit it below and I&apos;ll do my best to provide a helpful answer.
            </p>
            <form className="w-full max-w-md mx-auto space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Your Question</Label>
                <Textarea
                  onChange={(e) => {
                    setInput({
                      ...input,
                      qsn: e.target.value
                    })
                  }}
                  id="question"
                  value={input.qsn} // Bind the input value
                  placeholder="Enter your question"
                  className="min-h-[100px]"
                />
              </div>

              <Button
                className="w-full bg-black text-white"
                type="submit"
                disabled={loading}
                variant="outline"
                onClick={async (e) => {
                  e.preventDefault(); // Prevent form submission
                  const success = await sendQsn();
                  if (success) {
                    toast({
                      description: "Your question has been submitted. I appreciate your inquiry.",
                    });
                  } else {
                    toast({
                      variant: "destructive",
                      title: "Uh oh! Something went wrong.",
                      description: "There was a problem with your request.",
                      action: <ToastAction altText="Try again">Try again</ToastAction>,
                    });
                  }
                }}
              >
                {loading ? 'Loading' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
