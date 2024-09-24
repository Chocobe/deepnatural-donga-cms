// react
import {
  memo,
} from 'react';
// redux
// import {
//   useAppSelector,
// } from '@/redux/slice/hooks';
// chakra-ui
// import { 
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalBody,

//   CircularProgress,
// } from '@chakra-ui/react';
// styled-components
// import styled from 'styled-components';

// const StyledApiLoadingModalRoot = styled.div`
//     width: 100%;
//     max-width: 400px;

//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 24px;

//     > .loadingSpinnerWrapper {
//         //
//     }

//     > .message {
//         color: ${({ theme }) => theme.colors.gs[800]};
//         font-size: 14px;
//         line-height: 22px;
//         font-weight: 400;
//         text-align: center;
//         white-space: pre-line;
//     }
// `;

// function _ApiLoadingModal() {
//   //
//   // apiLoadingUiState state
//   //
//   const apiLoadingUiState = useAppSelector(({ ui }) => {
//     return ui.apiLoadingUiState;
//   });

//   const {
//     isLoading,
//     message,
//   } = apiLoadingUiState;

//   return (
//     <Modal
//       isOpen={isLoading}
//       isCentered
//       onClose={() => {/** */}}>
//       <ModalOverlay backgroundColor="#000000bf" />

//       <ModalContent
//         padding="40px"
//         boxShadow="0px 8px 8px 0px rgba(0, 0, 0, 0.12)"
//         borderRadius="8px">
//         <ModalBody padding="0">
//           <StyledApiLoadingModalRoot>
//             <div className="loadingSpinnerWrapper">
//               <CircularProgress
//                 isIndeterminate
//                 size="40px" />
//             </div>

//             <div className="message">
//               {message}
//             </div>
//           </StyledApiLoadingModalRoot>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// }

function _ApiLoadingModal() {
  return (
    <div className="ApiLoadingModal">
      Need migration or delete
    </div>
  );
}

const ApiLoadingModal = memo(_ApiLoadingModal);
export default ApiLoadingModal;
