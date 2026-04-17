"use client";
/* ═══════════════════════════════════════
   useTeam
   Converts: renderTeamList (L3370), renderMcTeamList (L3460),
   renderTeamCard (L3339), addTeamMember (L3366),
   teamEditByName (L3519), teamToggleAccess (L3519),
   teamToggleByData (L3537), openEditMemberModal,
   saveAddMember
═══════════════════════════════════════ */
import { useState, useCallback, useMemo } from 'react';
import { ALL_TEAM_MEMBERS } from '@/lib/constants-data';
import { uid } from '@/lib/utils';
import type { Role, ClinicId } from '@/lib/types';

interface TeamMemberState {
  id: string;
  name: string;
  init: string;
  role: Role;
  email: string;
  phone: string;
  clinic: ClinicId;
  status: 'active' | 'inactive';
  lastActive: string;
  avatar: string;
}

export function useTeam() {
  const [members, setMembers] = useState<TeamMemberState[]>(
    ALL_TEAM_MEMBERS.map((m, i) => ({ ...m, id: `tm-${i}` }))
  );

  // ── Filter by clinic (original renderTeamList takes clinicId) ──
  const getMembersByClinic = useCallback((clinicId: ClinicId) => {
    return members.filter(m => m.clinic === clinicId);
  }, [members]);

  // ── All members ──
  const allMembers = members;

  // ── Add member (original addTeamMember, saveAddMember) ──
  const addMember = useCallback((member: Omit<TeamMemberState, 'id'>) => {
    setMembers(prev => [...prev, { ...member, id: uid('tm') }]);
  }, []);

  // ── Toggle access (original teamToggleAccess) ──
  const toggleAccess = useCallback((id: string) => {
    setMembers(prev => prev.map(m =>
      m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m
    ));
  }, []);

  // ── Edit member (original teamEditByName, openEditMemberModal) ──
  const editMember = useCallback((id: string, updates: Partial<TeamMemberState>) => {
    setMembers(prev => prev.map(m =>
      m.id === id ? { ...m, ...updates } : m
    ));
  }, []);

  // ── Remove member ──
  const removeMember = useCallback((id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  }, []);

  // ── Role-based counts ──
  const roleCounts = useMemo(() => ({
    admin: members.filter(m => m.role === 'admin').length,
    doctor: members.filter(m => m.role === 'doctor').length,
    receptionist: members.filter(m => m.role === 'receptionist').length,
  }), [members]);

  // ── Clinic-based counts ──
  const clinicCounts = useMemo(() => ({
    rawalpindi: members.filter(m => m.clinic === 'rawalpindi').length,
    islamabad: members.filter(m => m.clinic === 'islamabad').length,
  }), [members]);

  return {
    allMembers, members,
    getMembersByClinic, roleCounts, clinicCounts,
    addMember, toggleAccess, editMember, removeMember,
  };
}
