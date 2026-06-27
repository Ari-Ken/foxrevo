import React from 'react';
import { getPortalConfig } from '../../utils/portalConfig';
import AdmissionClient from './AdmissionClient';
import './admission.css';

export const dynamic = 'force-dynamic';

export default function AdmissionPage() {
  const config = getPortalConfig();

  return (
    <AdmissionClient
      initialIsOpen={config.isOpen}
      openDateStr={config.openDateStr}
    />
  );
}
