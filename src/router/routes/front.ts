import projectsRoutes from '@/router/routes/projects';
import resumeRoutes from '@/router/routes/resume';
import tutorRoutes from '@/router/routes/tutor';
import uiRoutes from '@/router/routes/ui';

const frontRoutes = [
  ...projectsRoutes,
  ...resumeRoutes,
  ...tutorRoutes,
  ...uiRoutes,
];

export default frontRoutes;
