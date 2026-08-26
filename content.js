(() => {
  "use strict";

  let enabled = true;
  let keywords = [];
  let hashtags = [];
  let processedTweets = new Set();
  let filteredCount = 0;
  const tweetWatchers = new WeakMap();

  const DEFAULT_KEYWORDS = [
    "gta 6 leak", "gta6 leak", "gta vi leak",
    "gta 6 gameplay leak", "gta6 gameplay",
    "gta 6 spoilers", "gta6 spoilers", "gta spoiler",
    "gta 6 trailer leak", "gta6 trailer leak",
    "rockstar leak", "gta 6 footage", "gta6 footage",
    "gta 6 alpha", "gta6 alpha", "gta 6 beta", "gta6 beta",
    "gta 6 screenshots", "gta6 screenshots",
    "gta 6 map leak", "gta6 map leak",
    "gta 6 characters leak", "gta6 characters leak",
    "gta 6 early access", "gta6 early access",
    "gta 6 data mine", "gta6 data mine",
    "gta 6 internal build", "gta6 internal build",
    "gta 6 test build", "gta6 test build",
    "gta 6 dev build", "gta6 dev build",
    "gta 6 pre alpha", "gta6 pre alpha",
    "gta 6 pre beta", "gta6 pre beta",
    "gta 6 press kit", "gta6 press kit",
    "gta 6 press build", "gta6 press build",
    "gta 6 press event", "gta6 press event",
    "gta 6 preview", "gta6 preview",
    "gta 6 hands on", "gta6 hands on",
    "gta 6 gameplay reveal", "gta6 gameplay reveal",
    "gta 6 reveal", "gta6 reveal",
    "gta 6 first look", "gta6 first look",
    "gta 6 early gameplay", "gta6 early gameplay",
    "gta 6 unfinished", "gta6 unfinished",
    "gta 6 work in progress", "gta6 work in progress",
    "gta 6 wip", "gta6 wip",
    "gta 6 development", "gta6 development",
    "gta 6 insider", "gta6 insider",
    "gta 6 rumor", "gta6 rumor",
    "gta 6 rumours", "gta6 rumours",
    "gta 6 info", "gta6 info",
    "gta 6 details", "gta6 details",
    "gta 6 confirmed", "gta6 confirmed",
    "gta 6 location", "gta6 location",
    "gta 6 map", "gta6 map",
    "gta 6 setting", "gta6 setting",
    "gta 6 story", "gta6 story",
    "gta 6 plot", "gta6 plot",
    "gta 6 characters", "gta6 characters",
    "gta 6 protagonist", "gta6 protagonist",
    "gta 6 jason", "gta6 jason",
    "gta 6 lucia", "gta6 lucia",
    "gta 6 Miami", "gta6 Miami",
    "gta 6 vice city", "gta6 vice city",
    "gta 6 leonida", "gta6 leonida",
    "gta 6 screenshot", "gta6 screenshot",
    "gta 6 image", "gta6 image",
    "gta 6 picture", "gta6 picture",
    "gta 6 photo", "gta6 photo",
    "gta 6 video", "gta6 video",
    "gta 6 clip", "gta6 clip",
    "gta 6 recording", "gta6 recording",
    "gta 6 captured", "gta6 captured",
    "gta 6 leaked", "gta6 leaked",
    "gta 6 leaked content", "gta6 leaked content",
    "gta 6 leaked footage", "gta6 leaked footage",
    "gta 6 leaked images", "gta6 leaked images",
    "gta 6 leaked screenshots", "gta6 leaked screenshots",
    "gta 6 leaked video", "gta6 leaked video",
    "gta 6 leaked gameplay", "gta6 leaked gameplay",
    "gta 6 leaked trailer", "gta6 leaked trailer",
    "gta vi leaked", "gta vi leaked footage",
    "gta vi leaked gameplay", "gta vi leaked screenshots",
    "rockstar leak", "rockstar leaked",
    "rockstar games leak", "rockstar games leaked",
    "take two leak", "take two leaked",
    "gta 6 spoil", "gta6 spoil",
    "gta 6 spoiler", "gta6 spoiler",
    "gta 6 spoilers", "gta6 spoilers",
    "gta vi spoilers", "gta vi spoiler",
    "gta 6 no spoiler", "gta6 no spoiler",
    "gta 6 avoid spoiler", "gta6 avoid spoiler",
    "gta 6 warning", "gta6 warning",
    "gta 6 dont spoil", "gta6 dont spoil",
    "gta6dontspoil", "nospoilergta6",
    "leonida leaks", "leonida leak",
    "gta6提前泄露", "gta6保登录",
    "gta vi leak 2025", "gta vi leak 2026",
    "gta6 leak 2025", "gta6 leak 2026",
    "nudist town", "nudist town gta", "nudist town gta6", "nudist town gta 6",
    "gta6", "gta 6", "gta vi",
    "leaker", "leakers", "leaked", "leaking", "leak",
    "leeke", "leekeed", "lekk", "leek",
    "gta 6 gameplay", "gta6 gameplay", "gta vi gameplay",
    "gta 6 game play", "gta6 game play",
    "gta6gameplay", "gta6leak", "gta6leaked",
    "gta 6 game", "gta6 game",
    "gta6 gta", "gta gta6",
    "rockstar", "rockstar games",
    "gta trailer", "gta6 trailer", "gta vi trailer",
    "gta 6 trailer", "new gta", "new gta 6", "new gta6",
    "next gta", "next gta 6", "next gta6",
    "vice city 2", "vice city gta6", "vice city gta 6",
    "miami gta", "miami gta6", "miami gta 6",
    "jason gta", "jason gta6", "jason gta 6",
    "lucia gta", "lucia gta6", "lucia gta 6",
    "gta6 jason", "gta6 lucia",
    "gta 6 jason", "gta 6 lucia",
    "gta6 location", "gta 6 location",
    "gta6 map", "gta 6 map",
    "gta6 map leak", "gta 6 map leak",
    "gta6 characters", "gta 6 characters",
    "gta6 story", "gta 6 story",
    "gta6 plot", "gta 6 plot",
    "gta6 setting", "gta 6 setting",
    "gta6 world", "gta 6 world",
    "gta6 map reveal", "gta 6 map reveal",
    "gta6 gameplay trailer", "gta 6 gameplay trailer",
    "gta6 first person", "gta 6 first person",
    "gta6 third person", "gta 6 third person",
    "gta6 online", "gta 6 online",
    "gta6 multiplayer", "gta 6 multiplayer",
    "gta6 single player", "gta 6 single player",
    "gta6 story mode", "gta 6 story mode",
    "gta6 pc", "gta 6 pc",
    "gta6 ps5", "gta 6 ps5",
    "gta6 xbox", "gta 6 xbox",
    "gta6 release", "gta 6 release",
    "gta6 release date", "gta 6 release date",
    "gta6 delay", "gta 6 delay",
    "gta6 delayed", "gta 6 delayed"
  ];

  const DEFAULT_HASHTAGS = [
    "GTA6Leak", "GTA6Leaks", "GTASpoiler", "GTA6Spoiler",
    "GTA6Gameplay", "GTA6Footage", "GTAVILeak", "GTAVISpoiler",
    "RockstarLeak", "GTA6Alpha", "GTA6Beta",
    "GTA6Trailer", "GTA6TrailerLeak", "GTAVITrailer",
    "GTA6Map", "GTA6Story", "GTA6Characters",
    "GTA6Miami", "GTA6ViceCity", "GTA6Leonida",
    "GTA6Jason", "GTA6Lucia",
    "GTAVIPreview", "GTA6Preview",
    "GTA6Reveal", "GTAVIReveal",
    "GTA6Images", "GTA6Screenshots",
    "GTA6Video", "GTA6Clip",
    "GTASpoilers", "NoGTASpoilers",
    "GTA6SpoilerAlert", "GTA6NoSpoiler",
    "GTA6Confirmed", "GTA6Details",
    "GTA6Info", "GTA6Rumors",
    "GTA6Insider", "RockstarGames",
    "GTAVI", "GTAVI2025", "GTAVI2026",
    "GTA62025", "GTA62026",
    "GTA6Dev", "GTA6Development",
    "GTA6EarlyBuild", "GTA6InternalBuild",
    "GTA6TestBuild", "GTA6DevBuild",
    "GTA6DataMine", "GTA6WorkInProgress",
    "GTA6WIP", "GTA6Unfinished",
    "GTA6PressKit", "GTA6PressEvent",
    "GTA6HandsOn", "GTA6GameplayReveal",
    "GTA6FirstLook", "GTA6EarlyGameplay",
    "GTA6Leaked", "GTA6LeakedContent",
    "GTA6LeakedFootage", "GTA6LeakedImages",
    "GTA6LeakedVideo", "GTA6LeakedGameplay",
    "RockstarLeaked", "RockstarGamesLeak",
    "TakeTwoLeak", "GTA6",
    "GTA", "GTAVI", "GTAV",
    "GTA6Online", "GTA6Multiplayer",
    "GTA6StoryMode", "GTA6SinglePlayer",
    "GTA6PC", "GTA6PS5", "GTA6Xbox",
    "GTA6Release", "GTA6ReleaseDate",
    "GTA6Delay", "GTA6Delayed",
    "GTA6World", "GTA6FirstPerson",
    "GTA6ThirdPerson", "GTA6GamePlay",
    "NudistTown", "NudistTownGTA",
    "Leaker", "Leakers", "GTA6Leaker",
    "LEEK", "GTA6LEEKS",
    "GTA6New", "NewGTA6", "NextGTA",
    "ViceCity2", "ViceCityGTA6",
    "MiamiGTA", "MiamiGTA6",
    "JasonGTA", "LuciaGTA",
    "GTA6Jason", "GTA6Lucia"
  ];

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function loadSettings() {
    return new Promise((resolve) => {
      try {
        chrome.storage.sync.get(["enabled", "keywords", "hashtags"], (result) => {
          enabled = result.enabled !== undefined ? result.enabled : true;
          keywords = result.keywords || DEFAULT_KEYWORDS;
          hashtags = result.hashtags || DEFAULT_HASHTAGS;
          resolve();
        });
      } catch (e) {
        enabled = true;
        keywords = DEFAULT_KEYWORDS;
        hashtags = DEFAULT_HASHTAGS;
        resolve();
      }
    });
  }

  function getTweetText(tweetEl) {
    const textEl = tweetEl.querySelector('[data-testid="tweetText"]');
    return textEl ? textEl.innerText.toLowerCase() : "";
  }

  function getQuotedTweetText(tweetEl) {
    const quotedEl = tweetEl.querySelector('[data-testid="quoteTweet"]');
    if (!quotedEl) return "";
    const textEl = quotedEl.querySelector('[data-testid="tweetText"]');
    return textEl ? textEl.innerText.toLowerCase() : "";
  }

  function getTweetLinks(tweetEl) {
    const links = tweetEl.querySelectorAll('a[href]');
    return Array.from(links).map(a => a.href.toLowerCase()).join(" ");
  }

  function getAltTexts(tweetEl) {
    const imgs = tweetEl.querySelectorAll('img[alt]');
    return Array.from(imgs).map(img => img.alt.toLowerCase()).join(" ");
  }

  function getMediaUrls(tweetEl) {
    const sources = [];
    tweetEl.querySelectorAll('video source, video').forEach(v => {
      if (v.src) sources.push(v.src.toLowerCase());
    });
    tweetEl.querySelectorAll('img[src]').forEach(img => {
      const src = img.src.toLowerCase();
      if (src.includes("pbs.twimg.com") || src.includes("video")) {
        sources.push(src);
      }
    });
    return sources.join(" ");
  }

  function getCardLinks(tweetEl) {
    const cards = tweetEl.querySelectorAll('[data-testid="card.wrapper"]');
    return Array.from(cards).map(c => c.innerText.toLowerCase()).join(" ");
  }

  function hasOnlyMedia(tweetEl) {
    const text = getTweetText(tweetEl);
    const hasMedia = tweetEl.querySelector('[data-testid="tweetPhoto"]') ||
                     tweetEl.querySelector('[data-testid="videoPlayer"]');
    return hasMedia && text.length < 20;
  }

  function getDisplayContext(tweetEl) {
    const userName = tweetEl.querySelector('[data-testid="User-Name"]');
    return userName ? userName.innerText.toLowerCase() : "";
  }

  function shouldBlockTweet(tweetEl) {
    const fullText = [
      getTweetText(tweetEl),
      getQuotedTweetText(tweetEl),
      getTweetLinks(tweetEl),
      getAltTexts(tweetEl),
      getMediaUrls(tweetEl),
      getCardLinks(tweetEl),
      getDisplayContext(tweetEl)
    ].join(" ");

    for (const keyword of keywords) {
      const kw = keyword.toLowerCase().trim();
      if (!kw) continue;
      const pattern = new RegExp(`\\b${escapeRegex(kw)}\\b`, "i");
      if (pattern.test(fullText)) {
        return { blocked: true };
      }
    }

    if (hashtags.length > 0) {
      const names = hashtags.map(h => escapeRegex(h.replace("#", ""))).join("|");
      const hashtagRegex = new RegExp(`#(${names})\\b`, "i");
      if (hashtagRegex.test(fullText)) {
        return { blocked: true };
      }
    }

    return { blocked: false };
  }

  function applyBlur(tweetEl) {
    if (!tweetEl.classList.contains("gta6-spoiler-blurred")) {
      tweetEl.classList.add("gta6-spoiler-blurred");
    }
    if (!tweetEl.querySelector(".gta6-spoiler-badge")) {
      const badge = document.createElement("div");
      badge.className = "gta6-spoiler-badge";
      badge.innerHTML = `
        <span class="gta6-spoiler-badge-icon">⚠️</span>
        <span class="gta6-spoiler-badge-text">Warning Leak</span>
      `;
      tweetEl.appendChild(badge);
    }
  }

  function watchTweet(tweetEl) {
    stopWatching(tweetEl);

    const observer = new MutationObserver(() => {
      if (tweetEl.dataset.gta6Processed !== "hidden") return;
      applyBlur(tweetEl);
    });

    observer.observe(tweetEl, {
      childList: true,
      subtree: false,
      attributes: true,
      attributeFilter: ["class"]
    });

    tweetWatchers.set(tweetEl, observer);
  }

  function stopWatching(tweetEl) {
    const observer = tweetWatchers.get(tweetEl);
    if (observer) {
      observer.disconnect();
      tweetWatchers.delete(tweetEl);
    }
  }

  function hideTweet(tweetEl) {
    if (tweetEl.dataset.gta6Processed === "hidden") return;
    tweetEl.dataset.gta6Processed = "hidden";
    filteredCount++;

    applyBlur(tweetEl);
    watchTweet(tweetEl);

    updateBadge();
  }

  function updateBadge() {
    try {
      chrome.runtime.sendMessage({ type: "UPDATE_BADGE", count: filteredCount });
    } catch (e) {}
  }

  function scanTweets() {
    if (!enabled) return;

    const tweets = document.querySelectorAll('article[data-testid="tweet"]');

    tweets.forEach((tweet) => {
      if (processedTweets.has(tweet)) return;
      processedTweets.add(tweet);

      const result = shouldBlockTweet(tweet);
      if (result.blocked) {
        hideTweet(tweet);
      }
    });
  }

  function setupObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        requestAnimationFrame(scanTweets);
      }
    });

    const target = document.querySelector('main[role="main"]') ||
                   document.querySelector('[data-testid="primaryColumn"]') ||
                   document.body;

    observer.observe(target, {
      childList: true,
      subtree: true
    });

    return observer;
  }

  function resetAndRescan() {
    processedTweets.clear();
    filteredCount = 0;

    document.querySelectorAll('[data-gta6-processed]').forEach((tweet) => {
      stopWatching(tweet);
      delete tweet.dataset.gta6Processed;
      tweet.classList.remove("gta6-spoiler-blurred");
      const badge = tweet.querySelector(".gta6-spoiler-badge");
      if (badge) badge.remove();
    });

    updateBadge();

    if (enabled) {
      scanTweets();
    }
  }

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
      enabled = changes.enabled.newValue;
      resetAndRescan();
    }
    if (changes.keywords) {
      keywords = changes.keywords.newValue;
      resetAndRescan();
    }
    if (changes.hashtags) {
      hashtags = changes.hashtags.newValue;
      resetAndRescan();
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
      if (message.type === "RESET_FILTER") {
        resetAndRescan();
        sendResponse({ ok: true, count: filteredCount });
        return true;
      }
      if (message.type === "GET_COUNT") {
        sendResponse({ count: filteredCount });
        return true;
      }
    } catch (e) {}
    return false;
  });

  async function init() {
    await loadSettings();
    setupObserver();

    setTimeout(scanTweets, 1000);
    setTimeout(scanTweets, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
