// UI Manager - Controls what to show based on auth state
class UIManager {
  constructor() {
    this.currentView = null;
  }
  
  // Initialize UI based on auth state
  async initialize() {
    // Listen for auth state changes
    authManager.onAuthStateChange((event, user) => {
      this.updateView(!!user);
    });
    
    // Set initial view based on current auth state
    const user = await authManager.initialize();
    this.updateView(!!user);
  }
  
  // Update view based on authentication state
  updateView(isAuthenticated) {
    const landingSection = document.getElementById('landing-section');
    const appSection = document.getElementById('app-section');
    
    if (!landingSection || !appSection) {
      console.error('Required sections not found');
      return;
    }
    
    if (isAuthenticated) {
      // Show app, hide landing
      landingSection.style.display = 'none';
      appSection.style.display = 'block';
      this.currentView = 'app';
      
      // Initialize app if needed
      if (typeof initializeApp === 'function' && !this.appInitialized) {
        initializeApp();
        this.appInitialized = true;
        
        // Set up logout button
        this.setupAppLogout();
      }
    } else {
      // Show landing, hide app
      landingSection.style.display = 'flex';
      appSection.style.display = 'none';
      this.currentView = 'landing';
      
      // Set up landing page interactions
      this.setupLandingPage();
      
      // Reset borders flag and initialize sketchy borders for landing page
      if (typeof bordersInitialized !== 'undefined') {
        bordersInitialized = false;
      }
      if (typeof initializeLandingBorders === 'function') {
        setTimeout(() => initializeLandingBorders(), 100);
      }
    }
  }
  
  // Set up landing page event handlers
  setupLandingPage() {
    // Only set up once
    if (this.landingSetup) return;
    
    // Google sign in button
    const googleBtn = document.getElementById('google-signin-btn');
    if (googleBtn) {
      googleBtn.onclick = async () => {
        const result = await authManager.signInWithGoogle();
        if (!result.success) {
          alert('Error signing in with Google. Please try again.');
        }
      };
    }
    
    // Magic link button
    const magicBtn = document.getElementById('magic-link-btn');
    const emailInput = document.getElementById('email-input');
    
    if (magicBtn && emailInput) {
      magicBtn.onclick = async () => {
        const email = emailInput.value.trim();
        const result = await authManager.signInWithMagicLink(email);
        
        if (result.success) {
          alert(result.message);
          emailInput.value = '';
        } else {
          alert(result.error || 'Error sending magic link. Please try again.');
        }
      };
      
      // Allow Enter key to submit
      emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          magicBtn.click();
        }
      });
    }
    
    this.landingSetup = true;
  }
  
  // Set up app logout button
  setupAppLogout() {
    const logoutBtn = document.getElementById('logout-dropdown');
    if (logoutBtn) {
      logoutBtn.onclick = async () => {
        await authManager.signOut();
      };
    }
  }
}

// Create a single instance
const uiManager = new UIManager();