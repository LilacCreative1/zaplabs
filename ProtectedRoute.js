// ZAP Labs Protected Route Component

function ProtectedRoute({ children, isAuthenticated }) {
  const { Navigate, useLocation } = ReactRouterDOM;
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    // Save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace data-id="x4hodttm6" data-path="components/ProtectedRoute.js" />;
  }

  return children;
}