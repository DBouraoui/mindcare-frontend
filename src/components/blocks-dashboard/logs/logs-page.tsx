import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import useGetLogsInformations from "@/query/useGetLogsInformations";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LogsPage() {
    const { data, isLoading, isError } = useGetLogsInformations();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    if (isLoading) return <p className="text-muted-foreground text-center py-8">Chargement des logs...</p>;
    if (isError || !data) return <p className="text-red-500 text-center py-8">Impossible de charger les logs.</p>;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <div className="space-y-6">
            <Card className="shadow-md border">
                <CardHeader>
                    <CardTitle>Logs d'activité</CardTitle>
                    <CardDescription>Historique des connexions et actions des agents.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Login</TableHead>
                                    <TableHead>Agent</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentData.map((log) => (
                                    <TableRow key={log.id} className="hover:bg-muted/50">
                                        <TableCell className="font-medium">{log.id}</TableCell>
                                        <TableCell>{log.login}</TableCell>
                                        <TableCell>{log.agent.slice(0,50)}...</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true, locale: fr })}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Précédent
                        </Button>
                        <span className="text-sm">{currentPage} / {totalPages}</span>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Suivant
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
