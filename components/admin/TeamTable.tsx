'use client';

import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { TeamMember } from '@/app/admin/dashboard/team/page';

interface TeamTableProps {
  team: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (id: number) => void;
}

export default function TeamTable({ team, onEdit, onDelete }: TeamTableProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-white/5">
            <TableHead className="text-gray-400">Image</TableHead>
            <TableHead className="text-gray-400">Name</TableHead>
            <TableHead className="text-gray-400">Position</TableHead>
            <TableHead className="text-gray-400">Bio</TableHead>
            <TableHead className="text-gray-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {team.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                No team members yet. Click "Add Team Member" to create one.
              </TableCell>
            </TableRow>
          ) : (
            team.map((member) => (
              <TableRow key={member.id} className="border-white/10 hover:bg-white/5">
                <TableCell>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </TableCell>
                <TableCell className="text-white font-medium">{member.name}</TableCell>
                <TableCell className="text-gray-400">{member.position}</TableCell>
                <TableCell className="text-gray-400 max-w-md truncate">{member.bio}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    onClick={() => onEdit(member)}
                    variant="ghost"
                    size="sm"
                    className="text-brand-blue hover:text-brand-green hover:bg-white/5"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-gray-900 border-white/10">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Team Member</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                          Are you sure you want to delete "{member.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(member.id)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
