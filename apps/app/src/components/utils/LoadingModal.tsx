import { Cmp } from '$types';
import { Modal } from '@material-ui/core';
import { CenterContent } from '$cmp/styling/CenterContent';

export const LoadingModal: Cmp = () => {
  return (
    <Modal open>
      {/* Fragment is here to prevent MaterialUI error relating to tab index */}
      <>
        <CenterContent>
          <div style={{ display: 'inline-block' }} className="loading" />
        </CenterContent>
      </>
    </Modal>
  );
};
