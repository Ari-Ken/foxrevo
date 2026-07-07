import React from 'react';
import AdmissionClient from './admission/AdmissionClient';
import { getPortalConfig } from '../utils/portalConfig';

export const dynamic = 'force-dynamic';

export default function Home() {
  const config = getPortalConfig();
  
  return (
    <AdmissionClient initialIsOpen={config.isOpen} openDateStr={config.openDateStr} />
  );
}

