import { Cmp } from '$types';
import { Modal } from '@material-ui/core';
import { CenterContent } from '$cmp/styling/CenterContent';

export const LoadingModal: Cmp = () => {
  return (
    <Modal open>
      <CenterContent>
        <div style={{ display: 'inline-block' }} className="loading" />
      </CenterContent>
    </Modal>
  );
};
