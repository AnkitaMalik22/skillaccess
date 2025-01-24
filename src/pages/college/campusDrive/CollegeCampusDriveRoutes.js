import { Route } from 'react-router-dom';
import { lazy } from 'react';




const CampusDrive = lazy(() => import('./CollegeCampusDrive'));
const ViewCampusDrive = lazy(() => import('../../../components/company/campusDrive/ViewCampusDrive'));
 function CampusDriveRouter() {
  return (
    <Route path="campus-drive">
      <Route path="" element={<CampusDrive />} />
      {/* <Route path="create" element={<CampusDriveDetails />} /> */}
         <Route path=":driveId" element={<ViewCampusDrive />} />
        <Route path="*" element={<div>404</div>} />
    </Route>
  );
}

export default CampusDriveRouter;