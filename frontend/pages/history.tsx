'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function HistoryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [loadingRows, setLoadingRows] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    (async () => {
      setLoadingRows(true);
      const { data, error } = await supabase
        .from('chat_history')
        .select('id, question, answer, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
      if (!error) setRows(data || []);
      setLoadingRows(false);
    })();
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Chat History</h1>
      {loadingRows ? (
        <p className="text-gray-500">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-500">No history yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-soft">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Question</th>
                <th className="text-left p-3">Answer</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="p-3 whitespace-nowrap text-gray-500">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="p-3 align-top text-gray-900">{r.question}</td>
                  <td className="p-3 align-top text-gray-800">{r.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


