import { useState, useEffect } from 'react';

const useOfflineSync = (todos, setTodos) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingChanges, setPendingChanges] = useState([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncOfflineData = async () => {
    if (pendingChanges.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPendingChanges([]);
    }
  };

  return { isOnline, syncOfflineData, pendingChanges: pendingChanges.length };
};

export default useOfflineSync;