// @flow
import React, { Fragment, useMemo } from 'react';
import { Button, Card } from 'react-bootstrap';
import {
  formatCurrency,
  parseSalary,
  parseSalaryFrequency,
  resolveDynamicPath,
} from '../../../utils';
import { Link } from 'react-router-dom';
import { getAppRoutes } from '../../../utils/contentProviders';
import ApplyView from './ApplyView';
import { useTranslation } from 'react-i18next';

type JobDetailsType = ({
  job: Object,
  showApplyView: boolean,
  toggleApplyView: Function,
}) => React$Node;

const CandidateDetails: JobDetailsType = ({
  job,
  showApplyView,
  toggleApplyView,
}) => {
  const { t } = useTranslation();

  const overview = useMemo(
    () => [
      {
        label: t('education'),
        value: job.education,
      },
      {
        label: t('gender'),
        value: job.gender,
      },
    ],
    [job],
  );

  const experiences = useMemo(
    () =>
      (job.experiences || []).map(({ company }, i) => ({
        label: `${t('experience')} # ${i + 1}`,
        value: company,
      })),
    [job],
  );

  const address = useMemo(
    () => [
      {
        label: t('address'),
        value: [
          job.street_address,
          job.locality,
          job.city,
          job.state,
          job.pin_code,
        ]
          .filter(Boolean)
          .join(', '),
      },
    ],
    [job],
  );

  return (
    <Fragment>
      <Card className="mb-3 p-4 border-0 shadow-sm">
        <Card.Body>
          <div className="media">
            <img
              className="mr-4 rounded-circle"
              src={job.profile_picture_url}
              alt=""
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <div className="media-body">
              <h5>{job.name}</h5>
              <p className="mb-0">
                {job.locality}, {job.city}
              </p>
              <small className="text-muted">
                {(job.experiences || []).length} {t('previous experiences')}
              </small>
            </div>
          </div>
        </Card.Body>
      </Card>
      {[overview, experiences, address]
        .filter((a) => a.length)
        .map((a, i) => (
          <Card key={i} className="mb-3 pt-4 pb-2 px-4 border-0 shadow-sm">
            <Card.Body>
              {a
                .filter(({ value }) => value)
                .map(({ label, value }, j) => (
                  <Fragment key={j}>
                    <h6 className="mb-0">{label}</h6>
                    <p>{value}</p>
                  </Fragment>
                ))}
            </Card.Body>
          </Card>
        ))}
      {/*<div className="fixed-bottom d-flex justify-content-center p-3">*/}
      {/*  <Button*/}
      {/*    as={Link}*/}
      {/*    className="px-5 rounded-pill shadow"*/}
      {/*    to={resolveDynamicPath(getAppRoutes().signIn)}*/}
      {/*    // onClick={toggleApplyView}*/}
      {/*  >*/}
      {/*    {t('Contact')}*/}
      {/*  </Button>*/}
      {/*</div>*/}
      <ApplyView
        job={job}
        showApplyView={showApplyView}
        toggleApplyView={toggleApplyView}
      />
    </Fragment>
  );
};

export default CandidateDetails;
