document.addEventListener('DOMContentLoaded', () => {
  // 🌟 UI Elements
  const splash = document.getElementById('splash');
  const layoutWrapper = document.querySelector('.scroll-wrapper');
  const loader = document.querySelector('.dot-loader');
  const loginToggle = document.getElementById('loginToggle');
  const loginPanel = document.getElementById('loginPanel');
  const closeLogin = document.getElementById('closeLogin');

  const toRegister = document.getElementById('toRegister');
  const toForgot = document.getElementById('toForgot');
  const backToLogin1 = document.getElementById('backToLogin1');
  const backToLogin2 = document.getElementById('backToLogin2');
  const reserveBtn = document.getElementById('reserveNowBtn');

  const loginForm = document.getElementById('loginFormElement');
  const registerForm = document.getElementById('registerFormElement');
  const forgotForm = document.getElementById('forgotFormElement');

  // 🌀 Splash Transition (Staggered with 5-dot loader)
  layoutWrapper.style.display = 'none';

  setTimeout(() => {
    loader?.classList.add('lag-out');
    splash.classList.add('fade-out');
    splash.style.pointerEvents = 'none';

    setTimeout(() => {
      splash.style.display = 'none';
      layoutWrapper.style.display = 'block';

      setTimeout(() => {
        layoutWrapper.classList.add('fade-in');
      }, 300);
    }, 1000);
  }, 3000);

  // 🔐 Login Panel Toggle
  loginToggle?.addEventListener('click', () => {
    loginPanel.classList.remove('hidden');
    switchForm('loginForm');
  });

  reserveBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    loginPanel.classList.remove('hidden');
    switchForm('loginForm');
  });

  closeLogin?.addEventListener('click', () => {
    loginPanel.classList.add('hidden');
  });

  // 🔄 Form Switching
  toRegister?.addEventListener('click', () => switchForm('registerForm'));
  toForgot?.addEventListener('click', () => switchForm('forgotForm'));
  backToLogin1?.addEventListener('click', () => switchForm('loginForm'));
  backToLogin2?.addEventListener('click', () => switchForm('loginForm'));

  function switchForm(targetId) {
    document.querySelectorAll('.form-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    document.getElementById(targetId)?.classList.add('active');
  }

  // 📝 Register
  registerForm?.addEventListener('submit', e => {
    e.preventDefault();
    const username = registerForm.querySelector('input[placeholder="Username"]').value.trim();
    const email = registerForm.querySelector('input[placeholder="Email Address"]').value.trim();
    const contact = registerForm.querySelector('input[placeholder="Contact Number"]').value.trim();
    const password = registerForm.querySelector('input[placeholder="Password"]').value;

    if (!username || !email || !contact || !password) {
      alert('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(u => u.username === username || u.email === email);

    if (exists) {
      alert('User already registered.');
      return;
    }

    users.push({ username, email, contact, password });
    localStorage.setItem('users', JSON.stringify(users));

    switchForm('loginForm');
    setTimeout(() => {
      alert('Registered successfully!');
    }, 300);
  });

  // 🔓 Login
  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    const username = loginForm.querySelector('input[placeholder="Username"]').value.trim();
    const password = loginForm.querySelector('input[placeholder="Password"]').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username);

    if (!user) {
      alert('User not registered.');
      return;
    }

    if (user.password !== password) {
      alert('Incorrect password.');
      return;
    }

    alert('Login successful!');
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    localStorage.setItem('lastLogin', new Date().toISOString());
    window.location.href = 'dashboard.html';
  });

  // 🔁 Forgot Password
  forgotForm?.addEventListener('submit', e => {
    e.preventDefault();
    const username = forgotForm.querySelector('input[placeholder="Username"]').value.trim();
    const contact = forgotForm.querySelector('input[placeholder="Contact Number"]').value.trim();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.contact === contact);

    if (!user) {
      alert('Username and contact number do not match.');
      return;
    }

    const newPassword = prompt('Enter new password:');
    if (!newPassword) return;

    user.password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Password reset successful!');
    switchForm('loginForm');
  });
});
