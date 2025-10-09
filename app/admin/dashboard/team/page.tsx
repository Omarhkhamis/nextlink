'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TeamTable from '@/components/admin/TeamTable';
import TeamModal from '@/components/admin/TeamModal';

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const fetchTeam = async () => {
    try {
      const response = await fetch('/api/team');
      const result = await response.json();
      if (result.data) {
        setTeam(result.data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleSave = async (member: Omit<TeamMember, 'id'>) => {
    try {
      if (editingMember) {
        const response = await fetch(`/api/team/${editingMember.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(member),
        });
        const result = await response.json();
        if (result.data) {
          setTeam(team.map(m => m.id === editingMember.id ? result.data : m));
        }
      } else {
        const response = await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(member),
        });
        const result = await response.json();
        if (result.data) {
          setTeam([result.data, ...team]);
        }
      }
      setIsModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/team/${id}`, { method: 'DELETE' });
      setTeam(team.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  const handleAdd = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Team</h1>
          <p className="text-gray-400">Manage your team members</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-brand-blue hover:bg-brand-green text-black font-semibold"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <TeamTable
        team={team}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TeamModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSave}
        member={editingMember}
      />
    </div>
  );
}
