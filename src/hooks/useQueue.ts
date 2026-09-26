import { useState, useEffect } from 'react';
import { ActiveQueueSession, QueueToken } from '../types/queue';
import { queueService } from '../services/supabase/queue';
import { mockCurrentUser, mockActiveQueue, mockQueueTimeline } from '../services/mock/data';
import { supabase, isSupabaseConfigured } from '../services/supabase/client';

export function useQueue() {
  const [session, setSession] = useState<ActiveQueueSession>(mockActiveQueue);
  const [timeline, setTimeline] = useState<QueueToken[]>(mockQueueTimeline);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadQueueData() {
      try {
        const active = await queueService.getActiveSession(mockCurrentUser.id);
        const tokens = await queueService.getTimeline(active.id);
        if (isMounted) {
          setSession(active);
          setTimeline(tokens);
          setLoading(false);
        }
      } catch {
        if (isMounted) setLoading(false);
      }
    }

    loadQueueData();

    // Supabase Realtime subscription if configured
    if (isSupabaseConfigured) {
      const channel = supabase
        .channel(`queue-${session.id}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'queue_tokens', filter: `session_id=eq.${session.id}` },
          () => {
            loadQueueData();
          }
        )
        .subscribe();

      return () => {
        isMounted = false;
        supabase.removeChannel(channel);
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return { session, timeline, loading };
}
