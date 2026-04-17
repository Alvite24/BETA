// --- Supabase Configuration ---
const SUPABASE_URL = 'https://ktvmekzhyicftdgilnrh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dm1la3poeWljZnRkZ2lsbnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MzA2ODYsImV4cCI6MjA5MjAwNjY4Nn0.w71c8cUT-W2oec7ZP7KdHoWvn86lStLASMyBsv1H70g';

// The global variable from the CDN is 'supabase'
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- State and UI ---
let isSignUpMode = false;
let currentUser = null;

const authModal = document.getElementById('auth-modal');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authSubmitBtn = document.getElementById('auth-submit');
const authSwitchBtn = document.getElementById('auth-switch-btn');
const authSwitchText = document.getElementById('auth-switch-text');
const loginBtn = document.getElementById('login-btn');
const closeAuthBtn = document.getElementById('close-auth');
const authNode = document.getElementById('auth-node');

// --- Auth Logic ---

async function checkUserSession() {
    const { data: { user } } = await _supabase.auth.getUser();
    currentUser = user;
    updateAuthUI(user);
}

function updateAuthUI(user) {
    if (!authNode) return;
    
    if (user) {
        authNode.innerHTML = `
            <div class="user-profile" style="display: flex; align-items: center; gap: 15px;">
                <span style="font-size: 0.85rem; color: var(--text-muted);"><i class="fa-solid fa-user"></i> ${user.email}</span>
                <button class="btn btn-outline" id="logout-btn" style="padding: 6px 12px; font-size: 0.8rem; border-color: #ef4444; color: #ef4444;">Salir</button>
            </div>
        `;
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
        
        // Show Save button if on builder page
        const saveBtn = document.getElementById('save-build-btn');
        if (saveBtn) saveBtn.style.display = 'block';
    } else {
        authNode.innerHTML = `<button class="btn btn-outline" id="login-btn" style="padding: 8px 16px; font-size: 0.9rem;">Iniciar Sesión</button>`;
        document.getElementById('login-btn').addEventListener('click', openAuthModal);
        
        // Hide Save button if on builder page
        const saveBtn = document.getElementById('save-build-btn');
        if (saveBtn) saveBtn.style.display = 'none';
    }
}

async function handleLogin(email, password) {
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert('Error al iniciar sesión: ' + error.message);
    } else {
        closeAuthModal();
        checkUserSession();
    }
}

async function handleSignUp(email, password) {
    const { data, error } = await _supabase.auth.signUp({ email, password });
    if (error) {
        alert('Error al registrarse: ' + error.message);
    } else {
        alert('Registro completado. ¡Inicia sesión con tu nueva cuenta!');
        isSignUpMode = false;
        toggleAuthMode();
    }
}

async function handleLogout() {
    await _supabase.auth.signOut();
    currentUser = null;
    updateAuthUI(null);
}

// --- UI Event Listeners ---

function openAuthModal() {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    authModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    if (isSignUpMode) {
        authTitle.textContent = 'Crear Cuenta';
        authSubmitBtn.textContent = 'Registrarse';
        authSwitchText.textContent = '¿Ya tienes cuenta?';
        authSwitchBtn.textContent = 'Inicia Sesión';
    } else {
        authTitle.textContent = 'Iniciar Sesión';
        authSubmitBtn.textContent = 'Entrar';
        authSwitchText.textContent = '¿No tienes cuenta?';
        authSwitchBtn.textContent = 'Regístrate';
    }
}

if (authForm) {
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        
        if (isSignUpMode) {
            await handleSignUp(email, password);
        } else {
            await handleLogin(email, password);
        }
    });
}

if (authSwitchBtn) authSwitchBtn.addEventListener('click', (e) => { e.preventDefault(); toggleAuthMode(); });
if (loginBtn) loginBtn.addEventListener('click', openAuthModal);
if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuthModal);

// Initial session check
checkUserSession();

// Listen for auth changes
_supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        currentUser = session.user;
        updateAuthUI(session.user);
    } else if (event === 'SIGNED_OUT') {
        currentUser = null;
        updateAuthUI(null);
    }
});
