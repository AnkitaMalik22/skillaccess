import { Route } from 'react-router-dom';
import { lazy } from 'react';



const CampusDrive = lazy(() => import('./CollegeCampusDrive'));

 function CampusDriveRouter() {
  return (
    <Route path="campus-drive">
      <Route path="" element={<CampusDrive />} />
        <Route path="*" element={<div>404</div>} />
    </Route>
  );
}

export default CampusDriveRouter;