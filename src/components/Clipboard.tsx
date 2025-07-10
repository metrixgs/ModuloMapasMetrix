import { useState } from "react";

import { BiSolidCopy, BiCheck } from "react-icons/bi";

import Button from "@components/UI/Button";

interface ClipboardProps {
  value: string;
} 

const Clipboard = ({ value }: ClipboardProps) => {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      className="min-w-24 h-8"
      disabled={copied}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => { setCopied(false) }, 2000)
      }}
    >
      <span className="w-full flex gap-2 justify-center items-center">
        { copied ? <BiCheck className="text-primary-400" /> : <BiSolidCopy /> }
        <span>Copiar</span>
      </span>
    </Button>
  )
}

export default Clipboard;