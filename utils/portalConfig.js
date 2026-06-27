export function getPortalConfig() {
  // Default to Friday, July 3rd, 2026 at 12:00 PM WAT (+01:00) if not specified
  const openDateStr = process.env.NEXT_PUBLIC_PORTAL_OPEN_DATE || '2026-07-03T12:00:00+01:00';
  const openDate = new Date(openDateStr);
  const now = new Date();
  
  // Portal is open if current time is on or after the open date
  const isOpen = now >= openDate;
  
  return {
    isOpen,
    openDate,
    openDateStr,
    isCampaignActive: process.env.PORTAL_CAMPAIGN_ACTIVE === 'true'
  };
}
