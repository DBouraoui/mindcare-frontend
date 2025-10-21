"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ChevronRight, Lightbulb, Heart, Smile } from "lucide-react";
import { useState } from "react";

const mentalTips = [
    {
        icon: Brain,
        title: "Prenez des pauses régulières",
        description: "Faites une pause de 5 minutes toutes les heures pour détendre votre esprit.",
        category: "Productivité",
        color: "text-blue-500"
    },
    {
        icon: Heart,
        title: "Pratiquez la gratitude",
        description: "Notez 3 choses positives de votre journée chaque soir avant de dormir.",
        category: "Bien-être",
        color: "text-red-500"
    },
    {
        icon: Smile,
        title: "Restez connecté",
        description: "Appelez un proche ou sortez avec un ami au moins une fois par semaine.",
        category: "Social",
        color: "text-yellow-500"
    },
    {
        icon: Lightbulb,
        title: "Dormez suffisamment",
        description: "Visez 7-8h de sommeil par nuit pour maintenir un bon équilibre mental.",
        category: "Santé",
        color: "text-purple-500"
    }
];

export default function Prevention() {
    const [currentTip, setCurrentTip] = useState(0);

    const nextTip = () => {
        setCurrentTip((prev) => (prev + 1) % mentalTips.length);
    };

    const tip = mentalTips[currentTip];
    const Icon = tip.icon;

    return (
        <Card className="border-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Brain className="w-5 h-5 text-primary" />
                            Conseil du jour
                        </CardTitle>
                        <CardDescription>
                            Prenez soin de votre santé mentale
                        </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                        {currentTip + 1}/{mentalTips.length}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-accent/50 space-y-3">
                    <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-background ${tip.color}`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <h3 className="font-semibold">{tip.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {tip.description}
                            </p>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                        {tip.category}
                    </Badge>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full gap-2"
                    onClick={nextTip}
                >
                    Conseil suivant
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    );
}