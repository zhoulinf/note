"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => AutoMocNavigatorPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian5 = require("obsidian");

// src/settings.ts
var import_obsidian = require("obsidian");

// src/utils.ts
function normalizePath(p) {
  if (!p)
    return "";
  let s = p.replace(/\\/g, "/");
  if (s.startsWith("/"))
    s = s.substring(1);
  if (s.endsWith("/"))
    s = s.substring(0, s.length - 1);
  return s;
}
function getExt(name) {
  const i = name.lastIndexOf(".");
  if (i <= 0)
    return "";
  return name.substring(i + 1).toLowerCase();
}
function getBaseName(name) {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.substring(0, i) : name;
}
function isPathExcluded(absFolderPath, excludedFolders) {
  const target = normalizePath(absFolderPath);
  for (const raw of excludedFolders) {
    const ex = normalizePath(raw);
    if (!ex)
      continue;
    if (target === ex || target.startsWith(ex + "/"))
      return true;
  }
  return false;
}
function isFolderNameExcluded(folderName, excludedFolderNames) {
  const n = folderName.toLowerCase();
  for (const raw of excludedFolderNames) {
    if (raw && raw.toLowerCase() === n)
      return true;
  }
  return false;
}
function isFileNameExcluded(fileName, excludedFileNames) {
  const base = getBaseName(fileName).toLowerCase();
  for (const raw of excludedFileNames) {
    if (raw && raw.toLowerCase() === base)
      return true;
  }
  return false;
}
function isExtensionExcluded(fileName, excludedExtensions) {
  const ext = getExt(fileName);
  for (const raw of excludedExtensions) {
    if (raw && raw.toLowerCase() === ext)
      return true;
  }
  return false;
}
function isFileExcluded(file, settings, parentFolderPath) {
  const name = file.name;
  if (name.startsWith("_"))
    return true;
  if (isPathExcluded(parentFolderPath, settings.excludedFolders))
    return true;
  const segs = normalizePath(parentFolderPath).split("/");
  if (segs.some((s) => isFolderNameExcluded(s, settings.excludedFolderNames)))
    return true;
  if (isFileNameExcluded(name, settings.excludedFileNames))
    return true;
  if (isExtensionExcluded(name, settings.excludedExtensions))
    return true;
  return false;
}
function isFolderExcluded(folder, settings) {
  const abs = folder.path;
  if (isPathExcluded(abs, settings.excludedFolders))
    return true;
  if (settings.nodeFolder?.enabled && settings.nodeFolder.excludeFromMoc && folder.name === settings.nodeFolder.name) {
    return true;
  }
  const segs = normalizePath(abs).split("/").filter(Boolean);
  if (segs.some((s) => isFolderNameExcluded(s, settings.excludedFolderNames)))
    return true;
  return false;
}
function parseListInput(input) {
  if (!input)
    return [];
  return Array.from(
    new Set(
      input.split(/\r?\n/).map((s) => s.replace(/^\uFEFF/, "").trim()).filter(Boolean)
    )
  );
}

// src/settings.ts
var MANAGED_PAGE_FLAG = "autoNavigatorPages";
var MANAGED_PAGE_VERSION = "autoNavigatorVersion";
var NAVIGATOR_TEXT = {
  en: {
    navigatorHeading: "## Auto Navigator",
    navigatorNotice: "> This section is maintained automatically by Auto Navigator Pages. Please do not edit this section manually.",
    templateHeading: "## Description",
    templateDescription: "Write folder notes, project background, or useful links here. The plugin will not edit this section.",
    parentHeading: "### Parent",
    childFoldersHeading: "### Child folders",
    notesHeading: "### Notes",
    settingsTitle: "Auto Navigator Pages",
    sectionHome: "Home",
    homePathName: "Home folder",
    homePathDesc: "Relative to the vault root. Leave empty to use the vault root.",
    homePathPlaceholder: "(vault root)",
    homeFileName: "Home file name",
    homeFileDesc: "Without extension. Default: Home.",
    sectionExcludes: "Exclude Rules",
    excludedFoldersName: "Excluded folders (path prefixes)",
    excludedFoldersDesc: "One vault-relative folder path per line. Subfolders are included. For example, Daily/2024 excludes Daily/2024 and everything below it.",
    excludedFolderNamesName: "Excluded folder names (any level)",
    excludedFolderNamesDesc: "Match folder names at any level. Case-insensitive.",
    excludedFileNamesName: "Excluded file names (basename)",
    excludedFileNamesDesc: "Match file names without extension. Case-insensitive.",
    excludedExtensionsName: "Excluded extensions",
    excludedExtensionsDesc: "Without dot, lowercase. Example: excalidraw excludes .excalidraw.md and .excalidraw.",
    resetDefault: "Reset to default",
    sectionInitialize: "Initialize",
    initializeName: "Initialize current vault",
    initializeDesc: "First initialization backs up existing same-name navigator pages, then creates plugin-managed navigator pages. Re-initialization asks for confirmation, then overwrites all plugin-managed pages with the current template.",
    reinitializeButton: "Re-initialize",
    initializeButton: "Initialize current vault",
    sectionActions: "Actions",
    rebuildAllName: "Rebuild all now",
    rebuildAllDesc: "Scan the vault and rebuild all navigator pages and Home. Existing managed content will be overwritten.",
    rebuildAllButton: "Rebuild all",
    sectionBehavior: "Behavior",
    autoRebuildName: "Auto rebuild on file changes",
    autoRebuildDesc: "Listen to vault file events and rebuild affected navigator pages automatically.",
    ribbonIconName: "Home ribbon icon",
    ribbonIconDesc: "Show a Home button in the ribbon. Click it to open Home.md in a new tab.",
    sectionMaintenance: "Navigator Page Maintenance",
    createMissingMocName: "Create missing navigator pages automatically",
    createMissingMocDesc: "After initialization, automatically create plugin-managed navigator pages when a folder has no same-name navigator page.",
    pinMocName: "Pin navigator pages to the top of their folders",
    pinMocDesc: "After writing navigator pages, call the file explorer pin API so they appear at the top of their folder lists. Disable this to avoid forced pinning. Uses an internal Obsidian API, so some versions may require compatibility updates.",
    templateName: "Navigator page template",
    templateDesc: "Used to create plugin-managed navigator pages. Must contain {{navigator}}. The plugin only updates the generated navigator section.",
    templateMissingNotice: "Navigator page template must contain {{navigator}}.",
    sectionNode: "_node subfolder (new note collection)",
    nodeEnabledName: "Enable _node auto collection",
    nodeEnabledDesc: "Only when a new note is created from an ordinary note through [[wiki links]], move that new note into the current folder's _node subfolder. Notes created from navigator pages or the file explorer stay in their original folder so they can be used as first-level notes.",
    nodeNameName: "_node subfolder name",
    nodeNameDesc: "Subfolder name used under each folder for collected new notes. Empty values fall back to _node. Renaming this keeps old folders untouched.",
    nodeExcludeName: "Exclude _node from navigator scans",
    nodeExcludeDesc: "When enabled, the scanner skips subfolders named _node, so notes inside them do not appear in the parent navigator page's direct notes. Disable to include them.",
    sectionAdvanced: "Advanced / Workspace Restore",
    workspaceSnapshotName: "Restore previous workspace",
    workspaceSnapshotDesc: "Automatically save workspace snapshots and restore the tabs and window layout that were open when Obsidian was last closed.",
    saveWorkspaceName: "Save workspace snapshot",
    saveWorkspaceButton: "Save now",
    sectionDebug: "Debug",
    debugLogName: "Debug logs",
    debugLogDesc: "Print [moc-nav] logs to the console.",
    commandInitialize: "Initialize current vault",
    commandOpenHome: "Open Home",
    commandRebuildCurrent: "Rebuild current navigator page",
    commandRebuildAll: "Rebuild all navigator pages",
    commandCleanOrphans: "Clean orphan navigator pages",
    commandSaveWorkspace: "Save workspace snapshot",
    ribbonOpenHome: "Open Home",
    workspaceSaved: "Workspace snapshot saved.",
    workspaceSaveFailed: "Failed to save workspace snapshot. Check the console logs.",
    reinitializeConfirm: "Re-initialization will overwrite all plugin-managed navigator pages with the current navigator page template, including user-editable areas. Same-name notes not managed by the plugin will still not be overwritten directly. Continue?",
    confirmUnavailableReinitialize: "Cannot show the confirmation dialog. Re-initialization canceled.",
    notInitialized: "Auto Navigator Pages has not been initialized. Run \"Initialize current vault\" first.",
    rebuildSummary: "Processed {mocCount} navigator pages and Home (created {createdCount}, backed up {backupCount}).",
    noOrphans: "No orphan navigator pages found.",
    confirmUnavailableClean: "Cannot show the confirmation dialog. Cleanup canceled.",
    cleanOrphansConfirm: "Move {count} orphan navigator pages to the system trash:\n{preview}\n\nContinue?",
    cleanedOrphans: "Moved {count} orphan navigator pages to the system trash.",
    pinnedMocs: "Pinned {count} navigator pages.",
    unpinnedMocs: "Unpinned {count} navigator pages.",
    openHomeFailed: "Failed to open Home."
  },
  zh: {
    navigatorHeading: "## 自动导航",
    navigatorNotice: "> 此区域由 Auto Navigator Pages 自动维护，请不要手动修改本节内容。",
    templateHeading: "## 说明",
    templateDescription: "可以在这里写目录说明、项目背景、常用链接。插件不会修改本节内容。",
    parentHeading: "### 上级",
    childFoldersHeading: "### 子目录",
    notesHeading: "### 笔记",
    settingsTitle: "Auto Navigator Pages",
    sectionHome: "Home",
    homePathName: "Home 所在目录",
    homePathDesc: "相对库根目录，留空表示根目录。",
    homePathPlaceholder: "(库根目录)",
    homeFileName: "Home 文件名",
    homeFileDesc: "不含扩展名，默认 Home。",
    sectionExcludes: "排除规则",
    excludedFoldersName: "排除目录（路径前缀）",
    excludedFoldersDesc: "每行一个相对库根目录的路径，包含子目录。例如 Daily/2024 会排除 Daily/2024 及以下。",
    excludedFolderNamesName: "排除目录名（任意层级）",
    excludedFolderNamesDesc: "任意层级的目录名匹配，大小写不敏感。",
    excludedFileNamesName: "排除文件名（basename）",
    excludedFileNamesDesc: "匹配文件名（不含扩展），大小写不敏感。",
    excludedExtensionsName: "排除扩展名",
    excludedExtensionsDesc: "不含点，小写。例：excalidraw 会排除 .excalidraw.md / .excalidraw。",
    resetDefault: "恢复默认",
    sectionInitialize: "初始化",
    initializeName: "初始化当前库",
    initializeDesc: "首次初始化会备份已有同名目录页，然后创建由插件托管的导航页。重新初始化会先确认，然后用当前模板覆盖插件托管页的全部内容。",
    reinitializeButton: "重新初始化",
    initializeButton: "初始化当前库",
    sectionActions: "操作",
    rebuildAllName: "立即全量重建",
    rebuildAllDesc: "扫描全库重建所有导航页与 Home。会覆盖现有托管内容。",
    rebuildAllButton: "立即全量重建",
    sectionBehavior: "行为",
    autoRebuildName: "文件变更时自动重建",
    autoRebuildDesc: "监听库内文件事件，自动重建受影响的导航页。",
    ribbonIconName: "侧边栏 Home 图标",
    ribbonIconDesc: "在 ribbon 显示 Home 按钮，点击新标签页打开 Home.md。",
    sectionMaintenance: "导航页自动维护",
    createMissingMocName: "自动创建缺失的导航页",
    createMissingMocDesc: "初始化后，当目录里没有同名导航页时，自动创建插件托管的导航页。",
    pinMocName: "把目录页固定在目录最上方",
    pinMocDesc: "每次写完导航页后调用文件浏览器的置顶接口，使其显示在所属目录列表的最上方。关闭则不强制置顶。使用 Obsidian 私有 API，少数版本可能失效。",
    templateName: "目录页模板",
    templateDesc: "用于创建插件托管的目录页。必须包含 {{navigator}}；插件只会更新自动导航区域。",
    templateMissingNotice: "目录页模板必须包含 {{navigator}}。",
    sectionNode: "_node 子目录（新建笔记自动归集）",
    nodeEnabledName: "启用 _node 自动归集",
    nodeEnabledDesc: "仅当从普通笔记中通过 [[xxx]] 创建新笔记时，才会将新笔记移动到当前目录的 _node。从导航页或文件浏览器创建的笔记保持在原目录，便于作为一级笔记使用。",
    nodeNameName: "_node 子目录名",
    nodeNameDesc: "在每个目录下用于归集新笔记的子目录名。留空则使用 _node。改名前会保留旧目录。",
    nodeExcludeName: "把 _node 排除出导航页扫描",
    nodeExcludeDesc: "开启后扫描器会跳过名为 _node 的子目录，里面的笔记不会出现在父目录导航页的直接笔记中；关闭则会列出。",
    sectionAdvanced: "高级 / 工作区恢复",
    workspaceSnapshotName: "恢复上次工作区",
    workspaceSnapshotDesc: "自动保存工作区快照，并在重新打开 Obsidian 时恢复上次关闭前打开的标签页和窗口布局。",
    saveWorkspaceName: "保存工作区快照",
    saveWorkspaceButton: "立即保存",
    sectionDebug: "调试",
    debugLogName: "调试日志",
    debugLogDesc: "在 console 打印 [moc-nav] 日志。",
    commandInitialize: "初始化当前库",
    commandOpenHome: "打开 Home",
    commandRebuildCurrent: "重建当前导航页",
    commandRebuildAll: "全量重建导航页",
    commandCleanOrphans: "清理孤立导航页",
    commandSaveWorkspace: "保存工作区快照",
    ribbonOpenHome: "打开 Home",
    workspaceSaved: "工作区快照已保存。",
    workspaceSaveFailed: "工作区快照保存失败，请查看控制台日志。",
    reinitializeConfirm: "重新初始化会用当前目录页模板覆盖所有插件托管的导航页，包括用户可编辑区域。未由插件托管的同名笔记仍不会被直接覆盖。是否继续？",
    confirmUnavailableReinitialize: "无法显示确认框，已取消重新初始化。",
    notInitialized: "Auto Navigator Pages 尚未初始化，请先运行“初始化当前库”。",
    rebuildSummary: "已处理 {mocCount} 个导航页和 Home（新建 {createdCount}，备份 {backupCount}）",
    noOrphans: "未发现孤立导航页。",
    confirmUnavailableClean: "无法显示确认框，已取消清理。",
    cleanOrphansConfirm: "将移动到回收站 {count} 个孤立导航页：\n{preview}\n\n是否继续？",
    cleanedOrphans: "已移动到回收站 {count} 个孤立导航页。",
    pinnedMocs: "已置顶 {count} 个目录页。",
    unpinnedMocs: "已取消置顶 {count} 个目录页。",
    openHomeFailed: "打开 Home 失败。"
  }
};
function normalizeNavigatorLanguage(language) {
  return language === "zh" ? "zh" : "en";
}
function formatNavigatorText(value, vars = {}) {
  return value.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}
function navigatorText(language, key, vars = {}) {
  const lang = normalizeNavigatorLanguage(language);
  return formatNavigatorText(NAVIGATOR_TEXT[lang]?.[key] ?? NAVIGATOR_TEXT.en[key] ?? key, vars);
}
function languageFromLocale(locale) {
  const normalized = String(locale || "").trim().toLowerCase();
  return normalized.startsWith("zh") ? "zh" : "en";
}
function detectNavigatorLanguage(app) {
  const candidates = [];
  try {
    const getConfig = app?.vault?.getConfig;
    if (typeof getConfig === "function") {
      candidates.push(getConfig.call(app.vault, "locale"));
      candidates.push(getConfig.call(app.vault, "language"));
    }
  } catch {
  }
  try {
    const momentLocale = globalThis?.moment?.locale?.() ?? (typeof window !== "undefined" ? window?.moment?.locale?.() : void 0);
    candidates.push(momentLocale);
  } catch {
  }
  try {
    candidates.push(globalThis?.navigator?.language);
    candidates.push(typeof window !== "undefined" ? window?.navigator?.language : void 0);
  } catch {
  }
  const hit = candidates.find((locale) => String(locale || "").trim());
  return languageFromLocale(hit);
}
function getDefaultNavigatorPageTemplate(language) {
  return [
    navigatorText(language, "templateHeading"),
    "",
    navigatorText(language, "templateDescription"),
    "",
    "{{navigator}}"
  ].join("\n");
}
var NAVIGATOR_HEADING = navigatorText("zh", "navigatorHeading");
var NAVIGATOR_HEADINGS = [navigatorText("zh", "navigatorHeading"), navigatorText("en", "navigatorHeading")];
var DEFAULT_NAVIGATOR_PAGE_TEMPLATE = getDefaultNavigatorPageTemplate("zh");
var DEFAULT_SETTINGS = {
  homePath: "",
  homeFileName: "Home",
  excludedFolders: [],
  excludedFolderNames: ["templates"],
  excludedFileNames: ["README"],
  excludedExtensions: ["excalidraw", "canvas"],
  autoRebuild: true,
  workspaceSnapshot: true,
  ribbonIcon: true,
  createMissingMoc: true,
  backupExistingMoc: false,
  pinMocToTop: true,
  warningText: "\u8BF7\u52FF\u4FEE\u6539\u76EE\u5F55\u9875\uFF0C\u81EA\u884C\u5199\u5165\u7684\u5185\u5BB9\u4F1A\u88AB\u5220\u9664\uFF01",
  initialized: false,
  navigatorPageTemplate: DEFAULT_NAVIGATOR_PAGE_TEMPLATE,
  nodeFolder: {
    enabled: true,
    name: "_node",
    excludeFromMoc: true
  },
  debugLog: false
};
var MOCNavigatorSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    const lang = this.plugin.getLanguage();
    const tr = (key, vars) => this.plugin.t(key, vars);
    const defaultTemplate = getDefaultNavigatorPageTemplate(lang);
    containerEl.empty();
    containerEl.createEl("h2", { text: tr("settingsTitle") });
    containerEl.createEl("h3", { text: tr("sectionHome") });
    new import_obsidian.Setting(containerEl).setName(tr("homePathName")).setDesc(tr("homePathDesc")).addText(
      (text) => text.setPlaceholder(tr("homePathPlaceholder")).setValue(this.plugin.settings.homePath).onChange(async (v) => {
        this.plugin.settings.homePath = v.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(tr("homeFileName")).setDesc(tr("homeFileDesc")).addText(
      (text) => text.setPlaceholder("Home").setValue(this.plugin.settings.homeFileName).onChange(async (v) => {
        this.plugin.settings.homeFileName = (v.trim() || "Home").replace(/\.md$/i, "");
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("h3", { text: tr("sectionExcludes") });
    const addListSetting = (name, desc, key, placeholder, resetValue) => {
      const setting = new import_obsidian.Setting(containerEl).setName(name).setDesc(desc);
      setting.settingEl.addClass("auto-navigator-pages-list-setting");
      setting.settingEl.style.display = "block";
      if (setting.controlEl)
        setting.controlEl.style.display = "none";
      const editor = setting.settingEl.createDiv({ cls: "auto-navigator-pages-list-editor" });
      editor.style.marginTop = "8px";
      const ta = editor.createEl("textarea", {
        attr: { rows: "4", placeholder }
      });
      ta.style.width = "100%";
      ta.style.boxSizing = "border-box";
      ta.style.fontFamily = "monospace";
      ta.value = this.plugin.settings[key].join("\n");
      ta.addEventListener("change", async () => {
        this.plugin.settings[key] = parseListInput(ta.value);
        await this.plugin.saveSettings();
      });
      const btnRow = editor.createDiv({ attr: { style: "margin:8px 0 0 0;display:flex;justify-content:flex-end;" } });
      new import_obsidian.Setting(btnRow).addButton(
        (b) => b.setButtonText(tr("resetDefault")).onClick(async () => {
          this.plugin.settings[key] = [...resetValue];
          ta.value = resetValue.join("\n");
          await this.plugin.saveSettings();
        })
      );
    };
    addListSetting(
      tr("excludedFoldersName"),
      tr("excludedFoldersDesc"),
      "excludedFolders",
      "Daily/2024\nArchive",
      []
    );
    addListSetting(
      tr("excludedFolderNamesName"),
      tr("excludedFolderNamesDesc"),
      "excludedFolderNames",
      "templates",
      ["templates"]
    );
    addListSetting(
      tr("excludedFileNamesName"),
      tr("excludedFileNamesDesc"),
      "excludedFileNames",
      "README",
      ["README"]
    );
    addListSetting(
      tr("excludedExtensionsName"),
      tr("excludedExtensionsDesc"),
      "excludedExtensions",
      "excalidraw\ncanvas",
      ["excalidraw", "canvas"]
    );
    containerEl.createEl("h3", { text: tr("sectionInitialize") });
    new import_obsidian.Setting(containerEl).setName(tr("initializeName")).setDesc(tr("initializeDesc")).addButton(
      (b) => b.setButtonText(this.plugin.settings.initialized ? tr("reinitializeButton") : tr("initializeButton")).setCta().onClick(async () => {
        const reinitialize = !!this.plugin.settings.initialized;
        await this.plugin.initializeVault({ forceTemplate: reinitialize, confirm: reinitialize });
      })
    );
    containerEl.createEl("h3", { text: tr("sectionActions") });
    new import_obsidian.Setting(containerEl).setName(tr("rebuildAllName")).setDesc(tr("rebuildAllDesc")).addButton(
      (b) => b.setButtonText(tr("rebuildAllButton")).setWarning().onClick(async () => {
        await this.plugin.rebuildAll();
      })
    );
    containerEl.createEl("h3", { text: tr("sectionBehavior") });
    new import_obsidian.Setting(containerEl).setName(tr("autoRebuildName")).setDesc(tr("autoRebuildDesc")).addToggle(
      (t) => t.setValue(this.plugin.settings.autoRebuild).onChange(async (v) => {
        this.plugin.settings.autoRebuild = v;
        await this.plugin.saveSettings();
        this.plugin.refreshEventBindings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(tr("ribbonIconName")).setDesc(tr("ribbonIconDesc")).addToggle(
      (t) => t.setValue(this.plugin.settings.ribbonIcon).onChange(async (v) => {
        this.plugin.settings.ribbonIcon = v;
        await this.plugin.saveSettings();
        this.plugin.refreshRibbonIcon();
      })
    );
    containerEl.createEl("h3", { text: tr("sectionMaintenance") });
    new import_obsidian.Setting(containerEl).setName(tr("createMissingMocName")).setDesc(tr("createMissingMocDesc")).addToggle(
      (t) => t.setValue(this.plugin.settings.createMissingMoc).onChange(async (v) => {
        this.plugin.settings.createMissingMoc = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(tr("pinMocName")).setDesc(tr("pinMocDesc")).addToggle(
      (t) => t.setValue(this.plugin.settings.pinMocToTop).onChange(async (v) => {
        this.plugin.settings.pinMocToTop = v;
        await this.plugin.saveSettings();
        if (v) {
          await this.plugin.pinAllMocs();
        } else {
          await this.plugin.unpinAllMocs();
        }
      })
    );
    new import_obsidian.Setting(containerEl).setName(tr("templateName")).setDesc(tr("templateDesc"));
    const templateInputWrapper = containerEl.createDiv({ cls: "auto-navigator-pages-template-editor" });
    templateInputWrapper.style.marginTop = "8px";
    templateInputWrapper.style.marginBottom = "16px";
    const templateText = new import_obsidian.TextAreaComponent(templateInputWrapper);
    templateText.inputEl.rows = 18;
    templateText.inputEl.style.width = "100%";
    templateText.inputEl.style.minHeight = "320px";
    templateText.inputEl.style.fontFamily = "var(--font-monospace)";
    templateText.inputEl.style.resize = "vertical";
    templateText.setPlaceholder(defaultTemplate).setValue(this.plugin.settings.navigatorPageTemplate).onChange(async (v) => {
        if (!v.includes("{{navigator}}")) {
          new import_obsidian.Notice(tr("templateMissingNotice"));
          return;
        }
        this.plugin.settings.navigatorPageTemplate = v;
        await this.plugin.saveSettings();
    });
    const templateActions = templateInputWrapper.createDiv({ cls: "auto-navigator-pages-template-actions" });
    templateActions.style.marginTop = "8px";
    templateActions.style.display = "flex";
    templateActions.style.justifyContent = "flex-end";
    new import_obsidian.Setting(templateActions).addButton(
      (b) => b.setButtonText(tr("resetDefault")).onClick(async () => {
        this.plugin.settings.navigatorPageTemplate = defaultTemplate;
        templateText.setValue(defaultTemplate);
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("h3", { text: tr("sectionNode") });
    new import_obsidian.Setting(containerEl).setName(tr("nodeEnabledName")).setDesc(tr("nodeEnabledDesc")).addToggle(
      (t) => t.setValue(this.plugin.settings.nodeFolder.enabled).onChange(async (v) => {
        this.plugin.settings.nodeFolder.enabled = v;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(tr("nodeNameName")).setDesc(tr("nodeNameDesc")).addText(
      (text) => text.setPlaceholder("_node").setValue(this.plugin.settings.nodeFolder.name).onChange(async (v) => {
        this.plugin.settings.nodeFolder.name = (v.trim() || "_node").replace(/[\/\\]/g, "");
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(tr("nodeExcludeName")).setDesc(tr("nodeExcludeDesc")).addToggle(
      (t) => t.setValue(this.plugin.settings.nodeFolder.excludeFromMoc).onChange(async (v) => {
        this.plugin.settings.nodeFolder.excludeFromMoc = v;
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("h3", { text: tr("sectionAdvanced") });
    new import_obsidian.Setting(containerEl).setName(tr("workspaceSnapshotName")).setDesc(tr("workspaceSnapshotDesc")).addToggle(
      (t) => t.setValue(this.plugin.settings.workspaceSnapshot).onChange(async (v) => {
        this.plugin.settings.workspaceSnapshot = v;
        await this.plugin.saveSettings();
        this.plugin.refreshWorkspaceBindings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(tr("saveWorkspaceName")).addButton(
      (b) => b.setButtonText(tr("saveWorkspaceButton")).onClick(() => {
        this.plugin.saveWorkspaceSnapshotNow();
      })
    );
    containerEl.createEl("h3", { text: tr("sectionDebug") });
    new import_obsidian.Setting(containerEl).setName(tr("debugLogName")).setDesc(tr("debugLogDesc")).addToggle(
      (t) => t.setValue(this.plugin.settings.debugLog).onChange(async (v) => {
        this.plugin.settings.debugLog = v;
        await this.plugin.saveSettings();
      })
    );
  }
};

// src/scanner.ts
var import_obsidian2 = require("obsidian");
function scanVault(vault, settings, metadataCache, managedPaths) {
  const rootFolder = vault.getRoot();
  return {
    root: scanFolder(rootFolder, vault, settings, true, metadataCache, managedPaths),
    rootNotes: collectRootNotes(vault, settings, metadataCache, managedPaths)
  };
}
function scanFolder(folder, vault, settings, isRoot = false, metadataCache, managedPaths) {
  const absPath = normalizePath(folder.path);
  const name = folder.name || (isRoot ? "" : absPath.split("/").pop() || "");
  const node = {
    name: isRoot ? "" : name,
    absPath: isRoot ? "" : absPath,
    isRoot,
    hasMoc: false,
    mocPath: void 0,
    directNotes: [],
    childFolders: []
  };
  const expectedMocName = isRoot ? null : `${name}.md`;
  const expectedMocPath = isRoot ? null : absPath ? absPath + "/" + expectedMocName : expectedMocName;
  if (!isRoot && expectedMocPath) {
    const af = vault.getAbstractFileByPath(expectedMocPath);
    if (af instanceof import_obsidian2.TFile) {
      node.hasMoc = true;
      node.mocPath = af.path;
    }
  }
  for (const child of folder.children) {
    if (child instanceof import_obsidian2.TFolder) {
      if (isFolderExcluded(child, settings))
        continue;
      node.childFolders.push(scanFolder(child, vault, settings, false, metadataCache, managedPaths));
    } else if (child instanceof import_obsidian2.TFile) {
      if (!isRoot && child.name === expectedMocName)
        continue;
      if (isManagedNavigatorFile(child, metadataCache, managedPaths))
        continue;
      if (isFileExcluded(child, settings, absPath))
        continue;
      node.directNotes.push(child);
    }
  }
  node.directNotes.sort((a, b) => a.name.localeCompare(b.name));
  node.childFolders.sort((a, b) => a.name.localeCompare(b.name));
  return node;
}
function collectRootNotes(vault, settings, metadataCache, managedPaths) {
  const root = vault.getRoot();
  const out = [];
  for (const child of root.children) {
    if (child instanceof import_obsidian2.TFile) {
      if (isManagedNavigatorFile(child, metadataCache, managedPaths))
        continue;
      if (isFileExcluded(child, settings, ""))
        continue;
      out.push(child);
    }
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}
function isManagedNavigatorFile(file, metadataCache, managedPaths) {
  if (managedPaths?.has?.(file.path))
    return true;
  const frontmatter = metadataCache?.getFileCache?.(file)?.frontmatter;
  return frontmatter?.[MANAGED_PAGE_FLAG] === true || frontmatter?.[MANAGED_PAGE_FLAG] === "true";
}
function collectManagedNavigatorFiles(vault, metadataCache, managedPaths) {
  const files = typeof vault.getFiles === "function" ? vault.getFiles() : collectMarkdownFilesFromFolder(vault.getRoot());
  return files.filter((file) => file instanceof import_obsidian2.TFile && file.extension === "md" && isManagedNavigatorFile(file, metadataCache, managedPaths));
}
async function collectManagedNavigatorPathSet(vault, metadataCache) {
  const files = typeof vault.getFiles === "function" ? vault.getFiles() : collectMarkdownFilesFromFolder(vault.getRoot());
  const paths = /* @__PURE__ */ new Set();
  for (const file of files) {
    if (!(file instanceof import_obsidian2.TFile) || file.extension !== "md")
      continue;
    if (isManagedNavigatorFile(file, metadataCache)) {
      paths.add(file.path);
      continue;
    }
    if (typeof vault.cachedRead !== "function")
      continue;
    try {
      const content = await vault.cachedRead(file);
      if (isManagedNavigatorPageContent(content))
        paths.add(file.path);
    } catch {
    }
  }
  return paths;
}
function collectMarkdownFilesFromFolder(folder) {
  const out = [];
  for (const child of folder.children ?? []) {
    if (child instanceof import_obsidian2.TFile) {
      out.push(child);
    } else if (child instanceof import_obsidian2.TFolder) {
      out.push(...collectMarkdownFilesFromFolder(child));
    }
  }
  return out;
}
function computeHomePath(settings) {
  const base = settings.homeFileName.replace(/\.md$/i, "") + ".md";
  if (!settings.homePath)
    return base;
  return normalizePath(settings.homePath) + "/" + base;
}
function collectAllMocPaths(result, homePath) {
  const set = /* @__PURE__ */ new Set();
  walk(result.root, (node) => {
    if (node.mocPath)
      set.add(node.mocPath);
  });
  set.add(homePath);
  return Array.from(set);
}
function walk(node, fn) {
  fn(node);
  for (const c of node.childFolders)
    walk(c, fn);
}
function mocPathForNode(node) {
  if (!node || node.isRoot)
    return null;
  return node.mocPath ?? (node.absPath ? `${node.absPath}/${node.name}.md` : `${node.name}.md`);
}
function isDefaultUntitledName(name) {
  return /^(未命名|Untitled)(?: \d+)?$/i.test((name ?? "").trim());
}
function shouldCreateMissingNavigatorForNode(node) {
  return !!node && !node.isRoot && !isDefaultUntitledName(node.name);
}
function collectAffectedMocs(absPath, scan, homePath, settings) {
  const result = /* @__PURE__ */ new Set();
  const norm = normalizePath(absPath);
  const folderChain = [];
  if (norm) {
    const segs = norm.split("/");
    let acc = "";
    for (const seg of segs) {
      acc = acc ? acc + "/" + seg : seg;
      folderChain.push(acc);
    }
  }
  for (const folderPath of folderChain) {
    const node = findFolderByPath(scan.root, folderPath);
    const mocPath = node?.mocPath ?? (settings.createMissingMoc && shouldCreateMissingNavigatorForNode(node) ? mocPathForNode(node) : null);
    if (mocPath)
      result.add(mocPath);
  }
  result.add(homePath);
  return Array.from(result);
}
function findFolderByPath(root, absPath) {
  if (root.isRoot && !absPath)
    return root;
  if (normalizePath(root.absPath) === normalizePath(absPath))
    return root;
  for (const c of root.childFolders) {
    const hit = findFolderByPath(c, absPath);
    if (hit)
      return hit;
  }
  return null;
}
function getMocPathForFolder(scan, folderAbsPath) {
  const node = findFolderByPath(scan.root, folderAbsPath);
  return node?.mocPath ?? null;
}

// src/generator.ts
var DIVIDER = "---";
function bulletLink(name) {
  return `- [[${name}]]`;
}
function bulletPathLink(path, alias) {
  const target = path.replace(/\.md$/i, "");
  return alias ? `- [[${target}|${alias}]]` : `- [[${target}]]`;
}
function relativeNavigatorLink(path, basePath) {
  const normalized = path.replace(/\.md$/i, "");
  if (basePath && normalized.startsWith(basePath + "/"))
    return normalized.substring(basePath.length + 1);
  return normalized;
}
function isManagedNavigatorPageContent(content) {
  if (!content)
    return false;
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!match)
    return false;
  return new RegExp(`^${MANAGED_PAGE_FLAG}:\\s*true\\s*$`, "mi").test(match[1]);
}
function ensureManagedFrontmatter(content) {
  const body = (content ?? "").replace(/^\s+/, "");
  const frontmatter = `---\n${MANAGED_PAGE_FLAG}: true\n${MANAGED_PAGE_VERSION}: 1\n---`;
  if (!body.startsWith("---\n"))
    return `${frontmatter}\n\n${body}`.trimEnd() + "\n";
  const end = body.indexOf("\n---", 4);
  if (end < 0)
    return `${frontmatter}\n\n${body}`.trimEnd() + "\n";
  const fmEnd = body.indexOf("\n", end + 4);
  const header = body.substring(4, end);
  const rest = fmEnd >= 0 ? body.substring(fmEnd + 1) : "";
  const lines = header.split(/\r?\n/).filter((line) => !new RegExp(`^${MANAGED_PAGE_FLAG}:`, "i").test(line) && !new RegExp(`^${MANAGED_PAGE_VERSION}:`, "i").test(line));
  lines.push(`${MANAGED_PAGE_FLAG}: true`);
  lines.push(`${MANAGED_PAGE_VERSION}: 1`);
  return `---\n${lines.join("\n")}\n---\n${rest}`.trimEnd() + "\n";
}
function buildNavigatorSection(node, parentMocName, language = "zh") {
  const out = [];
  out.push(DIVIDER);
  out.push("");
  out.push(navigatorText(language, "navigatorHeading"));
  out.push("");
  out.push(navigatorText(language, "navigatorNotice"));
  if (parentMocName) {
    out.push("");
    out.push(navigatorText(language, "parentHeading"));
    out.push("");
    if (typeof parentMocName === "object" && parentMocName.path) {
      out.push(bulletPathLink(parentMocName.path, parentMocName.alias));
    } else if (typeof parentMocName === "string" && node?.absPath?.includes("/")) {
      const parts = node.absPath.split("/");
      parts.pop();
      const alias = parts[parts.length - 1];
      out.push(bulletPathLink(`${parts.join("/")}/${alias}.md`, alias));
    } else {
      out.push(bulletLink(parentMocName));
    }
  }
  const folderLinks = node.childFolders.map((c) => bulletPathLink(c.mocPath ?? (node.absPath ? `${node.absPath}/${c.name}/${c.name}.md` : `${c.name}/${c.name}.md`), c.name));
  if (folderLinks.length > 0) {
    out.push("");
    out.push(navigatorText(language, "childFoldersHeading"));
    out.push("");
    out.push(...folderLinks);
  }
  const noteLinks = node.directNotes.map((f) => bulletLink(f.basename));
  if (noteLinks.length > 0) {
    out.push("");
    out.push(navigatorText(language, "notesHeading"));
    out.push("");
    out.push(...noteLinks);
  }
  out.push("");
  out.push(DIVIDER);
  return out.join("\n");
}
function findManagedNavigatorHeading(source) {
  let best = null;
  for (const heading of NAVIGATOR_HEADINGS) {
    const index = source.indexOf(heading);
    if (index >= 0 && (!best || index < best.index)) {
      best = { index, heading };
    }
  }
  return best;
}
function replaceManagedNavigatorSection(content, navigatorSection) {
  const source = ensureManagedFrontmatter(content ?? "");
  const headingMatch = findManagedNavigatorHeading(source);
  if (!headingMatch)
    return `${source.trimEnd()}\n\n${navigatorSection.trimEnd()}\n`;
  const headingIndex = headingMatch.index;
  const beforeDivider = source.lastIndexOf(`\n${DIVIDER}\n`, headingIndex);
  const start = beforeDivider >= 0 ? beforeDivider + 1 : headingIndex;
  const afterHeading = headingIndex + headingMatch.heading.length;
  const endDivider = source.indexOf(`\n${DIVIDER}`, afterHeading);
  const end = endDivider >= 0 ? source.indexOf("\n", endDivider + 1) : -1;
  const tail = end >= 0 ? source.substring(end + 1).replace(/^\n+/, "") : "";
  return `${source.substring(0, start).trimEnd()}\n\n${navigatorSection.trimEnd()}\n${tail ? "\n" + tail.trimStart() : ""}`.trimEnd() + "\n";
}
function renderNavigatorPageContent(node, parentMocName, settings, existingContent, options = {}) {
  const language = normalizeNavigatorLanguage(settings.language);
  const defaultTemplate = getDefaultNavigatorPageTemplate(language);
  const template = (settings.navigatorPageTemplate || defaultTemplate).includes("{{navigator}}") ? settings.navigatorPageTemplate || defaultTemplate : defaultTemplate;
  const navigator = buildNavigatorSection(node, parentMocName, language);
  const body = template.replace("{{navigator}}", navigator).trimEnd() + "\n";
  if (!options.forceTemplate && existingContent && isManagedNavigatorPageContent(existingContent))
    return replaceManagedNavigatorSection(existingContent, navigator);
  return ensureManagedFrontmatter(body);
}
function generateMocContent(node, parentMocName, options) {
  if (options.settings)
    return renderNavigatorPageContent(node, parentNavigatorForNode(node, options.settings) ?? parentMocName, options.settings, options.existingContent, options);
  const warning = options.warningText?.trim() ?? "";
  const section1 = parentMocName ? [`\u8FD4\u56DE\u4E0A\u7EA7\uFF1A[[${parentMocName}]]`] : [""];
  const section2 = node.childFolders.map((c) => bulletLink(c.name));
  const section3 = node.directNotes.map((f) => bulletLink(f.basename));
  const sections = [section1, section2, section3];
  const out = [];
  out.push("");
  const nonEmpty = [];
  for (const sec of sections) {
    if (sec.length > 0)
      nonEmpty.push(sec);
  }
  for (let i = 0; i < nonEmpty.length; i++) {
    if (i > 0) {
      out.push("");
      out.push(DIVIDER);
    }
    out.push(...nonEmpty[i]);
  }
  if (warning) {
    out.push("");
    out.push(DIVIDER);
    out.push(`**${warning}**`);
  }
  return out.join("\n") + "\n";
}
function generateHomeContent(scan, homeFileName, options) {
  if (options.settings) {
    const node = {
      name: homeFileName,
      absPath: "",
      childFolders: scan.root.childFolders,
      directNotes: scan.rootNotes.filter((f) => f.basename !== homeFileName)
    };
    return renderNavigatorPageContent(node, void 0, options.settings, options.existingContent, options);
  }
  const warning = options.warningText?.trim() ?? "";
  const section1 = scan.root.childFolders.filter((c) => c.mocPath).map((c) => bulletLink(c.name));
  const section2 = scan.rootNotes.filter((f) => f.basename !== homeFileName).map((f) => bulletLink(f.basename));
  const sections = [section1, section2];
  const out = [];
  out.push("");
  const nonEmpty = [];
  for (const sec of sections) {
    if (sec.length > 0)
      nonEmpty.push(sec);
  }
  for (let i = 0; i < nonEmpty.length; i++) {
    if (i > 0) {
      out.push("");
      out.push(DIVIDER);
    }
    out.push(...nonEmpty[i]);
  }
  if (warning) {
    out.push("");
    out.push(DIVIDER);
    out.push(`**${warning}**`);
  }
  return out.join("\n") + "\n";
}
function parentMocNameFor(node, homeFileName) {
  if (node.isRoot)
    return void 0;
  if (node.absPath.includes("/")) {
    const parts = node.absPath.split("/");
    parts.pop();
    return parts[parts.length - 1];
  }
  return homeFileName;
}
function parentNavigatorForNode(node, settings) {
  if (!node || node.isRoot)
    return void 0;
  if (node.absPath.includes("/")) {
    const parts = node.absPath.split("/");
    parts.pop();
    const alias = parts[parts.length - 1];
    return {
      path: `${parts.join("/")}/${alias}.md`,
      alias
    };
  }
  return {
    path: computeHomePath(settings),
    alias: settings.homeFileName
  };
}

// src/writer.ts
var import_obsidian3 = require("obsidian");
var MOCWriter = class {
  constructor(app, debug) {
    this.app = app;
    this.debug = debug;
    /** 本次运行写入过的文件路径集合，避免重复写 */
    this.written = /* @__PURE__ */ new Set();
    /** 当前正在写入的路径，用于回调去重 */
    this.writing = /* @__PURE__ */ new Set();
    /** 已生成的备份路径，避免时间戳碰撞 */
    this.backups = /* @__PURE__ */ new Set();
  }
  reset() {
    this.written.clear();
    this.writing.clear();
    this.backups.clear();
  }
  /**
   * 如果内容相同则跳过；否则按 options 写入或「备份+重建」。
   * 返回是否真的写入了。
   */
  async writeIfChanged(absPath, content, options = { backupExisting: false }) {
    if (this.writing.has(absPath))
      return false;
    if (this.written.has(absPath))
      return false;
    const existing = this.app.vault.getAbstractFileByPath(absPath);
    if (existing instanceof import_obsidian3.TFile) {
      const oldContent = await this.app.vault.cachedRead(existing);
      if (oldContent === content) {
        this.debug(`[moc-nav] skip (unchanged): ${absPath}`);
        this.written.add(absPath);
        return false;
      }
      this.writing.add(absPath);
      try {
        if (options.backupExisting) {
          const backupPath = await this.backupFile(existing);
          if (backupPath) {
            await this.app.vault.create(absPath, content);
            this.debug(`[moc-nav] backup+create: ${existing.path} \u2192 ${backupPath}; new ${absPath}`);
          } else {
            await this.app.vault.modify(existing, content);
            this.debug(`[moc-nav] modify (backup failed): ${absPath}`);
          }
        } else {
          await this.app.vault.modify(existing, content);
          this.debug(`[moc-nav] modify: ${absPath}`);
        }
      } finally {
        this.writing.delete(absPath);
      }
    } else if (!existing) {
      this.writing.add(absPath);
      try {
        await this.app.vault.create(absPath, content);
        this.debug(`[moc-nav] create: ${absPath}`);
      } finally {
        this.writing.delete(absPath);
      }
    } else {
      this.debug(`[moc-nav] skip (not a file): ${absPath}`);
      this.written.add(absPath);
      return false;
    }
    this.written.add(absPath);
    return true;
  }
  /**
   * 把文件备份为 `<basename>_backup_YYYYMMDDHHmmss[_N].md`，返回新路径（失败返回 null）。
   */
  async backupFile(file) {
    const dir = file.path.includes("/") ? file.path.substring(0, file.path.lastIndexOf("/")) : "";
    const dot = file.name.lastIndexOf(".");
    const base = dot > 0 ? file.name.substring(0, dot) : file.name;
    const ext = dot > 0 ? file.name.substring(dot) : ".md";
    const stamp = this.timestamp();
    let candidate = `${dir ? dir + "/" : ""}${base}_backup_${stamp}${ext}`;
    let n = 1;
    while (this.backups.has(candidate) || this.app.vault.getAbstractFileByPath(candidate)) {
      candidate = `${dir ? dir + "/" : ""}${base}_backup_${stamp}_${n}${ext}`;
      n++;
      if (n > 99)
        break;
    }
    this.backups.add(candidate);
    try {
      await this.app.fileManager.renameFile(file, candidate);
      return candidate;
    } catch (e) {
      this.debug(`[moc-nav] backup rename failed: ${e.message}`);
      return null;
    }
  }
  timestamp() {
    const d = /* @__PURE__ */ new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return d.getFullYear().toString() + pad(d.getMonth() + 1) + pad(d.getDate()) + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
  }
  /** 是否正在写入某个文件（给事件回调用于自我跳过） */
  isWriting(absPath) {
    return this.writing.has(absPath);
  }
  /** 已处理（写过或跳过）的文件数，给上层用于统计 */
  getWrittenCount() {
    return this.written.size;
  }
  /** 安全创建中间目录（如果缺） */
  async ensureFolder(absPath) {
    if (!absPath)
      return;
    const parts = absPath.split("/");
    let acc = "";
    for (const p of parts) {
      acc = acc ? acc + "/" + p : p;
      const f = this.app.vault.getAbstractFileByPath(acc);
      if (!f) {
        try {
          await this.app.vault.createFolder(acc);
        } catch (e) {
        }
      }
    }
  }
};

// src/workspace.ts
var SNAPSHOT_KEY = "workspace-snapshot";
var SNAPSHOT_VERSION = 1;
var WorkspaceManager = class {
  constructor(app, debug) {
    this.app = app;
    this.debug = debug;
    this.saveDebounceTimer = null;
  }
  /**
   * 立即保存当前工作区布局到 plugin data
   */
  async saveSnapshotNow(plugin) {
    try {
      const layout = this.app.workspace.getLayout();
      const snapshot = {
        version: SNAPSHOT_VERSION,
        savedAt: Date.now(),
        layout
      };
      const existing = await plugin.loadData();
      const next = { ...existing || {}, [SNAPSHOT_KEY]: snapshot };
      await plugin.saveData(next);
      this.debug(`[moc-nav] workspace snapshot saved`);
      return true;
    } catch (e) {
      this.debug(`[moc-nav] save snapshot failed: ${e?.message ?? e}`);
      return false;
    }
  }
  /**
   * debounce 保存（挂在 layout-change 上）
   */
  scheduleSave(plugin, delay = 1e3) {
    if (this.saveDebounceTimer !== null) {
      window.clearTimeout(this.saveDebounceTimer);
    }
    this.saveDebounceTimer = window.setTimeout(() => {
      this.saveDebounceTimer = null;
      this.saveSnapshotNow(plugin);
    }, delay);
  }
  cancelPending() {
    if (this.saveDebounceTimer !== null) {
      window.clearTimeout(this.saveDebounceTimer);
      this.saveDebounceTimer = null;
    }
  }
  async loadSnapshot(plugin) {
    try {
      const data = await plugin.loadData();
      if (!data || !data[SNAPSHOT_KEY])
        return null;
      const s = data[SNAPSHOT_KEY];
      if (s.version !== SNAPSHOT_VERSION) {
        this.debug(`[moc-nav] snapshot version mismatch, skip restore`);
        return null;
      }
      return s;
    } catch (e) {
      this.debug(`[moc-nav] load snapshot failed: ${e.message}`);
      return null;
    }
  }
  restoreSnapshot(snapshot) {
    if (!snapshot || !snapshot.layout)
      return;
    try {
      const ws = this.app.workspace;
      if (typeof ws.setLayout === "function") {
        ws.setLayout(snapshot.layout);
        this.debug(`[moc-nav] workspace snapshot restored`);
      } else {
        this.debug(`[moc-nav] setLayout unavailable in this Obsidian version`);
      }
    } catch (e) {
      this.debug(`[moc-nav] setLayout failed: ${e.message}`);
    }
  }
};

// src/filepin.ts
var FilePin = class {
  constructor(app, debug) {
    this.app = app;
    this.debug = debug;
  }
  /** 获取所有 file explorer view（含 multiple workspaces 兜底） */
  getViews() {
    const out = [];
    try {
      const leaves = this.app.workspace.getLeavesOfType("file-explorer");
      for (const leaf of leaves) {
        const v = leaf.view;
        if (v)
          out.push(v);
      }
    } catch (e) {
      this.debug(`[moc-nav] getLeavesOfType failed: ${e.message}`);
    }
    const appAny = this.app;
    if (appAny.fileExplorer && !out.includes(appAny.fileExplorer)) {
      out.push(appAny.fileExplorer);
    }
    return out;
  }
  getItem(ex, file) {
    const items = ex.fileItems;
    if (!items)
      return null;
    const key = file.path;
    if (typeof items.get === "function") {
      return items.get(key) ?? null;
    }
    return items[key] ?? null;
  }
  tryPin(ex, file, pinned) {
    let ok = false;
    if (typeof ex.pinFile === "function") {
      try {
        const r = ex.pinFile.call(ex, file, pinned);
        ok = true;
        this.debug(`[moc-nav] pin via pinFile(file,${pinned}): ${file.path}`);
      } catch (e1) {
        this.debug(`[moc-nav] pinFile(file,${pinned}) failed: ${e1.message}`);
        try {
          ex.pinFile.call(ex, file);
          ok = true;
          this.debug(`[moc-nav] pin via pinFile(file): ${file.path}`);
        } catch (e2) {
          this.debug(`[moc-nav] pinFile(file) failed: ${e2.message}`);
        }
      }
    }
    const item = this.getItem(ex, file);
    if (item) {
      try {
        if (item.info && typeof item.info === "object") {
          item.info.pinned = pinned;
          this.debug(`[moc-nav] pin via fileItems[path].info.pinned=${pinned}: ${file.path}`);
          ok = true;
        }
      } catch (e) {
        this.debug(`[moc-nav] fileItems[path].info.pinned failed: ${e.message}`);
      }
      if (!ok) {
        try {
          item.pinned = pinned;
          this.debug(`[moc-nav] pin via fileItems[path].pinned=${pinned}: ${file.path}`);
          ok = true;
        } catch (e) {
          this.debug(`[moc-nav] fileItems[path].pinned failed: ${e.message}`);
        }
      }
    }
    if (ok && typeof ex.requestSort === "function") {
      try {
        ex.requestSort();
      } catch (e) {
        this.debug(`[moc-nav] requestSort failed: ${e.message}`);
      }
    }
    return ok;
  }
  async pinFile(file) {
    const views = this.getViews();
    if (views.length === 0) {
      this.debug(`[moc-nav] pin: no file explorer view found`);
      return false;
    }
    let anyOk = false;
    for (const v of views) {
      if (this.tryPin(v, file, true))
        anyOk = true;
    }
    return anyOk;
  }
  async unpinFile(file) {
    const views = this.getViews();
    if (views.length === 0)
      return false;
    let anyOk = false;
    for (const v of views) {
      if (this.tryPin(v, file, false))
        anyOk = true;
    }
    return anyOk;
  }
};

// node_modules/monkey-around/dist/index.mjs
function around(obj, factories) {
  const removers = Object.keys(factories).map((key) => around1(obj, key, factories[key]));
  return removers.length === 1 ? removers[0] : function() {
    removers.forEach((r) => r());
  };
}
function around1(obj, method, createWrapper) {
  const inherited = obj[method], hadOwn = obj.hasOwnProperty(method), original = hadOwn ? inherited : function() {
    return Object.getPrototypeOf(obj)[method].apply(this, arguments);
  };
  let current = createWrapper(original);
  if (inherited)
    Object.setPrototypeOf(current, inherited);
  Object.setPrototypeOf(wrapper, current);
  obj[method] = wrapper;
  return remove;
  function wrapper(...args) {
    if (current === original && obj[method] === wrapper)
      remove();
    return current.apply(this, args);
  }
  function remove() {
    if (obj[method] === wrapper) {
      if (hadOwn)
        obj[method] = original;
      else
        delete obj[method];
    }
    if (current === original)
      return;
    current = original;
    Object.setPrototypeOf(wrapper, inherited || Function);
  }
}

// src/sort-patcher.ts
function isFolderSortItem(item) {
  return Array.isArray(item?.file?.children);
}
function isMarkdownFileSortItem(item) {
  return !isFolderSortItem(item) && (item?.file?.extension ?? "").toLowerCase() === "md";
}
function isUnderscorePrefixedSortItem(item) {
  return (item?.file?.name ?? "").startsWith("_");
}
function appendUnderscoreLastByKind(target, items) {
  const normalFolders = [];
  const underscoreFolders = [];
  const normalFiles = [];
  const underscoreFiles = [];
  for (const item of items) {
    const isUnderscore = isUnderscorePrefixedSortItem(item);
    if (isFolderSortItem(item)) {
      (isUnderscore ? underscoreFolders : normalFolders).push(item);
    } else {
      (isUnderscore ? underscoreFiles : normalFiles).push(item);
    }
  }
  target.push(...normalFolders, ...underscoreFolders, ...normalFiles, ...underscoreFiles);
  return target;
}
function reorderWithMocs(items, folder) {
  if (!items || items.length === 0)
    return items;
  const folderName = folder?.name;
  const moc = [];
  const rest = [];
  for (const item of items) {
    const base = item?.file?.basename ?? (item?.file?.name ?? "").replace(/\.md$/i, "");
    if (folderName && isMarkdownFileSortItem(item) && base === folderName) {
      moc.push(item);
    } else {
      rest.push(item);
    }
  }
  moc.sort((a, b) => a.file.path.localeCompare(b.file.path));
  return appendUnderscoreLastByKind(moc, rest);
}
async function installSortPatch(plugin) {
  const leaf = plugin.app.workspace.getLeavesOfType("file-explorer")[0];
  if (!leaf)
    return null;
  const leafAny = leaf;
  if (leafAny.isDeferred && typeof leafAny.loadIfDeferred === "function") {
    try {
      await leafAny.loadIfDeferred();
    } catch {
    }
  }
  const view = leaf.view;
  if (!view || typeof view.getSortedFolderItems !== "function")
    return null;
  const proto = Object.getPrototypeOf(view);
  const uninstaller = around(proto, {
    getSortedFolderItems(original) {
      return function(folder) {
        const result = original.call(this, folder);
        return reorderWithMocs(result, folder);
      };
    }
  });
  return uninstaller;
}

// src/node-folder.ts
var import_obsidian4 = require("obsidian");
function configFromSettings(settings) {
  return {
    enabled: settings.nodeFolder.enabled,
    name: settings.nodeFolder.name || "_node",
    excludeFromMoc: settings.nodeFolder.excludeFromMoc
  };
}
async function ensureNodeFolder(app, parent, config, writer) {
  const nodeName = config.name;
  const path = parent.path ? `${parent.path}/${nodeName}` : nodeName;
  const existing = app.vault.getAbstractFileByPath(path);
  if (existing instanceof import_obsidian4.TFolder)
    return existing;
  await writer.ensureFolder(path);
  const created = app.vault.getAbstractFileByPath(path);
  if (created instanceof import_obsidian4.TFolder)
    return created;
  throw new Error(`[moc-nav] Failed to create ${nodeName} folder at ${path}`);
}
function isTaken(app, path) {
  return !!app.vault.getAbstractFileByPath(path);
}
function uniqueName(app, folder, base, ext) {
  const join = (n) => folder.path ? `${folder.path}/${n}` : n;
  let candidate = `${base}${ext}`;
  if (!isTaken(app, join(candidate)))
    return candidate;
  for (let n = 1; n <= 999; n++) {
    candidate = `${base} ${n}${ext}`;
    if (!isTaken(app, join(candidate)))
      return candidate;
  }
  return `${base} ${Date.now()}${ext}`;
}
function hasWikiLinkToFile(content, file) {
  if (!content)
    return false;
  const target = file.basename;
  const re = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    const raw = match[1].trim();
    const normalized = raw.replace(/\.md$/i, "");
    const last = normalized.includes("/") ? normalized.substring(normalized.lastIndexOf("/") + 1) : normalized;
    if (normalized === target || last === target)
      return true;
  }
  return false;
}
function shouldAutoRouteNewFileToNodeFolder(context) {
  return !!context.sourceFile && !context.sourceIsManagedNavigator && !!context.sourceLinksToNewFile;
}
async function autoRouteNewFileToNodeFolder(app, file, config, settings, writer, sourceFile = null) {
  if (!settings.initialized)
    return null;
  if (!config.enabled)
    return null;
  if (file.extension !== "md")
    return null;
  const parent = file.parent;
  if (!parent || parent.isRoot())
    return null;
  let p = parent;
  while (p && !p.isRoot()) {
    if (p.name === config.name)
      return null;
    p = p.parent;
  }
  if (isPathExcluded(parent.path, settings.excludedFolders))
    return null;
  if (isFolderNameExcluded(parent.name, settings.excludedFolderNames))
    return null;
  if (file.extension === "md" && file.basename === parent.name) {
    return null;
  }
  const homePath = computeHomePath(settings);
  if (file.path === homePath) {
    return null;
  }
  let sourceIsManagedNavigator = false;
  let sourceLinksToNewFile = false;
  if (sourceFile && sourceFile.path !== file.path) {
    try {
      const sourceContent = await app.vault.cachedRead(sourceFile);
      sourceIsManagedNavigator = isManagedNavigatorPageContent(sourceContent);
      sourceLinksToNewFile = hasWikiLinkToFile(sourceContent, file);
    } catch {
      sourceIsManagedNavigator = false;
      sourceLinksToNewFile = false;
    }
  }
  if (!shouldAutoRouteNewFileToNodeFolder({ sourceFile, sourceIsManagedNavigator, sourceLinksToNewFile })) {
    return null;
  }
  let content = "";
  try {
    content = await app.vault.cachedRead(file);
  } catch {
    return null;
  }
  if (content.length > 0) {
    return null;
  }
  const ctime = file.stat?.ctime;
  if (typeof ctime === "number") {
    const ageMs = Date.now() - ctime;
    if (ageMs > 5e3) {
      return null;
    }
  } else {
    return null;
  }
  const nodeFolder = await ensureNodeFolder(app, parent, config, writer);
  const ext = file.extension ? `.${file.extension}` : ".md";
  const newName = uniqueName(app, nodeFolder, file.basename, ext);
  const newPath = nodeFolder.path ? `${nodeFolder.path}/${newName}` : newName;
  if (file.path === newPath)
    return null;
  await app.fileManager.renameFile(file, newPath);
  const moved = app.vault.getAbstractFileByPath(newPath);
  return moved instanceof import_obsidian4.TFile ? moved : null;
}

// main.ts
var AutoMocNavigatorPlugin = class extends import_obsidian5.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    // 事件去抖
    this.eventDebounceTimer = null;
    this.pendingPaths = /* @__PURE__ */ new Set();
    // ribbon
    this.ribbonEl = null;
    // 事件回调引用（用于卸载）
    this.createHandler = null;
    this.deleteHandler = null;
    this.renameHandler = null;
    this.vaultEventRefs = [];
    this.layoutChangeRef = null;
    // ===== Sort Patch =====
    this.sortPatchUninstaller = null;
    this.sortPatchRetryRef = null;
    // ===== Scan Cache =====
    this.lastScan = null;
  }
  async onload() {
    await this.loadSettings();
    this.writer = new MOCWriter(this.app, (msg) => this.debug(msg));
    this.workspaceMgr = new WorkspaceManager(this.app, (msg) => this.debug(msg));
    this.pinMgr = new FilePin(this.app, (msg) => this.debug(msg));
    this.addSettingTab(new MOCNavigatorSettingTab(this.app, this));
    this.refreshRibbonIcon();
    this.addCommand({
      id: "auto-navigator-pages:initialize",
      name: this.t("commandInitialize"),
      callback: () => this.initializeVault()
    });
    this.addCommand({
      id: "moc-nav:open-home",
      name: this.t("commandOpenHome"),
      callback: () => this.openHome()
    });
    this.addCommand({
      id: "moc-nav:rebuild-current",
      name: this.t("commandRebuildCurrent"),
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(import_obsidian5.MarkdownView);
        const file = view?.file;
        if (!file)
          return false;
        const folder = file.parent?.path ?? "";
        const mocPath = getMocPathForFolder(this.quickScanForLookup(), folder);
        if (!mocPath)
          return false;
        if (!checking)
          this.rebuildOne(mocPath);
        return true;
      }
    });
    this.addCommand({
      id: "moc-nav:rebuild-all",
      name: this.t("commandRebuildAll"),
      callback: () => this.rebuildAll()
    });
    this.addCommand({
      id: "moc-nav:clean-orphans",
      name: this.t("commandCleanOrphans"),
      callback: () => this.cleanOrphans()
    });
    this.addCommand({
      id: "moc-nav:save-workspace",
      name: this.t("commandSaveWorkspace"),
      callback: () => this.saveWorkspaceSnapshotNow()
    });
    this.refreshEventBindings();
    this.registerEvent(
      this.app.vault.on("create", (f) => {
        if (!(f instanceof import_obsidian5.TFile))
          return;
        if (this.writer.isWriting(f.path))
          return;
        const config = configFromSettings(this.settings);
        if (!config.enabled)
          return;
        const sourceFile = this.app.workspace.getActiveViewOfType(import_obsidian5.MarkdownView)?.file ?? null;
        window.setTimeout(() => {
          if (!(f instanceof import_obsidian5.TFile))
            return;
          if (!this.app.vault.getAbstractFileByPath(f.path))
            return;
          autoRouteNewFileToNodeFolder(
            this.app,
            f,
            config,
            this.settings,
            this.writer,
            sourceFile
          ).then((moved) => {
            if (moved) {
              this.debug(
                `[moc-nav] auto-routed: ${f.path} \u2192 ${moved.path}`
              );
            }
          }).catch(
            (e) => this.debug(
              `[moc-nav] auto-route failed: ${e.message}`
            )
          );
        }, 0);
      })
    );
    this.refreshWorkspaceBindings();
    this.installSortPatchWithRetry();
    this.app.workspace.onLayoutReady(() => this.restoreWorkspaceOnReady());
    this.app.workspace.onLayoutReady(() => {
      window.setTimeout(() => {
        if (this.settings.initialized && this.settings.autoRebuild) {
          this.rebuildAll().catch((e) => this.debug(`[moc-nav] initial rebuild failed: ${e}`));
        }
      }, 1500);
    });
  }
  onunload() {
    this.detachEvents();
    this.workspaceMgr.cancelPending();
    if (this.ribbonEl) {
      this.ribbonEl.remove();
      this.ribbonEl = null;
    }
    if (this.sortPatchUninstaller) {
      try {
        this.sortPatchUninstaller();
      } catch (e) {
        this.debug(`[moc-nav] sort patch uninstall failed: ${e.message}`);
      }
      this.sortPatchUninstaller = null;
    }
    if (this.sortPatchRetryRef) {
      this.app.workspace.offref(this.sortPatchRetryRef);
      this.sortPatchRetryRef = null;
    }
  }
  /**
   * 安装 sort patch；如果 file explorer 还没加载（deferred view），
   * 则在 layout-change 时重试。
   */
  installSortPatchWithRetry() {
    const tryInstall = () => {
      installSortPatch(this).then((uninstaller) => {
        if (uninstaller) {
          this.sortPatchUninstaller = uninstaller;
          this.debug(`[moc-nav] sort patch installed`);
          this.stopSortPatchRetry();
        } else {
          this.scheduleSortPatchRetry();
        }
      }).catch((e) => {
        this.debug(`[moc-nav] installSortPatch failed: ${e.message}`);
        this.scheduleSortPatchRetry();
      });
    };
    this.app.workspace.onLayoutReady(() => tryInstall());
  }
  scheduleSortPatchRetry() {
    if (this.sortPatchRetryRef)
      return;
    this.sortPatchRetryRef = this.app.workspace.on(
      "layout-change",
      () => {
        if (!this.sortPatchUninstaller) {
          installSortPatch(this).then((u) => {
            if (u) {
              this.sortPatchUninstaller = u;
              this.debug(`[moc-nav] sort patch installed (retry)`);
              this.stopSortPatchRetry();
            }
          }).catch(() => {
          });
        }
      },
      void 0
    );
    this.registerEvent(this.sortPatchRetryRef);
  }
  stopSortPatchRetry() {
    if (this.sortPatchRetryRef) {
      this.app.workspace.offref(this.sortPatchRetryRef);
      this.sortPatchRetryRef = null;
    }
  }
  async loadSettings() {
    const data = await this.loadData();
    const loadedSettings = data?.settings ?? {};
    const hasSavedTemplate = typeof loadedSettings.navigatorPageTemplate === "string";
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loadedSettings, {
      nodeFolder: Object.assign({}, DEFAULT_SETTINGS.nodeFolder, loadedSettings.nodeFolder ?? {})
    });
    this.settings.language = this.getLanguage();
    if (!this.settings.navigatorPageTemplate || !this.settings.navigatorPageTemplate.includes("{{navigator}}")) {
      this.settings.navigatorPageTemplate = getDefaultNavigatorPageTemplate(this.settings.language);
    } else if (!hasSavedTemplate) {
      this.settings.navigatorPageTemplate = getDefaultNavigatorPageTemplate(this.settings.language);
    }
  }
  async saveSettings() {
    await this.saveData({ settings: this.settings });
  }
  getLanguage() {
    return detectNavigatorLanguage(this.app);
  }
  refreshLanguage() {
    this.settings.language = this.getLanguage();
  }
  t(key, vars = {}) {
    return navigatorText(this.getLanguage(), key, vars);
  }
  debug(msg) {
    if (this.settings.debugLog)
      console.log(msg);
  }
  // ===== Ribbon =====
  refreshRibbonIcon() {
    if (this.ribbonEl) {
      this.ribbonEl.remove();
      this.ribbonEl = null;
    }
    if (!this.settings.ribbonIcon)
      return;
    this.ribbonEl = this.addRibbonIcon("home", this.t("ribbonOpenHome"), () => this.openHome());
  }
  // ===== Event Bindings =====
  refreshEventBindings() {
    this.detachEvents();
    if (!this.settings.initialized || !this.settings.autoRebuild)
      return;
    this.createHandler = (f) => {
      if (this.writer.isWriting(f.path))
        return;
      this.queueRebuildForPath(f.path);
    };
    this.deleteHandler = (f) => {
      const parent = f.path.includes("/") ? f.path.substring(0, f.path.lastIndexOf("/")) : "";
      this.queueRebuildForPath(parent || "");
    };
    this.renameHandler = (f, oldPath) => {
      if (this.writer.isWriting(oldPath) || this.writer.isWriting(f.path))
        return;
      const oldParent = oldPath.includes("/") ? oldPath.substring(0, oldPath.lastIndexOf("/")) : "";
      this.queueRebuildForPath(oldParent || "");
      this.queueRebuildForPath(f.path);
    };
    const createRef = this.app.vault.on("create", this.createHandler);
    const deleteRef = this.app.vault.on("delete", this.deleteHandler);
    const renameRef = this.app.vault.on("rename", this.renameHandler);
    this.vaultEventRefs.push(createRef, deleteRef, renameRef);
    this.registerEvent(createRef);
    this.registerEvent(deleteRef);
    this.registerEvent(renameRef);
  }
  detachEvents() {
    for (const ref of this.vaultEventRefs) {
      try {
        this.app.vault.offref(ref);
      } catch (e) {
        this.debug(`[moc-nav] vault event detach failed: ${e.message}`);
      }
    }
    this.vaultEventRefs = [];
    this.createHandler = null;
    this.deleteHandler = null;
    this.renameHandler = null;
  }
  queueRebuildForPath(absPath) {
    this.pendingPaths.add(absPath);
    if (this.eventDebounceTimer !== null) {
      window.clearTimeout(this.eventDebounceTimer);
    }
    this.eventDebounceTimer = window.setTimeout(() => {
      this.eventDebounceTimer = null;
      const paths = Array.from(this.pendingPaths);
      this.pendingPaths.clear();
      this.rebuildByPaths(paths).catch((e) => this.debug(`[moc-nav] event rebuild failed: ${e}`));
    }, 500);
  }
  // ===== Workspace Bindings =====
  refreshWorkspaceBindings() {
    if (this.layoutChangeRef) {
      this.app.workspace.off("layout-change", this.layoutChangeRef);
      this.layoutChangeRef = null;
    }
    if (!this.settings.workspaceSnapshot)
      return;
    this.layoutChangeRef = () => this.workspaceMgr.scheduleSave(this);
    this.app.workspace.on("layout-change", this.layoutChangeRef);
  }
  restoreWorkspaceOnReady() {
    if (!this.settings.workspaceSnapshot)
      return;
    this.workspaceMgr.loadSnapshot(this).then((snap) => {
      this.workspaceMgr.restoreSnapshot(snap);
    });
  }
  async saveWorkspaceSnapshotNow() {
    const saved = await this.workspaceMgr.saveSnapshotNow(this);
    new import_obsidian5.Notice(saved ? this.t("workspaceSaved") : this.t("workspaceSaveFailed"));
  }
  quickScanForLookup() {
    return scanVault(this.app.vault, this.settings, this.app.metadataCache);
  }
  async scanVaultWithManagedFallback() {
    const managedPaths = await collectManagedNavigatorPathSet(this.app.vault, this.app.metadataCache);
    return scanVault(this.app.vault, this.settings, this.app.metadataCache, managedPaths);
  }
  async readFileContent(path) {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof import_obsidian5.TFile))
      return null;
    try {
      return await this.app.vault.cachedRead(file);
    } catch {
      return null;
    }
  }
  async writeManagedNavigatorPage(path, contentFactory, options = {}) {
    const existing = this.app.vault.getAbstractFileByPath(path);
    const existingContent = existing instanceof import_obsidian5.TFile ? await this.readFileContent(path) : null;
    const isManaged = existingContent !== null && isManagedNavigatorPageContent(existingContent);
    if (existing instanceof import_obsidian5.TFile && !isManaged && !options.initializing) {
      this.debug(`[moc-nav] skip unmanaged navigator page: ${path}`);
      return { changed: false, skippedUnmanaged: true };
    }
    const content = contentFactory(existingContent);
    const before = this.writer.getWrittenCount();
    await this.writer.writeIfChanged(path, content, {
      backupExisting: existing instanceof import_obsidian5.TFile && !isManaged && !!options.initializing
    });
    return {
      changed: this.writer.getWrittenCount() > before,
      skippedUnmanaged: false
    };
  }
  async initializeVault(options = {}) {
    this.refreshLanguage();
    const wasInitialized = !!this.settings.initialized;
    const forceTemplate = options.forceTemplate ?? wasInitialized;
    const needsConfirmation = options.confirm ?? forceTemplate;
    if (needsConfirmation) {
      const message = this.t("reinitializeConfirm");
      const confirmFn = typeof globalThis !== "undefined" && typeof globalThis.confirm === "function" ? globalThis.confirm.bind(globalThis) : null;
      if (!confirmFn) {
        new import_obsidian5.Notice(this.t("confirmUnavailableReinitialize"));
        return;
      }
      if (!confirmFn(message))
        return;
    }
    this.settings.initialized = true;
    await this.saveSettings();
    await this.rebuildAll({ initializing: true, forceTemplate });
    this.refreshEventBindings();
  }
  // ===== Rebuild =====
  async rebuildAll(options = {}) {
    this.refreshLanguage();
    if (!this.settings.initialized && !options.initializing) {
      new import_obsidian5.Notice(this.t("notInitialized"));
      return;
    }
    this.writer.reset();
    const scan = await this.scanVaultWithManagedFallback();
    this.lastScan = scan;
    const homePath = computeHomePath(this.settings);
    const homeDir = this.settings.homePath;
    if (homeDir)
      await this.writer.ensureFolder(normalizePath(homeDir));
    const folderMocs = [];
    const collect = (node) => {
      folderMocs.push(node);
      for (const c of node.childFolders)
        collect(c);
    };
    collect(scan.root);
    let createdCount = 0;
    let backupCount = 0;
    for (let i = folderMocs.length - 1; i >= 0; i--) {
      const node = folderMocs[i];
      if (node.isRoot)
        continue;
      if (!node.hasMoc && (!this.settings.createMissingMoc || !shouldCreateMissingNavigatorForNode(node)))
        continue;
      const parentName = parentMocNameFor(node, this.settings.homeFileName);
      const mocPath = mocPathForNode(node);
      const isAutoCreate = !node.hasMoc;
      const result = await this.writeManagedNavigatorPage(mocPath, (existingContent) => generateMocContent(node, parentName, {
        settings: this.settings,
        existingContent,
        forceTemplate: !!options.forceTemplate
      }), {
        initializing: !!options.initializing
      });
      if (result.changed) {
        if (isAutoCreate)
          createdCount++;
        else if (options.initializing)
          backupCount++;
        const file = this.app.vault.getAbstractFileByPath(mocPath);
        if (file instanceof import_obsidian5.TFile && this.settings.pinMocToTop) {
          await this.pinMgr.pinFile(file);
        }
      }
    }
    const homeResult = await this.writeManagedNavigatorPage(homePath, (existingContent) => generateHomeContent(scan, this.settings.homeFileName, {
      settings: this.settings,
      existingContent,
      forceTemplate: !!options.forceTemplate
    }), {
      initializing: !!options.initializing
    });
    const homeChanged = homeResult.changed;
    const homeBackedUp = homeChanged && !!options.initializing;
    if (homeChanged) {
      const homeFile = this.app.vault.getAbstractFileByPath(homePath);
      if (homeFile instanceof import_obsidian5.TFile && this.settings.pinMocToTop) {
        await this.pinMgr.pinFile(homeFile);
      }
    }
    const mocCount = folderMocs.filter((n) => n.hasMoc).length + createdCount;
    const summary = this.t("rebuildSummary", {
      mocCount,
      createdCount,
      backupCount: backupCount + (homeBackedUp ? 1 : 0)
    });
    new import_obsidian5.Notice(summary);
    this.debug(`[moc-nav] ${summary}`);
  }
  async rebuildOne(mocPath) {
    this.refreshLanguage();
    if (!this.settings.initialized) {
      new import_obsidian5.Notice(this.t("notInitialized"));
      return;
    }
    const scan = await this.scanVaultWithManagedFallback();
    this.lastScan = scan;
    const homePath = computeHomePath(this.settings);
    if (mocPath === homePath) {
      const result = await this.writeManagedNavigatorPage(homePath, (existingContent) => generateHomeContent(scan, this.settings.homeFileName, {
        settings: this.settings,
        existingContent
      }));
      if (result.changed && this.settings.pinMocToTop) {
        const f = this.app.vault.getAbstractFileByPath(homePath);
        if (f instanceof import_obsidian5.TFile)
          await this.pinMgr.pinFile(f);
      }
      return;
    }
    const node = findNodeByMocPath(scan.root, mocPath);
    if (!node) {
      this.debug(`[moc-nav] rebuildOne: node not found for ${mocPath}`);
      return;
    }
    const parentName = parentMocNameFor(node, this.settings.homeFileName);
    const result = await this.writeManagedNavigatorPage(mocPath, (existingContent) => generateMocContent(node, parentName, {
      settings: this.settings,
      existingContent
    }));
    if (result.changed && this.settings.pinMocToTop) {
      const f = this.app.vault.getAbstractFileByPath(mocPath);
      if (f instanceof import_obsidian5.TFile)
        await this.pinMgr.pinFile(f);
    }
  }
  async rebuildByPaths(absPaths) {
    this.refreshLanguage();
    if (!this.settings.initialized)
      return;
    this.writer.reset();
    const scan = await this.scanVaultWithManagedFallback();
    this.lastScan = scan;
    const homePath = computeHomePath(this.settings);
    const affected = /* @__PURE__ */ new Set();
    for (const p of absPaths) {
      for (const m of collectAffectedMocs(p, scan, homePath, this.settings)) {
        affected.add(m);
      }
    }
    if (affected.has(homePath)) {
      const result = await this.writeManagedNavigatorPage(homePath, (existingContent) => generateHomeContent(scan, this.settings.homeFileName, {
        settings: this.settings,
        existingContent
      }));
      if (result.changed && this.settings.pinMocToTop) {
        const f = this.app.vault.getAbstractFileByPath(homePath);
        if (f instanceof import_obsidian5.TFile)
          await this.pinMgr.pinFile(f);
      }
      affected.delete(homePath);
    }
    for (const m of affected) {
      const node = findNodeByMocPath(scan.root, m);
      if (!node)
        continue;
      const parentName = parentMocNameFor(node, this.settings.homeFileName);
      const result = await this.writeManagedNavigatorPage(m, (existingContent) => generateMocContent(node, parentName, {
        settings: this.settings,
        existingContent
      }));
      if (result.changed && this.settings.pinMocToTop) {
        const f = this.app.vault.getAbstractFileByPath(m);
        if (f instanceof import_obsidian5.TFile)
          await this.pinMgr.pinFile(f);
      }
    }
  }
  async cleanOrphans() {
    this.refreshLanguage();
    const managedPaths = await collectManagedNavigatorPathSet(this.app.vault, this.app.metadataCache);
    const scan = scanVault(this.app.vault, this.settings, this.app.metadataCache, managedPaths);
    this.lastScan = scan;
    const homePath = computeHomePath(this.settings);
    const validMocs = new Set(collectAllMocPaths(scan, homePath));
    const managedFiles = collectManagedNavigatorFiles(this.app.vault, this.app.metadataCache, managedPaths);
    const orphans = [];
    for (const file of managedFiles) {
      const m = file.path;
      if (m === homePath || validMocs.has(m))
        continue;
      const af = this.app.vault.getAbstractFileByPath(m);
      if (!(af instanceof import_obsidian5.TFile))
        continue;
      orphans.push(m);
    }
    if (orphans.length === 0) {
      new import_obsidian5.Notice(this.t("noOrphans"));
      return;
    }
    const preview = orphans.join("\n");
    const confirmFn = typeof globalThis !== "undefined" && typeof globalThis.confirm === "function" ? globalThis.confirm.bind(globalThis) : null;
    if (!confirmFn) {
      new import_obsidian5.Notice(this.t("confirmUnavailableClean"));
      return;
    }
    const ok = confirmFn(
      this.t("cleanOrphansConfirm", { count: orphans.length, preview })
    );
    if (!ok)
      return;
    for (const o of orphans) {
      const f = this.app.vault.getAbstractFileByPath(o);
      if (f instanceof import_obsidian5.TFile) {
        await this.pinMgr.unpinFile(f);
        try {
          await this.app.fileManager.trashFile(f);
        } catch (e) {
          this.debug(`[moc-nav] trash failed for ${o}: ${e.message}`);
        }
      }
    }
    new import_obsidian5.Notice(this.t("cleanedOrphans", { count: orphans.length }));
  }
  /**
   * 把当前库内所有导航页和 Home 全部置顶一遍（设置项开启时由设置面板触发）。
   */
  async pinAllMocs() {
    this.refreshLanguage();
    const scan = await this.scanVaultWithManagedFallback();
    const homePath = computeHomePath(this.settings);
    const paths = /* @__PURE__ */ new Set();
    walkFolders(scan.root, (node) => {
      if (node.mocPath)
        paths.add(node.mocPath);
    });
    paths.add(homePath);
    let pinned = 0;
    for (const p of paths) {
      const f = this.app.vault.getAbstractFileByPath(p);
      if (f instanceof import_obsidian5.TFile && await this.pinMgr.pinFile(f))
        pinned++;
    }
    new import_obsidian5.Notice(this.t("pinnedMocs", { count: pinned }));
  }
  /**
   * 取消所有导航页和 Home 的置顶（设置项关闭时由设置面板触发）。
   */
  async unpinAllMocs() {
    this.refreshLanguage();
    const scan = await this.scanVaultWithManagedFallback();
    const homePath = computeHomePath(this.settings);
    const paths = /* @__PURE__ */ new Set();
    walkFolders(scan.root, (node) => {
      if (node.mocPath)
        paths.add(node.mocPath);
    });
    paths.add(homePath);
    let unpinned = 0;
    for (const p of paths) {
      const f = this.app.vault.getAbstractFileByPath(p);
      if (f instanceof import_obsidian5.TFile && await this.pinMgr.unpinFile(f))
        unpinned++;
    }
    new import_obsidian5.Notice(this.t("unpinnedMocs", { count: unpinned }));
  }
  async openHome() {
    this.refreshLanguage();
    const homePath = computeHomePath(this.settings);
    const dir = this.settings.homePath;
    if (dir)
      await this.writer.ensureFolder(normalizePath(dir));
    let file = this.app.vault.getAbstractFileByPath(homePath);
    if (!file) {
      if (!this.settings.initialized) {
        new import_obsidian5.Notice(this.t("notInitialized"));
        return;
      }
      const scan = await this.scanVaultWithManagedFallback();
      this.lastScan = scan;
      await this.writeManagedNavigatorPage(homePath, (existingContent) => generateHomeContent(scan, this.settings.homeFileName, {
        settings: this.settings,
        existingContent
      }));
      file = this.app.vault.getAbstractFileByPath(homePath);
    }
    if (!(file instanceof import_obsidian5.TFile)) {
      new import_obsidian5.Notice(this.t("openHomeFailed"));
      return;
    }
    if (this.settings.pinMocToTop) {
      await this.pinMgr.pinFile(file);
    }
    const leaf = this.app.workspace.getLeaf("tab");
    await leaf.openFile(file);
  }
};
function findNodeByMocPath(root, mocPath) {
  if (root.mocPath === mocPath || mocPathForNode(root) === mocPath)
    return root;
  for (const c of root.childFolders) {
    const hit = findNodeByMocPath(c, mocPath);
    if (hit)
      return hit;
  }
  return null;
}
function folderPathForMoc(mocPath) {
  const i = mocPath.lastIndexOf("/");
  return i < 0 ? "" : mocPath.substring(0, i);
}
function walkFolders(node, fn) {
  fn(node);
  for (const c of node.childFolders)
    walkFolders(c, fn);
}

/* nosourcemap */