import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import DashboardSidebar from '../Sidebar';
import DashboardHeader from '../Header';
import { isObjectEmpty } from '../../../helpers/functions';

import sidebarMessages from '../Sidebar/messages';
import styles from './index.module.css';

export default function DashboardLayoutContainer({ children }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(sidebarMessages.categories.home.name);

  function handleActiveTab(name) {
    if (activeTab === name) return ;
    setActiveTab(name);
    if (name === sidebarMessages.categories.logout.name) return ;
    router.push(`/dashboard/${name === 'dashboard' ? '/' : name}`, undefined, { shallow: true });
  }

  useEffect(() => {
    if (isObjectEmpty(router) || !router.pathname) return ;
    const paths = router.pathname.split('/');
    setActiveTab(paths[paths.length - 1]);
  }, [router]);

  return (
    <div className={styles.dashboard_page_container}>
      <DashboardSidebar
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
      />
      <div className={styles.dashboard_main_container}>
        <DashboardHeader />
        <div className={styles.dashboard_content_container}>
          {children}
        </div>
      </div>
    </div>
  )
}
