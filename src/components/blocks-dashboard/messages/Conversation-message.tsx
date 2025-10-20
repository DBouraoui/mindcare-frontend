"use client"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Send, MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import useGetAllMessage from "@/query/useGetAllMessage";
import MutationSendMessage from "@/mutation/mutationSendMessage";

export default function ConversationMessage({ conversationId }: { conversationId: string }) {
    const { data, isLoading, isError } = useGetAllMessage(conversationId);
    const mutation = MutationSendMessage(conversationId);

    const [text, setText] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll automatique vers le bas à chaque nouveau message
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [data]);

    function handleSendMessage() {
        if (!text.trim()) return;
        mutation.mutate(
            { conversationId, text },
            {
                onSuccess: () => {
                    setText("");
                },
            }
        );
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <MessageSquare className="w-4 h-4" /> Voir la conversation
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-2xl h-[80vh] flex flex-col p-0 overflow-hidden">
                <AlertDialogHeader className="border-b px-6 py-4 bg-muted/50">
                    <AlertDialogTitle className="text-lg font-semibold">
                        Conversation #{conversationId}
                    </AlertDialogTitle>
                </AlertDialogHeader>

                {/* Zone des messages */}
                <div className="flex-1 overflow-hidden">
                    <ScrollArea ref={scrollRef} className="h-full p-6">
                        {isLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-4 w-48" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : isError ? (
                            <p className="text-center text-muted-foreground mt-10">
                                Erreur de chargement des messages.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {data?.map((msg: any) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${
                                            msg.sender?.id === "me" ? "justify-end" : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[70%] p-3 rounded-xl shadow-sm ${
                                                msg.sender?.id === "me"
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted"
                                            }`}
                                        >
                                            <p className="text-sm">{msg.content}</p>
                                            <span className="text-[10px] opacity-70 block text-right mt-1">
                        {format(new Date(msg.createdAt), "HH:mm", { locale: fr })}
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>

                {/* Champ d’envoi */}
                <div className="border-t p-4 flex items-center gap-3 bg-background">
                    <Input
                        placeholder="Écrire un message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        disabled={mutation.isPending}
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={!text.trim() || mutation.isPending}
                        className="gap-2"
                    >
                        <Send className="w-4 h-4" />
                        Envoyer
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
