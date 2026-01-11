"use client";
import {useState} from "react";

export default function EncoderPage() {
    const [text, setText] = useState<string>("");
    
    return (
    <div><textarea value={text} onChange={(e) => setText(e.target.value)}/>
    <textarea value={text.replaceAll('h', 'hajar').replaceAll('m', 'marouane')}/>
    </div>);
}