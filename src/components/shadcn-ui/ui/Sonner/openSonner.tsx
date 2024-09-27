// ui
import { 
  toast,
  ExternalToast,
} from 'sonner';
import { 
  Button,
} from '../button';
// icon
import { 
  LuXOctagon,
} from 'react-icons/lu';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './openSonner.css';

const openSonner = (params: {
  message: string,
  title?: string,
  options?: ExternalToast
}) => {
  const {
    message,
    title,
    options,
  } = params;

  const toastId = toast((
    <div className="Sonner">
      <div className="Sonner-actions">
        <Button
          className="button closeAllButton"
          variant="outline"
          onClick={() => toast.dismiss()}>
          <LuXOctagon className="icon" />
          <LuXOctagon className="icon" />
        </Button>

        <Button
          className="button closeButton"
          variant="outline"
          onClick={() => toast.dismiss(toastId)}>
          <LuXOctagon className="icon" />
        </Button>
      </div>

      <div className="Sonner-content">
        {title && (
          <div className="title">
            {title}
          </div>
        )}

        <div className={cn(
          !title ? 'title' : 'message'
        )}>
          {message}
        </div>
      </div>
    </div>
  ), {
    ...options,
    className: 'SonnerWrapper',
    duration: 10_000,
  });
};

export default openSonner;
