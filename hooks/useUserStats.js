import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Fetches real-time user stats from /api/stats.
 * Returns { stats, loading, error, refetch }.
 */
export function useUserStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/api/stats");
      setStats(res.data);
    } catch (err) {
      console.error("useUserStats error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}
