"use client";
/* ═══════════════════════════════════════
   useCollaboration
   Converts: renderAllCollab (L6174), renderCareTeam,
   renderActiveCases, renderSharedNotes, renderCollabNotes,
   renderDiscussion (L6289), sendCollabRequest,
   sendDiscussionNote, filterDiscussion, openCollabCase,
   replyToRequest, saveCollabNote, saveReferral,
   saveOpinionRequest, inviteCareTeamMember,
   saveCareTeamMember, exportCollabCSV
═══════════════════════════════════════ */
import { useState, useCallback, useMemo } from 'react';
import { COLLAB_CASES, COLLAB_NOTES, INCOMING_REQUESTS } from '@/lib/constants-data';
import { uid, csvSafe, safeDownloadCSV, todayISO } from '@/lib/utils';

interface DiscussionMessage {
  id: string;
  from: string;
  avatar: string;
  text: string;
  time: string;
}

interface CareTeamMember {
  name: string;
  role: string;
  clinic: string;
  avatar: string;
  status: 'active' | 'invited';
}

interface CollabCaseItem {
  id: string;
  patient: string;
  status: 'active' | 'resolved' | 'pending';
  doctor: string;
  lastUpdate: string;
  summary: string;
}

interface CollabNoteItem {
  id: string;
  patient: string;
  doctor: string;
  text: string;
  time: string;
  avatar: string;
}

interface IncomingRequestItem {
  id: string;
  from: string;
  patient: string;
  type: string;
  message: string;
  time: string;
}

export function useCollaboration() {
  const [cases, setCases] = useState<CollabCaseItem[]>(COLLAB_CASES.map(c => ({ ...c })));
  const [notes, setNotes] = useState<CollabNoteItem[]>(COLLAB_NOTES.map(n => ({ ...n })));
  const [requests, setRequests] = useState<IncomingRequestItem[]>(INCOMING_REQUESTS.map(r => ({ ...r })));
  const [discussions, setDiscussions] = useState<DiscussionMessage[]>([
    { id: 'd1', from: 'Dr. Rashid Malik', avatar: 'DR', text: 'I think we should consider stepping down the potency for Ayesha. She has been stable for 3 months now.', time: '2 hrs ago' },
    { id: 'd2', from: 'Dr. Amina Siddiqui', avatar: 'DA', text: 'Agreed. 30C maintenance would be appropriate. Should we also add a constitutional intercurrent?', time: '1 hr ago' },
  ]);
  const [discussionFilter, setDiscussionFilter] = useState('all');
  const [careTeam, setCareTeam] = useState<CareTeamMember[]>([
    { name: 'Dr. Rashid Malik', role: 'Lead Physician', clinic: 'Rawalpindi', avatar: 'DR', status: 'active' },
    { name: 'Dr. Amina Siddiqui', role: 'Consulting Doctor', clinic: 'Islamabad', avatar: 'DA', status: 'active' },
    { name: 'Dr. Tariq Hussain', role: 'External Consultant', clinic: 'External', avatar: 'TH', status: 'invited' },
  ]);

  // ── Add shared note (original saveCollabNote) ──
  const addNote = useCallback((patient: string, text: string, doctor: string, avatar: string) => {
    setNotes(prev => [{
      id: uid('cn'),
      patient,
      doctor,
      text,
      time: 'Just now',
      avatar,
    }, ...prev]);
  }, []);

  // ── Send discussion message (original sendDiscussionNote) ──
  const sendDiscussion = useCallback((text: string, from: string, avatar: string) => {
    if (!text.trim()) return;
    setDiscussions(prev => [...prev, {
      id: uid('disc'),
      from,
      avatar,
      text,
      time: 'Just now',
    }]);
  }, []);

  // ── Reply to request (original replyToRequest) ──
  const replyToRequest = useCallback((requestId: string, response: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
    // Add to discussions
    setDiscussions(prev => [...prev, {
      id: uid('disc'),
      from: 'Dr. Rashid Malik',
      avatar: 'DR',
      text: `Re: ${response}`,
      time: 'Just now',
    }]);
  }, []);

  // ── Add care team member (original saveCareTeamMember) ──
  const addCareTeamMember = useCallback((member: CareTeamMember) => {
    setCareTeam(prev => [...prev, member]);
  }, []);

  // ── Update case status ──
  const updateCaseStatus = useCallback((caseId: string, status: 'active' | 'resolved' | 'pending') => {
    setCases(prev => prev.map(c =>
      c.id === caseId ? { ...c, status } : c
    ));
  }, []);

  // ── Save referral (original saveReferral) ──
  const saveReferral = useCallback((patient: string, to: string, reason: string) => {
    setCases(prev => [{
      id: uid('cc'),
      patient,
      status: 'pending' as const,
      doctor: to,
      lastUpdate: 'Just now',
      summary: reason,
    }, ...prev]);
  }, []);

  // ── Save opinion request (original saveOpinionRequest) ──
  const requestOpinion = useCallback((patient: string, doctor: string, question: string) => {
    setNotes(prev => [{
      id: uid('cn'),
      patient,
      doctor: 'Dr. Rashid Malik',
      text: `Opinion requested from ${doctor}: ${question}`,
      time: 'Just now',
      avatar: 'DR',
    }, ...prev]);
  }, []);

  // ── Export CSV (original exportCollabCSV) ──
  const exportCSV = useCallback(() => {
    const rows = ['Type,Patient,Doctor,Details,Time'];
    notes.forEach(n => {
      rows.push([csvSafe('Note'), csvSafe(n.patient), csvSafe(n.doctor), csvSafe(n.text), csvSafe(n.time)].join(','));
    });
    cases.forEach(c => {
      rows.push([csvSafe('Case'), csvSafe(c.patient), csvSafe(c.doctor), csvSafe(c.summary), csvSafe(c.lastUpdate)].join(','));
    });
    safeDownloadCSV(rows.join('\n'), `collaboration_${todayISO()}.csv`);
  }, [notes, cases]);

  // ── Filtered discussions ──
  const filteredDiscussions = useMemo(() => {
    if (discussionFilter === 'all') return discussions;
    return discussions.filter(d => d.from.toLowerCase().includes(discussionFilter.toLowerCase()));
  }, [discussions, discussionFilter]);

  return {
    cases, notes, requests, discussions: filteredDiscussions, careTeam,
    discussionFilter, setDiscussionFilter,
    addNote, sendDiscussion, replyToRequest,
    addCareTeamMember, updateCaseStatus,
    saveReferral, requestOpinion, exportCSV,
  };
}
