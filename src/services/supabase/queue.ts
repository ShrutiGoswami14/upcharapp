import { supabase, isSupabaseConfigured } from './client';
import { ActiveQueueSession, QueueToken } from '../../types/queue';
import { mockActiveQueue, mockQueueTimeline } from '../mock/data';

export const queueService = {
  async getActiveSession(userId: string): Promise<ActiveQueueSession> {
    if (!isSupabaseConfigured) {
      return mockActiveQueue;
    }

    try {
      const { data, error } = await supabase
        .from('queue_sessions')
        .select(`
          id,
          doctor_id,
          your_token_number,
          your_token_status,
          now_serving_token_number,
          now_serving_status,
          estimated_wait_minutes,
          people_ahead_count,
          last_updated,
          doctors (
            name,
            avatar_url,
            specialty,
            clinic_name,
            distance_km,
            is_verified
          )
        `)
        .eq('patient_id', userId)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        return mockActiveQueue;
      }

      const doc = (data as any).doctors;
      return {
        id: data.id,
        doctorId: data.doctor_id,
        doctorName: doc?.name || mockActiveQueue.doctorName,
        doctorAvatarUrl: doc?.avatar_url || mockActiveQueue.doctorAvatarUrl,
        specialty: doc?.specialty || mockActiveQueue.specialty,
        clinicName: doc?.clinic_name || mockActiveQueue.clinicName,
        distanceKm: doc?.distance_km ?? mockActiveQueue.distanceKm,
        isVerified: doc?.is_verified ?? true,
        yourTokenNumber: data.your_token_number,
        yourTokenStatus: data.your_token_status,
        nowServingTokenNumber: data.now_serving_token_number,
        nowServingStatus: data.now_serving_status,
        estimatedWaitMinutes: data.estimated_wait_minutes,
        peopleAheadCount: data.people_ahead_count,
        lastUpdated: data.last_updated,
      };
    } catch {
      return mockActiveQueue;
    }
  },

  async getTimeline(sessionId: string): Promise<QueueToken[]> {
    if (!isSupabaseConfigured) {
      return mockQueueTimeline;
    }

    try {
      const { data, error } = await supabase
        .from('queue_tokens')
        .select('*')
        .eq('session_id', sessionId)
        .order('token_number', { ascending: true });

      if (error || !data) {
        return mockQueueTimeline;
      }

      return data.map((t: any) => ({
        tokenNumber: t.token_number,
        status: t.status,
        patientName: t.patient_name,
        isCurrentUser: t.is_current_user,
        estimatedTime: t.estimated_time,
      }));
    } catch {
      return mockQueueTimeline;
    }
  },
};
