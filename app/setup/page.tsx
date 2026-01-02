'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useOrganization } from '@/context/OrganizationContext'
import { OrganizationInvite, PlanType, PLAN_LIMITS } from '@/types/organization'
import { seedOrganizationData } from '@/lib/seedData'

type SetupStep = 'choice' | 'create' | 'invites'

export default function OrganizationSetupPage() {
  const router = useRouter()
  const { user, userProfile, isDemo, loading: authLoading, logout } = useAuth()
  const {
    organization,
    loading: orgLoading,
    createOrganization,
    checkPendingInvites,
    acceptInvite,
    declineInvite,
    error: orgError,
    clearError,
  } = useOrganization()

  const [step, setStep] = useState<SetupStep>('choice')
  const [orgName, setOrgName] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('free')
  const [isCreating, setIsCreating] = useState(false)
  const [pendingInvites, setPendingInvites] = useState<OrganizationInvite[]>([])
  const [loadingInvites, setLoadingInvites] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect if already has organization or is demo
  useEffect(() => {
    if (isDemo || organization) {
      router.push('/')
    }
  }, [isDemo, organization, router])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  // Check for pending invites on load
  useEffect(() => {
    const checkInvites = async () => {
      if (user?.email) {
        setLoadingInvites(true)
        try {
          const invites = await checkPendingInvites(user.email)
          setPendingInvites(invites)
        } catch (err) {
          console.error('Error checking invites:', err)
        } finally {
          setLoadingInvites(false)
        }
      }
    }
    checkInvites()
  }, [user?.email, checkPendingInvites])

  // Handle organization creation
  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orgName.trim()) {
      setError('Please enter an organization name')
      return
    }

    setIsCreating(true)
    setError(null)
    clearError()

    try {
      const newOrg = await createOrganization(orgName.trim(), selectedPlan)

      // Seed default data for the new organization
      try {
        await seedOrganizationData(newOrg.id, false) // Don't seed demo products
      } catch (seedError) {
        console.error('Error seeding organization data:', seedError)
        // Continue even if seeding fails - not critical
      }

      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create organization')
    } finally {
      setIsCreating(false)
    }
  }

  // Handle invite acceptance
  const handleAcceptInvite = async (inviteId: string) => {
    setError(null)
    clearError()

    try {
      await acceptInvite(inviteId)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept invitation')
    }
  }

  // Handle invite decline
  const handleDeclineInvite = async (inviteId: string) => {
    try {
      await declineInvite(inviteId)
      setPendingInvites(prev => prev.filter(i => i.id !== inviteId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decline invitation')
    }
  }

  if (authLoading || orgLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            <i className="fas fa-leaf text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to Cronk HQ</h1>
          <p className="text-slate-400 text-sm mt-1">Set up your organization to get started</p>
        </div>

        {/* Error Message */}
        {(error || orgError) && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
            <i className="fas fa-exclamation-circle text-red-400"></i>
            <span className="text-red-400 text-sm">{error || orgError}</span>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8">
          {step === 'choice' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white text-center mb-6">How would you like to get started?</h2>

              {/* Pending Invites Notice */}
              {pendingInvites.length > 0 && (
                <button
                  onClick={() => setStep('invites')}
                  className="w-full p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl text-left hover:bg-emerald-500/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <i className="fas fa-envelope-open text-emerald-400 text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">You have pending invitations</div>
                      <div className="text-sm text-slate-400">
                        {pendingInvites.length} organization{pendingInvites.length !== 1 ? 's' : ''} invited you to join
                      </div>
                    </div>
                    <span className="bg-emerald-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {pendingInvites.length}
                    </span>
                  </div>
                </button>
              )}

              {/* Create New Organization */}
              <button
                onClick={() => setStep('create')}
                className="w-full p-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-left hover:border-emerald-500/50 hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <i className="fas fa-building text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <div className="font-medium text-white">Create a new organization</div>
                    <div className="text-sm text-slate-400">Start fresh with your own workspace</div>
                  </div>
                </div>
              </button>

              {/* View Invites (if no pending) */}
              {pendingInvites.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-slate-500 text-sm">
                    Have an invite code?{' '}
                    <button
                      onClick={() => setStep('invites')}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      Enter it here
                    </button>
                  </p>
                </div>
              )}

              {/* User Info */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-400">
                    Signed in as <span className="text-white">{user.email}</span>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'create' && (
            <form onSubmit={handleCreateOrganization} className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setStep('choice')}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="text-xl font-semibold text-white">Create your organization</h2>
              </div>

              {/* Organization Name */}
              <div>
                <label htmlFor="orgName" className="block text-sm font-medium text-slate-300 mb-2">
                  Organization Name
                </label>
                <input
                  id="orgName"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  placeholder="Acme Inc."
                  required
                  autoFocus
                />
                <p className="mt-2 text-xs text-slate-500">
                  This will be your workspace name visible to all team members
                </p>
              </div>

              {/* Plan Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Select a Plan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['free', 'starter', 'professional', 'enterprise'] as PlanType[]).map((plan) => (
                    <button
                      key={plan}
                      type="button"
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedPlan === plan
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-medium text-white capitalize">{plan}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        {PLAN_LIMITS[plan].users === -1 ? 'Unlimited' : PLAN_LIMITS[plan].users} users
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isCreating || !orgName.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus"></i>
                    Create Organization
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'invites' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setStep('choice')}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="text-xl font-semibold text-white">Pending Invitations</h2>
              </div>

              {loadingInvites ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : pendingInvites.length > 0 ? (
                <div className="space-y-3">
                  {pendingInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-white">{invite.organizationName}</div>
                          <div className="text-sm text-slate-400 mt-1">
                            Invited by {invite.invitedByName || 'Team admin'}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded capitalize">
                              {invite.role}
                            </span>
                            <span className="text-xs text-slate-500">
                              Expires {new Date(invite.expiresAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeclineInvite(invite.id)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Decline"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                          <button
                            onClick={() => handleAcceptInvite(invite.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-envelope text-slate-600 text-2xl"></i>
                  </div>
                  <p className="text-slate-400">No pending invitations</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Ask your team admin to send you an invite
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
