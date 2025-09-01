// Shared configuration for the application
const CONFIG = {
  // Supabase configuration
  supabaseUrl: 'https://awbmqsuoqretisrhkpqe.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3Ym1xc3VvcXJldGlzcmhrcHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxODIzMDksImV4cCI6MTk4OTc1ODMwOX0.leAvGr6lASVRC20N0hm9UsL8BbW9CXw2LuG76xDhOIw',
  
  // Environment detection
  isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
  
  // Get the base URL for the current environment
  getBaseUrl() {
    return `${window.location.protocol}//${window.location.host}`;
  },
  
  // Get redirect URL after authentication
  getAuthRedirectUrl() {
    // Let Supabase handle the redirect URL from dashboard configuration
    // This allows different URLs for development vs production
    return undefined; // Explicitly return undefined to use Supabase defaults
  }
};

// Initialize Supabase client once
const supabaseClient = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey);