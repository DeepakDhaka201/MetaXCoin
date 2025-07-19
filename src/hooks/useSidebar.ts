import { useState, useEffect } from 'react';

const SIDEBAR_STORAGE_KEY = 'metax-sidebar-open';

export const useSidebar = () => {
  // Initialize state to always be closed on page load/refresh for better UX
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Save to localStorage whenever state changes (backup in case immediate updates miss anything)
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => {
      const newState = !prev;
      // Update localStorage immediately to prevent race conditions during navigation
      localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const closeSidebar = () => {
    // Update localStorage immediately to prevent race conditions during navigation
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(false));
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    // Update localStorage immediately to prevent race conditions during navigation
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(true));
    setIsSidebarOpen(true);
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    setIsSidebarOpen
  };
};
