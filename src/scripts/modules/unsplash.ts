import { UnsplashFrequency, type UnsplashFrequencyType } from '../constants/settings';

export async function getImage(frequency: UnsplashFrequencyType): Promise<string> {
  let unsplashUrl = `https://source.unsplash.com/${screen.width}x${screen.height}/`;

  switch (frequency) {
    case UnsplashFrequency.DAILY:
      unsplashUrl += 'daily';
      break;
    case UnsplashFrequency.WEEKLY:
      unsplashUrl += 'weekly';
      break;
    default:
      break;
  }

  const res = await fetch(unsplashUrl);

  if (!res.ok || res.status < 200 || res.status >= 300) {
    throw new Error('Fetching Unsplash image failed');
  }

  return res.url;
}
