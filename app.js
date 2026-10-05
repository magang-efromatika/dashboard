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
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz96PGvC3pkuWHY6UgAg73qAYtWS4aDG9_yTzuUtXSQ2V_5JcFU-w2rzMsIYwLBaomq/exec";
  
  // 3) Daftar email admin (bisa lihat & kelola pendaftaran)
  const ADMIN_EMAILS = [
    "admin@magang.efro",
  ];
  
  // 3b) Admin per departemen: email akun Firebase -> id unit (kolom "id" di UNIT_DEFAULT / sheet Unit).
  //     Admin departemen hanya bisa mengatur jadwal wawancara untuk unitnya sendiri.
  //     Daftar yang sama WAJIB ada di code.gs (ADMIN_DEPT) karena backend yang memvalidasi.
  const ADMIN_DEPT = {
    "eksternal@magang.efro": "Eksternal",
    "kominfo@magang.efro":     "Kominfo",
    "minbat@magang.efro":     "Minbat",
    "ilprof@magang.efro":   "Ilprof",
    "internal@magang.efro":  "Internal",
    "psda@magang.efro":      "PSDA",
    "bumh@magang.efro":      "BUMH",
    "senator@magang.efro":   "Senator",
  };

  // 3c) Aturan jadwal wawancara (samakan dengan INTERVIEW di code.gs)
  const INTERVIEW = {
    dates: ["2026-10-05", "2026-10-06", "2026-10-07"], // hanya 5 - 7 Oktober 2026
    start: "08:00",
    end: "21:00",
    durationMin: 10,
  };

  // 4) Data peserta Efromatika: email -> {nama, nim, kelompok}
  const catra = {
    'khayla.001@magang.efro': { nama: 'KHAYLA AZIZAH RAHMAN', nim: 125160001, kelompok: 5 },
    'della.002@magang.efro': { nama: 'DELLA AULIA NUR SAFITRI', nim: 125160002, kelompok: 5 },
    'rossa.003@magang.efro': { nama: 'ROSSA INOVA DA SILVA', nim: 125160003, kelompok: 5 },
    'salsa.004@magang.efro': { nama: 'SALSA TIARA SEPRIANI', nim: 125160004, kelompok: 5 },
    'milham.005@magang.efro': { nama: 'M. ILHAM AL FAJRI', nim: 125160005, kelompok: 7 },
    'vera.006@magang.efro': { nama: 'VERA DWI APRILIA', nim: 125160006, kelompok: 6 },
    'fauziah.007@magang.efro': { nama: 'FAUZIAH AULIA FADILA', nim: 125160007, kelompok: 4 },
    'kaysa.008@magang.efro': { nama: 'KAYSA JULIETA PUSPITA', nim: 125160008, kelompok: 6 },
    'sepia.009@magang.efro': { nama: 'SEPIA ANGGUN SAPUTRI', nim: 125160009, kelompok: 3 },
    'anabel.010@magang.efro': { nama: 'ANABEL NOVELINA MANURUNG', nim: 125160010, kelompok: 4 },
    'ririn.011@magang.efro': { nama: 'RIRIN MARCELINA MANURUNG', nim: 125160011, kelompok: 2 },
    'sopia.012@magang.efro': { nama: 'SOPIA PAKPAHAN', nim: 125160012, kelompok: 3 },
    'thessa.013@magang.efro': { nama: 'THESSA MINARIA LUMBAN SIANTAR', nim: 125160013, kelompok: 2 },
    'damar.014@magang.efro': { nama: 'DAMAR SAPUTRA', nim: 125160014, kelompok: 4 },
    'rendi.015@magang.efro': { nama: 'RENDI ARIANTO SIHOTANG', nim: 125160015, kelompok: 6 },
    'selvia.017@magang.efro': { nama: 'SELVIA TIA IVANKA', nim: 125160017, kelompok: 1 },
    'aldi.018@magang.efro': { nama: 'ALDI EKO PURNAMA', nim: 125160018, kelompok: 4 },
    'rama.019@magang.efro': { nama: 'RAMA ADITIYA', nim: 125160019, kelompok: 5 },
    'sabila.020@magang.efro': { nama: 'SABILA ALLISYA PUTRI', nim: 125160020, kelompok: 2 },
    'laura.022@magang.efro': { nama: 'LAURA NIVOLIN', nim: 125160022, kelompok: 4 },
    'rika.023@magang.efro': { nama: 'RIKA RAHAYU', nim: 125160023, kelompok: 3 },
    'hani.024@magang.efro': { nama: 'HANI SAFIRA BELA', nim: 125160024, kelompok: 5 },
    'suci.025@magang.efro': { nama: 'SUCI NAYLA SYIFA', nim: 125160025, kelompok: 1 },
    'alifia.026@magang.efro': { nama: 'ALIFIA INDAH PRATIWI', nim: 125160026, kelompok: 3 },
    'nora.027@magang.efro': { nama: 'NORA JESICA SEPTIANI SIMATUPANG', nim: 125160027, kelompok: 7 },
    'aldo.028@magang.efro': { nama: 'ALDO FEBRIANSYAH', nim: 125160028, kelompok: 1 },
    'rtdewi.029@magang.efro': { nama: 'RT. DEWI LAILATUL UMANIYYAH', nim: 125160029, kelompok: 7 },
    'nurul.030@magang.efro': { nama: 'NURUL FITRIYANI', nim: 125160030, kelompok: 5 },
    'miya.031@magang.efro': { nama: 'MIYA ARINI DAMANIK', nim: 125160031, kelompok: 6 },
    'bima.032@magang.efro': { nama: 'BIMA ALANDIKA', nim: 125160032, kelompok: 1 },
    'olda.034@magang.efro': { nama: 'OLDA EYUNIKE SIAHAAN', nim: 125160034, kelompok: 7 },
    'gebi.035@magang.efro': { nama: 'GEBI MASRIDA NABABAN', nim: 125160035, kelompok: 6 },
    'josua.036@magang.efro': { nama: 'JOSUA FRANSISCO SITUMEANG', nim: 125160036, kelompok: 3 },
    'grace.037@magang.efro': { nama: 'GRACE THEODORA NATALINA MANURUNG', nim: 125160037, kelompok: 3 },
    'dhea.038@magang.efro': { nama: 'DHEA AMELIA', nim: 125160038, kelompok: 1 },
    'julius.039@magang.efro': { nama: 'JULIUS SIMAMORA', nim: 125160039, kelompok: 5 },
    'fazlur.040@magang.efro': { nama: 'FAZLUR YAZID', nim: 125160040, kelompok: 1 },
    'hilarius.041@magang.efro': { nama: 'HILARIUS JANNOELTA TARIGAN GIRSANG', nim: 125160041, kelompok: 3 },
    'yuly.042@magang.efro': { nama: 'YULY FLOWER SIREGAR', nim: 125160042, kelompok: 7 },
    'priscilla.043@magang.efro': { nama: 'PRISCILLA SYALOMITA GINTING', nim: 125160043, kelompok: 6 },
    'syahira.044@magang.efro': { nama: 'SYAHIRA LULU RAMADHANI', nim: 125160044, kelompok: 1 },
    'khoirunnisaa.045@magang.efro': { nama: 'KHOIRUNNISAA GHASSANI PUTRI', nim: 125160045, kelompok: 7 },
    'azwa.046@magang.efro': { nama: 'AZWA ARDIYANTI AMDIAH', nim: 125160046, kelompok: 6 },
    'bintang.047@magang.efro': { nama: 'BINTANG XERREND VERIXA', nim: 125160047, kelompok: 7 },
    'aldi.048@magang.efro': { nama: 'ALDI KURNIAWAN', nim: 125160048, kelompok: 2 },
    'arindya.049@magang.efro': { nama: 'ARINDYA SALSABILA AYU', nim: 125160049, kelompok: 2 },
    'fara.050@magang.efro': { nama: 'FARA DWI YUSDITA', nim: 125160050, kelompok: 6 },
    'zatmiaty.051@magang.efro': { nama: 'ZATMIATY', nim: 125160051, kelompok: 2 },
    'lauren.052@magang.efro': { nama: 'LAUREN AULIA RAMONA', nim: 125160052, kelompok: 4 },
    'grace.053@magang.efro': { nama: 'GRACE RADOTIMA SIMANJUNTAK', nim: 125160053, kelompok: 5 },
    'mazmur.054@magang.efro': { nama: 'MAZMUR SILAEN', nim: 125160054, kelompok: 6 },
    'yodha.055@magang.efro': { nama: 'YODHA IDMONIA RAZAN', nim: 125160055, kelompok: 3 },
    'putri.056@magang.efro': { nama: 'PUTRI LESTARI', nim: 125160056, kelompok: 4 },
    'hesti.059@magang.efro': { nama: 'HESTI SAKINATUN', nim: 125160059, kelompok: 2 },
    'joyanti.060@magang.efro': { nama: 'JOYANTI GULTOM', nim: 125160060, kelompok: 4 },
    'rachel.061@magang.efro': { nama: 'RACHEL OLANDA ELIZABETH SITINJAK', nim: 125160061, kelompok: 4 },
    'desya.062@magang.efro': { nama: 'DESYA CANTIKA ANGGRAINI', nim: 125160062, kelompok: 3 },
    'nayla.063@magang.efro': { nama: 'NAYLA NUR AZIZAH', nim: 125160063, kelompok: 6 },
    'wahyu.064@magang.efro': { nama: 'WAHYU AKBAR FAJARI', nim: 125160064, kelompok: 6 },
    'tiara.065@magang.efro': { nama: 'TIARA SINAGA', nim: 125160065, kelompok: 3 },
    'sinky.066@magang.efro': { nama: 'SINKY DWI SARI TAMSAR', nim: 125160066, kelompok: 3 },
    'uli.067@magang.efro': { nama: 'ULI MUSLIHAH', nim: 125160067, kelompok: 2 },
    'marwa.068@magang.efro': { nama: 'MARWA NADYA HASANAH', nim: 125160068, kelompok: 1 },
    'mrifqi.070@magang.efro': { nama: 'M.RIFQI SAIFULLAH', nim: 125160070, kelompok: 2 },
    'wulan.071@magang.efro': { nama: 'WULAN PANCAWATI', nim: 125160071, kelompok: 2 },
    'silva.072@magang.efro': { nama: 'SILVA NOVITASARI', nim: 125160072, kelompok: 7 },
    'ana.073@magang.efro': { nama: 'ANA ESTIANI', nim: 125160073, kelompok: 4 },
    'herty.074@magang.efro': { nama: 'HERTY ROMAITO HABEAHAN', nim: 125160074, kelompok: 7 },
    'aura.075@magang.efro': { nama: 'AURA RAHMA AZKYA PUTRI', nim: 125160075, kelompok: 1 },
    'nurmala.076@magang.efro': { nama: 'NURMALA SAFITRI', nim: 125160076, kelompok: 4 },
    'elisa.077@magang.efro': { nama: 'ELISA ANGGRAINI', nim: 125160077, kelompok: 7 },
    'yuko.078@magang.efro': { nama: 'YUKO GERARD EDRA PANJAITAN', nim: 125160078, kelompok: 7 },
    'ramasari.079@magang.efro': { nama: 'RAMASARI HASIBUAN', nim: 125160079, kelompok: 1 },
    'riza.080@magang.efro': { nama: 'RIZA TRIANDINI', nim: 125160080, kelompok: 5 },
    'mrasya.081@magang.efro': { nama: 'M.RASYA AGUSTIAN', nim: 125160081, kelompok: 2 },
    'vizka.082@magang.efro': { nama: 'VIZKA AKDITYA', nim: 125160082, kelompok: 5 },
    'felecia.083@magang.efro': { nama: 'FELECIA LIDWINA BR SINAGA', nim: 125160083, kelompok: 1 }
  };
  
  // 5) Daftar Departemen / Badan Usaha / Kesenatoran + slot default
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
      myRegistration: null,   
      allRegs: [],            // Dimuat dari Apps Script untuk admin
      view: "login",          // login | dashboard | daftar | admin
      loading: false,
      ready: false,           
      loadError: false,       
      adminFilterUnit: "all", // all | unit_name
      adminSearch: "",        // kata kunci pencarian
      selectedModalReg: null, // pendaftar yang sedang dibuka modal alasannya
      mySchedules: [],        // jadwal wawancara milik peserta
      candidates: [],         // peserta yang bisa diwawancara (admin)
      schedules: [],          // semua jadwal yang relevan (admin, untuk cek bentrok)
      jadwalUnit: "",         // nama unit yang sedang diatur
      scopeSuper: false,      // true jika admin magang (boleh pilih unit apa pun)
      jadwalLoaded: false,
      jadwalError: false,
    };
    let submitting = false;   
    const MAX_CV_BYTES = 3 * 1024 * 1024; // 3 MB
  
    const isAdmin = () => state.user && ADMIN_EMAILS.includes(state.user.email);
    const adminDeptId = () => (state.user && ADMIN_DEPT[state.user.email]) || null;
    const canSchedule = () => !!state.user && (isAdmin() || !!adminDeptId());
  
    function setState(patch){ state = {...state, ...patch}; render(); }
    function setStateSilent(patch){ state = {...state, ...patch}; } 
  
    let toastTimer = null;
    function showToast(msg, kind){
      let root = document.getElementById("toastRoot");
      if(!root){ root = document.createElement("div"); root.id = "toastRoot"; document.body.appendChild(root); }
      const bad = kind === "error";
      const box = document.createElement("div");
      box.className = "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 " + (bad ? "bg-red-600" : "bg-[var(--tanah)]") +
        " text-white text-sm px-4 py-2.5 rounded-xl shadow-lg fade-in max-w-[90vw] text-center";
      box.textContent = msg;
      root.innerHTML = "";
      root.appendChild(box);
      clearTimeout(toastTimer);
      toastTimer = setTimeout(()=>{ root.innerHTML = ""; }, 3500);
    }
  
    /* ---------- Apps Script bridge ---------- */
    async function callBackend(action, payload, timeoutMs = 30000){
      if(!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("GANTI")){
        console.warn("APPS_SCRIPT_URL belum diisi — memakai data lokal sementara.");
        return { ok:false, offline:true };
      }
      const ctrl = new AbortController();
      const timer = setTimeout(()=> ctrl.abort(), timeoutMs);
      try{
        const res = await fetch(APPS_SCRIPT_URL, {
          method:"POST",
          headers:{ "Content-Type":"text/plain;charset=utf-8" },
          body: JSON.stringify({ action, payload }),
          signal: ctrl.signal,
        });
        return await res.json();
      }catch(err){
        console.error("callBackend gagal:", action, err);
        const msg = err && err.name === "AbortError" ? "Koneksi terlalu lama (timeout)." : String(err);
        return { ok:false, error: msg };
      }finally{
        clearTimeout(timer);
      }
    }
  
    async function fetchUnits(){
      const r = await callBackend("getUnits", {});
      return (r && r.ok && Array.isArray(r.units)) ? r.units : null;
    }
    async function fetchMyRegistration(){
      if(!state.user) return null;
      const r = await callBackend("getMyRegistration", { email: state.user.email });
      return (r && r.ok) ? r : null;   
    }
    async function refreshUnits(){
      const units = await fetchUnits();
      if(units) setState({ units });
      return !!units;
    }
    async function loadInitialData(){
      setState({ ready:false, loadError:false });
      const [units, reg] = await Promise.all([fetchUnits(), fetchMyRegistration()]);
      if(!state.user) return; 
      if(units && reg){
        setState({ units, myRegistration: reg.registered ? reg.data : null, ready:true, loadError:false });
        if(reg.registered) refreshMySchedules();
      } else {
        setState({ loadError:true });
      }
    }
  
    async function refreshAllRegs(){
      if(!isAdmin()) return;
      const r = await callBackend("getAllRegistrations", {});
      if(r && r.ok) setState({ allRegs: r.data || [] });
    }
  
    /* ---------- Jadwal wawancara: backend & helper ---------- */
    // Aksi jadwal memakai token Firebase supaya backend bisa memverifikasi siapa yang memanggil
    async function callSecure(action, payload, timeoutMs){
      if(!fbReady || !state.user) return { ok:false, error:"Belum login." };
      try{
        const idToken = await state.user.getIdToken();
        return await callBackend(action, { ...(payload||{}), idToken }, timeoutMs);
      }catch(err){
        return { ok:false, error:String(err) };
      }
    }
    async function refreshMySchedules(){
      const r = await callSecure("getMySchedules", {});
      if(r && r.ok) setState({ mySchedules: r.data || [] });
    }
    async function refreshInterviewData(){
      const r = await callSecure("getInterviewData", {});
      if(r && r.ok){
        let unit = state.jadwalUnit;
        if(!r.isSuper) unit = r.unit;
        else if(!unit) unit = (state.units[0] || {}).nama || "";
        setState({ candidates:r.candidates||[], schedules:r.schedules||[], scopeSuper:!!r.isSuper,
                   jadwalUnit:unit, jadwalLoaded:true, jadwalError:false });
        return true;
      }
      showToast((r && r.error) || "Gagal memuat data jadwal.", "error");
      setState({ jadwalError:true });
      return false;
    }

    const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
    const toMin = (t) => { const [h,m] = String(t).split(":").map(Number); return h*60 + m; };
    const toHHMM = (m) => String(Math.floor(m/60)).padStart(2,"0") + ":" + String(m%60).padStart(2,"0");
    const overlaps = (aS, aE, bS, bE) => toMin(aS) < toMin(bE) && toMin(bS) < toMin(aE);
    function timeSlots(){
      const out = [];
      for(let m = toMin(INTERVIEW.start); m + INTERVIEW.durationMin <= toMin(INTERVIEW.end); m += INTERVIEW.durationMin) out.push(toHHMM(m));
      return out;
    }
    function fmtTanggal(iso, short){
      const [y, m, d] = iso.split("-").map(Number);
      return new Date(y, m-1, d).toLocaleDateString("id-ID", short
        ? { weekday:"short", day:"numeric", month:"short" }
        : { weekday:"long", day:"numeric", month:"long", year:"numeric" });
    }
    // "" = tersedia | "terisi" = dipakai peserta lain di unit ini | "bentrok" = peserta sudah wawancara di unit lain
    function slotStatus(c, unitNama, tanggal, mulai){
      const selesai = toHHMM(toMin(mulai) + INTERVIEW.durationMin);
      for(const s of state.schedules){
        if(s.tanggal !== tanggal || !overlaps(mulai, selesai, s.mulai, s.selesai)) continue;
        if(s.email === c.email && s.unit !== unitNama) return "bentrok";
        if(s.unit === unitNama && s.email !== c.email) return "terisi";
      }
      return "";
    }

    /* ---------- Auth ---------- */
    function login(email, password){
      setState({ loading:true });
      if(!fbReady){ showToast("Firebase belum dikonfigurasi.", "error"); setState({loading:false}); return; }
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{ setState({ loading:false }); })
        .catch(err=>{ setState({ loading:false }); showToast(mapAuthError(err), "error"); });
    }
    function logout(){ if(fbReady) firebase.auth().signOut(); setState({ view:"login", myRegistration:null, ready:false, loadError:false, mySchedules:[], candidates:[], schedules:[], jadwalLoaded:false, jadwalError:false }); }
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
          setState({ user, view:"dashboard", myRegistration:null, ready:false, loadError:false });
          startInactivityWatch();
          if(isAdmin()) refreshAllRegs();
          await loadInitialData();
        } else {
          setState({ user:null, view:"login" });
          stopInactivityWatch();
        }
      });
    }
  
    /* ---------- Auto-logout (5 menit) ---------- */
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
  
    /* ---------- Icons ---------- */
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
        search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
        filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
        calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'
      };
      return `<svg class="${cls||'w-5 h-5'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]||""}</svg>`;
    }

    /* ---------- Views ---------- */
    function LoginView(){
      return `
      <div class="min-h-screen flex items-center justify-center p-4 honey-grad relative overflow-hidden">
        <div class="hex absolute inset-0"></div>
        <div class="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl w-full max-w-sm p-8 fade-in">
          <div class="flex items-center gap-2 mb-1">
            <div class="w-9 h-9 rounded-xl bg-[var(--sarang)] flex items-center justify-center text-white">${Icon("hex","w-5 h-5")}</div>
            <span class="font-bold text-lg tracking-tight">Efromatika</span>
          </div>
          <p class="text-sm text-[var(--tanah)]/70 mb-6">Cek Email dan Password di Email ITERA-mu!</p>
          <form id="loginForm" class="space-y-3">
            <div>
              <label class="text-xs font-medium text-[var(--tanah)]/70">Email</label>
              <input required type="email" id="email" class="mt-1 w-full rounded-xl border border-[var(--tanah)]/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--sarang)]" placeholder="nama.unim@magang.efro" />
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
      const penuh = state.ready && u.slot <= 0;
      return `
      <div class="bg-white rounded-2xl border border-[var(--tanah)]/10 p-4 flex flex-col gap-2 hover:shadow-md transition">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-semibold text-sm leading-snug">${u.nama}</h3>
          ${unitBadge(u.jenis)}
        </div>
        <div class="flex items-center gap-1.5 text-xs ${penuh?"text-red-600":"text-[var(--sarang-deep)]"} font-medium">
          <span class="w-1.5 h-1.5 rounded-full ${penuh?"bg-red-500":"bg-[var(--sarang)]"}"></span>
          ${!state.ready ? (state.loadError ? "Slot gagal dimuat" : "Memuat slot…") : penuh ? "Slot penuh" : `${u.slot} slot tersisa`}
        </div>
      </div>`;
    }
  
    function DaftarAction(){
      const base = "inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-[var(--tanah)] text-white";
      if(state.myRegistration){
        const r = state.myRegistration;
        const statusText = r.status === "Diterima" ? `Diterima di ${r.diterimaDi}` : (r.status || "Menunggu");
        const statusColor = r.status === "Diterima" ? "bg-green-100 text-green-800 border-green-300" : r.status === "Ditolak" ? "bg-red-100 text-red-800 border-red-300" : "bg-yellow-100 text-yellow-800 border-yellow-300";
        return `<div class="space-y-2">
          <span class="inline-flex items-center gap-1.5 bg-white/90 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">${Icon("check","w-4 h-4 text-green-600")} Kamu sudah mendaftar</span>
          <p class="text-xs text-[var(--tanah)]/80">Pilihan 1: <strong>${r.pilihan1}</strong> · Pilihan 2: <strong>${r.pilihan2}</strong></p>
          <div>
            <span class="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg border ${statusColor}">
              Status: ${statusText}
            </span>
          </div>
        </div>`;
      }
      if(state.loadError){
        return `<div class="flex items-center gap-3 flex-wrap">
          <span class="text-sm text-red-700 font-medium">Gagal memuat data.</span>
          <button id="btnRetry" class="${base} hover:opacity-90">Coba lagi</button>
        </div>`;
      }
      if(!state.ready){
        return `<button disabled class="${base} opacity-50 cursor-not-allowed">Memuat data…</button>`;
      }
      return `<button id="btnDaftar" class="${base} hover:opacity-90">${Icon("plus","w-4 h-4")} Daftar Sekarang</button>`;
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
              ${DaftarAction()}
            </div>
          </div>
  
          ${JadwalCard()}

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
            ${canSchedule() ? `<button id="btnJadwal" class="text-xs font-medium px-3 py-1.5 rounded-lg border border-[var(--tanah)]/15 bg-white hover:bg-amber-50 text-[var(--tanah)] flex items-center gap-1.5 shadow-sm">${Icon("calendar","w-3.5 h-3.5")} Jadwal Wawancara</button>` : ""}
            ${isAdmin() ? `<button id="btnAdmin" class="text-xs font-medium px-3 py-1.5 rounded-lg border border-[var(--tanah)]/15 bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center gap-1.5 shadow-sm">${Icon("shield","w-3.5 h-3.5")} Admin Panel</button>` : ""}
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

    /* ---------- JADWAL WAWANCARA: CARD PESERTA ---------- */
    function JadwalCard(){
      const r = state.myRegistration;
      if(!r || r.status === "Ditolak") return "";
      const units = [r.pilihan1, r.pilihan2].filter(Boolean);
      if(!units.length) return "";
      const rows = units.map((u, idx) => {
        const s = state.mySchedules.find(x => x.unit === u);
        const lokasi = s && s.lokasi
          ? (/^https?:\/\//.test(s.lokasi)
              ? `<a href="${esc(s.lokasi)}" target="_blank" rel="noopener" class="underline text-amber-800 break-all">${esc(s.lokasi)}</a>`
              : esc(s.lokasi))
          : "";
        return `
        <div class="rounded-2xl border ${s ? "border-green-200 bg-green-50/60" : "border-[var(--tanah)]/10 bg-amber-50/40"} p-4">
          <p class="text-[11px] font-semibold text-[var(--tanah)]/50 uppercase tracking-wide mb-0.5">Pilihan ${idx+1}</p>
          <p class="text-sm font-semibold leading-snug mb-2">${esc(u)}</p>
          ${s ? `
            <p class="text-xs font-medium">📅 ${fmtTanggal(s.tanggal)}</p>
            <p class="text-xs mt-1">🕒 ${s.mulai} – ${s.selesai} WIB</p>
            ${lokasi ? `<p class="text-xs mt-1 text-[var(--tanah)]/70">📍 ${lokasi}</p>` : ""}
          ` : `<p class="text-xs text-[var(--tanah)]/60">Belum dijadwalkan. Pantau terus halaman ini.</p>`}
        </div>`;
      }).join("");
      return `
      <section class="bg-white rounded-3xl border border-[var(--tanah)]/10 p-5 sm:p-6 mb-8 fade-in">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[var(--sarang-deep)]">${Icon("calendar","w-4 h-4")}</span>
          <h2 class="font-semibold text-sm uppercase tracking-wide text-[var(--tanah)]/80">Jadwal Wawancara</h2>
        </div>
        <p class="text-xs text-[var(--tanah)]/60 mb-4">Wawancara kedua pilihanmu diatur agar tidak bertabrakan. Jadwal bisa berubah, cek halaman ini secara berkala.</p>
        <div class="grid sm:grid-cols-2 gap-3">${rows}</div>
      </section>`;
    }

    /* ---------- JADWAL WAWANCARA: VIEW ADMIN ---------- */
    function currentJadwalList(){
      return state.candidates.filter(c => c.pilihan1 === state.jadwalUnit || c.pilihan2 === state.jadwalUnit);
    }
    function timeOptionsHTML(c, unitNama, tanggal, selected){
      if(!tanggal) return `<option value="" disabled selected>Pilih tanggal dulu</option>`;
      return `<option value="" disabled ${selected ? "" : "selected"}>Pilih jam…</option>` +
        timeSlots().map(t => {
          const st = slotStatus(c, unitNama, tanggal, t);
          const end = toHHMM(toMin(t) + INTERVIEW.durationMin);
          const tag = st === "terisi" ? " (terisi)" : st === "bentrok" ? " (bentrok)" : "";
          return `<option value="${t}" ${st ? "disabled" : ""} ${t === selected ? "selected" : ""}>${t} – ${end}${tag}</option>`;
        }).join("");
    }

    function JadwalView(){
      const p = profileFor(state.user.email);
      const unit = state.jadwalUnit;
      const list = currentJadwalList();
      const inputCls = "text-xs rounded-xl border border-[var(--tanah)]/20 px-2.5 py-1.5 bg-white focus:ring-2 focus:ring-[var(--sarang)] focus:outline-none";
      const dateLabel = INTERVIEW.dates.map(d => fmtTanggal(d, true)).join(", ");

      let body;
      if(state.jadwalError && !state.jadwalLoaded){
        body = `<div class="p-8 text-center text-sm text-red-700">Gagal memuat data. <button id="btnJadwalRetry" class="ml-2 underline font-semibold">Coba lagi</button></div>`;
      } else if(!state.jadwalLoaded){
        body = `<div class="p-8 text-center text-sm text-gray-500">Memuat data jadwal…</div>`;
      } else if(list.length === 0){
        body = `<div class="p-8 text-center text-xs text-gray-400">Belum ada pendaftar yang memilih ${esc(unit)}.</div>`;
      } else {
        body = `
        <div class="overflow-x-auto scrollbar-thin">
          <table class="w-full text-sm text-left border-collapse min-w-[900px]">
            <thead class="text-[11px] uppercase bg-amber-50/60 text-[var(--tanah)]/70 border-b border-[var(--tanah)]/10">
              <tr>
                <th class="px-4 py-3">Peserta</th>
                <th class="px-4 py-3">Urutan Pilihan</th>
                <th class="px-4 py-3">Jadwal Saat Ini</th>
                <th class="px-4 py-3">Atur Jadwal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              ${list.map((c, i) => {
                const ex = state.schedules.find(s => s.email === c.email && s.unit === unit);
                const others = state.schedules.filter(s => s.email === c.email && s.unit !== unit);
                return `
                <tr class="hover:bg-amber-50/30 transition align-top">
                  <td class="px-4 py-3">
                    <p class="font-semibold text-xs text-gray-900">${esc(c.nama)}</p>
                    <p class="text-[11px] text-gray-500">NIM: ${esc(c.nim)} · Klp: ${esc(c.kelompok)}</p>
                  </td>
                  <td class="px-4 py-3 text-xs">
                    <span class="font-medium">${c.pilihan1 === unit ? "Pilihan 1" : "Pilihan 2"}</span>
                    ${others.map(o => `<p class="text-[10px] text-gray-500 mt-1">Wawancara lain: ${esc(o.unit)} · ${fmtTanggal(o.tanggal, true)} ${o.mulai}</p>`).join("")}
                  </td>
                  <td class="px-4 py-3 text-xs">
                    ${ex ? `<span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-100 text-green-800">${fmtTanggal(ex.tanggal, true)} · ${ex.mulai}–${ex.selesai}</span>
                            ${ex.lokasi ? `<p class="text-[10px] text-gray-500 mt-1">${esc(ex.lokasi)}</p>` : ""}`
                        : `<span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-yellow-100 text-yellow-800">Belum dijadwalkan</span>`}
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex flex-wrap items-center gap-2">
                      <select data-jd-date="${i}" class="${inputCls}">
                        <option value="" disabled ${ex ? "" : "selected"}>Tanggal…</option>
                        ${INTERVIEW.dates.map(d => `<option value="${d}" ${ex && ex.tanggal === d ? "selected" : ""}>${fmtTanggal(d, true)}</option>`).join("")}
                      </select>
                      <select data-jd-time="${i}" class="${inputCls}">
                        ${timeOptionsHTML(c, unit, ex ? ex.tanggal : "", ex ? ex.mulai : "")}
                      </select>
                      <input data-jd-loc="${i}" value="${esc(ex ? ex.lokasi : "")}" placeholder="Ruang / link meeting" class="${inputCls} w-40" />
                      <button data-jd-save="${i}" class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--tanah)] text-white hover:opacity-90 disabled:opacity-50">Simpan</button>
                      ${ex ? `<button data-jd-del="${i}" class="text-xs font-medium px-3 py-1.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50">Hapus</button>` : ""}
                    </div>
                  </td>
                </tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>`;
      }

      return `
      <div class="min-h-screen pb-12">
        ${Navbar(p)}
        <main class="max-w-6xl mx-auto px-4 py-8">
          <div class="flex items-center justify-between mb-4">
            <button id="btnBack" class="text-sm font-medium text-[var(--tanah)]/70 hover:text-[var(--tanah)] flex items-center gap-1">← Kembali ke dashboard</button>
            <button id="btnRefreshJadwal" class="text-xs bg-amber-200/60 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-lg font-medium transition">🔄 Segarkan Data</button>
          </div>

          <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 mb-6">
            <h1 class="text-xl font-bold">Jadwal Wawancara</h1>
            <p class="text-xs text-[var(--tanah)]/70 mt-1">Hanya tanggal ${dateLabel} 2026, durasi ${INTERVIEW.durationMin} menit per sesi (${INTERVIEW.start}–${INTERVIEW.end}).
              Jam bertanda <strong>terisi</strong> sudah dipakai peserta lain di unit ini, <strong>bentrok</strong> berarti peserta sudah punya wawancara di unit lain pada jam tersebut.</p>
            <div class="mt-3">
              ${state.scopeSuper
                ? `<select id="jadwalUnitSelect" class="bg-white border border-[var(--tanah)]/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--sarang)]">
                     ${state.units.map(u => `<option value="${esc(u.nama)}" ${u.nama === unit ? "selected" : ""}>${esc(u.nama)}</option>`).join("")}
                   </select>`
                : `<span class="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[var(--tanah)]/10">${esc(unit || "…")}</span>`}
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-[var(--tanah)]/10 overflow-hidden shadow-sm">${body}</div>
        </main>
      </div>`;
    }

    function bindJadwal(){
      const q = (sel) => document.querySelector(sel);

      const btnJadwal = q("#btnJadwal");
      if(btnJadwal) btnJadwal.addEventListener("click", ()=>{
        setState({ view:"jadwal", jadwalError:false });
        refreshInterviewData();
      });
      if(state.view !== "jadwal") return;

      ["#btnRefreshJadwal", "#btnJadwalRetry"].forEach(id => {
        const b = q(id);
        if(b) b.addEventListener("click", async ()=>{
          showToast("Memperbarui data jadwal...");
          if(await refreshInterviewData()) showToast("Data jadwal terbaru dimuat.");
        });
      });

      const unitSel = q("#jadwalUnitSelect");
      if(unitSel) unitSel.addEventListener("change", e => setState({ jadwalUnit: e.target.value }));

      const unit = state.jadwalUnit;
      const list = currentJadwalList();

      document.querySelectorAll("[data-jd-date]").forEach(sel => {
        sel.addEventListener("change", ()=>{
          const i = +sel.getAttribute("data-jd-date");
          const c = list[i]; if(!c) return;
          q(`[data-jd-time="${i}"]`).innerHTML = timeOptionsHTML(c, unit, sel.value, "");
        });
      });

      document.querySelectorAll("[data-jd-save]").forEach(btn => {
        btn.addEventListener("click", async ()=>{
          const i = +btn.getAttribute("data-jd-save");
          const c = list[i]; if(!c) return;
          const tanggal = q(`[data-jd-date="${i}"]`).value;
          const mulai = q(`[data-jd-time="${i}"]`).value;
          const lokasi = q(`[data-jd-loc="${i}"]`).value.trim();
          if(!INTERVIEW.dates.includes(tanggal)){ showToast("Pilih tanggal antara 5 - 7 Oktober 2026.", "error"); return; }
          if(!mulai){ showToast("Pilih jam wawancara.", "error"); return; }
          if(slotStatus(c, unit, tanggal, mulai)){ showToast("Jam tersebut tidak tersedia.", "error"); return; }
          btn.disabled = true; btn.textContent = "Menyimpan…";
          const r = await callSecure("setSchedule", { email:c.email, unit, tanggal, mulai, lokasi });
          if(r && r.ok) showToast(`Jadwal ${c.nama} disimpan.`);
          else showToast((r && r.error) || "Gagal menyimpan jadwal.", "error");
          await refreshInterviewData();   // selalu sinkron ulang (mungkin ada perubahan admin lain)
        });
      });

      document.querySelectorAll("[data-jd-del]").forEach(btn => {
        btn.addEventListener("click", async ()=>{
          const c = list[+btn.getAttribute("data-jd-del")]; if(!c) return;
          if(!confirm(`Hapus jadwal wawancara ${c.nama}?`)) return;
          const r = await callSecure("deleteSchedule", { email:c.email, unit });
          if(r && r.ok) showToast("Jadwal dihapus.");
          else showToast((r && r.error) || "Gagal menghapus jadwal.", "error");
          await refreshInterviewData();
        });
      });
    }

    /* ---------- ADMIN VIEW ---------- */
    function AdminView(){
      const p = profileFor(state.user.email);
      let regs = state.allRegs || [];

      // Filter berdasarkan Unit/Departemen
      if(state.adminFilterUnit && state.adminFilterUnit !== "all"){
        regs = regs.filter(r => 
          r.pilihan1 === state.adminFilterUnit || 
          r.pilihan2 === state.adminFilterUnit ||
          r.diterimaDi === state.adminFilterUnit
        );
      }

      // Filter berdasarkan pencarian
      if(state.adminSearch && state.adminSearch.trim() !== ""){
        const q = state.adminSearch.toLowerCase().trim();
        regs = regs.filter(r => 
          String(r.nama).toLowerCase().includes(q) ||
          String(r.nim).toLowerCase().includes(q) ||
          String(r.kelompok).toLowerCase().includes(q)
        );
      }

      const totalDiterima = state.allRegs.filter(r => r.status === "Diterima").length;
      const totalMenunggu = state.allRegs.filter(r => !r.status || r.status === "Menunggu").length;

      return `
      <div class="min-h-screen pb-12">
        ${Navbar(p)}
        <main class="max-w-6xl mx-auto px-4 py-8">
          <div class="flex items-center justify-between mb-4">
            <button id="btnBack" class="text-sm font-medium text-[var(--tanah)]/70 hover:text-[var(--tanah)] flex items-center gap-1">← Kembali ke dashboard</button>
            <button id="btnRefreshAdmin" class="text-xs bg-amber-200/60 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-lg font-medium transition">🔄 Segarkan Data</button>
          </div>

          <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 mb-6 flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h1 class="text-xl font-bold text-[var(--tanah)]">Panel Kelola Pendaftaran & Slot Unit</h1>
              <p class="text-xs text-[var(--tanah)]/70">Atur ketersediaan slot dan proses penerimaan peserta ke departemen masing-masing.</p>
            </div>
            <div class="flex gap-3">
              <div class="bg-white px-3 py-2 rounded-xl text-center shadow-sm border border-[var(--tanah)]/10">
                <span class="block text-[10px] text-gray-500 uppercase font-semibold">Total Pendaftar</span>
                <span class="text-lg font-bold">${state.allRegs.length}</span>
              </div>
              <div class="bg-white px-3 py-2 rounded-xl text-center shadow-sm border border-[var(--tanah)]/10">
                <span class="block text-[10px] text-green-600 uppercase font-semibold">Diterima</span>
                <span class="text-lg font-bold text-green-600">${totalDiterima}</span>
              </div>
              <div class="bg-white px-3 py-2 rounded-xl text-center shadow-sm border border-[var(--tanah)]/10">
                <span class="block text-[10px] text-amber-600 uppercase font-semibold">Menunggu</span>
                <span class="text-lg font-bold text-amber-600">${totalMenunggu}</span>
              </div>
            </div>
          </div>

          <!-- KELOLA SLOT -->
          <section class="mb-8">
            <h2 class="font-semibold text-sm text-[var(--tanah)]/70 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <span>Slot Departemen / Unit</span>
            </h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              ${state.units.map(u => {
                const countAccepted = state.allRegs.filter(r => r.diterimaDi === u.nama).length;
                return `
                <div class="bg-white rounded-2xl border border-[var(--tanah)]/10 p-4 shadow-sm flex flex-col justify-between gap-2">
                  <div>
                    <p class="text-xs font-semibold leading-tight mb-1">${u.nama}</p>
                    <span class="text-[10px] text-gray-500">Diterima: <strong class="text-green-700">${countAccepted}</strong> peserta</span>
                  </div>
                  <div class="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span class="text-xs text-gray-600">Sisa slot:</span>
                    <div class="flex items-center gap-2">
                      <button data-slot-dec="${u.id}" title="Kurangi slot" class="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold">-</button>
                      <span class="text-sm font-bold w-6 text-center">${u.slot}</span>
                      <button data-slot-inc="${u.id}" title="Tambah slot" class="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold">+</button>
                    </div>
                  </div>
                </div>`;
              }).join("")}
            </div>
          </section>

          <!-- LIST PENDAFTAR -->
          <section>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 class="font-semibold text-sm text-[var(--tanah)]/80 uppercase tracking-wide">Daftar Peserta (${regs.length})</h2>
                <p class="text-xs text-gray-500">Tinjau pilihan departemen dan langsung tentukan status kelulusan peserta.</p>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <!-- Filter Dropdown -->
                <div class="relative">
                  <select id="adminFilterSelect" class="bg-white border border-[var(--tanah)]/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--sarang)] pr-8">
                    <option value="all" ${state.adminFilterUnit==="all"?"selected":""}>Semua Departemen / Unit</option>
                    ${state.units.map(u => `<option value="${u.nama}" ${state.adminFilterUnit===u.nama?"selected":""}>${u.nama}</option>`).join("")}
                  </select>
                </div>

                <!-- Input Cari -->
                <div class="relative">
                  <input type="text" id="adminSearchInput" value="${state.adminSearch||""}" placeholder="Cari Nama/NIM/Klp..." class="bg-white border border-[var(--tanah)]/20 rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--sarang)] w-44" />
                  <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">${Icon("search","w-3.5 h-3.5")}</span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-[var(--tanah)]/10 overflow-hidden shadow-sm">
              <div class="overflow-x-auto scrollbar-thin">
                <table class="w-full text-sm text-left border-collapse min-w-[850px]">
                  <thead class="text-[11px] uppercase bg-amber-50/60 text-[var(--tanah)]/70 border-b border-[var(--tanah)]/10">
                    <tr>
                      <th class="px-4 py-3">Peserta</th>
                      <th class="px-4 py-3">Pilihan 1</th>
                      <th class="px-4 py-3">Pilihan 2</th>
                      <th class="px-4 py-3">Status Keputusan</th>
                      <th class="px-4 py-3 text-center">Detail Alasan</th>
                      <th class="px-4 py-3 text-center">Aksi / Terima Di</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    ${regs.length === 0 ? `
                      <tr>
                        <td colspan="6" class="px-4 py-8 text-center text-gray-400 text-xs">
                          Tidak ditemukan pendaftar ${state.adminFilterUnit !== 'all' ? `di unit "<strong>${state.adminFilterUnit}</strong>"` : ''}.
                        </td>
                      </tr>` :
                      regs.map((r, i) => {
                        const isAccepted = r.status === "Diterima";
                        const isRejected = r.status === "Ditolak";

                        return `
                        <tr class="hover:bg-amber-50/30 transition">
                          <td class="px-4 py-3">
                            <p class="font-semibold text-xs text-gray-900">${r.nama}</p>
                            <p class="text-[11px] text-gray-500">NIM: ${r.nim} · Klp: ${r.kelompok}</p>
                            <p class="text-[10px] text-gray-400 truncate max-w-[150px]">${r.email}</p>
                          </td>
                          <td class="px-4 py-3 text-xs">
                            <span class="font-medium ${r.diterimaDi === r.pilihan1 ? "text-green-700 font-bold": "text-gray-800"}">${r.pilihan1}</span>
                            ${r.diterimaDi === r.pilihan1 ? '<span class="ml-1 text-[10px] bg-green-100 text-green-800 px-1.5 py-0.2 rounded font-semibold">Diterima</span>' : ''}
                          </td>
                          <td class="px-4 py-3 text-xs">
                            <span class="font-medium ${r.diterimaDi === r.pilihan2 ? "text-green-700 font-bold": "text-gray-800"}">${r.pilihan2}</span>
                            ${r.diterimaDi === r.pilihan2 ? '<span class="ml-1 text-[10px] bg-green-100 text-green-800 px-1.5 py-0.2 rounded font-semibold">Diterima</span>' : ''}
                          </td>
                          <td class="px-4 py-3 text-xs">
                            ${isAccepted ? `
                              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-100 text-green-800">
                                ${Icon("check","w-3 h-3")} Diterima
                              </span>
                              <p class="text-[10px] text-green-700 font-medium mt-1">di: ${r.diterimaDi}</p>
                            ` : isRejected ? `
                              <span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-100 text-red-800">
                                Ditolak
                              </span>
                            ` : `
                              <span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-yellow-100 text-yellow-800">
                                Menunggu
                              </span>
                            `}
                          </td>
                          <td class="px-4 py-3 text-center">
                            <button data-view-detail="${i}" class="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-100 px-2.5 py-1 rounded-lg font-medium transition">
                              ${Icon("info","w-3.5 h-3.5")} Alasan
                            </button>
                          </td>
                          <td class="px-4 py-3 text-center">
                            <select data-terima="${i}" class="text-xs rounded-xl border border-[var(--tanah)]/20 px-2.5 py-1.5 bg-white focus:ring-2 focus:ring-[var(--sarang)] focus:outline-none">
                              <option value="" ${!r.status || r.status==="Menunggu"?"selected":""}>-- Pilih Keputusan --</option>
                              <option value="${r.pilihan1}" ${r.diterimaDi===r.pilihan1?"selected":""}>Terima Pilihan 1 (${r.pilihan1})</option>
                              <option value="${r.pilihan2}" ${r.diterimaDi===r.pilihan2?"selected":""}>Terima Pilihan 2 (${r.pilihan2})</option>
                              <option value="Ditolak" ${isRejected?"selected":""}>❌ Tolak Peserta</option>
                            </select>
                          </td>
                        </tr>`;
                      }).join("")
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>

        <!-- Modal Detail Alasan -->
        ${state.selectedModalReg ? `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm fade-in">
          <div class="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl relative border border-[var(--tanah)]/10">
            <button id="btnCloseModal" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
              ${Icon("close","w-4 h-4")}
            </button>
            <h3 class="font-bold text-base text-[var(--tanah)] mb-1">${state.selectedModalReg.nama}</h3>
            <p class="text-xs text-gray-500 mb-4">NIM: ${state.selectedModalReg.nim} · Kelompok ${state.selectedModalReg.kelompok}</p>

            <div class="space-y-4 text-xs">
              <div class="bg-amber-50/60 p-3 rounded-2xl border border-amber-200/50">
                <span class="font-bold text-amber-900 block mb-1">Pilihan 1: ${state.selectedModalReg.pilihan1}</span>
                <p class="text-gray-700 italic">${state.selectedModalReg.alasan1 || "(Tidak ada alasan)"}</p>
              </div>
              <div class="bg-amber-50/60 p-3 rounded-2xl border border-amber-200/50">
                <span class="font-bold text-amber-900 block mb-1">Pilihan 2: ${state.selectedModalReg.pilihan2}</span>
                <p class="text-gray-700 italic">${state.selectedModalReg.alasan2 || "(Tidak ada alasan)"}</p>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <button id="btnCloseModal2" class="px-4 py-2 bg-[var(--tanah)] text-white rounded-xl text-xs font-semibold">Tutup</button>
            </div>
          </div>
        </div>
        ` : ''}
      </div>`;
    }
  
    /* ---------- Render ---------- */
    function render(){
      let html = "";
      if(!state.user) html = LoginView();
      else if(state.view === "daftar" && (!state.ready || state.myRegistration)){ state.view = "dashboard"; html = DashboardView(); }
      else if(state.view === "daftar") html = DaftarView();
      else if(state.view === "admin" && isAdmin()) html = AdminView();
      else if(state.view === "jadwal" && canSchedule()) html = JadwalView();
      else html = DashboardView();
      document.getElementById("app").innerHTML = html;
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
      if(btnDaftar) btnDaftar.addEventListener("click", ()=>{
        if(!state.ready){ showToast("Data masih dimuat, tunggu sebentar.", "error"); return; }
        if(state.myRegistration){ showToast("Kamu sudah mendaftar.", "error"); return; }
        setState({ view:"daftar" });
      });
  
      bindJadwal();

      const btnRetry = $("#btnRetry");
      if(btnRetry) btnRetry.addEventListener("click", loadInitialData);
  
      const btnAdmin = $("#btnAdmin");
      if(btnAdmin) btnAdmin.addEventListener("click", ()=>{
        refreshAllRegs();
        setState({ view:"admin" });
      });
  
      const btnBack = $("#btnBack");
      if(btnBack) btnBack.addEventListener("click", ()=> setState({ view:"dashboard" }));

      const btnRefreshAdmin = $("#btnRefreshAdmin");
      if(btnRefreshAdmin) btnRefreshAdmin.addEventListener("click", async ()=>{
        showToast("Memperbarui data pendaftar...");
        await refreshAllRegs();
        await refreshUnits();
        showToast("Data terbaru berhasil dimuat.");
      });
  
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

      // Filter unit & Search admin
      const adminFilterSelect = $("#adminFilterSelect");
      if(adminFilterSelect){
        adminFilterSelect.addEventListener("change", (e)=>{
          setState({ adminFilterUnit: e.target.value });
        });
      }

      const adminSearchInput = $("#adminSearchInput");
      if(adminSearchInput){
        adminSearchInput.addEventListener("input", (e)=>{
          setStateSilent({ adminSearch: e.target.value });
          // Debounce / direct update
          clearTimeout(window._searchTimer);
          window._searchTimer = setTimeout(()=> render(), 200);
        });
      }

      // Modal detail alasan pendaftar
      document.querySelectorAll("[data-view-detail]").forEach(btn => {
        btn.addEventListener("click", ()=>{
          const idx = +btn.getAttribute("data-view-detail");
          const regs = state.allRegs;
          if(regs[idx]) setState({ selectedModalReg: regs[idx] });
        });
      });

      const btnCloseModal = $("#btnCloseModal");
      if(btnCloseModal) btnCloseModal.addEventListener("click", ()=> setState({ selectedModalReg: null }));
      const btnCloseModal2 = $("#btnCloseModal2");
      if(btnCloseModal2) btnCloseModal2.addEventListener("click", ()=> setState({ selectedModalReg: null }));
  
      const daftarForm = $("#daftarForm");
      if(daftarForm){
        daftarForm.addEventListener("submit", async (e)=>{
          e.preventDefault();
          if(submitting) return; 
          if(!state.ready){ showToast("Data masih dimuat, tunggu sebentar.", "error"); return; }
          if(state.myRegistration){ showToast("Kamu sudah mendaftar.", "error"); return; }
  
          const p1 = $("#pilihan1").value, p2 = $("#pilihan2").value;
          const alasan1 = $("#alasan1").value.trim(), alasan2 = $("#alasan2").value.trim();
          const file = $("#cvFile").files[0];
  
          if(!p1 || !p2){ showToast("Pilih dua unit peminatan.", "error"); return; }
          if(p1 === p2){ showToast("Pilihan 1 dan 2 tidak boleh sama.", "error"); return; }
          if(!file){ showToast("Unggah CV terlebih dahulu.", "error"); return; }
          if(file.type !== "application/pdf"){ showToast("CV harus berformat PDF.", "error"); return; }
          if(file.size > MAX_CV_BYTES){ showToast("Ukuran CV maksimal 3 MB.", "error"); return; }
  
          const btn = daftarForm.querySelector('button[type="submit"]');
          const setBusy = (label)=>{ btn.disabled = !!label; btn.textContent = label || "Kirim Pendaftaran"; };
          submitting = true;
          try{
            setBusy("Memeriksa data…");
            const [units, reg] = await Promise.all([fetchUnits(), fetchMyRegistration()]);
            if(!units || !reg){ showToast("Gagal memeriksa data. Periksa koneksi lalu coba lagi.", "error"); return; }
            setStateSilent({ units });
            if(reg.registered){
              setState({ myRegistration: reg.data, view:"dashboard" });
              showToast("Kamu sudah terdaftar, tidak bisa mendaftar lagi.", "error");
              return;
            }
  
            const unit1 = units.find(u=>u.id===p1);
            const unit2 = units.find(u=>u.id===p2);
            if(!unit1 || !unit2){ showToast("Unit tidak ditemukan, muat ulang halaman.", "error"); return; }
            if(unit1.slot<=0 || unit2.slot<=0){
              showToast("Salah satu slot sudah penuh. Pilih unit lain.", "error");
              render(); 
              return;
            }
  
            setBusy("Mengirim…");
            const p = profileFor(state.user.email);
            const cvBase64 = await fileToBase64(file);
            const payload = {
              email: state.user.email,
              nama: p.nama, nim: p.nim, kelompok: p.kelompok,
              pilihan1: unit1.nama, pilihan2: unit2.nama,
              alasan1, alasan2,
              cvFileName: file.name, cvMime: file.type, cvBase64,
            };
            const r = await callBackend("submitRegistration", payload, 90000);
  
            if(r && r.ok){
              setState({ myRegistration: { pilihan1: unit1.nama, pilihan2: unit2.nama, status: "Menunggu" }, view:"dashboard" });
              showToast("Pendaftaran berhasil dikirim!");
              refreshUnits();
            } else if(r && r.code === "SUDAH_DAFTAR"){
              setState({ myRegistration: { pilihan1: "", pilihan2: "", status: "" }, view:"dashboard" });
              showToast("Kamu sudah terdaftar, tidak bisa mendaftar lagi.", "error");
              loadInitialData();
            } else {
              showToast(r && r.offline ? "Backend belum tersambung (mode demo)." : ((r && r.error) || "Gagal mengirim, coba lagi."), "error");
            }
          } finally {
            submitting = false;
            if(document.body.contains(btn)) setBusy(null);
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

      // Aksi Terima / Tolak peserta oleh Admin
      document.querySelectorAll("[data-terima]").forEach(sel=>{
        sel.addEventListener("change", async ()=>{
          const idx = +sel.getAttribute("data-terima");
          const reg = state.allRegs[idx];
          if(!reg) return;

          const val = sel.value;
          let status = "Menunggu";
          let diterimaDi = "";

          if(val === "Ditolak"){
            status = "Ditolak";
            diterimaDi = "";
          } else if(val !== "") {
            status = "Diterima";
            diterimaDi = val;
          }

          showToast("Memperbarui status pendaftaran...");
          const r = await callBackend("decideRegistration", { row: reg.row, status, diterimaDi });
          if(r && r.ok){ 
            showToast(`Status ${reg.nama} diperbarui (${status}${diterimaDi ? ' di ' + diterimaDi : ''}).`); 
            await refreshAllRegs(); 
          } else {
            showToast("Gagal memperbarui status.", "error");
          }
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
