// Landing page HTML content and initialization
function createLandingHTML() {
  return `
    <div class="landing-container">
        <div class="logo-container">
            <img src="assets/adventure-triathlon-logo.svg" alt="Adventure Triathlon" width="550" height="51">
        </div>
        
        <div class="hero-text" id="landing-hero">
            <h1>Track Your Active Summer Journey</h1>
            <p class="tagline">Set goals. Track progress. Achieve greatness.</p>
            
            <div class="features">
                <div class="feature">
                    <div class="feature-icon">
                        <img src="assets/swim-watercolor.svg" alt="Swimming">
                    </div>
                    <div style="font-family: 'Gloria Hallelujah', cursive;">Swimming</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">
                        <img src="assets/bike-watercolor.svg" alt="Cycling">
                    </div>
                    <div style="font-family: 'Gloria Hallelujah', cursive;">Cycling</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">
                        <img src="assets/run-watercolor.svg" alt="Stepping">
                    </div>
                    <div style="font-family: 'Gloria Hallelujah', cursive;">Stepping</div>
                </div>
            </div>
        </div>
        
        <div class="auth-container" id="landing-auth">
            <h2 class="auth-title">Get Started</h2>
            
            <button class="auth-button google-btn" id="google-signin-btn">
                Sign in with Google
            </button>
            
            <div class="divider">or</div>
            
            <input type="email" class="email-input" id="email-input" placeholder="Enter your email...">
            <button class="auth-button magic-btn" id="magic-link-btn">
                Send Magic Link
            </button>
        </div>
        
        <div id="landing-footer">
            <img
              style="vertical-align: middle"
              width="28"
              height="28"
              src="assets/chickpea.svg"
            /><span style="vertical-align: middle">&nbsp;BLACK MARKET hummus + design collective.</span>
        </div>
    </div>
  `;
}

// Initialize sketchy borders for landing page elements  
let bordersInitialized = false;

function initializeLandingBorders() {
  // Prevent multiple initializations
  if (bordersInitialized) {
    return;
  }
  
  // Make sure RoughJS is loaded
  if (typeof rough === 'undefined') {
    setTimeout(() => initializeLandingBorders(), 100);
    return;
  }
  
  bordersInitialized = true;
  
  // Helper function to create sketchy border
  function addSketchyBorder(element, options = {}) {
    if (!element) {
      return;
    }
    const defaults = {
      padding: 10,
      strokeWidth: 2,
      roughness: 1.5,
      bowing: 1,
      fillStyle: 'solid'
    };
    const settings = { ...defaults, ...options };
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    const rect = element.getBoundingClientRect();
    const extraPadding = 20;
    canvas.width = rect.width + extraPadding * 2;
    canvas.height = rect.height + extraPadding * 2;
    canvas.style.position = 'absolute';
    canvas.style.top = `-${extraPadding}px`;
    canvas.style.left = `-${extraPadding}px`;
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    
    element.style.position = 'relative';
    // Don't change the background color - let it be set by the caller
    
    // Append canvas to element
    element.appendChild(canvas);
    
    // Ensure all child elements are above the canvas
    Array.from(element.children).forEach(child => {
      if (child !== canvas && child.style) {
        child.style.position = 'relative';
        child.style.zIndex = '1';
      }
    });
    
    const rc = rough.canvas(canvas);
    
    rc.rectangle(
      extraPadding, 
      extraPadding, 
      rect.width, 
      rect.height, 
      {
        stroke: '#000',
        strokeWidth: settings.strokeWidth,
        roughness: settings.roughness,
        bowing: settings.bowing
      }
    );
  }
    
    // Add borders to main containers
    const heroText = document.getElementById('landing-hero');
    if (heroText) {
      // Ensure the background is white for visibility but positioned correctly
      heroText.style.backgroundColor = 'white';
      heroText.style.position = 'relative';
      addSketchyBorder(heroText, {
        roughness: 1.5,
        bowing: 1.2,
        strokeWidth: 2,
        padding: 15
      });
    }
    
    const authContainer = document.getElementById('landing-auth');
    if (authContainer) {
      // Ensure the background is white for visibility but positioned correctly
      authContainer.style.backgroundColor = 'white';
      authContainer.style.position = 'relative';
      addSketchyBorder(authContainer, {
        roughness: 1.5,
        bowing: 1,
        strokeWidth: 2,
        padding: 15
      });
    }
    
    // Add borders to buttons with a slight delay to ensure proper layout
    setTimeout(() => {
      const buttons = document.querySelectorAll('.auth-button');
      buttons.forEach(button => {
        // Ensure button has proper positioning context
        button.style.position = 'relative';
        button.style.display = 'inline-block';
        
        addSketchyBorder(button, {
          padding: 3,
          roughness: 1.2,
          bowing: 0.8,
          strokeWidth: 2
        });
      });
    }, 100);
}