import projectsRoutes from '@/router/routes/projects';
import resumeRoutes from '@/router/routes/resume';
import tutorRoutes from '@/router/routes/tutor';
import uiRoutes from '@/router/routes/ui';
import notebookRoutes from '@/router/routes/notebook';

const frontRoutes = [
  ...notebookRoutes,
  ...projectsRoutes,
  ...resumeRoutes,
  ...tutorRoutes,
  ...uiRoutes,
];

export default frontRoutes;
