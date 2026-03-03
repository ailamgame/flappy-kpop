// --- 1) LOCALES and helper functions (unchanged) ---
const LOCALES = {
    en: {
        code: 'en',
        langLabel: 'EN',
        startTitle: 'Flappy Star',
        startDesc: 'Fly through the pipes to clear the level!',
        infoShield: 'Shield:',
        shieldDesc: 'Blocks one pipe hit (Max 3)',
        infoStar: 'Stars:',
        starDesc: 'Collect to buy skins',
        infoFinish: 'Finish:',
        finishDesc: 'Gold pipe + checkered line',
        infoNote: 'Note:',
        noteDesc: 'Touching the ground = INSTANT DEATH!',
        finishText: 'FINISH',
        btnShop: 'Shop',
        btnStart: 'Start',
        shopTitle: 'Skins',
        shopDescPrefix: 'You have:',
        btnClose: 'Close',
        gameOverTitle: 'Game Over',
        scoreLabel: 'Score:',
        bestLabel: 'Best:',
        usingText: 'Using',
        selectText: 'Select',
        buyText: (p) => `${p} ⭐`,
        notEnoughStars: "Not enough Stars!",
        soundOn: '🔊 ON',
        soundOff: '🔈 OFF',
        plusShield: '+Shield',
        plusStar: '+1 ⭐',
        levelPrefix: 'Level: ',
        starPrefix: '⭐ ',
        langToggleTitle: 'Switch language'
    },
    vi: {
        code: 'vi',
        langLabel: 'VI',
        startTitle: 'Flappy Sao',
        startDesc: 'Vượt ống để hoàn thành màn!',
        infoShield: 'Khiên:',
        shieldDesc: 'Chặn 1 lần va chạm ống (Tối đa 3)',
        infoStar: 'Ngôi Sao:',
        starDesc: 'Thu thập để mua skin',
        infoFinish: 'Đích:',
        finishDesc: 'Ống vàng + vạch caro',
        infoNote: 'Chú ý:',
        noteDesc: 'Chạm đất = CHẾT NGAY!',
        finishText: 'ĐÍCH',
        btnShop: 'Cửa Hàng',
        btnStart: 'Bắt Đầu',
        shopTitle: 'Trang Phục',
        shopDescPrefix: 'Đang có:',
        btnClose: 'Đóng',
        gameOverTitle: 'Kết Thúc',
        scoreLabel: 'Điểm:',
        bestLabel: 'Kỷ Lục:',
        usingText: 'Đang Dùng',
        selectText: 'Chọn',
        buyText: (p) => `${p} ⭐`,
        notEnoughStars: "Bạn không đủ Ngôi Sao!",
        soundOn: '🔊 BẬT',
        soundOff: '🔈 TẮT',
        plusShield: '+Khiên',
        plusStar: '+1 ⭐',
        levelPrefix: 'Cấp: ',
        starPrefix: '⭐ ',
        langToggleTitle: 'Chuyển ngôn ngữ'
    }
};

// current language (default to en)
let currentLang = localStorage.getItem('flappyKpopLang') || 'en';
if (!LOCALES[currentLang]) currentLang = 'en';

function t(key, ...args) {
    const v = LOCALES[currentLang][key];
    if (typeof v === 'function') return v(...args);
    return v ?? '';
}
function setDocumentLang() {
    document.documentElement.lang = LOCALES[currentLang].code;
}

function applyTranslations() {
    // start panel
    const startTitleEl = document.getElementById('start-title');
    if (startTitleEl) startTitleEl.innerText = t('startTitle');
    const startDescEl = document.getElementById('start-desc');
    if (startDescEl) startDescEl.innerText = t('startDesc');

    // Build detailed start-info block with descriptions (keeps <b> ids for other code)
    const startInfoHtml = `
        🛡️ <b id="info-shield">${t('infoShield')}</b> ${t('shieldDesc')}<br>
        ⭐ <b id="info-star">${t('infoStar')}</b> ${t('starDesc')}<br>
        🏁 <b id="info-finish">${t('infoFinish')}</b> ${t('finishDesc')}<br>
        ⚠️ <b id="info-note">${t('infoNote')}</b> ${t('noteDesc')}
    `;
    const startInfoEl = document.getElementById('start-info');
    if (startInfoEl) startInfoEl.innerHTML = startInfoHtml;

    // buttons
    const shopBtnStart = document.getElementById('btn-shop-start');
    if (shopBtnStart) shopBtnStart.innerText = t('btnShop');
    const btnStart = document.getElementById('btn-start');
    if (btnStart) btnStart.innerText = t('btnStart');

    // lang toggle
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) { langBtn.innerText = LOCALES[currentLang].langLabel; langBtn.title = t('langToggleTitle'); }

    // shop
    const shopTitleEl = document.getElementById('shop-title');
    if (shopTitleEl) shopTitleEl.innerText = t('shopTitle');
    const sd = document.getElementById('shop-desc');
    if (sd) sd.childNodes[0] && (sd.childNodes[0].textContent = t('shopDescPrefix') + ' ');
    const btnCloseShop = document.getElementById('btn-close-shop');
    if (btnCloseShop) btnCloseShop.innerText = t('btnClose');

    // game over
    const gameoverTitle = document.getElementById('gameover-title');
    if (gameoverTitle) gameoverTitle.innerText = t('gameOverTitle');
    const scoreLabelNode = document.getElementById('score-label');
    if (scoreLabelNode && scoreLabelNode.childNodes[0]) scoreLabelNode.childNodes[0].textContent = t('scoreLabel') + ' ';
    const bestLabelNode = document.getElementById('best-label');
    if (bestLabelNode && bestLabelNode.childNodes[0]) bestLabelNode.childNodes[0].textContent = t('bestLabel') + ' ';
    const btnShopOver = document.getElementById('btn-shop-over');
    if (btnShopOver) btnShopOver.innerText = t('btnShop');
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) btnRestart.innerText = t('btnStart');

    updateSoundButton();
    updateTopBar();
    setDocumentLang();
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    localStorage.setItem('flappyKpopLang', currentLang);
    applyTranslations();
}

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);
    applyTranslations();
});

/***** SKIN CONFIG (edit number here if needed) *****/
const SKINS = [
    { id: 'skin01', name: 'Rumi', file: 'assets/img/character/rumi.png', price: 0 },       // Default skin
    { id: 'skin02', name: 'Mira', file: 'assets/img/character/mira.png', price: 500 },
    { id: 'skin03', name: 'Zoey', file: 'assets/img/character/zoey.png', price: 500 },
    { id: 'skin04', name: 'Jinu', file: 'assets/img/character/jinu.png', price: 500 },
    { id: 'skin05', name: 'Romance', file: 'assets/img/character/romance.png', price: 500 },
    { id: 'skin06', name: 'Mystery', file: 'assets/img/character/mystery.png', price: 500 },
    { id: 'skin07', name: 'Baby', file: 'assets/img/character/baby.png', price: 500 },
    { id: 'skin08', name: 'Abby', file: 'assets/img/character/abs.png', price: 500 },
    { id: 'skin09', name: 'Captain', file: 'assets/img/character/b-captain.png', price: 500 },
    { id: 'skin10', name: 'Dr', file: 'assets/img/character/b-drstrange.png', price: 500 },
    { id: 'skin11', name: 'Fronze', file: 'assets/img/character/b-fronze.png', price: 500 },
    { id: 'skin12', name: 'Ghibli', file: 'assets/img/character/b-ghibli.png', price: 500 },
    { id: 'skin13', name: 'Iron Hulk', file: 'assets/img/character/b-ironhulk.png', price: 500 },
    { id: 'skin14', name: 'Iron Man', file: 'assets/img/character/b-ironman.png', price: 500 },
    { id: 'skin15', name: 'Kpop Neon', file: 'assets/img/character/b-kpopneon.png', price: 500 },
    { id: 'skin16', name: 'Retro Neon', file: 'assets/img/character/b-retroneon.png', price: 500 },
    { id: 'skin17', name: 'Spider Man', file: 'assets/img/character/b-spiderman.png', price: 500 },
    { id: 'skin18', name: 'Thor', file: 'assets/img/character/b-thor.png', price: 500 },
    { id: 'skin19', name: 'Wakanda', file: 'assets/img/character/b-wakanda.png', price: 500 },
];
/***** BACKGROUNDS CONFIG *****/
const BACKGROUNDS = [
    { id: 'bg01', name: 'Kpop City', file: 'assets/img/bg/kpop.jpeg', price: 0, pipeTheme: { fill:'#c1bbe6', stroke:'#8795b2', accent:'#f3d3ff' } },
    { id: 'bg02', name: 'Captain City', file: 'assets/img/bg/captain.jpeg', price: 500, pipeTheme: { fill:'#c77863', stroke:'#612121', accent:'#ffd9e6' } },
    { id: 'bg03', name: 'Dr City', file: 'assets/img/bg/dr-strange.jpeg', price: 500, pipeTheme: { fill:'#c77863', stroke:'#412e43', accent:'#ffd9e6' } },
    { id: 'bg04', name: 'Fronze City', file: 'assets/img/bg/fronze.jpeg', price: 500, pipeTheme: { fill:'#acdae4', stroke:'#458492', accent:'#ffd9e6' } },
    { id: 'bg05', name: 'Ghibli City', file: 'assets/img/bg/ghibli.jpeg', price: 500, pipeTheme: { fill:'#8ba872', stroke:'#426d1c', accent:'#ffd9e6' } },
    { id: 'bg06', name: 'Ironman City', file: 'assets/img/bg/iron-man.jpeg', price: 500, pipeTheme: { fill:'#8dc7f2', stroke:'#1c5a89', accent:'#ffd9e6' } },
    { id: 'bg07', name: 'Neon City', file: 'assets/img/bg/neon.jpeg', price: 500, pipeTheme: { fill:'#3efaf6', stroke:'#2c2e43', accent:'#ffd9e6' } },
    { id: 'bg08', name: 'Spiderman City', file: 'assets/img/bg/spiderman.jpeg', price: 500, pipeTheme: { fill:'#c57964', stroke:'#6e471a', accent:'#dff8ff' } },
    { id: 'bg09', name: 'Thor City', file: 'assets/img/bg/thor.jpeg', price: 500, pipeTheme: { fill:'#71867a', stroke:'#2f3b34', accent:'#ffd9e6' } },
    { id: 'bg10', name: 'Wakanda City', file: 'assets/img/bg/wakanda.jpeg', price: 500, pipeTheme: { fill:'#e1d9f1', stroke:'#27215f', accent:'#ffd9e6' } },
];
/***** END CONFIG *****/

// helper to shade hex color
function shadeHex(hex, percent){
    if (!hex) return '#ffffff';
    hex = hex.replace('#','');
    const num = parseInt(hex,16);
    let r = (num >> 16) & 0xFF;
    let g = (num >> 8) & 0xFF;
    let b = num & 0xFF;
    r = Math.min(255, Math.max(0, Math.round(r * (1 + percent))));
    g = Math.min(255, Math.max(0, Math.round(g * (1 + percent))));
    b = Math.min(255, Math.max(0, Math.round(b * (1 + percent))));
    return '#' + ((1<<24) + (r<<16) + (g<<8) + b).toString(16).slice(1);
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('game-container');

// Paranoid preload for background thumbnails (optional)
const bgImages = {};
BACKGROUNDS.forEach(b => {
    const img = new Image();
    img.src = b.file;
    bgImages[b.id] = img;
});

// UI Elements
const screens = { start: document.getElementById('start-screen'), shop: document.getElementById('shop-screen'), gameOver: document.getElementById('game-over-screen') };
const ui = {
    scoreBoard: document.getElementById('score-board'),
    effectsBoard: document.getElementById('effects-board'),
    levelDisplay: document.getElementById('level-display'),
    starDisplay: document.getElementById('star-display'),
    shopList: document.getElementById('shop-list'),
    shopStars: document.getElementById('shop-stars'),
    // bgList might be missing in older index.html; fallback to null and handle accordingly
    bgList: document.getElementById('bg-list')
};

// States
const GAME_STATE = { READY:0, PLAYING:1, GAMEOVER:2, SHOP:3 };
let currentState = GAME_STATE.READY, previousState = GAME_STATE.READY;

// Game Data
let frames = 0, score = 0, currentLevel = 1, spawnedPipesCount = 0;

// Storage
let bestScore = parseInt(localStorage.getItem('flappyKpopBest')) || 0;
let totalStars = parseInt(localStorage.getItem('flappyKpopTotalStars')) || 0;
let ownedSkins = JSON.parse(localStorage.getItem('flappyKpopSkins')) || [SKINS[0].id];
let currentSkinId = localStorage.getItem('flappyKpopCurrentSkin') || SKINS[0].id;

// Background ownership
let ownedBackgrounds = JSON.parse(localStorage.getItem('flappyKpopBackgrounds')) || [BACKGROUNDS[0].id];
let currentBackgroundId = localStorage.getItem('flappyKpopCurrentBackground') || BACKGROUNDS[0].id;

// current pipe theme (set by background)
let currentPipeTheme = BACKGROUNDS[0].pipeTheme;

// Sound
let soundEnabled = (localStorage.getItem('flappyKpopSound') ?? '1') === '1';
const soundToggleBtn = document.getElementById('sound-toggle');
function updateSoundButton() {
    if (!soundToggleBtn) return;
    soundToggleBtn.textContent = soundEnabled ? t('soundOn') : t('soundOff');
    soundToggleBtn.title = soundEnabled ? (currentLang === 'vi' ? 'Nhấn để tắt âm' : 'Click to mute') : (currentLang === 'vi' ? 'Nhấn để bật âm' : 'Click to unmute');
}
updateSoundButton();
if (soundToggleBtn) soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem('flappyKpopSound', soundEnabled ? '1' : '0');
    updateSoundButton();
    if (soundEnabled) resumeAudio();
});

// Preload skin images
const skinImages = {}; // map id -> Image
function preloadSkins(onProgress) {
    const promises = [];
    SKINS.forEach(s => {
        const img = new Image();
        img.src = s.file;
        skinImages[s.id] = img;
        promises.push(new Promise(resolve => {
            img.onload = () => resolve({id: s.id, ok: true});
            img.onerror = () => resolve({id: s.id, ok: false});
        }));
    });
    return Promise.all(promises);
}

// Physics / sizes
let baseGravity=0, baseJumpForce=0, basePipeSpeed=0, pipeSpeed=0, pipeGap=0, pipeWidth=0, groundHeight=0;
let effects = { shieldCount:0, invincibleTimer:0 };

const FPS = 60, frameInterval = 1000 / FPS;
let lastTimestamp = 0;

function saveData() {
    localStorage.setItem('flappyKpopBest', bestScore);
    localStorage.setItem('flappyKpopTotalStars', totalStars);
    localStorage.setItem('flappyKpopSkins', JSON.stringify(ownedSkins));
    localStorage.setItem('flappyKpopCurrentSkin', currentSkinId);
    // backgrounds
    localStorage.setItem('flappyKpopBackgrounds', JSON.stringify(ownedBackgrounds));
    localStorage.setItem('flappyKpopCurrentBackground', currentBackgroundId);
    updateTopBar();
}
function updateTopBar() {
    if (ui.levelDisplay) ui.levelDisplay.innerText = `${t('levelPrefix')}${currentLevel}`;
    if (ui.starDisplay) ui.starDisplay.innerText = `${t('starPrefix')}${totalStars}`;
}

function resizeCanvas() {
    if (!canvas || !container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    baseGravity = canvas.height * 0.0006;
    baseJumpForce = canvas.height * -0.012;
    basePipeSpeed = canvas.width * 0.007;

    pipeWidth = canvas.width * 0.15;
    pipeGap = canvas.height * 0.28;
    groundHeight = canvas.height * 0.15;

    if (bird.radius === 0) bird.init();
    else { bird.radius = canvas.height * 0.02; bird.x = canvas.width * 0.25; }
}
window.addEventListener('resize', resizeCanvas);

function showScreen(screenName) {
    Object.values(screens).forEach(s => { if (s) s.classList.add('hidden'); });
    if (screenName && screens[screenName]) screens[screenName].classList.remove('hidden');
}
function updateEffectsUI() {
    if (!ui.effectsBoard) return;
    ui.effectsBoard.innerHTML = '';
    if (effects.shieldCount > 0) {
        let shieldsText = '🛡️'.repeat(effects.shieldCount);
        ui.effectsBoard.innerHTML += `<div class="effect-badge">${shieldsText}</div>`;
    }
}

// --- BIRD with image support ---
const bird = {
    x:0,y:0,radius:0,velocity:0,rotation:0,color:'#f1c40f', image: null,
    init() {
        this.radius = canvas.height * 0.035;
        this.x = canvas.width * 0.25;
        this.y = canvas.height / 2;
        this.velocity = 0;
        this.rotation = 0;
        this.updateSkinImage();
    },
    updateSkinImage() {
        const img = skinImages[currentSkinId];
        this.image = (img && img.complete) ? img : null;
    },
    flap() {
        this.velocity = baseJumpForce;
        Sound.play('flap');
    },
    update() {
        this.velocity += baseGravity;
        this.y += this.velocity;
        if (this.velocity >= baseJumpForce) {
            this.rotation = Math.min(Math.PI/4, (this.velocity / baseJumpForce) * (-Math.PI/8));
        } else this.rotation = -Math.PI/8;
    },
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (effects.invincibleTimer > 0 && Math.floor(frames / 5) % 2 === 0) ctx.globalAlpha = 0.5;

        if (this.image) {
            const iw = this.image.width, ih = this.image.height;
            const targetSize = this.radius * 2;
            const scale = targetSize / Math.max(iw, ih);
            const w = iw * scale, h = ih * scale;
            ctx.drawImage(this.image, -w/2, -h/2, w, h);
        } else {
            ctx.beginPath();
            ctx.arc(0,0,this.radius,0,Math.PI*2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = 2; ctx.strokeStyle = '#000'; ctx.stroke();
            ctx.beginPath(); ctx.arc(this.radius/2, -this.radius/4, this.radius/3, 0, Math.PI*2); ctx.fillStyle = '#fff'; ctx.fill();
            ctx.beginPath(); ctx.arc(this.radius/2 + 1, -this.radius/4, this.radius/6, 0, Math.PI*2); ctx.fillStyle = '#000'; ctx.fill();
            ctx.beginPath(); ctx.moveTo(this.radius*0.8,0); ctx.lineTo(this.radius*1.6,0); ctx.lineTo(this.radius*0.8,this.radius/2); ctx.fillStyle = '#e67e22'; ctx.fill(); ctx.stroke();
        }

        // ====== Shield ring (reduced size & thinner) ======
        if (effects.shieldCount > 0) {
            ctx.beginPath();
            ctx.arc(0,0,this.radius * 1.25,0,Math.PI*2); // <= reduced multiplier
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 1.5 + effects.shieldCount; // <= thinner
            ctx.stroke();
            ctx.fillStyle = `rgba(52,152,219, ${0.12 * effects.shieldCount})`; // <= slightly lower alpha
            ctx.fill();
        }
        // ================================================

        ctx.restore();
    }
};

// Floating texts
const floatingTexts = { items: [], add(x,y,text,color='#f1c40f',size=24){ this.items.push({x,y,text,color,size,life:0,maxLife:45}); }, updateAndDraw(){ for (let i=0;i<this.items.length;i++){ let ft=this.items[i]; ft.life++; ft.y-=1.5; ctx.save(); ctx.globalAlpha = Math.max(0,1-(ft.life/ft.maxLife)); ctx.fillStyle=ft.color; ctx.font=`bold ${ft.size}px Arial`; ctx.strokeStyle='black'; ctx.lineWidth=3; ctx.textAlign='center'; ctx.strokeText(ft.text, ft.x, ft.y); ctx.fillText(ft.text, ft.x, ft.y); ctx.restore(); if (ft.life>=ft.maxLife){ this.items.splice(i,1); i--; } } } };

// Collectables
const collectables = {
    items: [],
    types: [ { id:'SHIELD', color:'#3498db', symbol:'🛡️', chance:25 }, { id:'STAR', color:'#f1c40f', symbol:'⭐', chance:75 } ],
    init() { this.items = []; },
    spawn(x,y) {
        let rand = Math.random()*100, sum=0, selected=this.types[0];
        for (let t of this.types){ sum += t.chance; if (rand <= sum){ selected = t; break; } }
        this.items.push({ x:x, y:y, type:selected, radius:canvas.height * 0.025, collected:false });
    },
    update() {
        for (let i=0;i<this.items.length;i++){
            const item = this.items[i];
            if (item.collected) continue;
            item.x -= pipeSpeed;
            const dist = Math.hypot(bird.x - item.x, bird.y - item.y);
            if (dist < bird.radius + item.radius) {
                item.collected = true;
                this.applyEffect(item.type.id, item.x, item.y);
            }
            if (item.x + item.radius < 0) { this.items.splice(i,1); i--; }
        }
    },
    applyEffect(id,x,y) {
        if (id === 'SHIELD') {
            if (effects.shieldCount < 3) effects.shieldCount++;
            updateEffectsUI(); Sound.play('shield'); floatingTexts.add(x,y,t('plusShield'),'#3498db',20);
        } else if (id === 'STAR') {
            totalStars++; saveData(); floatingTexts.add(x,y,t('plusStar'),'#f1c40f',24); Sound.play('collect');
        }
    },
    draw() { for (let it of this.items){ if (it.collected) continue; ctx.save(); ctx.translate(it.x, it.y); let hover = Math.sin(frames * 0.1) * 5; ctx.beginPath(); ctx.arc(0, hover, it.radius, 0, Math.PI*2); ctx.fillStyle = it.type.color; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = '#fff'; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.font = `${it.radius}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(it.type.symbol, 0, hover+2); ctx.restore(); } }
};

// Pipes
const pipes = {
    items: [],
    init() { this.items = []; },
    getRequiredPipesForLevel(lv) { return 10 + (lv - 1) * 5; },
    update() {
        let difficultyLevel = Math.min(currentLevel, 6);
        let speedMultiplier = 1 + ((difficultyLevel - 1) * 0.05);
        pipeSpeed = basePipeSpeed * speedMultiplier;
        let currentPipeGap = pipeGap * Math.max(0.7, 1 - ((difficultyLevel - 1) * 0.02));
        let reqPipes = this.getRequiredPipesForLevel(currentLevel);

        if (this.items.length === 0 || (canvas.width - this.items[this.items.length-1].x >= canvas.width * 0.55)) {
            let minHeight = canvas.height * 0.1;
            let maxHeight = canvas.height - groundHeight - currentPipeGap - minHeight;
            let topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
            spawnedPipesCount++;
            let isFinishLine = (spawnedPipesCount === reqPipes);

            // assign palette from current background theme (pipe theme)
            const pal = Object.assign({}, currentPipeTheme || BACKGROUNDS[0].pipeTheme);
            if (!pal.accent) pal.accent = shadeHex(pal.fill, 0.12);

            this.items.push({
                x: canvas.width,
                topHeight: topHeight,
                passed:false,
                broken:false,
                gap: currentPipeGap,
                isFinishLine: isFinishLine,
                palette: pal,
                stripeOffset: Math.floor(Math.random() * 60)
            });
            if (!isFinishLine && Math.random() < 0.4) collectables.spawn(canvas.width + pipeWidth/2, topHeight + currentPipeGap/2);
        }

        for (let i=0;i<this.items.length;i++){
            let p = this.items[i];
            p.x -= pipeSpeed;

            if (p.x + pipeWidth < bird.x && !p.passed) {
                p.passed = true;
                if (!p.broken) {
                    score++;
                    if (ui.scoreBoard) ui.scoreBoard.innerText = score;
                    // Sound.play('score');
                }
                if (p.isFinishLine) doLevelUp(p.x + pipeWidth/2, bird.y);
            }

            if (p.x + pipeWidth < 0) { this.items.shift(); i--; }
        }
    },
    // draw() {
    //     const finishFill = '#ffd66b';
    //     const finishStroke = '#d3a11a';

    //     for (let p of this.items) {
    //         if (p.broken) continue;

    //         const pal = p.palette || { fill:'#c1bbe6', stroke:'#5c4f79', accent:'#f3d3ff' };
    //         if (!pal.accent) pal.accent = shadeHex(pal.fill, 0.12);

    //         let bottomY = p.topHeight + p.gap;
    //         let bottomHeight = canvas.height - groundHeight - bottomY;

    //         // vertical gradient
    //         let gradTop = ctx.createLinearGradient(0, 0, 0, canvas.height);
    //         const lightFill = shadeHex(pal.fill, 0.06);
    //         const darkFill  = shadeHex(pal.fill, -0.08);
    //         gradTop.addColorStop(0, lightFill);
    //         gradTop.addColorStop(0.5, pal.fill);
    //         gradTop.addColorStop(1, darkFill);

    //         ctx.fillStyle = p.isFinishLine ? finishFill : gradTop;
    //         ctx.strokeStyle = p.isFinishLine ? finishStroke : pal.stroke;
    //         ctx.lineWidth = 3;

    //         // top pipe
    //         ctx.fillRect(p.x, 0, pipeWidth, p.topHeight);
    //         ctx.strokeRect(p.x, 0, pipeWidth, p.topHeight);

    //         // top cap
    //         ctx.fillStyle = shadeHex(p.isFinishLine ? finishFill : pal.fill, -0.12);
    //         ctx.fillRect(p.x - 5, p.topHeight - 20, pipeWidth + 10, 20);
    //         ctx.strokeRect(p.x - 5, p.topHeight - 20, pipeWidth + 10, 20);

    //         // bottom pipe
    //         ctx.fillStyle = p.isFinishLine ? finishFill : gradTop;
    //         ctx.strokeStyle = p.isFinishLine ? finishStroke : pal.stroke;
    //         ctx.fillRect(p.x, bottomY, pipeWidth, bottomHeight);
    //         ctx.strokeRect(p.x, bottomY, pipeWidth, bottomHeight);

    //         // bottom cap
    //         ctx.fillStyle = shadeHex(p.isFinishLine ? finishFill : pal.fill, -0.12);
    //         ctx.fillRect(p.x - 5, bottomY, pipeWidth + 10, 20);
    //         ctx.strokeRect(p.x - 5, bottomY, pipeWidth + 10, 20);

    //         // gloss highlight (left rim)
    //         ctx.save();
    //         ctx.globalAlpha = 0.09;
    //         ctx.fillStyle = '#ffffff';
    //         ctx.fillRect(p.x + pipeWidth * 0.06, 0, pipeWidth * 0.12, p.topHeight);
    //         ctx.fillRect(p.x + pipeWidth * 0.06, bottomY, pipeWidth * 0.12, bottomHeight);
    //         ctx.restore();

    //         // diagonal stripes (clipped)
    //         ctx.save();
    //         // clip top
    //         ctx.beginPath(); ctx.rect(p.x, 0, pipeWidth, p.topHeight); ctx.clip();
    //         ctx.globalAlpha = 0.06; ctx.strokeStyle = pal.accent; ctx.lineWidth = 8;
    //         for (let sx = -canvas.height; sx < canvas.width + canvas.height; sx += 40) {
    //             const x1 = p.x + sx + p.stripeOffset;
    //             const y1 = -50;
    //             const x2 = x1 + 40;
    //             const y2 = p.topHeight + 50;
    //             ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    //         }
    //         ctx.restore();

    //         // bottom stripes
    //         ctx.save();
    //         ctx.beginPath(); ctx.rect(p.x, bottomY, pipeWidth, bottomHeight); ctx.clip();
    //         ctx.globalAlpha = 0.06; ctx.strokeStyle = pal.accent; ctx.lineWidth = 8;
    //         for (let sx = -canvas.height; sx < canvas.width + canvas.height; sx += 40) {
    //             const x1 = p.x + sx + p.stripeOffset;
    //             const y1 = bottomY - 50;
    //             const x2 = x1 + 40;
    //             const y2 = bottomY + bottomHeight + 50;
    //             ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    //         }
    //         ctx.restore();

    //         // soft halo in gap for non-finish
    //         if (!p.isFinishLine) {
    //             ctx.save();
    //             ctx.shadowColor = pal.accent;
    //             ctx.shadowBlur = 12;
    //             ctx.globalAlpha = 0.12;
    //             ctx.fillStyle = pal.accent;
    //             ctx.fillRect(p.x - 4, p.topHeight + p.gap * 0.35, pipeWidth + 8, p.gap * 0.3);
    //             ctx.restore();
    //         }

    //         // finish line special
    //         if (p.isFinishLine) {
    //             let squareSize = pipeWidth / 3;
    //             for (let x=0;x<3;x++){
    //                 for (let y=0;y<Math.floor(p.gap / squareSize); y++){
    //                     ctx.fillStyle = (x+y)%2===0 ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
    //                     ctx.fillRect(p.x + x * squareSize, p.topHeight + y * squareSize, squareSize, squareSize);
    //                 }
    //             }
    //             ctx.save();
    //             ctx.translate(p.x + pipeWidth/2, p.topHeight - 30);
    //             ctx.fillStyle = 'white';
    //             ctx.font = 'bold 20px Arial';
    //             ctx.textAlign = 'center';
    //             ctx.lineWidth = 3; ctx.strokeStyle = 'black';
    //             ctx.strokeText(t('finishText'), 0, 0); ctx.fillText(t('finishText'), 0, 0);
    //             ctx.restore();
    //         }
    //     }
    // }
    // Thay thế toàn bộ pipes.draw() bằng đoạn này
draw() {
    const finishFill = '#ffd66b';
    const finishStroke = '#d3a11a';

    // helper chuyển hex -> rgba
    function hexToRGBA(hex, alpha = 1) {
        if (!hex) return `rgba(255,255,255,${alpha})`;
        hex = hex.replace('#','');
        if (hex.length === 3) hex = hex.split('').map(h=>h+h).join('');
        const num = parseInt(hex,16);
        const r = (num >> 16) & 0xFF;
        const g = (num >> 8) & 0xFF;
        const b = num & 0xFF;
        return `rgba(${r},${g},${b},${alpha})`;
    }

    for (let p of this.items) {
        if (p.broken) continue;

        // dùng số nguyên để tránh răng cưa / pixel gap
        const x = Math.round(p.x);
        const topH = Math.round(p.topHeight);
        const gap = Math.round(p.gap);
        const bottomY = topH + gap;
        const bottomHeight = Math.round(canvas.height - groundHeight - bottomY);

        const pal = p.palette || { fill:'#c1bbe6', stroke:'#5c4f79', accent:'#f3d3ff' };
        if (!pal.accent) pal.accent = shadeHex(pal.fill, 0.12);

        // vertical gradient cho thân ống (dùng topH/bottomY chính xác)
        let gradTop = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const lightFill = shadeHex(pal.fill, 0.06);
        const darkFill  = shadeHex(pal.fill, -0.08);
        gradTop.addColorStop(0, lightFill);
        gradTop.addColorStop(0.5, pal.fill);
        gradTop.addColorStop(1, darkFill);

        ctx.lineWidth = 3;
        ctx.fillStyle = p.isFinishLine ? finishFill : gradTop;
        ctx.strokeStyle = p.isFinishLine ? finishStroke : pal.stroke;

        // Top pipe (fill then stroke)
        ctx.fillRect(x, 0, Math.round(pipeWidth), topH);
        // stroke: draw stroke using fill rect slightly bigger to avoid 1px gap artifacts
        ctx.strokeRect(x, 0, Math.round(pipeWidth), topH);

        // Top cap
        ctx.fillStyle = shadeHex(p.isFinishLine ? finishFill : pal.fill, -0.12);
        ctx.fillRect(x - 5, topH - 20, Math.round(pipeWidth) + 10, 20);
        ctx.strokeRect(x - 5, topH - 20, Math.round(pipeWidth) + 10, 20);

        // Bottom pipe
        ctx.fillStyle = p.isFinishLine ? finishFill : gradTop;
        ctx.strokeStyle = p.isFinishLine ? finishStroke : pal.stroke;
        ctx.fillRect(x, bottomY, Math.round(pipeWidth), bottomHeight);
        ctx.strokeRect(x, bottomY, Math.round(pipeWidth), bottomHeight);

        // Bottom cap
        ctx.fillStyle = shadeHex(p.isFinishLine ? finishFill : pal.fill, -0.12);
        ctx.fillRect(x - 5, bottomY, Math.round(pipeWidth) + 10, 20);
        ctx.strokeRect(x - 5, bottomY, Math.round(pipeWidth) + 10, 20);

        // gloss highlight (left rim) — use integer coords
        ctx.save();
        ctx.globalAlpha = 0.09;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + Math.round(pipeWidth * 0.06), 0, Math.round(pipeWidth * 0.12), topH);
        ctx.fillRect(x + Math.round(pipeWidth * 0.06), bottomY, Math.round(pipeWidth * 0.12), bottomHeight);
        ctx.restore();

        // diagonal stripes (clipped) - unchanged but integer coords
        ctx.save();
        ctx.beginPath(); ctx.rect(x, 0, Math.round(pipeWidth), topH); ctx.clip();
        ctx.globalAlpha = 0.06; ctx.strokeStyle = pal.accent; ctx.lineWidth = 8;
        for (let sx = -canvas.height; sx < canvas.width + canvas.height; sx += 40) {
            const x1 = x + sx + p.stripeOffset;
            const y1 = -50;
            const x2 = x1 + 40;
            const y2 = topH + 50;
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
        ctx.restore();

        ctx.save();
        ctx.beginPath(); ctx.rect(x, bottomY, Math.round(pipeWidth), bottomHeight); ctx.clip();
        ctx.globalAlpha = 0.06; ctx.strokeStyle = pal.accent; ctx.lineWidth = 8;
        for (let sx = -canvas.height; sx < canvas.width + canvas.height; sx += 40) {
            const x1 = x + sx + p.stripeOffset;
            const y1 = bottomY - 50;
            const x2 = x1 + 40;
            const y2 = bottomY + bottomHeight + 50;
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
        ctx.restore();

        // soft halo in gap for non-finish — replaced rectangular halo with radial gradient
        // if (!p.isFinishLine) {
        //     ctx.save();
        //     // center of gap
        //     const cx = x + Math.round(pipeWidth / 2);
        //     const cy = topH + Math.round(gap / 2);
        //     // radius: choose based on gap and width
        //     const rad = Math.max(Math.round(pipeWidth * 0.9), Math.round(gap * 0.8));
        //     // radial gradient: strong in center, fade out to transparent
        //     const rg = ctx.createRadialGradient(cx, cy, Math.max(2, Math.round(rad * 0.15)), cx, cy, rad);
        //     rg.addColorStop(0, hexToRGBA(pal.accent, 0.22));
        //     rg.addColorStop(0.25, hexToRGBA(pal.accent, 0.14));
        //     rg.addColorStop(0.6, hexToRGBA(pal.accent, 0.06));
        //     rg.addColorStop(1, hexToRGBA(pal.accent, 0.0));
        //     ctx.globalCompositeOperation = 'lighter';
        //     ctx.fillStyle = rg;
        //     // fill a rectangle that fully covers the gap area with integer coords
        //     ctx.fillRect(x - 8, topH, Math.round(pipeWidth) + 16, gap);
        //     // reset composite
        //     ctx.globalCompositeOperation = 'source-over';
        //     ctx.restore();
        // }

        // finish line special (unchanged but integer safe)
        if (p.isFinishLine) {
            let squareSize = Math.round(pipeWidth / 3);
            for (let xx=0; xx<3; xx++){
                for (let yy=0; yy<Math.floor(gap / squareSize); yy++){
                    ctx.fillStyle = (xx+yy)%2===0 ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
                    ctx.fillRect(x + xx * squareSize, topH + yy * squareSize, squareSize, squareSize);
                }
            }
            ctx.save();
            ctx.translate(x + Math.round(pipeWidth/2), topH - 30);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.lineWidth = 3; ctx.strokeStyle = 'black';
            ctx.strokeText(t('finishText'), 0, 0); ctx.fillText(t('finishText'), 0, 0);
            ctx.restore();
        }
    }
}
};

function doLevelUp(x,y) {
    currentLevel++;
    spawnedPipesCount = 0;
    let bonusStars = currentLevel * 10;
    totalStars += bonusStars;
    saveData();
    floatingTexts.add(x || canvas.width/2, y || canvas.height/2, `+${bonusStars} ⭐`, '#f1c40f', 36);
    if (ui.levelDisplay) ui.levelDisplay.innerText = `${t('levelPrefix')}${currentLevel}`;
    if (ui.starDisplay) ui.starDisplay.innerText = `${t('starPrefix')}${totalStars}`;
    Sound.play('levelup');
}

const ground = {
    x:0,
    draw() {
        if (currentState === GAME_STATE.PLAYING && pipeSpeed > 0) { this.x -= pipeSpeed; if (this.x <= -canvas.width) this.x = 0; }
        ctx.fillStyle = '#ded895'; ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
        ctx.fillStyle = '#73bf2e'; ctx.fillRect(0, canvas.height - groundHeight, canvas.width, 15);
        ctx.strokeStyle = '#543847'; ctx.lineWidth = 2;
        ctx.save(); ctx.beginPath();
        for (let i = this.x; i < canvas.width; i += 30) { ctx.moveTo(i, canvas.height - groundHeight); ctx.lineTo(i - 15, canvas.height - groundHeight + 15); }
        ctx.stroke(); ctx.restore(); ctx.strokeRect(0, canvas.height - groundHeight, canvas.width, 15);
    }
};

function checkCollision() {
    if (bird.y + bird.radius >= canvas.height - groundHeight) return true;
    if (bird.y - bird.radius <= 0) { bird.y = bird.radius; bird.velocity = 0; }
    if (effects.invincibleTimer > 0) return false;

    for (let p of pipes.items) {
        if (p.broken) continue;
        let cx = Math.max(p.x, Math.min(bird.x, p.x + pipeWidth));
        let cyTop = Math.max(0, Math.min(bird.y, p.topHeight));
        let distTop = Math.hypot(bird.x - cx, bird.y - cyTop);
        if (distTop < bird.radius) return handlePipeDamage(p);

        let bottomY = p.topHeight + p.gap;
        let cyBottom = Math.max(bottomY, Math.min(bird.y, canvas.height - groundHeight));
        let distBottom = Math.hypot(bird.x - cx, bird.y - cyBottom);
        if (distBottom < bird.radius) return handlePipeDamage(p);
    }
    return false;
}

function handlePipeDamage(pipeHit) {
    if (effects.shieldCount > 0) {
        effects.shieldCount--; effects.invincibleTimer = FPS * 2; pipeHit.broken = true; updateEffectsUI(); Sound.play('shield-used');
        return false;
    }
    return true;
}

function initGame() {
    resizeCanvas(); bird.init(); pipes.init(); collectables.init(); floatingTexts.items = [];
    score = 0; currentLevel = 1; spawnedPipesCount = 0;
    if (ui.scoreBoard) ui.scoreBoard.innerText = score; frames = 0; lastTimestamp = performance.now();
    effects = { shieldCount:0, invincibleTimer:0 };
    updateTopBar(); updateEffectsUI();
    if (ui.scoreBoard) ui.scoreBoard.classList.add('hidden');
    applyBackground(); // apply chosen background on init
}

function startGame() {
    resumeAudio();
    currentState = GAME_STATE.PLAYING;
    showScreen(null);
    if (ui.scoreBoard) ui.scoreBoard.classList.remove('hidden');
    bird.flap();
}

function setGameOver() {
    currentState = GAME_STATE.GAMEOVER;
    if (ui.scoreBoard) ui.scoreBoard.classList.add('hidden');
    if (ui.effectsBoard) ui.effectsBoard.innerHTML = '';
    showScreen('gameOver');
    if (score > bestScore) { bestScore = score; saveData(); }
    const finalScoreEl = document.getElementById('final-score');
    const bestScoreEl = document.getElementById('best-score');
    if (finalScoreEl) finalScoreEl.innerText = score;
    if (bestScoreEl) bestScoreEl.innerText = bestScore;
    Sound.play('gameover');
}

// Shop
function openShop() { previousState = currentState; currentState = GAME_STATE.SHOP; showScreen('shop'); renderShop(); }
function closeShop() { bird.updateSkinImage(); if (previousState === GAME_STATE.READY) { currentState = GAME_STATE.READY; showScreen('start'); } else if (previousState === GAME_STATE.GAMEOVER) { currentState = GAME_STATE.GAMEOVER; showScreen('gameOver'); } }

function renderShop() {
    if (ui.shopStars) ui.shopStars.innerText = totalStars;
    if (ui.shopList) ui.shopList.innerHTML = '';
    if (ui.bgList) ui.bgList.innerHTML = '';

    // Backgrounds section (if element exists)
    if (ui.bgList) {
        BACKGROUNDS.forEach(bg => {
            const isOwned = ownedBackgrounds.includes(bg.id);
            const isSelected = currentBackgroundId === bg.id;
            let btnHtml = '';
            if (isSelected) btnHtml = `<button class="shop-btn btn-selected">${t('usingText')}</button>`;
            else if (isOwned) btnHtml = `<button class="shop-btn btn-select" onclick="selectBackground('${bg.id}')">${t('selectText')}</button>`;
            else btnHtml = `<button class="shop-btn btn-buy" onclick="buyBackground('${bg.id}', ${bg.price})">${t('buyText', bg.price)}</button>`;

            ui.bgList.innerHTML += `
                <div class="shop-item">
                    <div class="bg-preview"><img src="${bg.file}" alt="${bg.name}" onerror="this.style.opacity=0.45;"></div>
                    <strong style="margin-bottom:5px; font-size:14px;">${bg.name}</strong>
                    ${btnHtml}
                </div>
            `;
        });
    }

    // Skins section (existing)
    if (ui.shopList) {
        SKINS.forEach(skin => {
            let isOwned = ownedSkins.includes(skin.id); let isSelected = currentSkinId === skin.id;
            let btnHtml = '';
            if (isSelected) btnHtml = `<button class="shop-btn btn-selected">${t('usingText')}</button>`;
            else if (isOwned) btnHtml = `<button class="shop-btn btn-select" onclick="selectSkin('${skin.id}')">${t('selectText')}</button>`;
            else btnHtml = `<button class="shop-btn btn-buy" onclick="buySkin('${skin.id}', ${skin.price})">${t('buyText', skin.price)}</button>`;

            ui.shopList.innerHTML += `
                <div class="shop-item">
                    <div class="skin-preview"><img src="${skin.file}" alt="${skin.name}" onerror="this.style.opacity=0.45;"></div>
                    <strong style="margin-bottom:5px; font-size:14px;">${skin.name}</strong>
                    ${btnHtml}
                </div>
            `;
        });
    }
}

window.buySkin = function(id, price) {
    if (totalStars >= price) {
        totalStars -= price;
        if (!ownedSkins.includes(id)) ownedSkins.push(id);
        currentSkinId = id;
        saveData(); renderShop(); Sound.play('buy');
        bird.updateSkinImage();
    } else alert(t('notEnoughStars'));
}
window.selectSkin = function(id) { currentSkinId = id; saveData(); renderShop(); Sound.play('select'); bird.updateSkinImage(); }

// Background buy/select functions
window.buyBackground = function(id, price) {
    if (totalStars >= price) {
        totalStars -= price;
        if (!ownedBackgrounds.includes(id)) ownedBackgrounds.push(id);
        currentBackgroundId = id;
        saveData(); renderShop(); Sound.play('buy');
        applyBackground();
    } else alert(t('notEnoughStars'));
}
window.selectBackground = function(id) {
    currentBackgroundId = id;
    saveData(); renderShop(); Sound.play('select');
    applyBackground();
}

function applyBackground() {
    const bg = BACKGROUNDS.find(b => b.id === currentBackgroundId);
    if (!bg) return;
    if (container) container.style.backgroundImage = `url('${bg.file}')`;

    // update pipe theme
    currentPipeTheme = Object.assign({}, bg.pipeTheme);
    if (!currentPipeTheme.accent) currentPipeTheme.accent = shadeHex(currentPipeTheme.fill, 0.12);
}

// Loop & Input
function loop(timestamp) {
    requestAnimationFrame(loop);
    if (!timestamp) timestamp = performance.now();
    let deltaTime = timestamp - lastTimestamp;
    if (deltaTime >= frameInterval) {
        lastTimestamp = timestamp - (deltaTime % frameInterval);

        ctx.clearRect(0,0,canvas.width,canvas.height);

        if (currentState === GAME_STATE.READY) {
            ground.draw(); bird.draw();
        } else if (currentState === GAME_STATE.PLAYING) {
            if (effects.invincibleTimer > 0) effects.invincibleTimer--;
            pipes.update(); pipes.draw();
            collectables.update(); collectables.draw();
            ground.draw();
            bird.update(); bird.draw();
            floatingTexts.updateAndDraw();
            if (checkCollision()) { setGameOver(); }
        } else if (currentState === GAME_STATE.GAMEOVER) {
            pipes.draw(); collectables.draw(); ground.draw(); bird.draw(); floatingTexts.updateAndDraw();
        }
        frames++;
    }
}

function handleInput(e) {
    if (currentState === GAME_STATE.SHOP) return;
    if (e.type === 'keydown' && e.code !== 'Space') return;
    if (e.cancelable && e.type !== 'mousedown') e.preventDefault();
    resumeAudio();
    if (currentState === GAME_STATE.READY) startGame();
    else if (currentState === GAME_STATE.PLAYING) bird.flap();
}

// Events
window.addEventListener('keydown', handleInput);
if (canvas) canvas.addEventListener('mousedown', handleInput);
if (canvas) canvas.addEventListener('touchstart', handleInput, { passive:false });
const btnStart = document.getElementById('btn-start');
if (btnStart) btnStart.addEventListener('click', startGame);
const btnRestart = document.getElementById('btn-restart');
if (btnRestart) btnRestart.addEventListener('click', () => { initGame(); startGame(); });
const btnShopStart = document.getElementById('btn-shop-start');
if (btnShopStart) btnShopStart.addEventListener('click', openShop);
const btnShopOver = document.getElementById('btn-shop-over');
if (btnShopOver) btnShopOver.addEventListener('click', openShop);
const btnCloseShop = document.getElementById('btn-close-shop');
if (btnCloseShop) btnCloseShop.addEventListener('click', closeShop);

// Boot: preload skins then init
preloadSkins().then(results => {
    initGame();
    applyTranslations();
    requestAnimationFrame(loop);
});

/* ========== SOUND SYSTEM (WebAudio-based, synth tones) ========== */
const Sound = (function(){
    let audioCtx = null;
    let masterGain = null;

    function init() {
        if (audioCtx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 1;
        masterGain.connect(audioCtx.destination);
    }

    function resume() {
        if (!audioCtx) init();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().catch(()=>{/* ignore */});
        }
    }

    function playTone(freq, type='sine', duration=0.08, when=0, gain=1, ramp=false) {
        if (!soundEnabled) return;
        if (!audioCtx) init();
        const now = audioCtx.currentTime + when;
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        g.gain.value = 0;
        osc.connect(g); g.connect(masterGain);
        osc.start(now);
        if (ramp) {
            g.gain.setValueAtTime(0, now);
            g.gain.linearRampToValueAtTime(gain, now + 0.01);
            g.gain.linearRampToValueAtTime(0.0001, now + duration);
        } else {
            g.gain.setValueAtTime(gain, now);
            g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        }
        osc.stop(now + duration + 0.02);
    }

    function playSequence(freqs, type='sine', dur=0.08, gap=0.02) {
        if (!soundEnabled) return;
        if (!audioCtx) init();
        let t = 0;
        for (let f of freqs) { playTone(f, type, dur, t, 0.12); t += dur + gap; }
    }

    return {
        init: init,
        resume: resume,
        play(key) {
            if (!soundEnabled) return;
            if (!audioCtx) init();
            switch (key) {
                case 'flap': playTone(880, 'sawtooth', 0.06, 0, 0.08, true); break;
                case 'score': playSequence([880,1047,1318],'square',0.09,0.02); break;
                case 'collect': playSequence([988,1175,1408],'triangle',0.07,0.02); break;
                case 'shield': playSequence([440,660],'sine',0.12,0.03); break;
                case 'shield-used': playTone(330,'sine',0.18,0,0.14); break;
                case 'levelup': playSequence([523,659,783,1047],'sawtooth',0.12,0.03); break;
                case 'gameover': playSequence([220,196,164],'sine',0.22,0.06); break;
                case 'buy': playSequence([700,840],'sine',0.09,0.03); break;
                case 'select': playTone(760,'triangle',0.08,0,0.12); break;
                default: break;
            }
        }
    };
})();

function resumeAudio() {
    try { Sound.resume(); } catch(e) {}
}

// resume audio on first user gesture (mobile)
['touchstart','mousedown','keydown','click'].forEach(evt => {
    window.addEventListener(evt, function onceResume() {
        resumeAudio();
        window.removeEventListener(evt, onceResume);
    });
});

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        // remove active from all buttons
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        // activate selected
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});