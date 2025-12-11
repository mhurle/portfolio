// Simple password protection system
// Toggle this to enable/disable password protection
const ENABLE_PASSWORD_PROTECTION = false;

class PasswordProtection {
  constructor() {
    this.correctPassword = 'michael2025';
    this.storageKey = 'portfolioAuth';
    this.init();
  }

  init() {
    // If password protection is disabled, don't show overlay
    if (!ENABLE_PASSWORD_PROTECTION) {
      return;
    }

    // Check if user is already authenticated
    if (this.isAuthenticated()) {
      return;
    }

    // Show password overlay
    this.createPasswordOverlay();
  }

  isAuthenticated() {
    const authTime = localStorage.getItem(this.storageKey);
    if (!authTime) return false;

    // Check if auth is still valid (24 hours)
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return (Date.now() - parseInt(authTime)) < twentyFourHours;
  }

  createPasswordOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'password-overlay';
    overlay.innerHTML = `
      <div class="password-modal">
        <div class="password-content">
          <h2>Portfolio Access</h2>
          <p>This portfolio is password protected.</p>
          <form id="password-form">
            <input 
              type="password" 
              id="password-input" 
              placeholder="Enter password"
              autocomplete="off"
            >
            <button type="submit">Access Portfolio</button>
          </form>
          <div id="password-error" class="error-message"></div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.addPasswordStyles();
    this.attachEventListeners();

    // Focus on input
    setTimeout(() => {
      document.getElementById('password-input').focus();
    }, 100);
  }

  addPasswordStyles() {
    const styles = `
      <style>
        #password-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1e40af 0%, #0f172a 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          backdrop-filter: blur(10px);
        }

        .password-modal {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          max-width: 400px;
          width: 90%;
          text-align: center;
          animation: fadeIn 0.5s ease-out;
        }

        .password-content h2 {
          color: #1e293b;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          font-family: 'Inter', sans-serif;
        }

        .password-content p {
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        #password-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        #password-input {
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        #password-input:focus {
          border-color: #1e40af;
          box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
        }

        #password-form button {
          background: #1e40af;
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        #password-form button:hover {
          background: #1e3a8a;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(30, 64, 175, 0.3);
        }

        .error-message {
          color: #dc2626;
          font-size: 0.875rem;
          margin-top: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .error-message.show {
          opacity: 1;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 480px) {
          .password-modal {
            padding: 2rem;
            margin: 1rem;
          }
          
          .password-content h2 {
            font-size: 1.5rem;
          }
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
  }

  attachEventListeners() {
    const form = document.getElementById('password-form');
    const input = document.getElementById('password-input');
    const error = document.getElementById('password-error');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const password = input.value.trim();

      if (password === this.correctPassword) {
        this.authenticate();
      } else {
        this.showError('Incorrect password. Please try again.');
        input.value = '';
        input.focus();
      }
    });

    // Clear error on input
    input.addEventListener('input', () => {
      error.classList.remove('show');
    });
  }

  showError(message) {
    const error = document.getElementById('password-error');
    error.textContent = message;
    error.classList.add('show');
  }

  authenticate() {
    // Store authentication timestamp
    localStorage.setItem(this.storageKey, Date.now().toString());

    // Remove overlay with animation
    const overlay = document.getElementById('password-overlay');
    overlay.style.animation = 'fadeOut 0.3s ease-out forwards';

    setTimeout(() => {
      overlay.remove();
    }, 300);
  }
}

// Additional CSS for fade out animation
const fadeOutCSS = `
  <style>
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', fadeOutCSS);

// Initialize password protection when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PasswordProtection();
});