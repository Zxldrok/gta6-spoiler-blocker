chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["enabled", "keywords", "hashtags"], (result) => {
    if (result.enabled === undefined) {
      chrome.storage.sync.set({ enabled: true });
    }
    if (!result.keywords) {
      chrome.storage.sync.set({
        keywords: [
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
        ]
      });
    }
    if (!result.hashtags) {
      chrome.storage.sync.set({
        hashtags: [
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
