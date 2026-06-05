import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { FullPageLoader } from '@/components/shared/Loader';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('@/pages/public/HomePage'));
const AboutPage = lazy(() => import('@/pages/public/AboutPage'));
const SermonsPage = lazy(() => import('@/pages/public/SermonsPage'));
const SermonDetailPage = lazy(() => import('@/pages/public/SermonDetailPage'));
const EventsPage = lazy(() => import('@/pages/public/EventsPage'));
const EventDetailPage = lazy(() => import('@/pages/public/EventDetailPage'));
const MinistriesPage = lazy(() => import('@/pages/public/MinistriesPage'));
const MinistryDetailPage = lazy(() => import('@/pages/public/MinistryDetailPage'));
const ContactPage = lazy(() => import('@/pages/public/ContactPage'));

// Phase 2 pages
const BlogPage = lazy(() => import('@/pages/public/BlogPage'));
const BlogDetailPage = lazy(() => import('@/pages/public/BlogDetailPage'));
const GalleryPage = lazy(() => import('@/pages/public/GalleryPage'));
const ProjectsPage = lazy(() => import('@/pages/public/ProjectsPage'));
const LivestreamPage = lazy(() => import('@/pages/public/LivestreamPage'));
const WeeklyActivitiesPage = lazy(() => import('@/pages/public/WeeklyActivitiesPage'));
const PrayerWallPage = lazy(() => import('@/pages/public/PrayerWallPage'));

// Admin pages
const LoginPage = lazy(() => import('@/pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));
const SermonsManagePage = lazy(() => import('@/pages/admin/SermonsManagePage'));
const EventsManagePage = lazy(() => import('@/pages/admin/EventsManagePage'));
const DonationsManagePage = lazy(() => import('@/pages/admin/DonationsManagePage'));
const BlogManagePage = lazy(() => import('@/pages/admin/BlogManagePage'));
const GalleryManagePage = lazy(() => import('@/pages/admin/GalleryManagePage'));
const MinistriesManagePage = lazy(() => import('@/pages/admin/MinistriesManagePage'));
const UsersManagePage = lazy(() => import('@/pages/admin/UsersManagePage'));
const PrayerManagePage = lazy(() => import('@/pages/admin/PrayerManagePage'));
const NotificationsPage = lazy(() => import('@/pages/admin/NotificationsPage'));
const NewsletterManagePage = lazy(() => import('@/pages/admin/NewsletterManagePage'));
const LivestreamManagePage = lazy(() => import('@/pages/admin/LivestreamManagePage'));
const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage'));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<FullPageLoader />}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <SuspenseWrapper><HomePage /></SuspenseWrapper> },
      { path: 'about', element: <SuspenseWrapper><AboutPage /></SuspenseWrapper> },
      { path: 'sermons', element: <SuspenseWrapper><SermonsPage /></SuspenseWrapper> },
      { path: 'sermons/:id', element: <SuspenseWrapper><SermonDetailPage /></SuspenseWrapper> },
      { path: 'events', element: <SuspenseWrapper><EventsPage /></SuspenseWrapper> },
      { path: 'events/:id', element: <SuspenseWrapper><EventDetailPage /></SuspenseWrapper> },
      { path: 'ministries', element: <SuspenseWrapper><MinistriesPage /></SuspenseWrapper> },
      { path: 'ministries/:slug', element: <SuspenseWrapper><MinistryDetailPage /></SuspenseWrapper> },
      { path: 'contact', element: <SuspenseWrapper><ContactPage /></SuspenseWrapper> },

      // Phase 2 routes
      { path: 'blog', element: <SuspenseWrapper><BlogPage /></SuspenseWrapper> },
      { path: 'blog/:slug', element: <SuspenseWrapper><BlogDetailPage /></SuspenseWrapper> },
      { path: 'gallery', element: <SuspenseWrapper><GalleryPage /></SuspenseWrapper> },
      { path: 'give', element: <SuspenseWrapper><ProjectsPage /></SuspenseWrapper> },
      { path: 'live', element: <SuspenseWrapper><LivestreamPage /></SuspenseWrapper> },
      { path: 'schedule', element: <SuspenseWrapper><WeeklyActivitiesPage /></SuspenseWrapper> },
      { path: 'prayer', element: <SuspenseWrapper><PrayerWallPage /></SuspenseWrapper> },
    ],
  },
  // Admin login (public — no auth required)
  {
    path: '/admin/login',
    element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
  },
  // Admin portal (protected — requires auth)
  {
    path: '/admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <SuspenseWrapper><DashboardPage /></SuspenseWrapper> },
      { path: 'sermons', element: <SuspenseWrapper><SermonsManagePage /></SuspenseWrapper> },
      { path: 'events', element: <SuspenseWrapper><EventsManagePage /></SuspenseWrapper> },
      { path: 'donations', element: <SuspenseWrapper><DonationsManagePage /></SuspenseWrapper> },
      { path: 'blog', element: <SuspenseWrapper><BlogManagePage /></SuspenseWrapper> },
      { path: 'gallery', element: <SuspenseWrapper><GalleryManagePage /></SuspenseWrapper> },
      { path: 'ministries', element: <SuspenseWrapper><MinistriesManagePage /></SuspenseWrapper> },
      { path: 'users', element: <SuspenseWrapper><UsersManagePage /></SuspenseWrapper> },
      { path: 'prayer', element: <SuspenseWrapper><PrayerManagePage /></SuspenseWrapper> },
      { path: 'notifications', element: <SuspenseWrapper><NotificationsPage /></SuspenseWrapper> },
      { path: 'newsletter', element: <SuspenseWrapper><NewsletterManagePage /></SuspenseWrapper> },
      { path: 'livestream', element: <SuspenseWrapper><LivestreamManagePage /></SuspenseWrapper> },
      { path: 'settings', element: <SuspenseWrapper><SettingsPage /></SuspenseWrapper> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
