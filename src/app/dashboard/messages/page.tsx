"use client"

import useGetConversation from "@/query/useGetConversation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Loader2 } from "lucide-react";
import {  parseISO, isToday, isYesterday, format } from "date-fns";
import { fr } from "date-fns/locale";
import ConversationMessage from "@/components/blocks-dashboard/messages/Conversation-message";

export default function ConversationPage() {
    const { data, isLoading, isError } = useGetConversation();

    const formatMessageTime = (dateString: string) => {
        const date = parseISO(dateString);
        if (isToday(date)) return format(date, "HH:mm");
        if (isYesterday(date)) return "Hier";
        return format(date, "dd/MM", { locale: fr });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">Chargement...</p>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Impossible de charger vos messages</p>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center space-y-1">
                    <p className="font-medium">Aucun message</p>
                    <p className="text-sm text-muted-foreground">Commencez une conversation avec un praticien</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto">
            {/* Header */}
            <div className="mb-6 pb-4 border-b">
                <h1 className="text-xl font-semibold">Messages</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                    {data.length} conversation{data.length > 1 ? "s" : ""}
                </p>
            </div>

            {/* Liste des conversations */}
            <div className="space-y-1">
                {data.map((conv: any) => {
                    const hasUnread = conv.unreadCount > 0;

                    return (
                        <Card
                            key={conv.id}
                            className="hover:bg-accent/50 transition-colors border-0 shadow-none group"
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    {/* Avatar */}
                                    <div
                                        className="relative cursor-pointer"
                                        onClick={() => console.log("Open conversation", conv.id)}
                                    >
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                                                {conv.firstname?.charAt(0)}{conv.lastname?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        {/* Badge online (optionnel) */}
                                        {conv.isOnline && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                                        )}
                                    </div>

                                    {/* Contenu */}
                                    <div
                                        className="flex-1 min-w-0 cursor-pointer"
                                        onClick={() => console.log("Open conversation", conv.id)}
                                    >
                                        <div className="flex items-baseline justify-between gap-2 mb-1">
                                            <p className={`font-semibold truncate ${hasUnread ? 'text-foreground' : ''}`}>
                                                {conv.firstname} {conv.lastname}
                                            </p>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {formatMessageTime(conv.createdAt)}
                                            </span>
                                        </div>

                                        {/* Dernier message */}
                                        {conv.lastMessage ? (
                                            <div className="flex items-center gap-2">
                                                <p className={`text-sm line-clamp-1 flex-1 ${
                                                    hasUnread
                                                        ? 'font-medium text-foreground'
                                                        : 'text-muted-foreground'
                                                }`}>
                                                    {conv.lastMessage.lastSenderfirstname === "Vous" && (
                                                        <span className="text-muted-foreground">Vous: </span>
                                                    )}
                                                    {conv.lastMessage.message}
                                                </p>
                                                {hasUnread && (
                                                    <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs shrink-0">
                                                        {conv.unreadCount}
                                                    </Badge>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground italic">
                                                Aucun message
                                            </p>
                                        )}
                                    </div>

                                    {/* Composant ConversationMessage */}
                                    <div className="shrink-0">
                                        <ConversationMessage conversationId={conv.id} convPersonne={conv.lastname+" "+conv.firstname} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}