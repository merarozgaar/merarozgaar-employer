// @flow1
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type ApplyViewType = ({
  job: Object,
  showApplyView: boolean,
  toggleApplyView: Function,
}) => React$Node;

const ApplyView: ApplyViewType = ({
  job,
  showApplyView,
  toggleApplyView,
  onConfirmApply,
}) => (
  <Modal animation centered show={showApplyView} onHide={toggleApplyView}>
    <Modal.Header className="pt-5 px-5 border-bottom-0">
      <h5 className="m-0">Schedule interview</h5>
    </Modal.Header>
    <Modal.Body className="px-5">
      <div className="mb-5 media">
        <div className="media-body">
          <p className="mb-0 text-muted" style={{ lineHeight: 1 }}>
            We will arrange a 15 min video call for the interview between you
            the candidate. Interview details will be shared over SMS and app
            notification.
          </p>
          <div className="mt-4">
            <form>
              <div className="form-group">
                <input type="date" className="form-control" />
              </div>
              <div className="form-group">
                <input type="time" className="form-control" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Button block className="rounded-pill" onClick={onConfirmApply}>
        Send invite
      </Button>
    </Modal.Body>
    <Modal.Footer className="justify-content-start pb-5 px-5 border-top-0">
      <small className="text-muted">
        By clicking Proceed, you agree to our Terms & Conditions and Privacy
        Policy.
      </small>
    </Modal.Footer>
  </Modal>
);

export default ApplyView;
