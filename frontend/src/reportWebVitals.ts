import { Metric } from 'web-vitals';

type MetricType = Metric;

const reportWebVitals = async (onPerfEntry?: (metric: MetricType) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function' && process.env.NODE_ENV === 'production') {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      
      // Wrap each call in a try-catch to prevent single metric failure from blocking others
      const metrics = [
        { fn: getCLS, name: 'CLS' },
        { fn: getFID, name: 'FID' },
        { fn: getFCP, name: 'FCP' },
        { fn: getLCP, name: 'LCP' },
        { fn: getTTFB, name: 'TTFB' }
      ];

      metrics.forEach(({ fn, name }) => {
        try {
          fn(onPerfEntry);
        } catch (error) {
          console.warn(`Failed to load ${name} metric:`, error);
        }
      });
    } catch (error) {
      console.warn('Failed to load web-vitals:', error);
    }
  }
};

export default reportWebVitals;
