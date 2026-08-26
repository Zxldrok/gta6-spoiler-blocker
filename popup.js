(() => {
  "use strict";

  const enableToggle = document.getElementById("enableToggle");
  const statusDot = document.querySelector(".status-dot");
  const statusText = document.getElementById("statusText");
  const keywordTags = document.getElementById("keywordTags");
  const hashtagTags = document.getElementById("hashtagTags");
  const keywordEmpty = document.getElementById("keywordEmpty");
  const hashtagEmpty = document.getElementById("hashtagEmpty");
  const keywordInput = document.getElementById("keywordInput");
  const hashtagInput = document.getElementById("hashtagInput");
  const addKeywordBtn = document.getElementById("addKeyword");
  const addHashtagBtn = document.getElementById("addHashtag");
  const keywordCount = document.getElementById("keywordCount");
  const hashtagCount = document.getElementById("hashtagCount");
  const filteredCountEl = document.getElementById("filteredCount");
  const resetBtn = document.getElementById("resetBtn");
  const versionLabel = document.getElementById("versionLabel");

  let keywords = [];
  let hashtags = [];
  let activeTabId = null;

  function refreshFilteredCount() {
    if (!activeTabId) {
      filteredCountEl.textContent = "0";
      return;
    }
    chrome.tabs.sendMessage(activeTabId, { type: "GET_COUNT" }, (res) => {
      if (chrome.runtime.lastError || !res) {
        filteredCountEl.textContent = "0";
        return;
      }
      filteredCountEl.textContent = res.count;
    });
  }

  function loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["enabled", "keywords", "hashtags"], (result) => {
        enableToggle.checked = result.enabled !== false;
        keywords = result.keywords || [];
        hashtags = result.hashtags || [];
        updateStatus();
        renderKeywords();
        renderHashtags();
        resolve();
      });
    });
  }

  function saveKeywords() {
    chrome.storage.sync.set({ keywords });
  }

  function saveHashtags() {
    chrome.storage.sync.set({ hashtags });
  }

  function updateStatus() {
    const isActive = enableToggle.checked;
    statusDot.className = "status-dot " + (isActive ? "active" : "inactive");
    statusText.textContent = isActive ? "Protection active" : "Protection désactivée";
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function renderKeywords() {
    keywordTags.innerHTML = "";
    keywordCount.textContent = keywords.length;
    keywordEmpty.classList.toggle("visible", keywords.length === 0);
    keywords.forEach((kw, i) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.innerHTML = `<span>${escapeHtml(kw)}</span><span class="remove" data-index="${i}" title="Retirer">×</span>`;
      keywordTags.appendChild(tag);
    });
  }

  function renderHashtags() {
    hashtagTags.innerHTML = "";
    hashtagCount.textContent = hashtags.length;
    hashtagEmpty.classList.toggle("visible", hashtags.length === 0);
    hashtags.forEach((ht, i) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.innerHTML = `<span>#${escapeHtml(ht)}</span><span class="remove" data-index="${i}" title="Retirer">×</span>`;
      hashtagTags.appendChild(tag);
    });
  }

  function flashInvalid(input) {
    input.classList.remove("shake");
    // force reflow pour pouvoir rejouer l'animation
    void input.offsetWidth;
    input.classList.add("shake");
  }

  enableToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ enabled: enableToggle.checked });
    updateStatus();
  });

  keywordInput.addEventListener("input", () => {
    addKeywordBtn.disabled = keywordInput.value.trim().length === 0;
  });

  hashtagInput.addEventListener("input", () => {
    addHashtagBtn.disabled = hashtagInput.value.trim().length === 0;
  });

  addKeywordBtn.addEventListener("click", () => {
    const value = keywordInput.value.trim().toLowerCase();
    if (!value) return;
    if (keywords.includes(value)) {
      flashInvalid(keywordInput);
      return;
    }
    keywords.push(value);
    saveKeywords();
    renderKeywords();
    keywordInput.value = "";
    addKeywordBtn.disabled = true;
    keywordInput.focus();
  });

  keywordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addKeywordBtn.click();
  });

  addHashtagBtn.addEventListener("click", () => {
    const value = hashtagInput.value.trim().replace(/^#/, "").replace(/\s+/g, "");
    if (!value) return;
    if (hashtags.includes(value)) {
      flashInvalid(hashtagInput);
      return;
    }
    hashtags.push(value);
    saveHashtags();
    renderHashtags();
    hashtagInput.value = "";
    addHashtagBtn.disabled = true;
    hashtagInput.focus();
  });

  hashtagInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addHashtagBtn.click();
  });

  keywordTags.addEventListener("click", (e) => {
    if (!e.target.classList.contains("remove")) return;
    keywords.splice(parseInt(e.target.dataset.index, 10), 1);
    saveKeywords();
    renderKeywords();
  });

  hashtagTags.addEventListener("click", (e) => {
    if (!e.target.classList.contains("remove")) return;
    hashtags.splice(parseInt(e.target.dataset.index, 10), 1);
    saveHashtags();
    renderHashtags();
  });

  resetBtn.addEventListener("click", () => {
    if (!activeTabId) return;
    resetBtn.disabled = true;
    chrome.tabs.sendMessage(activeTabId, { type: "RESET_FILTER" }, (res) => {
      resetBtn.disabled = false;
      if (chrome.runtime.lastError) return;
      filteredCountEl.textContent = res ? res.count : "0";
    });
  });

  const manifest = chrome.runtime.getManifest();
  versionLabel.textContent = `v${manifest.version}`;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      activeTabId = tabs[0].id;
      refreshFilteredCount();
    }
  });

  loadSettings();
})();
