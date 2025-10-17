"use client"

import * as React from "react"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import { readNotification} from "@/api/Notification"
import { ReadNotificationModel} from "@/api/models/Notification-models."
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {AlertTriangle, BellRing, CheckCircle2, Eye, Info} from "lucide-react";
import {Badge} from "@/components/ui/badge"
import {cn} from "@/lib/utils";
import {formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale"
import { motion } from "framer-motion"
import {toast} from "sonner";
import useGetNotifications from "@/query/useGetNotifications";

export default function Notification() {
    const queryClient = useQueryClient()

    const { data, isPending } = useGetNotifications()

    const mutation = useMutation({
        mutationFn: (notificatioId : ReadNotificationModel)=> readNotification(notificatioId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
            toast.success("Notification validée")
        },

        // (optionnel) petit feedback console ou toast
        onError: (err) => {
            console.error("Erreur lors de la validation :", err)
        },
    })

    function handleReadNotification(notificatioId: ReadNotificationModel) {
        mutation.mutate(notificatioId)
    }

    const getIcon = (type: string) => {
        switch (type) {
            case "warning":
                return <AlertTriangle className="text-yellow-500" size={18} />
            case "alert":
                return <BellRing className="text-red-500" size={18} />
            case "success":
                return <CheckCircle2 className="text-green-500" size={18} />
            default:
                return <Info className="text-blue-500" size={18} />
        }
    }

    const getBadgeVariant = (type: string) => {
        switch (type) {
            case "warning":
                return "destructive"
            case "alert":
                return "destructive"
            case "success":
                return "default"
            default:
                return "secondary"
        }
    }

    return (
        <Drawer direction={"right"} disablePreventScroll={true}>
            <DrawerTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer pl-2 text-sm py-2 hover:bg-accent rounded-md">
                    <BellRing className="text-muted-foreground size-4" />
                    <span>Notifications</span>
                </div>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Vos notifications</DrawerTitle>
                    <DrawerDescription>
                        {isPending ? "Chargement..." : "Dernières activités sur votre compte"}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="p-4 space-y-3 overflow-y-auto">
                    {isPending && (
                        <div className="text-center text-muted-foreground py-8">
                            Chargement...
                        </div>
                    )}

                    {!isPending && data && data.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            Aucune notification pour le moment 🎉
                        </div>
                    )}

                    {!isPending &&
                        data?.map((notif) => {
                            const isRead = !!notif.readAt
                            return (
                                <div
                                    key={notif.id}
                                    className={cn(
                                        "flex items-start gap-3 rounded-lg border p-3 transition-all duration-200",
                                        isRead
                                            ? "bg-muted/30 border-muted opacity-80 scale-[0.98]"
                                            : "bg-background border-primary/20 hover:bg-muted/50 scale-100"
                                    )}
                                >
                                    {/* Indicateur visuel si non lu */}
                                    {!isRead && (
                                        <span className="h-2 w-2 rounded-full bg-blue-500 mt-2 ml-1" />
                                    )}

                                    <div className="mt-1">{getIcon(notif.type)}</div>

                                    <div className="flex flex-col flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p
                                                className={cn(
                                                    "font-medium text-sm",
                                                    !isRead && "font-semibold text-foreground"
                                                )}
                                            >
                                                {notif.title}
                                            </p>
                                            <Badge variant={getBadgeVariant(notif.type)}>{notif.type}</Badge>
                                        </div>

                                        <p
                                            className={cn(
                                                "text-sm mt-1",
                                                isRead ? "text-muted-foreground" : "text-foreground"
                                            )}
                                        >
                                            {notif.description}
                                        </p>

                                        <p className="text-xs text-muted-foreground mt-2">
                                            {/*@ts-ignore*/}
                                            {formatDistanceToNow(new Date(notif.createdAt), {
                                                addSuffix: true,
                                                locale: fr,
                                            })}
                                        </p>
                                    </div>


                                    {!isRead ? (
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleReadNotification({ id: notif.id.toString() })}
                                            className="ml-auto text-blue-600 hover:text-blue-800 transition"
                                        >
                                            <Eye size={20} />
                                        </motion.button>
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="ml-auto text-green-500"
                                        >
                                            <CheckCircle2 size={20} />
                                        </motion.div>
                                    )}
                                </div>
                            )
                        })}
                </div>

                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline" className="w-full">
                            Fermer
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
