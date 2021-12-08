// @flow
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faSignOutAlt,
  faSpinner,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faPhone,
  faComment,
  faSyringe,
  faClinicMedical,
  faHeadSideMask,
  faClock,
  faUsers,
  faPills,
  faFilter,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { far, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faTwitter,
  faInstagram,
  faYoutube,
  faFacebook,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faBars,
  faSignOutAlt,
  faSpinner,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faSearch,
  faChevronRight,
  faChevronLeft,
  far,
  faTimesCircle,
  faPhone,
  faTwitter,
  faInstagram,
  faYoutube,
  faFacebook,
  faLinkedin,
  faComment,
  faClinicMedical,
  faSyringe,
  faHeadSideMask,
  faClock,
  faUsers,
  faPills,
  faFilter,
  faMapMarkerAlt,
);

type IconType = (any) => React$Node;

const Icon: IconType = (props) => <FontAwesomeIcon {...props} />;

export default Icon;
