// Notification Manager Component for ZAP Labs
// Central system for displaying notifications and error messages

const { useState, useEffect, useRef, createContext, useContext } = React;

// Create context for notifications
const NotificationContext = createContext();

// Notification types
const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Default notification duration
const DEFAULT_DURATION = 5000; // 5 seconds

// Generate unique ID for notifications
function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

// Main provider component
function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const timeoutsRef = useRef({});

  // Clean up all timeouts when component unmounts
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  // Add a new notification
  const addNotification = (message, options = {}) => {
    const {
      type = NOTIFICATION_TYPES.INFO,
      duration = DEFAULT_DURATION,
      autoClose = true,
      action = null
    } = options;

    const id = generateId();

    // Create the notification object
    const notification = {
      id,
      message,
      type,
      action,
      timestamp: new Date()
    };

    // Add the notification to the state
    setNotifications((prev) => [...prev, notification]);

    // Set up auto-close if enabled
    if (autoClose && duration > 0) {
      timeoutsRef.current[id] = setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    // Return the ID so it can be used to remove the notification
    return id;
  };

  // Remove a notification by ID
  const removeNotification = (id) => {
    // Clear any associated timeout
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }

    // Remove the notification from state
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Shorthand methods for different notification types
  const success = (message, options = {}) => {
    return addNotification(message, { ...options, type: NOTIFICATION_TYPES.SUCCESS });
  };

  const error = (message, options = {}) => {
    return addNotification(message, { ...options, type: NOTIFICATION_TYPES.ERROR });
  };

  const warning = (message, options = {}) => {
    return addNotification(message, { ...options, type: NOTIFICATION_TYPES.WARNING });
  };

  const info = (message, options = {}) => {
    return addNotification(message, { ...options, type: NOTIFICATION_TYPES.INFO });
  };

  // Clear all notifications
  const clearAll = () => {
    // Clear all timeouts
    Object.values(timeoutsRef.current).forEach(clearTimeout);
    timeoutsRef.current = {};

    // Clear all notifications
    setNotifications([]);
  };

  // Handle API errors by showing appropriate notification
  const handleApiError = (error, options = {}) => {
    // If error is from our error handler
    if (typeof error === 'object' && error.name) {
      switch (error.name) {
        case 'NetworkError':
          return warning(
            'Network connection issue. Please check your internet connection.',
            { ...options, duration: 8000 }
          );
        case 'AuthenticationError':
          return error(
            'Authentication error. Please log in again.',
            { ...options, duration: 10000 }
          );
        case 'RateLimitError':
          return warning(
            `Rate limit exceeded. Please try again in ${error.retryAfter || 60} seconds.`,
            { ...options, duration: 8000 }
          );
        case 'ServerError':
          return error(
            'Server error. Our team has been notified.',
            { ...options, duration: 8000 }
          );
        case 'ResourceNotFoundError':
          return error(
            'The requested resource was not found.',
            { ...options, duration: 6000 }
          );
        case 'ValidationError':
          return warning(
            'Some information is incorrect or incomplete.',
            { ...options, duration: 6000 }
          );
        default:
          // For other error types
          return error(
            error.message || 'An error occurred. Please try again.',
            options
          );
      }
    }

    // If it's a string or unknown type
    return error(
      typeof error === 'string' ? error : 'An error occurred. Please try again.',
      options
    );
  };

  // The context value that will be available to consumers
  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
    clearAll,
    handleApiError
  };

  return (
    <NotificationContext.Provider value={contextValue} data-id="dfepk06qu" data-path="components/NotificationManager.js">
      {children}
      <NotificationContainer
        notifications={notifications}
        removeNotification={removeNotification} data-id="6jvq19zhs" data-path="components/NotificationManager.js" />

    </NotificationContext.Provider>);

}

// Container component that displays the notifications
function NotificationContainer({ notifications, removeNotification }) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md" data-id="5c7v8j6h0" data-path="components/NotificationManager.js">
      {notifications.map((notification) =>
      <Notification
        key={notification.id}
        notification={notification}
        onClose={() => removeNotification(notification.id)} data-id="x3odhe9d5" data-path="components/NotificationManager.js" />

      )}
    </div>);

}

// Individual notification component
function Notification({ notification, onClose }) {
  const [isExiting, setIsExiting] = useState(false);

  // Handle close with animation
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  // Get appropriate styles based on notification type
  const getTypeStyles = () => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500',
          iconColor: 'text-green-500',
          icon: 'fa-check-circle'
        };
      case NOTIFICATION_TYPES.ERROR:
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          iconColor: 'text-red-500',
          icon: 'fa-exclamation-circle'
        };
      case NOTIFICATION_TYPES.WARNING:
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
          iconColor: 'text-yellow-500',
          icon: 'fa-exclamation-triangle'
        };
      case NOTIFICATION_TYPES.INFO:
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-500',
          iconColor: 'text-blue-500',
          icon: 'fa-info-circle'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`
        ${styles.bgColor} border-l-4 ${styles.borderColor} p-4 shadow-md rounded-r
        transform transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100'}
      `} data-id="3hkyj8q4t" data-path="components/NotificationManager.js">

      <div className="flex items-start" data-id="jelw9rave" data-path="components/NotificationManager.js">
        <div className={`mr-3 ${styles.iconColor}`} data-id="6a4c9wepy" data-path="components/NotificationManager.js">
          <i className={`fas ${styles.icon}`} data-id="1ez7nifa1" data-path="components/NotificationManager.js"></i>
        </div>
        <div className="flex-1" data-id="0wl6v0c34" data-path="components/NotificationManager.js">
          <p className="text-sm text-gray-800" data-id="18d18ypou" data-path="components/NotificationManager.js">{notification.message}</p>
          
          {notification.action &&
          <div className="mt-2" data-id="v9c6avdvb" data-path="components/NotificationManager.js">
              <button
              onClick={notification.action.onClick}
              className="text-sm font-medium text-blue-600 hover:text-blue-800" data-id="vuw4vwiag" data-path="components/NotificationManager.js">

                {notification.action.label}
              </button>
            </div>
          }
        </div>
        <button
          onClick={handleClose}
          className="ml-4 text-gray-400 hover:text-gray-600" data-id="hwr2txpjl" data-path="components/NotificationManager.js">

          <i className="fas fa-times" data-id="kgv14bx77" data-path="components/NotificationManager.js"></i>
        </button>
      </div>
    </div>);

}

// Hook for consuming the notification context
function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}