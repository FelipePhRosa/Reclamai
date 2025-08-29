import Config from '../components/Config'; // desktop
import ConfigMobile from '../components/ConfigMobile'; // mobile
import useIsMobile from '../hooks/useIsMobile';

export default function HomeWrapper() {
  const isMobile = useIsMobile();

  return isMobile ? <ConfigMobile /> : <Config />;
}
