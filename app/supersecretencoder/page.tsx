"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EncoderPage() {
  const [text, setText] = useState<string>("");

  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Super Secret Encoder
        </h1>
        <p className="text-muted-foreground">
          Transform your text with our secret encoding algorithm
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>Enter the text you want to encode</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full min-h-[300px] p-4 rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Encoded Output</CardTitle>
            <CardDescription>Your encoded message appears here</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={text.replaceAll("h", "hajar").replaceAll("m", "marouane")}
              readOnly
              placeholder="Encoded text will appear here..."
              className="w-full min-h-[300px] p-4 rounded-md border border-input bg-muted resize-none focus:outline-none"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
