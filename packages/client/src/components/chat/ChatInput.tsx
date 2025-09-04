import { useForm } from "react-hook-form";
import { FaArrowUp } from "react-icons/fa";

import { Button } from "../ui/button";

export type ChatFormData = {
    prompt: string;
};

type Props = {
    onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
    const { register, handleSubmit, formState, reset } =
        useForm<ChatFormData>();

    const handleFormSubmit = handleSubmit((data) => {
        reset({ prompt: "" });
        onSubmit(data);
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleFormSubmit();
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            onKeyDown={handleKeyDown}
            className="w-full p-4 flex flex-col gap-2 items-end border-2 rounded-3xl"
        >
            <textarea
                {...register("prompt", {
                    required: true,
                    validate: (data) => data.trim().length > 0,
                })}
                className="w-full border-0 focus:outline-0 resize-none"
                placeholder="Ask me about Belmont Park"
                maxLength={1000}
            />
            <Button
                className="rounded-full w-9 h-9f"
                disabled={formState.isValid == false}
            >
                <FaArrowUp />
            </Button>
        </form>
    );
};

export default ChatInput;
