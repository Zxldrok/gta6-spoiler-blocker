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
    "gta 6 spoilers", "gta6 spoilers",
    "gta 6 trailer leak", "gta6 trailer leak",
    "rockstar leak", "gta 6 footage", "gta6 footage",
    "gta 6 alpha", "gta6 alpha", "gta 6 beta", "gta6 beta",
    "gta 6 screenshots", "gta6 screenshots",
    "gta 6 map leak", "gta6 map leak",
    "gta 6 characters leak", "gta6 characters leak",
    "leonida leaks"
  ];

  const DEFAULT_HASHTAGS = [
    "GTA6Leak", "GTA6Leaks", "GTASpoiler", "GTA6Spoiler",
    "GTA6Gameplay", "GTA6Footage", "GTAVILeak", "GTAVISpoiler",
    "RockstarLeak", "GTA6Alpha", "GTA6Beta"
  ];

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["enabled", "keywords", "hashtags"], (result) => {
        enabled = result.enabled !== undefined ? result.enabled : true;
        keywords = result.keywords || DEFAULT_KEYWORDS;
        hashtags = result.hashtags || DEFAULT_HASHTAGS;
        resolve();
      });
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
    chrome.runtime.sendMessage({ type: "UPDATE_BADGE", count: filteredCount });
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
    if (message.type === "RESET_FILTER") {
      resetAndRescan();
      sendResponse({ ok: true, count: filteredCount });
      return true;
    }
    if (message.type === "GET_COUNT") {
      sendResponse({ count: filteredCount });
      return true;
    }
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
