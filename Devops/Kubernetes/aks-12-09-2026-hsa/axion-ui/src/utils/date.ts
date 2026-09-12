export function formatAppDate(dateString: string | null | undefined, tzMode: string, short = false): string {
  if (!dateString) return '-';
  
  const d = new Date(dateString.endsWith('Z') ? dateString : `${dateString}Z`);
  
  if (isNaN(d.getTime())) return '-';

  const options: Intl.DateTimeFormatOptions = short 
    ? { hour: '2-digit', minute: '2-digit' } 
    : {};

  try {
    if (tzMode === 'utc') {
      return d.toLocaleTimeString('en-US', { ...options, timeZone: 'UTC' }) + (short ? '' : ' UTC');
    } else if (tzMode === 'facility') {
      return d.toLocaleTimeString('en-US', { ...options, timeZone: 'America/Chicago' }) + (short ? '' : ' CT');
    }
    // Local
    return d.toLocaleTimeString([], options);
  } catch (e) {
    // Fallback if timezone string is unsupported by browser
    return d.toLocaleTimeString([], options);
  }
}
