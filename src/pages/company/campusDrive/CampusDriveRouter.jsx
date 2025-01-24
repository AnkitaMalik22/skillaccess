import { Route } from 'react-router-dom';
import { lazy } from 'react';
import ViewCampusDrive from '../../../components/company/campusDrive/ViewCampusDrive';

const CampusDriveDetails = lazy(() => import('../../../components/company/campusDrive/CampusDriveDetails'));
const InviteColleges = lazy(() => import('../../../components/company/campusDrive/InviteColleges'));
const AssignTests = lazy(() => import('../../../components/company/campusDrive/AssignTests'));
const CampusDrive = lazy(() => import('./CampusDrive'));

 function CampusDriveRouter() {
  return (
    <Route path="campus-drive">
      <Route path="" element={<CampusDrive />} />
      <Route path="create" element={<CampusDriveDetails />} />
         <Route path=":driveId" element={<ViewCampusDrive />} />
        <Route path=":driveId/invite" element={<InviteColleges />} />
        <Route path=":driveId/tests" element={<AssignTests />} />
        <Route path="*" element={<div>404</div>} />
    </Route>
  );
}

export default CampusDriveRouter;