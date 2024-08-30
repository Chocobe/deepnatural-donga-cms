// store
import useLoadingModalStore from '@/store/modalStores/loadingModalStore/loadingModalStore';
// ui
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/ui/dialog';
// icon
import { 
  LuLoader2,
} from 'react-icons/lu';
// style
import './LoadingModal.css';

function LoadingModal() {
  //
  // loadingModal store
  //
  const isOpen = useLoadingModalStore(state => state.isOpen);
  const message = useLoadingModalStore(state => state.message);

  return (
    <Dialog
      open={isOpen}>
      <DialogTrigger hidden />

      <DialogContent
        hideCloseButton 
        className="LoadingModal">
        <div className="LoadingModal-spinner">
          <LuLoader2 className="icon" />
        </div>

        <DialogHeader className="LoadingModal-header">
          <DialogDescription className="description">
            Now loading...
          </DialogDescription>

          <DialogTitle className="message"> 
            {message}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default LoadingModal;
