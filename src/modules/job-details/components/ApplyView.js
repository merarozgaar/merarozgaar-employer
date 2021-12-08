// @flow
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
      <h5 className="m-0">Ready to start your application?</h5>
    </Modal.Header>
    <Modal.Body className="px-5">
      <div className="mb-5 media">
        <img
          className="mr-4 rounded-circle"
          src={job.avatar_url}
          alt=""
          style={{ width: 55, height: 55, objectFit: 'cover' }}
        />
        <div className="media-body">
          <h5>{job.profession}</h5>
          <p className="mb-0 text-muted" style={{ lineHeight: 1 }}>
            {job.employer_name}
          </p>
        </div>
      </div>
      <Button block className="rounded-pill" onClick={onConfirmApply}>
        Apply
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
