'use client';

import { useState } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { PermissionGate, AdminOnly } from '@/components/PermissionGate';
import {
  UserRole,
  getRoleDisplayName,
  getRoleDescription,
  getRoleBadgeColor,
  getRoleIcon
} from '@/lib/permissions';
import { useAuth } from '@/context/AuthContext';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isCurrentUser?: boolean;
  status: 'active' | 'disabled';
  lastActive?: string;
}

// Demo team members
const demoTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Cronk',
    email: 'john@cronknutrients.com',
    role: 'admin',
    isCurrentUser: true,
    status: 'active',
    lastActive: 'Now',
  },
  {
    id: '2',
    name: 'Sarah Miller',
    email: 'sarah@cronknutrients.com',
    role: 'warehouse',
    status: 'active',
    lastActive: '2 hours ago',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@cronknutrients.com',
    role: 'warehouse',
    status: 'active',
    lastActive: '1 day ago',
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily@cronknutrients.com',
    role: 'viewer',
    status: 'active',
    lastActive: '3 days ago',
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david@cronknutrients.com',
    role: 'viewer',
    status: 'disabled',
    lastActive: '2 weeks ago',
  },
];

const allRoles: UserRole[] = ['admin', 'warehouse', 'viewer'];

export function UsersSettings() {
  const { isAdmin, canManageUsers } = usePermissions();
  const { userProfile, setDemoRole } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(demoTeamMembers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'viewer' as UserRole,
  });

  const handleRoleChange = (memberId: string, newRole: UserRole) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
    setEditingMember(null);
  };

  const handleToggleStatus = (memberId: string) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId
          ? { ...member, status: member.status === 'active' ? 'disabled' : 'active' }
          : member
      )
    );
  };

  const handleInvite = () => {
    if (!inviteForm.name || !inviteForm.email) return;

    const newMember: TeamMember = {
      id: String(teamMembers.length + 1),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: 'active',
      lastActive: 'Pending invitation',
    };

    setTeamMembers(prev => [...prev, newMember]);
    setInviteForm({ name: '', email: '', role: 'viewer' });
    setShowInviteModal(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarGradient = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'from-purple-400 to-pink-500';
      case 'warehouse':
        return 'from-blue-400 to-cyan-500';
      case 'viewer':
        return 'from-slate-400 to-slate-500';
      default:
        return 'from-emerald-400 to-emerald-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Users Panel */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Team Members</h2>
            <p className="text-slate-400 text-sm">Manage team access and permissions</p>
          </div>
          <AdminOnly>
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
            >
              <i className="fas fa-user-plus mr-2"></i>
              Invite User
            </button>
          </AdminOnly>
        </div>

        <div className="space-y-3">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className={`flex items-center justify-between p-4 bg-slate-800/50 border rounded-xl transition-colors ${
                member.status === 'disabled'
                  ? 'border-slate-700/50 opacity-60'
                  : 'border-slate-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${getAvatarGradient(member.role)} rounded-full flex items-center justify-center`}
                >
                  <span className="text-white font-bold">{getInitials(member.name)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{member.name}</span>
                    {member.isCurrentUser && (
                      <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">
                        You
                      </span>
                    )}
                    {member.status === 'disabled' && (
                      <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                        Disabled
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-400">{member.email}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    <i className="fas fa-clock mr-1"></i>
                    {member.lastActive}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Role Badge / Selector */}
                {editingMember === member.id && isAdmin && !member.isCurrentUser ? (
                  <select
                    value={member.role}
                    onChange={e => handleRoleChange(member.id, e.target.value as UserRole)}
                    onBlur={() => setEditingMember(null)}
                    autoFocus
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {allRoles.map(role => (
                      <option key={role} value={role}>
                        {getRoleDisplayName(role)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <button
                    onClick={() => isAdmin && !member.isCurrentUser && setEditingMember(member.id)}
                    className={`px-3 py-1 text-sm rounded-full border ${getRoleBadgeColor(member.role)} ${
                      isAdmin && !member.isCurrentUser ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
                    }`}
                    disabled={!isAdmin || member.isCurrentUser}
                    title={isAdmin && !member.isCurrentUser ? 'Click to change role' : undefined}
                  >
                    <i className={`fas ${getRoleIcon(member.role)} mr-1.5 text-xs`}></i>
                    {getRoleDisplayName(member.role)}
                  </button>
                )}

                {/* Actions Menu */}
                <AdminOnly>
                  {!member.isCurrentUser && (
                    <div className="relative group">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      <div className="absolute right-0 mt-1 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <button
                          onClick={() => setEditingMember(member.id)}
                          className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white flex items-center gap-2"
                        >
                          <i className="fas fa-user-tag w-4"></i>
                          Change Role
                        </button>
                        <button
                          onClick={() => handleToggleStatus(member.id)}
                          className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white flex items-center gap-2"
                        >
                          <i className={`fas ${member.status === 'active' ? 'fa-user-slash' : 'fa-user-check'} w-4`}></i>
                          {member.status === 'active' ? 'Disable User' : 'Enable User'}
                        </button>
                        <hr className="border-slate-700 my-1" />
                        <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                          <i className="fas fa-trash w-4"></i>
                          Remove User
                        </button>
                      </div>
                    </div>
                  )}
                </AdminOnly>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roles Overview */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Available Roles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allRoles.map(role => (
            <div
              key={role}
              className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  role === 'admin' ? 'bg-purple-500/20' :
                  role === 'warehouse' ? 'bg-blue-500/20' :
                  'bg-slate-500/20'
                }`}>
                  <i className={`fas ${getRoleIcon(role)} ${
                    role === 'admin' ? 'text-purple-400' :
                    role === 'warehouse' ? 'text-blue-400' :
                    'text-slate-400'
                  }`}></i>
                </div>
                <span className="font-medium text-white">{getRoleDisplayName(role)}</span>
              </div>
              <p className="text-sm text-slate-400">{getRoleDescription(role)}</p>
              <div className="mt-3 pt-3 border-t border-slate-700/50">
                <span className="text-xs text-slate-500">
                  {teamMembers.filter(m => m.role === role && m.status === 'active').length} active members
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Role Switcher - For testing purposes */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="fas fa-flask text-amber-400"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-amber-400 mb-1">Demo Mode: Role Switcher</h3>
            <p className="text-sm text-slate-400 mb-4">
              Test the permission system by switching between different roles. This is only available in demo mode.
            </p>
            <div className="flex flex-wrap gap-2">
              {allRoles.map(role => (
                <button
                  key={role}
                  onClick={() => setDemoRole(role)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    userProfile?.role === role
                      ? `${getRoleBadgeColor(role)} border-current`
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  <i className={`fas ${getRoleIcon(role)} mr-2`}></i>
                  {getRoleDisplayName(role)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Invite Team Member</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={inviteForm.name}
                  onChange={e => setInviteForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={e => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@company.com"
                  className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Role
                </label>
                <select
                  value={inviteForm.role}
                  onChange={e => setInviteForm(prev => ({ ...prev, role: e.target.value as UserRole }))}
                  className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {allRoles.map(role => (
                    <option key={role} value={role}>
                      {getRoleDisplayName(role)} - {getRoleDescription(role).slice(0, 50)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                disabled={!inviteForm.name || !inviteForm.email}
                className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
