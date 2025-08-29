import { useRef, useState } from "react";
import axios from "axios";

import BotTypingIndicator from "./BotTypingIndicator";
import ChatInput, { type ChatFormData } from "./ChatInput";
import ChatMessages, { type Message } from "./ChatMessages";

import popSound from "@/assets/sounds/pop.mp3";
import notificationSound from "@/assets/sounds/notification.mp3";

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

type ChatResponse = {
    message: string;
};

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [error, setError] = useState("");

    const conversationId = useRef(crypto.randomUUID());

    const onSubmit = async ({ prompt }: ChatFormData) => {
        try {
            setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
            setIsBotTyping(true);
            setError("");
            popAudio.play();

            const { data } = await axios.post<ChatResponse>("/api/chat", {
                prompt,
                conversationId: conversationId.current,
            });

            setMessages((prev) => [
                ...prev,
                { content: data.message, role: "bot" },
            ]);
            notificationAudio.play();
        } catch (error) {
            console.log(error);
            setError("Something went wrong, try again!");
        } finally {
            setIsBotTyping(false);
        }
    };

    return (
        <div className="flex flex-col w-full h-full max-w-2xl items-center mx-auto">
            <div className="w-full mb-6 lg:mb-10 pb-2 flex flex-col flex-1 gap-3 overflow-y-auto">
                <ChatMessages messages={messages} />
                {isBotTyping && <BotTypingIndicator />}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <ChatInput onSubmit={onSubmit} />
        </div>
    );
};

export default ChatBot;
