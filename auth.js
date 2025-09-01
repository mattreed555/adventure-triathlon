// Centralized authentication management
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.authStateCallbacks = [];
    this.initialized = false;
  }
  
  // Initialize authentication and set up listeners
  async initialize() {
    if (this.initialized) return;
    
    try {
      // Check for existing session
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      
      this.currentUser = session?.user || null;
      
      // Listen for auth state changes
      supabaseClient.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event);
        this.currentUser = session?.user || null;
        
        // Notify all callbacks of auth state change
        this.authStateCallbacks.forEach(callback => {
          callback(event, this.currentUser);
        });
        
        // Handle specific events
        if (event === 'SIGNED_IN') {
          this.handleSignIn();
        } else if (event === 'SIGNED_OUT') {
          this.handleSignOut();
        }
      });
      
      this.initialized = true;
      return this.currentUser;
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      return null;
    }
  }
  
  // Register a callback for auth state changes
  onAuthStateChange(callback) {
    this.authStateCallbacks.push(callback);
  }
  
  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser;
  }
  
  // Get current user
  getUser() {
    return this.currentUser;
  }
  
  // Sign in with Google
  async signInWithGoogle() {
    try {
      // Force redirect to current location
      const currentUrl = window.location.href.split('?')[0]; // Remove any query params
      
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: currentUrl
        }
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Google sign in failed:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Sign in with Magic Link
  async signInWithMagicLink(email) {
    if (!email) {
      return { success: false, error: 'Email is required' };
    }
    
    try {
      // Force redirect to current location
      const currentUrl = window.location.href.split('?')[0]; // Remove any query params
      
      const { data, error } = await supabaseClient.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: currentUrl
        }
      });
      
      if (error) throw error;
      return { success: true, message: 'Check your email for the magic link!' };
    } catch (error) {
      console.error('Magic link failed:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Sign out
  async signOut() {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Sign out failed:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Handle successful sign in
  handleSignIn() {
    console.log('User signed in:', this.currentUser?.email);
    // The UI will update based on auth state
  }
  
  // Handle sign out
  handleSignOut() {
    console.log('User signed out');
    // The UI will update based on auth state
  }
}

// Create a single instance
const authManager = new AuthManager();