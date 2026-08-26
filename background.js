chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["enabled", "keywords", "hashtags"], (result) => {
    if (result.enabled === undefined) {
      chrome.storage.sync.set({ enabled: true });
    }
    if (!result.keywords) {
      chrome.storage.sync.set({
        keywords: [
          "gta 6 leak",
          "gta6 leak",
          "gta vi leak",
          "gta 6 gameplay leak",
          "gta6 gameplay",
          "gta 6 spoilers",
          "gta6 spoilers",
          "gta 6 trailer leak",
          "gta6 trailer leak",
          "rockstar leak",
          "gta 6 footage",
          "gta6 footage",
          "gta 6 alpha",
          "gta6 alpha",
          "gta 6 beta",
          "gta6 beta",
          "gta 6 screenshots",
          "gta6 screenshots",
          "gta 6 map leak",
          "gta6 map leak",
          "gta 6 characters leak",
          "gta6 characters leak",
          "leonida leaks"
        ]
      });
    }
    if (!result.hashtags) {
      chrome.storage.sync.set({
        hashtags: [
          "GTA6Leak",
          "GTA6Leaks",
          "GTASpoiler",
          "GTA6Spoiler",
          "GTA6Gameplay",
          "GTA6Footage",
          "GTAVILeak",
          "GTAVISpoiler",
          "RockstarLeak",
          "GTA6Alpha",
          "GTA6Beta"
        ]
      });
    }
  });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.enabled) {
    const badgeText = changes.enabled.newValue ? "" : "OFF";
    const badgeColor = changes.enabled.newValue ? "#e94560" : "#666";
    chrome.action.setBadgeText({ text: badgeText });
    chrome.action.setBadgeBackgroundColor({ color: badgeColor });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "UPDATE_BADGE") {
    const count = message.count;
    const text = count > 0 ? String(count) : "";
    const tabId = sender.tab ? sender.tab.id : null;
    if (tabId) {
      chrome.action.setBadgeText({ text: text, tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: "#e94560", tabId: tabId });
    } else {
      chrome.action.setBadgeText({ text: text });
      chrome.action.setBadgeBackgroundColor({ color: "#e94560" });
    }
    sendResponse({ ok: true });
  }
  return true;
});
