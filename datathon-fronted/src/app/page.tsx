"use client";

import {useEffect, useRef, useState} from "react";
import {EmptyContent} from "@/app/components/EmptyView";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dracula} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import searchIcon from "@/app/assets/arrow-small-up.svg";
import Image from "next/image";

// Définition du type pour les messages
type Message = {
    role: "assistant" | "user";
    content: string;
};

// Composant principal de la page d'accueil
export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [streamResponse, setStreamResponse] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const responseContainerRef = useRef(null);

    // Fonction pour faire défiler automatiquement vers le bas
    const scrollToBottom = () => {
        if (responseContainerRef.current) {
            responseContainerRef.current.scrollTop = responseContainerRef.current.scrollHeight;
        }
    };

    // Effet pour déclencher le scroll automatique quand la réponse change
    useEffect(() => {
        scrollToBottom();
    }, [streamResponse]);

    // Fonction pour récupérer la réponse de l'assistant en streaming
    const fetchResponse = async (question: string) => {
        try {
            const response = await fetch("http://localhost:8000/answer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({text: question}),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error("No reader available");
            }

            const decoder = new TextDecoder();
            let assistantMessage = "";

            while (true) {
                const {done, value} = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, {stream: true});
                assistantMessage += chunk;
                setStreamResponse(assistantMessage);
            }

            // Ajouter la réponse finale à la liste des messages
            const assistantResponse: Message = {
                role: "assistant",
                content: assistantMessage,
            };
            setMessages((prevMessages) => [...prevMessages, assistantResponse]);
            setStreamResponse(""); // Réinitialiser le stream après l'ajout du message
        } catch (error) {
            console.error("Erreur:", error);
            setStreamResponse("Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async () => {
        const input = document.getElementById("message") as HTMLTextAreaElement;
        const answer = input.value.trim();

        if (!answer) return; // Ne pas soumettre de message vide

        const userMessage: Message = {
            role: "user",
            content: answer,
        };

        scrollToBottom()
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setIsLoading(true);
        await fetchResponse(userMessage.content);
        input.value = "";
    };

    return (
        <main
            ref={responseContainerRef}
            id="main"
            className="flex items-center justify-center h-screen w-full overflow-x-hidden">
            <div className="flex flex-col items-center justify-center w-3/4 h-full relative">
                <div className="w-full flex-1">
                    <div className="h-48 w-full"></div>
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-start justify-center w-fit p-3 rounded-3xl my-2 ${
                                    message.role === "user" ? "ml-auto bg-gray-100" : "mr-auto"
                                }`}
                            >
                                <p className="text-black/70 text-sm">
                                    {message.role === "user" ? "Vous" : "Assistant"}
                                </p>
                                <div className="text-black text-sm">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]} // Plugin pour les fonctionnalités avancées
                                        components={{
                                            code({node, inline, className, children, ...props}) {
                                                const match = /language-(\w+)/.exec(className || "");
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        style={dracula} // Thème pour le code
                                                        language={match[1]}
                                                        PreTag="div"
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, "")}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                        }}
                                    >
                                        {message.content.replace(/\\n/g, "\n").replace(/^"|"$/g, '')}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))
                    ) : (
                        <EmptyContent/>
                    )}
                    {streamResponse.length > 0 && (
                        <div
                            className="flex flex-col items-start justify-center w-fit bg-gray-100 p-3 rounded-xl my-2 mr-auto">
                            <p className="text-black/70 text-sm">
                                Assistant
                            </p>
                            <ReactMarkdown
                                className={"text-black text-sm"}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({node, inline, className, children, ...props}) {
                                        const match = /language-(\w+)/.exec(className || "");
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={dracula}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, "")}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            >
                                {streamResponse}
                            </ReactMarkdown>
                        </div>
                    )}
                    <div className="h-48 w-full"></div>
                    {/* Espace pour éviter que le formulaire ne cache les messages */}
                </div>
                <div className="w-3/4 bg-white fixed bottom-0 p-5">
                    <div className="relative">
            <textarea
                placeholder="Posez votre question ici..."
                className="resize-none w-full outline-none bg-gray-50 h-24 rounded-3xl border-2 border-gray-200 px-4 py-2 pr-20"
                name="message"
                id="message"
                onKeyDown={async (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        await handleSubmit();
                    }
                }}
            />
                        <button
                            onClick={handleSubmit}
                            className="absolute right-4 bottom-4 border-4 border-black text-white rounded-full hover:bg-gray-50 transition-colors"
                        >
                            <Image className={"text-white"} src={searchIcon} alt="search" width={24} height={24}/>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}