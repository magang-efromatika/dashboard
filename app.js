// 1) Konfigurasi Firebase project Anda (Firebase Console > Project settings)
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBt39X5M3hJBIvE5oXvDEHi62OewiDle4o",
  authDomain: "hima-17d08.firebaseapp.com",
  projectId: "hima-17d08",
  storageBucket: "hima-17d08.firebasestorage.app",
  messagingSenderId: "833039321028",
  appId: "1:833039321028:web:0bcf0b3867179c5f3cc691",
  measurementId: "G-TPHRND3F8H"
};

// 2) URL Web App dari Google Apps Script (Deploy > New deployment > Web app)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyMu64Br-npbKr41yr4Y3EJ4YPpO3CyC3YTKS38d0D80Fd7Bi7f_jp00N2GJZOI4pYu/exec";

// 3) Daftar email admin (bisa lihat & kelola pendaftaran)
const ADMIN_EMAILS = [
  "magang@efro.id",
];

// 4) Data peserta Efromatika: email -> {nama, nim, kelompok}
const catra = {
  'khayla.001@magang.efro': {
      nama: 'KHAYLA AZIZAH RAHMAN',
      nim: 125160001,
      kelompok: 5
  },
  'della.002@magang.efro': {
      nama: 'DELLA AULIA NUR SAFITRI',
      nim: 125160002,
      kelompok: 5
  },
  'rossa.003@magang.efro': {
      nama: 'ROSSA INOVA DA SILVA',
      nim: 125160003,
      kelompok: 5
  },
  'salsa.004@magang.efro': {
      nama: 'SALSA TIARA SEPRIANI',
      nim: 125160004,
      kelompok: 5
  },
  'milham.005@magang.efro': {
      nama: 'M. ILHAM AL FAJRI',
      nim: 125160005,
      kelompok: 7
  },
  'vera.006@magang.efro': {
      nama: 'VERA DWI APRILIA',
      nim: 125160006,
      kelompok: 6
  },
  'fauziah.007@magang.efro': {
      nama: 'FAUZIAH AULIA FADILA',
      nim: 125160007,
      kelompok: 4
  },
  'kaysa.008@magang.efro': {
      nama: 'KAYSA JULIETA PUSPITA',
      nim: 125160008,
      kelompok: 6
  },
  'sepia.009@magang.efro': {
      nama: 'SEPIA ANGGUN SAPUTRI',
      nim: 125160009,
      kelompok: 3
  },
  'anabel.010@magang.efro': {
      nama: 'ANABEL NOVELINA MANURUNG',
      nim: 125160010,
      kelompok: 4
  },
  'ririn.011@magang.efro': {
      nama: 'RIRIN MARCELINA MANURUNG',
      nim: 125160011,
      kelompok: 2
  },
  'sopia.012@magang.efro': {
      nama: 'SOPIA PAKPAHAN',
      nim: 125160012,
      kelompok: 3
  },
  'thessa.013@magang.efro': {
      nama: 'THESSA MINARIA LUMBAN SIANTAR',
      nim: 125160013,
      kelompok: 2
  },
  'damar.014@magang.efro': {
      nama: 'DAMAR SAPUTRA',
      nim: 125160014,
      kelompok: 4
  },
  'rendi.015@magang.efro': {
      nama: 'RENDI ARIANTO SIHOTANG',
      nim: 125160015,
      kelompok: 6
  },
  'selvia.017@magang.efro': {
      nama: 'SELVIA TIA IVANKA',
      nim: 125160017,
      kelompok: 1
  },
  'aldi.018@magang.efro': {
      nama: 'ALDI EKO PURNAMA',
      nim: 125160018,
      kelompok: 4
  },
  'rama.019@magang.efro': {
      nama: 'RAMA ADITIYA',
      nim: 125160019,
      kelompok: 5
  },
  'sabila.020@magang.efro': {
      nama: 'SABILA ALLISYA PUTRI',
      nim: 125160020,
      kelompok: 2
  },
  'laura.022@magang.efro': {
      nama: 'LAURA NIVOLIN',
      nim: 125160022,
      kelompok: 4
  },
  'rika.023@magang.efro': {
      nama: 'RIKA RAHAYU',
      nim: 125160023,
      kelompok: 3
  },
  'hani.024@magang.efro': {
      nama: 'HANI SAFIRA BELA',
      nim: 125160024,
      kelompok: 5
  },
  'suci.025@magang.efro': {
      nama: 'SUCI NAYLA SYIFA',
      nim: 125160025,
      kelompok: 1
  },
  'alifia.026@magang.efro': {
      nama: 'ALIFIA INDAH PRATIWI',
      nim: 125160026,
      kelompok: 3
  },
  'nora.027@magang.efro': {
      nama: 'NORA JESICA SEPTIANI SIMATUPANG',
      nim: 125160027,
      kelompok: 7
  },
  'aldo.028@magang.efro': {
      nama: 'ALDO FEBRIANSYAH',
      nim: 125160028,
      kelompok: 1
  },
  'rtdewi.029@magang.efro': {
      nama: 'RT. DEWI LAILATUL UMANIYYAH',
      nim: 125160029,
      kelompok: 7
  },
  'nurul.030@magang.efro': {
      nama: 'NURUL FITRIYANI',
      nim: 125160030,
      kelompok: 5
  },
  'miya.031@magang.efro': {
      nama: 'MIYA ARINI DAMANIK',
      nim: 125160031,
      kelompok: 6
  },
  'bima.032@magang.efro': {
      nama: 'BIMA ALANDIKA',
      nim: 125160032,
      kelompok: 1
  },
  'olda.034@magang.efro': {
      nama: 'OLDA EYUNIKE SIAHAAN',
      nim: 125160034,
      kelompok: 7
  },
  'gebi.035@magang.efro': {
      nama: 'GEBI MASRIDA NABABAN',
      nim: 125160035,
      kelompok: 6
  },
  'josua.036@magang.efro': {
      nama: 'JOSUA FRANSISCO SITUMEANG',
      nim: 125160036,
      kelompok: 3
  },
  'grace.037@magang.efro': {
      nama: 'GRACE THEODORA NATALINA MANURUNG',
      nim: 125160037,
      kelompok: 3
  },
  'dhea.038@magang.efro': {
      nama: 'DHEA AMELIA',
      nim: 125160038,
      kelompok: 1
  },
  'julius.039@magang.efro': {
      nama: 'JULIUS SIMAMORA',
      nim: 125160039,
      kelompok: 5
  },
  'fazlur.040@magang.efro': {
      nama: 'FAZLUR YAZID',
      nim: 125160040,
      kelompok: 1
  },
  'hilarius.041@magang.efro': {
      nama: 'HILARIUS JANNOELTA TARIGAN GIRSANG',
      nim: 125160041,
      kelompok: 3
  },
  'yuly.042@magang.efro': {
      nama: 'YULY FLOWER SIREGAR',
      nim: 125160042,
      kelompok: 7
  },
  'priscilla.043@magang.efro': {
      nama: 'PRISCILLA SYALOMITA GINTING',
      nim: 125160043,
      kelompok: 6
  },
  'syahira.044@magang.efro': {
      nama: 'SYAHIRA LULU RAMADHANI',
      nim: 125160044,
      kelompok: 1
  },
  'khoirunnisaa.045@magang.efro': {
      nama: 'KHOIRUNNISAA GHASSANI PUTRI',
      nim: 125160045,
      kelompok: 7
  },
  'azwa.046@magang.efro': {
      nama: 'AZWA ARDIYANTI AMDIAH',
      nim: 125160046,
      kelompok: 6
  },
  'bintang.047@magang.efro': {
      nama: 'BINTANG XERREND VERIXA',
      nim: 125160047,
      kelompok: 7
  },
  'aldi.048@magang.efro': {
      nama: 'ALDI KURNIAWAN',
      nim: 125160048,
      kelompok: 2
  },
  'arindya.049@magang.efro': {
      nama: 'ARINDYA SALSABILA AYU',
      nim: 125160049,
      kelompok: 2
  },
  'fara.050@magang.efro': {
      nama: 'FARA DWI YUSDITA',
      nim: 125160050,
      kelompok: 6
  },
  'zatmiaty.051@magang.efro': {
      nama: 'ZATMIATY',
      nim: 125160051,
      kelompok: 2
  },
  'lauren.052@magang.efro': {
      nama: 'LAUREN AULIA RAMONA',
      nim: 125160052,
      kelompok: 4
  },
  'grace.053@magang.efro': {
      nama: 'GRACE RADOTIMA SIMANJUNTAK',
      nim: 125160053,
      kelompok: 5
  },
  'mazmur.054@magang.efro': {
      nama: 'MAZMUR SILAEN',
      nim: 125160054,
      kelompok: 6
  },
  'yodha.055@magang.efro': {
      nama: 'YODHA IDMONIA RAZAN',
      nim: 125160055,
      kelompok: 3
  },
  'putri.056@magang.efro': {
      nama: 'PUTRI LESTARI',
      nim: 125160056,
      kelompok: 4
  },
  'hesti.059@magang.efro': {
      nama: 'HESTI SAKINATUN',
      nim: 125160059,
      kelompok: 2
  },
  'joyanti.060@magang.efro': {
      nama: 'JOYANTI GULTOM',
      nim: 125160060,
      kelompok: 4
  },
  'rachel.061@magang.efro': {
      nama: 'RACHEL OLANDA ELIZABETH SITINJAK',
      nim: 125160061,
      kelompok: 4
  },
  'desya.062@magang.efro': {
      nama: 'DESYA CANTIKA ANGGRAINI',
      nim: 125160062,
      kelompok: 3
  },
  'nayla.063@magang.efro': {
      nama: 'NAYLA NUR AZIZAH',
      nim: 125160063,
      kelompok: 6
  },
  'wahyu.064@magang.efro': {
      nama: 'WAHYU AKBAR FAJARI',
      nim: 125160064,
      kelompok: 6
  },
  'tiara.065@magang.efro': {
      nama: 'TIARA SINAGA',
      nim: 125160065,
      kelompok: 3
  },
  'sinky.066@magang.efro': {
      nama: 'SINKY DWI SARI TAMSAR',
      nim: 125160066,
      kelompok: 3
  },
  'uli.067@magang.efro': {
      nama: 'ULI MUSLIHAH',
      nim: 125160067,
      kelompok: 2
  },
  'marwa.068@magang.efro': {
      nama: 'MARWA NADYA HASANAH',
      nim: 125160068,
      kelompok: 1
  },
  'mrifqi.070@magang.efro': {
      nama: 'M.RIFQI SAIFULLAH',
      nim: 125160070,
      kelompok: 2
  },
  'wulan.071@magang.efro': {
      nama: 'WULAN PANCAWATI',
      nim: 125160071,
      kelompok: 2
  },
  'silva.072@magang.efro': {
      nama: 'SILVA NOVITASARI',
      nim: 125160072,
      kelompok: 7
  },
  'ana.073@magang.efro': {
      nama: 'ANA ESTIANI',
      nim: 125160073,
      kelompok: 4
  },
  'herty.074@magang.efro': {
      nama: 'HERTY ROMAITO HABEAHAN',
      nim: 125160074,
      kelompok: 7
  },
  'aura.075@magang.efro': {
      nama: 'AURA RAHMA AZKYA PUTRI',
      nim: 125160075,
      kelompok: 1
  },
  'nurmala.076@magang.efro': {
      nama: 'NURMALA SAFITRI',
      nim: 125160076,
      kelompok: 4
  },
  'elisa.077@magang.efro': {
      nama: 'ELISA ANGGRAINI',
      nim: 125160077,
      kelompok: 7
  },
  'yuko.078@magang.efro': {
      nama: 'YUKO GERARD EDRA PANJAITAN',
      nim: 125160078,
      kelompok: 7
  },
  'ramasari.079@magang.efro': {
      nama: 'RAMASARI HASIBUAN',
      nim: 125160079,
      kelompok: 1
  },
  'riza.080@magang.efro': {
      nama: 'RIZA TRIANDINI',
      nim: 125160080,
      kelompok: 5
  },
  'mrasya.081@magang.efro': {
      nama: 'M.RASYA AGUSTIAN',
      nim: 125160081,
      kelompok: 2
  },
  'vizka.082@magang.efro': {
      nama: 'VIZKA AKDITYA',
      nim: 125160082,
      kelompok: 5
  },
  'felecia.083@magang.efro': {
      nama: 'FELECIA LIDWINA BR SINAGA',
      nim: 125160083,
      kelompok: 1
  }
};


// 5) Daftar Departemen / Badan Usaha / Kesenatoran + slot default (fallback jika belum sinkron dari Sheet)
const UNIT_DEFAULT = [
  { id: "eksternal",  nama: "Departemen Eksternal",                          jenis: "Departemen", slot: 8 },
  { id: "komin",      nama: "Departemen Komunikasi dan Informasi",           jenis: "Departemen", slot: 8 },
  { id: "mikat",      nama: "Departemen Minat dan Bakat",                    jenis: "Departemen", slot: 8 },
  { id: "kastrat",    nama: "Departemen Keilmuan dan Keprofesian",           jenis: "Departemen", slot: 8 },
  { id: "internal",   nama: "Departemen Internal",                           jenis: "Departemen", slot: 8 },
  { id: "psda",       nama: "Departemen Pengembangan Sumber Daya Anggota",   jenis: "Departemen", slot: 8 },
  { id: "bumh",       nama: "Badan Usaha Milik Himpunan",                    jenis: "Badan Usaha", slot: 6 },
  { id: "senator",    nama: "Senator",                                       jenis: "Kesenatoran", slot: 4 },
];

(function(){
  "use strict";

  /* ---------- Firebase init ---------- */
  let fbReady = false;
  try{
    firebase.initializeApp(FIREBASE_CONFIG);
    fbReady = true;
  }catch(e){ console.warn("Firebase belum dikonfigurasi:", e); }

  /* ---------- State ---------- */
  let state = {
    user: null,
    units: JSON.parse(JSON.stringify(UNIT_DEFAULT)),
    myRegistration: null,   // {p1,p2,alasan1,alasan2,cvName}
    allRegs: [],            // dimuat dari Apps Script untuk admin
    view: "login",          // login | dashboard | daftar | admin
    loading: false,
    toast: null,
  };

  const isAdmin = () => state.user && ADMIN_EMAILS.includes(state.user.email);

  function setState(patch){ state = {...state, ...patch}; render(); }
  function showToast(msg, kind){
    setState({ toast: { msg, kind: kind||"info" } });
    setTimeout(()=>{ if(state.toast && state.toast.msg===msg) setState({toast:null}); }, 3200);
  }

  /* ---------- Apps Script bridge ---------- */
  async function callBackend(action, payload){
    if(!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("GANTI")){
      console.warn("APPS_SCRIPT_URL belum diisi — memakai data lokal sementara.");
      return { ok:false, offline:true };
    }
    try{
      const res = await fetch(APPS_SCRIPT_URL, {
        method:"POST",
        headers:{ "Content-Type":"text/plain;charset=utf-8" }, // hindari preflight CORS pada Apps Script
        body: JSON.stringify({ action, payload }),
      });
      return await res.json();
    }catch(err){
      console.error(err);
      return { ok:false, error: String(err) };
    }
  }

  async function refreshUnits(){
    const r = await callBackend("getUnits", {});
    if(r && r.ok && Array.isArray(r.units)) setState({ units: r.units });
  }

  async function refreshAllRegs(){
    if(!isAdmin()) return;
    const r = await callBackend("getAllRegistrations", {});
    if(r && r.ok) setState({ allRegs: r.data || [] });
  }

  /* ---------- Auth ---------- */
  function login(email, password){
    setState({ loading:true });
    if(!fbReady){ showToast("Firebase belum dikonfigurasi.", "error"); setState({loading:false}); return; }
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{ setState({ loading:false }); })
      .catch(err=>{ setState({ loading:false }); showToast(mapAuthError(err), "error"); });
  }
  function logout(){ if(fbReady) firebase.auth().signOut(); setState({ view:"login", myRegistration:null }); }
  function mapAuthError(err){
    const c = err.code||"";
    if(c.includes("wrong-password") || c.includes("invalid-credential")) return "Email atau password salah.";
    if(c.includes("user-not-found")) return "Akun tidak ditemukan. Hubungi panitia.";
    if(c.includes("too-many-requests")) return "Terlalu banyak percobaan. Coba lagi nanti.";
    return "Gagal masuk: " + (err.message || c);
  }

  if(fbReady){
    firebase.auth().onAuthStateChanged(async (user)=>{
      if(user){
        setState({ user, view:"dashboard" });
        await refreshUnits();
        if(isAdmin()) refreshAllRegs();
        startInactivityWatch();
      } else {
        setState({ user:null, view:"login" });
        stopInactivityWatch();
      }
    });
  }

  /* ---------- Auto-logout karena tidak aktif (5 menit) ---------- */
  const INACTIVITY_LIMIT_MS = 5 * 60 * 1000;
  const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
  let inactivityTimer = null;

  function resetInactivityTimer(){
    if(inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(()=>{
      if(state.user){
        logout();
        showToast("Kamu keluar otomatis karena tidak aktif 5 menit.", "info");
      }
    }, INACTIVITY_LIMIT_MS);
  }

  function startInactivityWatch(){
    ACTIVITY_EVENTS.forEach(ev => document.addEventListener(ev, resetInactivityTimer));
    resetInactivityTimer();
  }
  function stopInactivityWatch(){
    ACTIVITY_EVENTS.forEach(ev => document.removeEventListener(ev, resetInactivityTimer));
    if(inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = null;
  }

  /* ---------- Helpers ---------- */
  function profileFor(email){
    return catra[email] || { nama: email.split("@")[0], nim: "-", kelompok: "-" };
  }
  function fileToBase64(file){
    return new Promise((resolve, reject)=>{
      const r = new FileReader();
      r.onload = ()=> resolve(r.result.split(",")[1]);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  /* ---------- Views ---------- */
  function Icon(name, cls){
    const paths = {
      hex: '<path d="M12 2 3 7v10l9 5 9-5V7l-9-5z" />',
      user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/>',
      logout: '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      close: '<path d="M18 6 6 18M6 6l12 12"/>',
      check: '<path d="M20 6 9 17l-5-5"/>',
      shield: '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3z"/>',
      upload: '<path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M4 21h16"/>',
      eye: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>',
      eyeOff: '<path d="M1 12s4-7 11-7c2 0 3.7.5 5.1 1.2M23 12s-4 7-11 7c-2 0-3.7-.5-5.1-1.2M3 3l18 18"/>',
    };
    return `<svg class="${cls||'w-5 h-5'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]||""}</svg>`;
  }

  function LoginView(){
    return `
    <div class="min-h-screen flex items-center justify-center p-4 honey-grad relative overflow-hidden">
      <div class="hex absolute inset-0"></div>
      <div class="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl w-full max-w-sm p-8 fade-in">
        <div class="flex items-center gap-2 mb-1">
          <div class="w-9 h-9 rounded-xl bg-[var(--sarang)] flex items-center justify-center text-white">${Icon("hex","w-5 h-5")}</div>
          <span class="font-bold text-lg tracking-tight">Efromatika</span>
        </div>
        <p class="text-sm text-[var(--tanah)]/70 mb-6">Magang HIMATIKA · masuk dengan akun panitia</p>
        <form id="loginForm" class="space-y-3">
          <div>
            <label class="text-xs font-medium text-[var(--tanah)]/70">Email</label>
            <input required type="email" id="email" class="mt-1 w-full rounded-xl border border-[var(--tanah)]/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--sarang)]" placeholder="nama@student.itera.ac.id" />
          </div>
          <div>
            <label class="text-xs font-medium text-[var(--tanah)]/70">Password</label>
            <div class="relative mt-1">
              <input required type="password" id="password" class="w-full rounded-xl border border-[var(--tanah)]/15 px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--sarang)]" placeholder="••••••••" />
              <button type="button" id="togglePass" tabindex="-1" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--tanah)]/50 hover:text-[var(--tanah)]">${Icon("eye","w-4 h-4")}</button>
            </div>
          </div>
          <button type="submit" class="w-full rounded-xl bg-[var(--tanah)] text-white py-2.5 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50" ${state.loading?"disabled":""}>
            ${state.loading ? "Memproses…" : "Masuk"}
          </button>
        </form>
        <p class="text-[11px] text-center text-[var(--tanah)]/50 mt-5">Belum punya akun? Hubungi panitia Efromatika.</p>
      </div>
    </div>`;
  }

  function unitBadge(jenis){
    const map = { "Departemen":"bg-amber-100 text-amber-800", "Badan Usaha":"bg-orange-100 text-orange-800", "Kesenatoran":"bg-yellow-200 text-yellow-900" };
    return `<span class="text-[11px] font-medium px-2 py-0.5 rounded-full ${map[jenis]||"bg-gray-100 text-gray-700"}">${jenis}</span>`;
  }

  function UnitCard(u){
    const penuh = u.slot <= 0;
    return `
    <div class="bg-white rounded-2xl border border-[var(--tanah)]/10 p-4 flex flex-col gap-2 hover:shadow-md transition">
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold text-sm leading-snug">${u.nama}</h3>
        ${unitBadge(u.jenis)}
      </div>
      <div class="flex items-center gap-1.5 text-xs ${penuh?"text-red-600":"text-[var(--sarang-deep)]"} font-medium">
        <span class="w-1.5 h-1.5 rounded-full ${penuh?"bg-red-500":"bg-[var(--sarang)]"}"></span>
        ${penuh ? "Slot penuh" : `${u.slot} slot tersisa`}
      </div>
    </div>`;
  }

  function DashboardView(){
    const p = profileFor(state.user.email);
    return `
    <div class="min-h-screen">
      ${Navbar(p)}
      <main class="max-w-5xl mx-auto px-4 py-8">
        <div class="honey-grad rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div class="hex absolute inset-0"></div>
          <div class="relative">
            <p class="text-xs font-medium text-[var(--tanah)]/70 mb-1">Halo, ${p.nama.split(" ")[0]} 👋</p>
            <h1 class="text-2xl sm:text-3xl font-bold mb-2">Pilih tempatmu bertumbuh di HIMATIKA</h1>
            <p class="text-sm text-[var(--tanah)]/70 max-w-md mb-4">6 Departemen, 1 Badan Usaha, dan Kesenatoran menunggu kontribusimu. Daftar sekali, pilih dua peminatan.</p>
            ${state.myRegistration
              ? `<span class="inline-flex items-center gap-1.5 bg-white/80 text-sm font-medium px-3 py-1.5 rounded-full">${Icon("check","w-4 h-4")} Kamu sudah mendaftar</span>`
              : `<button id="btnDaftar" class="inline-flex items-center gap-1.5 bg-[var(--tanah)] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90">${Icon("plus","w-4 h-4")} Daftar Sekarang</button>`
            }
          </div>
        </div>

        <div class="flex items-center justify-between mb-3">
          <h2 class="font-semibold text-sm text-[var(--tanah)]/70 uppercase tracking-wide">Unit yang tersedia</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${state.units.map(UnitCard).join("")}
        </div>
      </main>
    </div>`;
  }

  function Navbar(p){
    return `
    <header class="sticky top-0 z-30 bg-[var(--lilin)]/90 backdrop-blur border-b border-[var(--tanah)]/10">
      <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-[var(--sarang)] flex items-center justify-center text-white">${Icon("hex","w-4 h-4")}</div>
          <span class="font-bold text-sm">Efromatika</span>
        </div>
        <div class="flex items-center gap-2">
          ${isAdmin() ? `<button id="btnAdmin" class="text-xs font-medium px-3 py-1.5 rounded-lg border border-[var(--tanah)]/15 hover:bg-white flex items-center gap-1.5">${Icon("shield","w-3.5 h-3.5")} Admin</button>` : ""}
          <div class="text-right hidden sm:block">
            <p class="text-xs font-semibold leading-none">${p.nama}</p>
            <p class="text-[11px] text-[var(--tanah)]/50 leading-none mt-0.5">NIM ${p.nim} · Klp ${p.kelompok}</p>
          </div>
          <button id="btnLogout" title="Keluar" class="w-8 h-8 rounded-lg border border-[var(--tanah)]/15 flex items-center justify-center hover:bg-white">${Icon("logout","w-4 h-4")}</button>
        </div>
      </div>
    </header>`;
  }

  function unitOptions(excludeId, disableId){
    return state.units
      .filter(u => u.id !== excludeId)
      .map(u => `<option value="${u.id}" ${u.id===disableId?"disabled":""} ${u.slot<=0?"disabled":""}>${u.nama} — ${u.slot<=0?"penuh":u.slot+" slot"}</option>`)
      .join("");
  }

  function DaftarView(){
    const p = profileFor(state.user.email);
    return `
    <div class="min-h-screen">
      ${Navbar(p)}
      <main class="max-w-2xl mx-auto px-4 py-8">
        <button id="btnBack" class="text-sm text-[var(--tanah)]/60 hover:text-[var(--tanah)] mb-4 flex items-center gap-1">← Kembali</button>
        <div class="bg-white rounded-3xl border border-[var(--tanah)]/10 p-6 sm:p-8 fade-in">
          <h1 class="text-xl font-bold mb-1">Formulir Pendaftaran Magang</h1>
          <p class="text-sm text-[var(--tanah)]/60 mb-6">Isi dengan lengkap. Data nama, NIM, dan kelompok terkunci sesuai akunmu.</p>
          <form id="daftarForm" class="space-y-4">
            <div class="grid sm:grid-cols-3 gap-3">
              <div><label class="text-xs font-medium text-[var(--tanah)]/60">Nama</label>
                <input disabled value="${p.nama}" class="mt-1 w-full rounded-xl bg-gray-100 border border-[var(--tanah)]/10 px-3 py-2 text-sm text-[var(--tanah)]/70" /></div>
              <div><label class="text-xs font-medium text-[var(--tanah)]/60">NIM</label>
                <input disabled value="${p.nim}" class="mt-1 w-full rounded-xl bg-gray-100 border border-[var(--tanah)]/10 px-3 py-2 text-sm text-[var(--tanah)]/70" /></div>
              <div><label class="text-xs font-medium text-[var(--tanah)]/60">Kelompok</label>
                <input disabled value="${p.kelompok}" class="mt-1 w-full rounded-xl bg-gray-100 border border-[var(--tanah)]/10 px-3 py-2 text-sm text-[var(--tanah)]/70" /></div>
            </div>

            <div>
              <label class="text-xs font-medium text-[var(--tanah)]/70">Pilihan 1 — Departemen/Badan Usaha/Kesenatoran <span class="text-red-500">*</span></label>
              <select required id="pilihan1" class="mt-1 w-full rounded-xl border border-[var(--tanah)]/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--sarang)]">
                <option value="" disabled selected>Pilih salah satu…</option>
                ${unitOptions()}
              </select>
            </div>
            <div>
              <label class="text-xs font-medium text-[var(--tanah)]/70">Alasan memilih Pilihan 1</label>
              <textarea id="alasan1" rows="2" class="mt-1 w-full rounded-xl border border-[var(--tanah)]/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--sarang)]" placeholder="Ceritakan alasanmu…"></textarea>
            </div>

            <div>
              <label class="text-xs font-medium text-[var(--tanah)]/70">Pilihan 2 — Departemen/Badan Usaha/Kesenatoran <span class="text-red-500">*</span></label>
              <select required id="pilihan2" class="mt-1 w-full rounded-xl border border-[var(--tanah)]/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--sarang)]">
                <option value="" disabled selected>Pilih setelah Pilihan 1…</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-medium text-[var(--tanah)]/70">Alasan memilih Pilihan 2</label>
              <textarea id="alasan2" rows="2" class="mt-1 w-full rounded-xl border border-[var(--tanah)]/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--sarang)]" placeholder="Ceritakan alasanmu…"></textarea>
            </div>

            <div>
              <label class="text-xs font-medium text-[var(--tanah)]/70">Upload CV (PDF) <span class="text-red-500">*</span></label>
              <label for="cvFile" class="mt-1 flex items-center gap-2 justify-center border-2 border-dashed border-[var(--tanah)]/20 rounded-xl px-3 py-6 text-sm text-[var(--tanah)]/60 cursor-pointer hover:border-[var(--sarang)] hover:bg-amber-50/40">
                ${Icon("upload","w-4 h-4")} <span id="cvLabel">Klik untuk pilih file PDF</span>
              </label>
              <input required type="file" id="cvFile" accept="application/pdf" class="hidden" />
            </div>

            <button type="submit" class="w-full rounded-xl bg-[var(--tanah)] text-white py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-50" ${state.loading?"disabled":""}>
              ${state.loading ? "Mengirim…" : "Kirim Pendaftaran"}
            </button>
          </form>
        </div>
      </main>
    </div>`;
  }

  function AdminView(){
    const p = profileFor(state.user.email);
    const regs = state.allRegs;
    return `
    <div class="min-h-screen">
      ${Navbar(p)}
      <main class="max-w-6xl mx-auto px-4 py-8">
        <button id="btnBack" class="text-sm text-[var(--tanah)]/60 hover:text-[var(--tanah)] mb-4">← Kembali ke dashboard</button>
        <h1 class="text-xl font-bold mb-1">Panel Admin</h1>
        <p class="text-sm text-[var(--tanah)]/60 mb-6">Kelola slot unit dan tinjau pendaftar.</p>

        <section class="mb-8">
          <h2 class="font-semibold text-sm text-[var(--tanah)]/70 uppercase tracking-wide mb-3">Slot per unit</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            ${state.units.map(u => `
              <div class="bg-white rounded-2xl border border-[var(--tanah)]/10 p-4">
                <p class="text-xs font-semibold mb-2">${u.nama}</p>
                <div class="flex items-center gap-2">
                  <button data-slot-dec="${u.id}" class="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-gray-50">−</button>
                  <span class="text-sm font-bold w-8 text-center">${u.slot}</span>
                  <button data-slot-inc="${u.id}" class="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-gray-50">+</button>
                </div>
              </div>`).join("")}
          </div>
        </section>

        <section>
          <h2 class="font-semibold text-sm text-[var(--tanah)]/70 uppercase tracking-wide mb-3">Pendaftar (${regs.length})</h2>
          <div class="bg-white rounded-2xl border border-[var(--tanah)]/10 overflow-x-auto scrollbar-thin">
            <table class="w-full text-sm min-w-[720px]">
              <thead class="text-left text-[11px] uppercase text-[var(--tanah)]/50 border-b border-[var(--tanah)]/10">
                <tr>
                  <th class="px-4 py-3">Nama</th><th class="px-4 py-3">NIM</th><th class="px-4 py-3">Klp</th>
                  <th class="px-4 py-3">Pilihan 1</th><th class="px-4 py-3">Pilihan 2</th>
                  <th class="px-4 py-3">CV</th><th class="px-4 py-3">Status</th><th class="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${regs.length===0 ? `<tr><td colspan="8" class="px-4 py-6 text-center text-[var(--tanah)]/40">Belum ada data — pastikan APPS_SCRIPT_URL sudah terhubung.</td></tr>` :
                regs.map((r,i)=>`
                  <tr class="border-b border-[var(--tanah)]/5 hover:bg-amber-50/30">
                    <td class="px-4 py-2.5 font-medium">${r.nama}</td>
                    <td class="px-4 py-2.5">${r.nim}</td>
                    <td class="px-4 py-2.5">${r.kelompok}</td>
                    <td class="px-4 py-2.5">${r.pilihan1}</td>
                    <td class="px-4 py-2.5">${r.pilihan2}</td>
                    <td class="px-4 py-2.5">${r.cvUrl?`<a href="${r.cvUrl}" target="_blank" class="text-[var(--sarang-deep)] underline">lihat</a>`:"-"}</td>
                    <td class="px-4 py-2.5"><span class="text-[11px] px-2 py-0.5 rounded-full ${r.status==="Diterima"?"bg-green-100 text-green-700":r.status==="Ditolak"?"bg-red-100 text-red-700":"bg-gray-100 text-gray-600"}">${r.status||"Menunggu"}</span></td>
                    <td class="px-4 py-2.5">
                      <select data-terima="${i}" class="text-xs rounded-lg border border-[var(--tanah)]/15 px-2 py-1">
                        <option value="">Terima ke…</option>
                        <option value="${r.pilihan1}">${r.pilihan1}</option>
                        <option value="${r.pilihan2}">${r.pilihan2}</option>
                        <option value="Ditolak">Tolak</option>
                      </select>
                    </td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>`;
  }

  function Toast(){
    if(!state.toast) return "";
    const bad = state.toast.kind === "error";
    return `<div class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 ${bad?"bg-red-600":"bg-[var(--tanah)]"} text-white text-sm px-4 py-2.5 rounded-xl shadow-lg fade-in">${state.toast.msg}</div>`;
  }

  /* ---------- Render ---------- */
  function render(){
    let html = "";
    if(!state.user) html = LoginView();
    else if(state.view === "daftar") html = DaftarView();
    else if(state.view === "admin" && isAdmin()) html = AdminView();
    else html = DashboardView();
    document.getElementById("app").innerHTML = html + Toast();
    bind();
  }

  /* ---------- Event binding ---------- */
  function bind(){
    const $ = (sel)=>document.querySelector(sel);

    const loginForm = $("#loginForm");
    if(loginForm){
      loginForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        login($("#email").value.trim(), $("#password").value);
      });
    }

    const togglePass = $("#togglePass");
    if(togglePass){
      togglePass.addEventListener("click", ()=>{
        const input = $("#password");
        const showing = input.type === "text";
        input.type = showing ? "password" : "text";
        togglePass.innerHTML = Icon(showing ? "eye" : "eyeOff", "w-4 h-4");
      });
    }

    const btnLogout = $("#btnLogout");
    if(btnLogout) btnLogout.addEventListener("click", logout);

    const btnDaftar = $("#btnDaftar");
    if(btnDaftar) btnDaftar.addEventListener("click", ()=> setState({ view:"daftar" }));

    const btnAdmin = $("#btnAdmin");
    if(btnAdmin) btnAdmin.addEventListener("click", ()=> setState({ view:"admin" }));

    const btnBack = $("#btnBack");
    if(btnBack) btnBack.addEventListener("click", ()=> setState({ view:"dashboard" }));

    const pilihan1 = $("#pilihan1");
    if(pilihan1){
      pilihan1.addEventListener("change", ()=>{
        $("#pilihan2").innerHTML = `<option value="" disabled selected>Pilih salah satu…</option>` + unitOptions(pilihan1.value);
      });
    }

    const cvFile = $("#cvFile");
    if(cvFile){
      cvFile.addEventListener("change", ()=>{
        $("#cvLabel").textContent = cvFile.files[0] ? cvFile.files[0].name : "Klik untuk pilih file PDF";
      });
    }

    const daftarForm = $("#daftarForm");
    if(daftarForm){
      daftarForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const p1 = $("#pilihan1").value, p2 = $("#pilihan2").value;
        if(!p1 || !p2){ showToast("Pilih dua unit peminatan.", "error"); return; }
        if(p1 === p2){ showToast("Pilihan 1 dan 2 tidak boleh sama.", "error"); return; }
        const file = cvFile.files[0];
        if(!file){ showToast("Unggah CV terlebih dahulu.", "error"); return; }

        setState({ loading:true });
        const unit1 = state.units.find(u=>u.id===p1);
        const unit2 = state.units.find(u=>u.id===p2);
        if(unit1.slot<=0 || unit2.slot<=0){
          setState({ loading:false });
          showToast("Salah satu slot sudah penuh — muat ulang dan coba lagi.", "error");
          await refreshUnits();
          return;
        }

        const p = profileFor(state.user.email);
        const cvBase64 = await fileToBase64(file);
        const payload = {
          email: state.user.email,
          nama: p.nama, nim: p.nim, kelompok: p.kelompok,
          pilihan1: unit1.nama, pilihan2: unit2.nama,
          alasan1: $("#alasan1").value.trim(),
          alasan2: $("#alasan2").value.trim(),
          cvFileName: file.name, cvMime: file.type, cvBase64,
        };
        const r = await callBackend("submitRegistration", payload);
        setState({ loading:false });
        if(r && r.ok){
          setState({ myRegistration: payload, view:"dashboard" });
          showToast("Pendaftaran berhasil dikirim!");
          refreshUnits();
        } else {
          showToast(r && r.offline ? "Backend belum tersambung (mode demo)." : "Gagal mengirim, coba lagi.", "error");
        }
      });
    }

    document.querySelectorAll("[data-slot-inc]").forEach(btn=>{
      btn.addEventListener("click", async ()=>{
        const id = btn.getAttribute("data-slot-inc");
        await adjustSlot(id, +1);
      });
    });
    document.querySelectorAll("[data-slot-dec]").forEach(btn=>{
      btn.addEventListener("click", async ()=>{
        const id = btn.getAttribute("data-slot-dec");
        await adjustSlot(id, -1);
      });
    });
    document.querySelectorAll("[data-terima]").forEach(sel=>{
      sel.addEventListener("change", async ()=>{
        const idx = +sel.getAttribute("data-terima");
        const reg = state.allRegs[idx];
        const status = sel.value === "Ditolak" ? "Ditolak" : "Diterima";
        const r = await callBackend("decideRegistration", { row: reg.row, status, diterimaDi: sel.value==="Ditolak"?"":sel.value });
        if(r && r.ok){ showToast("Status diperbarui."); refreshAllRegs(); }
        else showToast("Gagal memperbarui status.", "error");
      });
    });
  }

  async function adjustSlot(id, delta){
    const units = state.units.map(u => u.id===id ? {...u, slot: Math.max(0, u.slot+delta)} : u);
    setState({ units });
    await callBackend("updateSlot", { id, delta });
  }

  render();
})();
