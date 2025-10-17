"use client"
import { useState } from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import useGetProSchedules from "@/query/useGetProSchedules";
import {ScheduleProModel, UpdateScheduleProModel} from "@/api/models/Pro-models";
import {updateProSchedulesInformations} from "@/api/Pro";

export default function DisplaySchedules() {
    const { data, isLoading, isError } = useGetProSchedules();
    const [selectedSchedule, setSelectedSchedule] = useState<ScheduleProModel | null>(null);
    const [formData, setFormData] = useState<UpdateScheduleProModel | null>(null);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload: UpdateScheduleProModel) =>
            updateProSchedulesInformations(payload),
        onSuccess: () => {
            setSelectedSchedule(null);
            setFormData(null);
            queryClient.invalidateQueries({queryKey: ['schedulesPro']})
        },
    });

    if (isLoading) return <p>Chargement des horaires...</p>;
    if (isError || !data) return <p className="text-red-500">Impossible de charger les horaires.</p>;

    const handleEditClick = (schedule: ScheduleProModel) => {
        setSelectedSchedule(schedule);
        setFormData({
            id: schedule.id.toString(),
            day: schedule.day,
            morningStart: schedule.morning?.start || "",
            morningEnd: schedule.morning?.end || "",
            afternoonStart: schedule.afternoon?.start || "",
            afternoonEnd: schedule.afternoon?.end || "",
            closed: schedule.closed,
        });
    };

    const handleChange = (field: keyof UpdateScheduleProModel, value: string | boolean) => {
        if (!formData) return;
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        if (!formData) return;
        mutation.mutate(formData);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">📅 Vos horaires de la semaine</h2>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Jour</TableHead>
                                <TableHead>Matin</TableHead>
                                <TableHead>Après-midi</TableHead>
                                <TableHead>Fermé</TableHead>
                                <TableHead>Dernière mise à jour</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((schedule: ScheduleProModel) => (
                                <TableRow key={schedule.id}>
                                    <TableCell className="font-medium">{schedule.day}</TableCell>
                                    <TableCell>
                                        {schedule.closed ? "-" : `${schedule.morning?.start}h - ${schedule.morning?.end}h`}
                                    </TableCell>
                                    <TableCell>
                                        {schedule.closed ? "-" : `${schedule.afternoon?.start}h - ${schedule.afternoon?.end}h`}
                                    </TableCell>
                                    <TableCell>
                  <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                          schedule.closed ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      }`}
                  >
                    {schedule.closed ? "Fermé" : "Ouvert"}
                  </span>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {schedule.updatedAt
                                            ? formatDistanceToNow(new Date(schedule.updatedAt), {
                                                addSuffix: true,
                                                locale: fr,
                                            })
                                            : "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Dialog
                                            open={selectedSchedule?.id === schedule.id}
                                            onOpenChange={(open) => {
                                                if (!open) {
                                                    setSelectedSchedule(null);
                                                    setFormData(null);
                                                }
                                            }}
                                        >
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEditClick(schedule)}
                                                >
                                                    <Pencil className="w-4 h-4 mr-1" /> Modifier
                                                </Button>
                                            </DialogTrigger>

                                            {selectedSchedule?.id === schedule.id && formData && (
                                                <DialogContent className="max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle>Modifier les horaires du {formData.day}</DialogTitle>
                                                    </DialogHeader>

                                                    <div className="space-y-4 py-2">
                                                        <div className="flex items-center justify-between">
                                                            <Label>Jour fermé ?</Label>
                                                            <Switch
                                                                checked={formData.closed}
                                                                onCheckedChange={(checked) => handleChange("closed", checked)}
                                                            />
                                                        </div>

                                                        {!formData.closed && (
                                                            <>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div>
                                                                        <Label>Matin (début)</Label>
                                                                        <Input
                                                                            type="number"
                                                                            value={formData.morningStart}
                                                                            onChange={(e) => handleChange("morningStart", e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label>Matin (fin)</Label>
                                                                        <Input
                                                                            type="number"
                                                                            value={formData.morningEnd}
                                                                            onChange={(e) => handleChange("morningEnd", e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div>
                                                                        <Label>Après-midi (début)</Label>
                                                                        <Input
                                                                            type="number"
                                                                            value={formData.afternoonStart}
                                                                            onChange={(e) => handleChange("afternoonStart", e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label>Après-midi (fin)</Label>
                                                                        <Input
                                                                            type="number"
                                                                            value={formData.afternoonEnd}
                                                                            onChange={(e) => handleChange("afternoonEnd", e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        <div className="flex justify-end pt-4">
                                                            <Button onClick={handleSubmit} disabled={mutation.isPending}>
                                                                {mutation.isPending ? "Enregistrement..." : "Enregistrer"}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            )}
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
        </div>
    );
}
