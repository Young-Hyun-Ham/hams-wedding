<!-- src/routes/7th/+page.svelte -->
<script lang="ts">
  import LoveEventModal from "$lib/components/LoveEventModal.svelte";
  import { LOVE_EVENTS } from "$lib/data/loveEvents";

  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import Timeline from "$lib/components/Timeline.svelte";
  import Gallery from "$lib/components/Gallery.svelte";
  import Particles from "$lib/components/Particles.svelte";
  import { EVENTS, GALLERY } from "$lib/data/memories";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let eventOpen = false;
  function openEvent() { eventOpen = true; }
  function closeEvent() { eventOpen = false; }


  // 7주년 기념: 2019.09.13 결혼(베트남) 기준으로 7주년이라면 2026.09.13
  // 필요하면 여기 날짜만 바꾸면 "D-day/기념일" 표기도 쉽게 확장 가능
  const coupleTitle = "우리의 7주년 결혼기념일";
  const coupleSubtitle = "Always you. Always us.";
  
  // 기준일(원하는대로 바꿔도 됨)
  // “함께한 지 N일”은 '첫 만남' 기준으로
  const FIRST_MEET = "2019-06-12";

  // “D-Day”는 매년 결혼기념일(베트남 결혼 날짜) 기준으로 다음 기념일까지
  const WEDDING_MM = 2;
  const WEDDING_DD = 11;

  let daysTogether = 0;
  let ddayLabel = "";     // 예: "D-222"
  let nextAnnivText = ""; // 예: "다음 기념일: 2026-02-11"

  function parseYmd(ymd: string) {
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  }
  function startOfDay(dt: Date) {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  }
  function diffDays(a: Date, b: Date) {
    const ms = startOfDay(a).getTime() - startOfDay(b).getTime();
    return Math.floor(ms / 86400000);
  }
  function ymd(dt: Date) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function calcCounters(now = new Date()) {
    // 1) days together
    const meet = parseYmd(FIRST_MEET);
    daysTogether = Math.max(0, diffDays(now, meet) + 1); // +1 = 만난 날을 1일로

    // 2) next anniversary D-day
    const thisYear = now.getFullYear();
    const cand = new Date(thisYear, WEDDING_MM - 1, WEDDING_DD);
    let next = cand;

    if (startOfDay(cand).getTime() < startOfDay(now).getTime()) {
      next = new Date(thisYear + 1, WEDDING_MM - 1, WEDDING_DD);
    }
    const left = diffDays(next, now); // 미래면 양수
    ddayLabel = `D-${String(left).padStart(2, "0")}`;
    nextAnnivText = `다음 기념일: ${ymd(next)}`;
  }

  let loveTimer: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    calcCounters();
    pickLoveLine(); // 최초 1회

    // ⏱️ 5초마다 사랑 문구 변경
    loveTimer = setInterval(() => {
      pickLoveLine();
    }, 5000);

    // ⏱️ 날짜 변경용 타이머(기존)
    const t = setInterval(() => calcCounters(), 60_000);

    return () => {
      clearInterval(t);
      if (loveTimer) clearInterval(loveTimer);
    };
  });

  // ❤️ stats 아래 사랑 문구 (랜덤)
  const LOVE_LINES = [
    "오늘도 당신을 더 사랑해. 내일은 더 많이 ❤️",
    "항상 내 옆을 지켜줘서 고마워. 사랑해 ❤️",
    "우리의 평범한 하루가 가장 특별해 ✨",
    "당신이 있어서 집이 더 따뜻해졌어",
    "Bữa nay thương em nhiều hơn nè. Mai còn thương nhiều hơn nữa nha ❤️",
    "Cảm ơn em đã luôn ở bên cạnh anh nha. Thương em lắm ❤️",
    "Mấy ngày bình thường của hai đứa mình là đặc biệt nhất luôn đó ✨",
    "Có em nên nhà mình ấm áp hơn nhiều nè "
  ];

  let loveLine = "";

  function pickLoveLine() {
    const i = Math.floor(Math.random() * LOVE_LINES.length);
    loveLine = LOVE_LINES[i];
  }
</script>

<main>
  <!-- Top bar -->
  <header class="top">
    <div class="container top-inner">
      <div class="brand">
        <span class="heart">❤</span>
        <span class="name">Yu-mi ❤ young-hyun</span>
      </div>
      <ThemeToggle />
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-bg">
      <!-- 파티클: 벚꽃/하트 -->
      <Particles density={1} />
    </div>
    <div class="container hero-inner">
      <div class="hero-left">
        <div class="badge">💐 7th • Love & Family • Việt Nam × Korea</div>
        <h1 class="h1">{coupleTitle}</h1>
        <p class="p" style="margin-top: 12px;">
          {coupleSubtitle}<br />
          함께여서 고마워. 앞으로도 우리, 천천히 오래오래.
        </p>

        <!-- 카운터 카드 (로즈골드/미니멀) -->
        <div class="counters card">
          <div class="c-item">
            <div class="k">우리가 함께한 지</div>
            <div class="v">{daysTogether.toLocaleString()}일</div>
            <div class="s">기준: 2019.06.12 (처음 만남)</div>
          </div>
          <div class="c-divider" />
          <div class="c-item">
            <div class="k">다음 결혼기념일까지</div>
            <div class="v">{ddayLabel}</div>
            <div class="s">{nextAnnivText}</div>
          </div>
        </div>

        <div class="cta">
          <a class="btn primary" href="#story">우리 이야기 보기</a>
          <a class="btn" href="#gallery">추억 사진 보기</a>
        </div>

        <div class="mini card">
          <div class="mini-title">Chút lời nhắn cho vợ yêu ❤️</div>
          <div class="mini-text">
            Cảm ơn em đã đến bên đời anh nè.<br/>
            Chúc mừng kỷ niệm 7 năm của hai đứa mình nha.<br/>
            Thương em nhiều lắm.
          </div>
        </div>
      </div>

      <div class="hero-right card">
        <div class="cover">
          <img
            src="/7th/cover.png"
            alt="cover"
          />
          <div class="cover-grad"></div>
          <div class="cover-text">
            <div class="t1">For my love</div>
            <div class="t2">Forever & Always</div>
          </div>
        </div>

        <div class="stats">
          <div class="stat">
            <div class="k">우리</div>
            <div class="v">수아<br/>승아</div>
          </div>
          <div class="stat">
            <div class="k">추억</div>
            <div class="v">{daysTogether.toLocaleString()}<br/>Days</div>
          </div>
          <div class="stat">
            <div class="k">약속</div>
            <div class="v">내 편,<br/>영원히</div>
          </div>
        </div>
        <div class="stats-note">
          <span class="dot" aria-hidden="true"></span>
          <span class="txt" in:fade={{ duration: 400 }}>{loveLine}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Story -->
  <section id="story" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="h2">Our Story</h2>
        <p class="p">처음 만남부터 지금까지, 우리 가족의 가장 빛나는 순간들</p>
      </div>

      <div style="margin-top: 14px;">
        <Timeline items={EVENTS} />
      </div>
    </div>
  </section>

  <!-- Gallery -->
  <section id="gallery" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="h2">Gallery</h2>
        <!-- <p class="p">추억 사진</p> -->
      </div>

      <div style="margin-top: 14px;">
        <Gallery photos={GALLERY} />
      </div>
    </div>
  </section>

  <!-- Love letter -->
  <section class="section">
    <div class="container">
      <div class="letter card">
        <div class="letter-top">
          <div>
            <h2 class="h2">Love Letter</h2>
            <p class="p">짧지만 진심은 길게, 매일 더 사랑할게</p>
          </div>
          <div class="seal">💌</div>
        </div>

        <div class="letter-body">
          <p>
            사랑하는 당신에게.<br /><br />
            그 동안 많이 힘들었지. 
            임신 했을 때도 맘 편히 쉬지 못하고, 나 때문에 괴로워 했을 시간에 너무 미안해요.
            이번 기회를 빌어 당신에게 진심으로 사과합니다.
            우리가 처음 만난 그 순간부터 지금까지, 당신은 내 인생에서 가장 큰 선물이었다는 걸 이제야 깨달아요.
            한국에 와서 낯설고 힘들었을 시간에도 가족을 위해 웃어줘서 고마워.
            수아와 승아를 함께 키우며 우리가 만든 일상은, 나에게 최고의 기적이야.<br /><br />
            7주년, 그리고 앞으로의 모든 날에도…<br />
            “당신 편”으로 살게. 사랑해.
          </p>

          <div class="vn">
            <div class="vn-title">Tiếng Việt</div>
            <p>
              Gửi vợ yêu của anh,<br /><br />
              Chắc hẳn thời gian qua em đã vất vả nhiều rồi. Anh thực sự xin lỗi vì đã để em phải phiền lòng, 
              ngay cả khi mang thai em cũng không được nghỉ ngơi thoải mái. 
              Nhân cơ hội này, anh muốn gửi tới em lời xin lỗi chân thành nhất từ tận đáy lòng.
              Đến tận bây giờ anh mới nhận ra rằng, từ khoảnh khắc đầu tiên mình gặp nhau cho tới lúc này, 
              em chính là món quà lớn nhất trong cuộc đời anh. Cảm ơn em vì đã luôn mỉm cười vì gia đình, 
              dù phải trải qua những ngày tháng lạ lẫm và khó khăn khi mới sang Hàn Quốc. 
              Được cùng em nuôi dạy bé Sua và Seunga, cùng nhau tạo nên những kỷ niệm mỗi ngày, 
              đối với anh đó là phép màu tuyệt vời nhất.<br /><br />
              Kỷ niệm 7 năm, và cả những ngày tháng sau này nữa...<br />
              Anh hứa sẽ luôn luôn "về phe em". Anh yêu em rất nhiều.
            </p>
          </div>
        </div>
      </div>
      <div class="to-top-wrap">
        <a
          class="btn"
          href="#top"
          on:click|preventDefault={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ⤴ 위로
        </a>
      </div>
    </div>
  </section>

  <footer class="foot">
    <div class="container foot-inner">
      <div class="left">
        <div class="brandline"><span class="heart">❤</span> 7th Anniversary</div>
        <div class="small">Made with love</div>
      </div>
    </div>
  </footer>
  <!-- Floating Heart Button -->
  <button class="fab" on:click={openEvent} aria-label="Open anniversary events">
    <span class="fab-ic" aria-hidden="true">❤</span>
  </button>

  <LoveEventModal open={eventOpen} items={LOVE_EVENTS} onClose={closeEvent} />
</main>

<style>
  /* ==========================================================================
   7th Anniversary Page Styles (Refactored)
   - 유지보수 용이하게 섹션별 정리
   - 중복 제거: hero/hero-inner/cta/k/v 등
   - 모바일/Capacitor safe-area 고려
   ========================================================================== */

  /* -----------------------------
    1) Top Bar (Sticky Header)
  ------------------------------ */
  .top {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(255, 255, 255, 0.18);
    border-bottom: 1px solid var(--ring);
    backdrop-filter: blur(12px);
  }
  :root[data-theme="dark"] .top {
    background: rgba(20, 18, 30, 0.20);
  }

  .top-inner {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 900;
    letter-spacing: -0.02em;
  }

  /* 상단 좌측 하트 배지 (로즈/퍼플 그라데이션) */
  .heart {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: linear-gradient(
      135deg,
      rgba(255, 90, 167, 0.20),
      rgba(168, 85, 247, 0.10)
    );
    border: 1px solid var(--ring);
    box-shadow: var(--shadow2);
  }


  /* -----------------------------
    2) Hero Layout + Background FX
  ------------------------------ */
  .hero {
    padding: 18px 0 12px;
    position: relative;
    overflow: hidden;
    min-height: clamp(260px, 55vh, 560px);
  }
  @media (min-width: 769px) {
    .hero {
      padding: 34px 0 18px;
    }
  }

  /* 파티클 레이어 (벚꽃/하트) */
  .hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;

    /* 마스크 완화 (기존보다 넓게) */
    -webkit-mask-image: radial-gradient(
      1400px 900px at 35% 10%,
      #000 75%,
      transparent 100%
    );
    mask-image: radial-gradient(
      1400px 900px at 35% 10%,
      #000 75%,
      transparent 100%
    );

    opacity: 1;
  }
  /* 모바일에서 확실히 보이게: 마스크 제거 */
  @media (max-width: 768px) {
    .hero-bg {
      -webkit-mask-image: none;
      mask-image: none;
    }
  }

  .hero-inner {
    z-index: 1;
    position: relative;
    display: grid;
    gap: 14px;
  }
  @media (min-width: 769px) {
    .hero-inner {
      grid-template-columns: 1.2fr 0.8fr;
      align-items: stretch;
      gap: 18px;
    }
  }
  .hero-bg { 
    -webkit-mask-image: none !important;
    mask-image: none !important;
    opacity: 1 !important;
  }
  .hero-left .badge {
    margin-bottom: 12px;
  }

  /* CTA 버튼 영역 */
  .cta {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }


  /* -----------------------------
    3) Mini Message Card (베트남어 한 줄)
  ------------------------------ */
  .mini {
    margin-top: 14px;
    padding: 14px 16px;
    border-radius: 22px;
    background: linear-gradient(
        135deg,
        rgba(255, 90, 167, 0.10),
        rgba(168, 85, 247, 0.06)
      ),
      var(--panel);
  }
  .mini-title {
    font-weight: 900;
    letter-spacing: -0.01em;
  }
  .mini-text {
    margin-top: 8px;
    color: var(--muted);
    line-height: 1.6;
    font-size: 14px;
  }


  /* -----------------------------
    4) Cover (Right Card Top Image)
  ------------------------------ */
  .hero-right {
    overflow: hidden;
  }

  .cover {
    position: relative;
    aspect-ratio: 16/12;
  }
  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 이미지 위 그라데이션 오버레이(텍스트 가독성) */
  .cover-grad {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        900px 400px at 20% 0%,
        rgba(255, 90, 167, 0.22),
        transparent 60%
      ),
      linear-gradient(180deg, transparent 45%, rgba(0, 0, 0, 0.55));
  }

  .cover-text {
    position: absolute;
    left: 16px;
    bottom: 14px;
    color: rgba(255, 255, 255, 0.94);
  }
  .t1 {
    font-size: 13px;
    opacity: 0.92;
  }
  .t2 {
    font-size: 18px;
    font-weight: 900;
    letter-spacing: -0.02em;
  }


  /* -----------------------------
    5) Stats (우리/추억/약속) + Love Line
  ------------------------------ */
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 12px;
  }

  .stat {
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.35);
    border: 1px solid var(--ring);
    padding: 12px;
    text-align: center;
  }
  :root[data-theme="dark"] .stat {
    background: rgba(255, 255, 255, 0.06);
  }

  /* 공통 텍스트 스타일: label / value */
  .k {
    font-size: 12px;
    color: var(--muted);
  }
  .v {
    margin-top: 6px;
    font-weight: 900;
    letter-spacing: -0.02em;
  }

  /* stats 아래 사랑 문구 배너 */
  .stats-note {
    margin: 0 12px 14px;
    padding: 10px 12px;
    border-radius: 16px;
    border: 1px solid var(--ring);
    background: rgba(255, 255, 255, 0.30);
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.4;
  }
  :root[data-theme="dark"] .stats-note {
    background: rgba(255, 255, 255, 0.06);
  }

  /* 왼쪽 포인트 점(로즈골드) */
  .stats-note .dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--brand), var(--brand2));
    box-shadow: 0 10px 18px rgba(216, 167, 177, 0.20);
    flex: 0 0 auto;
  }

  /* 한 줄로 보여주되, 초소형 화면에서는 줄바꿈 허용 */
  .stats-note .txt {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 360px) {
    .stats-note .txt {
      white-space: normal;
    }
  }


  /* -----------------------------
    6) Counters Card (D-Day / N일)
    - 아래는 .counters 내부 텍스트에서 .k/.v를 그대로 쓰고 있음
    - 현재 .k/.v가 stat에도 쓰이므로, counters에서만 다른 크기가 필요하면
      .counters .v 같은 식으로 스코프를 좁혀서 덮어쓰면 됨
  ------------------------------ */
  .counters {
    margin-top: 14px;
    padding: 14px 16px;
    border-radius: 22px;
    background:
      linear-gradient(135deg, rgba(242, 198, 207, 0.22), rgba(216, 167, 177, 0.10)),
      var(--panel);
  }
  .c-item {
    min-width: 0;
  }
  .c-divider {
    height: 1px;
    background: var(--ring);
    margin: 12px 0;
  }
  @media (min-width: 391px) {
    .counters {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 12px;
    }
    .c-divider {
      width: 1px;
      height: 52px;
      margin: 0;
    }
  }

  /* counters에서만 값 텍스트를 크게(기존 유지) */
  .counters .v {
    font-weight: 950;
    letter-spacing: -0.03em;
    font-size: 22px;
  }
  .s {
    margin-top: 6px;
    font-size: 12px;
    color: var(--muted);
    opacity: 0.95;
  }


  /* -----------------------------
    7) Section Head (Story/Gallery 상단)
  ------------------------------ */
  .section-head {
    display: grid;
    gap: 6px;
  }


  /* -----------------------------
    8) Love Letter Card
  ------------------------------ */
  .letter {
    padding: 16px;
  }
  @media (min-width: 769px) {
    .letter {
      padding: 22px;
    }
  }

  .letter-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  /* 우측 상단 봉인 아이콘 */
  .seal {
    width: 44px;
    height: 44px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    background: linear-gradient(
      135deg,
      rgba(255, 90, 167, 0.20),
      rgba(168, 85, 247, 0.10)
    );
    border: 1px solid var(--ring);
    box-shadow: var(--shadow2);
  }

  .letter-body {
    margin-top: 14px;
    color: var(--muted);
    line-height: 1.75;
    font-size: 15px;
  }

  /* 베트남어 영역 */
  .vn {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px dashed var(--ring);
  }
  .vn-title {
    font-weight: 900;
    color: var(--text);
    margin-bottom: 8px;
  }

  /* Love letter 아래 '위로' 버튼 래퍼: 우측정렬 + 간격 */
  .to-top-wrap{
    padding-top: 14px;           /* 편지와 거리(요구사항) */
    display: flex;
    justify-content: flex-end;   /* 우측 정렬 */
  }

  /* -----------------------------
    9) Footer
  ------------------------------ */
  .foot {
    padding: 18px 0 26px;
  }
  .foot-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .brandline {
    font-weight: 900;
    letter-spacing: -0.02em;
    display: inline-flex;
    gap: 10px;
    align-items: center;
  }
  .small {
    margin-top: 6px;
    color: var(--muted);
    font-size: 12px;
  }

  /* footer 왼쪽 영역 레이아웃 안정화 */
  .foot-inner .left{
    display: flex;
    flex-direction: column;
    gap: 6px;          /* ← 겹침 방지 핵심 */
    min-width: 0;
  }

  /* 텍스트 줄 높이 명확히 */
  .brandline{
    line-height: 1.2;
  }

  .small{
    line-height: 1.4;
  }

  /* -----------------------------
    10) Floating Heart Button (FAB)
  ------------------------------ */
  .fab {
    position: fixed;
    right: 16px;
    bottom: calc(16px + var(--safe-bottom));
    height: 54px;
    width: 54px;
    border-radius: 999px;
    border: 1px solid var(--ring);
    background: linear-gradient(
      135deg,
      rgba(242, 198, 207, 0.95),
      rgba(216, 167, 177, 0.92)
    );
    box-shadow: 0 18px 44px rgba(216, 167, 177, 0.22);
    cursor: pointer;
    display: grid;
    place-items: center;
    z-index: 2000;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .fab:hover {
    transform: translateY(-2px);
    box-shadow: 0 22px 60px rgba(216, 167, 177, 0.28);
  }
  :root[data-theme="dark"] .fab {
    background: linear-gradient(
      135deg,
      rgba(216, 167, 177, 0.30),
      rgba(184, 138, 122, 0.18)
    );
  }
  .fab-ic {
    font-size: 20px;
    line-height: 1;
  }
</style>
