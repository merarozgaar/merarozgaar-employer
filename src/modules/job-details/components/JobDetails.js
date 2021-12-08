// @flow
import React, { Fragment, useMemo } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
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
  onConfirmApply: Function,
}) => React$Node;

const JobDetails: JobDetailsType = ({
  job,
  showApplyView,
  toggleApplyView,
  onConfirmApply,
}) => {
  const { t } = useTranslation();

  const overview = useMemo(
    () => [
      {
        label: t('Benefits'),
        value: job.benefits,
      },
      {
        label: t('Working Days'),
        value: job.working_days,
      },
      {
        label: t('Timings'),
        value: job.timings,
      },
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

  const requirements = useMemo(
    () => [
      {
        label: t('Vacancies'),
        value: job.vacancies,
      },
      {
        label: t('Minimum Experience (in Years)'),
        value: job.min_experience,
      },
      {
        label: t('Gender preferences'),
        value: job.gender,
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
              src={job.avatar_url}
              alt=""
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <div className="media-body">
              <h5>
                {job.profession}{' '}
                <Badge pill variant="light">
                  {job.active ? 'Active' : 'Inactive'}
                </Badge>
              </h5>
              <p className="mb-0">
                {job.locality}, {job.city}, {parseInt(job.distance)} km away
              </p>
              <small className="text-muted">
                {formatCurrency(parseSalary(job.salary))}{' '}
                {parseSalaryFrequency(job.salary_frequency)}
              </small>
            </div>
          </div>
        </Card.Body>
      </Card>
      {[overview, requirements].map((a, i) => (
        <Card key={i} className="mb-3 pt-4 pb-2 px-4 border-0 shadow-sm">
          <Card.Body>
            {a.map(({ label, value }, j) => (
              <Fragment key={j}>
                <h6 className="mb-0">{label}</h6>
                <p>{value}</p>
              </Fragment>
            ))}
          </Card.Body>
        </Card>
      ))}
      <div className="fixed-bottom d-flex justify-content-center p-3">
        <Button
          as={Link}
          className="px-5 btn-lg rounded-pill shadow"
          to={resolveDynamicPath(getAppRoutes().applications, job.id)}
          // onClick={toggleApplyView}
        >
          View applications
        </Button>
      </div>
      <ApplyView
        job={job}
        showApplyView={showApplyView}
        toggleApplyView={toggleApplyView}
        onConfirmApply={onConfirmApply}
      />
    </Fragment>
  );
};

export default JobDetails;
