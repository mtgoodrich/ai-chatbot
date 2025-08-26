import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export type Message = {
    content: string;
    role: "user" | "bot";
};

type Props = {
    messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onCopyMessage = (e: React.ClipboardEvent) => {
        const selection = window.getSelection()?.toString().trim();
        if (selection) {
            e.preventDefault();
            e.clipboardData.setData("text/plain", selection);
        }
    };
    return (
        <>
            {messages.map((message, index) => (
                <div
                    key={message.content + index}
                    onCopy={onCopyMessage}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                    className={`px-4 py-2 rounded-lg ${
                        message.role === "user"
                            ? "bg-blue-400 text-white self-end"
                            : "bg-gray-100 text-black self-start"
                    }`}
                >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
            ))}
        </>
    );
};

export default ChatMessages;
