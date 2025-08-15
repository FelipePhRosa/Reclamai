import Home from './Home01'; // desktop
import HomeMobile from './Home'; // mobile
import useIsMobile from '../hooks/useIsMobile';

export default function HomeWrapper() {
  const isMobile = useIsMobile();

  return isMobile ? <HomeMobile /> : <Home />;
}
