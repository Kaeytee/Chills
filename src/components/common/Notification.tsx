import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { RootState } from '../../redux/store';
import { hideNotification } from '../../redux/slices/uiSlice';

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const { show, message, type } = useSelector((state: RootState) => state.ui.notification);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 z-50 max-w-md" // Adjust z-index to 50
        >
          <div className={`rounded-lg border p-4 shadow-md ${getBgColor()}`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">{getIcon()}</div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-dark-100 dark:text-light-100">{message}</p>
              </div>
              <button
                onClick={() => dispatch(hideNotification())}
                className="ml-4 inline-flex flex-shrink-0 rounded-md p-1 text-dark-400 hover:bg-light-200 hover:text-dark-600 dark:text-light-400 dark:hover:bg-dark-300 dark:hover:text-light-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;