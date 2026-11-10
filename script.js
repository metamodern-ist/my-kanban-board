/* ==========================================================================
   БЛОК 1: ПЕРЕМЕННЫЕ И ИНИЦИАЛИЗАЦИЯ
   ========================================================================== */

const COLOR_PALETTE = [
    { id: 'blue', bg: '#e0f0ff', accent: '#a3c8f0' },
    { id: 'purple', bg: '#f0e2fc', accent: '#d0a3f0' },
    { id: 'yellow', bg: '#fdf2e0', accent: '#f0d0a3' },
    { id: 'green', bg: '#dff6e8', accent: '#a3f0c8' },
    { id: 'red', bg: '#ffe0e0', accent: '#f0a3a3' },
    { id: 'orange', bg: '#ffeedd', accent: '#f0bda3' },
    { id: 'teal', bg: '#e0fdfb', accent: '#a3f0ea' },
    { id: 'pink', bg: '#fce0f0', accent: '#f0a3d0' }
];

const DARK_THEME_COLORS = {
    'blue': { bg: '#172433', accent: '#6ea8df' },
    'purple': { bg: '#251c30', accent: '#d0a3f0' },
    'yellow': { bg: '#2d2519', accent: '#f0d0a3' },
    'green': { bg: '#172b21', accent: '#a3f0c8' },
    'red': { bg: '#301a1c', accent: '#f0a3a3' },
    'orange': { bg: '#2e2016', accent: '#f0bda3' },
    'teal': { bg: '#142b2b', accent: '#a3f0ea' },
    'pink': { bg: '#2e1a26', accent: '#f0a3d0' }
};

const ICON_SET = {
    'work': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    'home': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    'study': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    'shopping': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    'health': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
    'finance': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    'travel': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>`,
    'ideas': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.7V17h8v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 0 0-7-7z"></path></svg>`,
    'sport': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M4.93 4.93l14.14 14.14"></path><path d="M12 2v20"></path></svg>`,
    'star': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    'book': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    'code': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
};

let appData = JSON.parse(localStorage.getItem('kanban_app_data_v4')) || {
    boards: [
        {
            id: 'work', name: 'РАБОЧИЕ ЗАДАЧИ', iconId: 'work', viewMode: 'boards',
            columns: [
                { id: 'todo', name: 'Сделать', colorId: 'blue' },
                { id: 'progress', name: 'В процессе', colorId: 'purple' },
                { id: 'review', name: 'На проверке', colorId: 'yellow' },
                { id: 'done', name: 'Готово', colorId: 'green' }
            ],
            tasks: { todo: [], progress: [], review: [], done: [] }
        },
        {
            id: 'home', name: 'ДОМАШНИЕ ЗАДАЧИ', iconId: 'home', viewMode: 'boards',
            columns: [
                { id: 'todo', name: 'Сделать', colorId: 'blue' },
                { id: 'progress', name: 'В процессе', colorId: 'purple' },
                { id: 'done', name: 'Готово', colorId: 'green' }
            ],
            tasks: { todo: [], progress: [], done: [] }
        }
    ],
    activeBoardId: 'work'
};

appData.boards.forEach(board => {
    if (!board.iconId) {
        const oldIcon = board.icon || '📋';
        if (oldIcon === '💼') board.iconId = 'work';
        else if (oldIcon === '🏠') board.iconId = 'home';
        else board.iconId = 'star';
        delete board.icon;
    }
    if (!board.viewMode) board.viewMode = 'boards';
    
    board.columns.forEach(col => {
        if(!col.colorId) {
            if(col.bgColor === '#e0f0ff') col.colorId = 'blue';
            else if(col.bgColor === '#f0e2fc') col.colorId = 'purple';
            else if(col.bgColor === '#fdf2e0') col.colorId = 'yellow';
            else if(col.bgColor === '#dff6e8') col.colorId = 'green';
            else col.colorId = 'blue';
        }
    });
});

let currentView = 'boards';
let editingBoardIdForIcon = null;

function saveData() {
    localStorage.setItem('kanban_app_data_v4', JSON.stringify(appData));
}

/* ==========================================================================
   БЛОК 2: УПРАВЛЕНИЕ ТЕМОЙ
   ========================================================================== */

function initTheme() {
    const savedTheme = localStorage.getItem('kanban_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeButtons('dark');
    } else {
        updateThemeButtons('light');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('kanban_theme', isDark ? 'dark' : 'light');
    updateThemeButtons(isDark ? 'dark' : 'light');

    if (currentView === 'list') {
        renderList();
    }
}

function updateThemeButtons(theme) {
    const isDark = theme === 'dark';
    const sunSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    
    const icon = isDark ? sunSvg : moonSvg;
    const text = isDark ? 'Светлая тема' : 'Тёмная тема';

    const btnMobile = document.getElementById('theme-btn-mobile');
    if (btnMobile) btnMobile.innerHTML = `<span style="display:flex;">${icon}</span> Тема`;
    
    const desktopIcon = document.getElementById('desktop-theme-icon');
    const desktopText = document.getElementById('desktop-theme-text');
    if (desktopIcon) desktopIcon.innerHTML = icon;
    if (desktopText) desktopText.textContent = text;
}

/* ==========================================================================
   БЛОК 3: МЕНЮ
   ========================================================================== */

function toggleMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const drawer = document.getElementById('mobile-menu-drawer');
    overlay.classList.toggle('active');
    drawer.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
}

function toggleDesktopMenu() {
    const dropdown = document.getElementById('desktop-dropdown');
    const btn = document.getElementById('desktop-menu-btn');
    dropdown.classList.toggle('active');
    btn.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const container = document.querySelector('.desktop-menu-container');
    const dropdown = document.getElementById('desktop-dropdown');
    const btn = document.getElementById('desktop-menu-btn');
    if (container && !container.contains(event.target)) {
        if (dropdown) dropdown.classList.remove('active');
        if (btn) btn.classList.remove('active');
    }

    const modal = document.getElementById('columns-modal');
    if (modal && event.target === modal) closeColumnsSettings();
    
    const iconModal = document.getElementById('icon-modal');
    if (iconModal && event.target === iconModal) closeIconSettings();
});

/* ==========================================================================
   БЛОК 4: ГЛАВНАЯ ОТРИСОВКА
   ========================================================================== */

function renderApp() {
    const activeBoard = appData.boards.find(b => b.id === appData.activeBoardId);
    currentView = activeBoard.viewMode || 'boards';

    renderTabs();
    renderMobileHeader();
    
    if (currentView === 'boards') {
        renderBoards();
        renderList(); 
    } else {
        renderList();
    }
    updateUIForView();
}

function updateUIForView() {
    const boardWrapper = document.getElementById('board-scroll-wrapper');
    const listContainer = document.getElementById('list-view-container');
    const headerArea = document.getElementById('board-header-area');
    const btnMobile = document.getElementById('mobile-list-toggle-btn');
    const btnDesktop = document.querySelector('#desktop-dropdown .dropdown-item:first-child');

    if (currentView === 'list') {
        boardWrapper.style.display = 'none';
        headerArea.style.display = 'none';
        listContainer.classList.add('active');
        
        const text = 'Вернуться к доске';
        const iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`;
        
        if (btnMobile) btnMobile.innerHTML = `${iconSvg} ${text}`;
        if (btnDesktop) btnDesktop.innerHTML = `<span class="icon">${iconSvg}</span> ${text}`;
        renderMobileHeader();
    } else {
        boardWrapper.style.display = 'block';
        headerArea.style.display = 'flex';
        listContainer.classList.remove('active');
        
        const text = 'Список задач';
        const iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`;
        
        if (btnMobile) btnMobile.innerHTML = `${iconSvg} ${text}`;
        if (btnDesktop) btnDesktop.innerHTML = `<span class="icon">${iconSvg}</span> ${text}`;
    }
}

function renderTabs() {
    const switcher = document.getElementById('board-switcher');
    const drawerList = document.getElementById('drawer-boards-list');
    const addBtn = switcher.querySelector('.add-board-btn');
    switcher.innerHTML = '';
    drawerList.innerHTML = '';

    appData.boards.forEach(board => {
        const tabWrapper = createTabElement(board, false);
        switcher.appendChild(tabWrapper);
        const drawerTab = createTabElement(board, true);
        drawerList.appendChild(drawerTab);
    });
    switcher.appendChild(addBtn);
}

function createTabElement(board, isMobileMenu) {
    const wrapper = document.createElement('div');
    wrapper.className = 'tab-wrapper';
    
    const btn = document.createElement('button');
    btn.className = `switch-btn ${board.id === appData.activeBoardId ? 'active' : ''}`;
    
    const iconSvg = ICON_SET[board.iconId] || ICON_SET['star'];
    const iconBtn = document.createElement('span');
    iconBtn.className = 'tab-icon-btn';
    iconBtn.innerHTML = iconSvg;
    iconBtn.onclick = (e) => {
        e.stopPropagation();
        openIconSettings(board.id);
    };

    const textNode = document.createTextNode(board.name);

    btn.appendChild(iconBtn);
    btn.appendChild(textNode);

    btn.onclick = () => {
        switchBoard(board.id);
        if (isMobileMenu) toggleMobileMenu();
    };

    const actions = document.createElement('div');
    actions.className = 'tab-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'tab-action-btn';
    editBtn.innerHTML = '✏️';
    editBtn.onclick = (e) => { e.stopPropagation(); editBoard(board.id); };

    const delBtn = document.createElement('button');
    delBtn.className = 'tab-action-btn';
    delBtn.innerHTML = '✕';
    delBtn.onclick = (e) => { e.stopPropagation(); deleteBoard(board.id); };

    actions.appendChild(editBtn);
    if (appData.boards.length > 1) actions.appendChild(delBtn);
    
    wrapper.appendChild(btn);
    wrapper.appendChild(actions);
    return wrapper;
}

function renderMobileHeader() {
    const iconEl = document.getElementById('mobile-board-icon');
    const nameEl = document.getElementById('mobile-board-name');
    if (!iconEl || !nameEl) return;

    if (currentView === 'boards') {
        const activeBoard = appData.boards.find(b => b.id === appData.activeBoardId);
        if (activeBoard) {
            iconEl.innerHTML = ICON_SET[activeBoard.iconId] || ICON_SET['star'];
            const svg = iconEl.querySelector('svg');
            if(svg) { svg.style.width = '20px'; svg.style.height = '20px'; svg.style.verticalAlign = 'middle'; }
            nameEl.textContent = activeBoard.name;
        }
    } else {
        iconEl.textContent = '📋';
        nameEl.textContent = 'СПИСОК ЗАДАЧ';
    }
}

function renderBoards() {
    const container = document.getElementById('boards-container');
    container.innerHTML = '';

    appData.boards.forEach(board => {
        const boardWrapper = document.createElement('div');
        boardWrapper.className = `board-wrapper ${board.id === appData.activeBoardId ? 'active' : ''}`;
        boardWrapper.id = `board-${board.id}`;

        let boardHTML = `<div class="board" id="grid-${board.id}">`;
        board.columns.forEach(col => {
            const colorData = COLOR_PALETTE.find(c => c.id === col.colorId) || COLOR_PALETTE[0];
            const style = `--col-accent: ${colorData.accent}; background-color: ${colorData.bg};`;
            
            boardHTML += `
                <div class="column" style="${style}" data-color="${col.colorId}" data-col-id="${col.id}">
                    <div class="column-header">
                        ${col.name}
                        <button class="col-settings-icon" onclick="openColumnsSettings('${col.id}')" title="Настроить статус">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        </button>
                    </div>
                    <div class="tasks-container" id="${board.id}-${col.id}"></div>
                    <div class="add-task-form">
                        <textarea rows="2" placeholder="Новая задача..." id="input-${board.id}-${col.id}"></textarea>
                        <button class="add-btn" onclick="addTask('${board.id}', '${col.id}')">+ Добавить</button>
                    </div>
                </div>
            `;
        });
        boardHTML += `</div>`;
        boardWrapper.innerHTML = boardHTML;
        container.appendChild(boardWrapper);
        renderTasks(board.id);
    });

    const activeBoard = appData.boards.find(b => b.id === appData.activeBoardId);
    if (activeBoard) document.getElementById('board-title-text').textContent = activeBoard.name;

    attachDragAndDrop();
    attachEnterListeners();
}

function renderTasks(boardId) {
    const board = appData.boards.find(b => b.id === boardId);
    if (!board) return;
    board.columns.forEach(col => {
        const container = document.getElementById(`${boardId}-${col.id}`);
        if (!container) return;
        container.innerHTML = '';
        if (!board.tasks[col.id]) board.tasks[col.id] = [];

        board.tasks[col.id].forEach((task, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.draggable = true;
            card.dataset.id = task.id;
            card.dataset.board = boardId;
            card.dataset.status = col.id;
            card.dataset.index = index;
            
            card.innerHTML = `
                <div class="card-actions">
                    <button class="action-btn edit-btn" onclick="startEdit('${boardId}', '${col.id}', ${index}, 'board')" title="Редактировать">✏️</button>
                    <button class="action-btn delete-btn" onclick="deleteTask('${boardId}', '${col.id}', ${index})" title="Удалить">✕</button>
                </div>
                <div class="card-text">${escapeHtml(task.text)}</div>
            `;
            
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragend', handleDragEnd);
            card.addEventListener('touchstart', handleTouchStart, { passive: false });
            card.addEventListener('contextmenu', (e) => e.preventDefault());

            container.appendChild(card);
        });
    });
}

/* ==========================================================================
   БЛОК 5: СПИСОК
   ========================================================================== */

function toggleListView() {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    if (!board) return;

    board.viewMode = board.viewMode === 'boards' ? 'list' : 'boards';
    currentView = board.viewMode;

    saveData();
    renderApp();
}

function renderList() {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    if (!board) return;
    
    const firstCol = board.columns[0];
    const addStatusCell = document.querySelector('.list-add-status-cell');
    const isDarkTheme = document.body.classList.contains('dark-theme');

    function getBadgeStyle(colorId) {
        if (isDarkTheme) {
            const dark = DARK_THEME_COLORS[colorId] || DARK_THEME_COLORS['blue'];
            return `background-color: ${dark.bg}; color: ${dark.accent}; border: 1px solid ${dark.accent}50;`;
        } else {
            const light = COLOR_PALETTE.find(c => c.id === colorId) || COLOR_PALETTE[0];
            return `background-color: ${light.bg}; color: ${light.accent}; border: 1px solid ${light.accent}50;`;
        }
    }

    if (addStatusCell && firstCol) {
        addStatusCell.innerHTML = `<span class="badge-status" style="${getBadgeStyle(firstCol.colorId)}">${firstCol.name}</span>`;
    }

    const tbody = document.getElementById('list-view-tbody');
    tbody.innerHTML = '';
    
    board.columns.forEach(col => {
        const tasks = board.tasks[col.id] || [];
        tasks.forEach((task, index) => {
            const tr = document.createElement('tr');
            const statusStyle = getBadgeStyle(col.colorId);
            
            tr.innerHTML = `
                <td style="text-align: left;">
                    <span class="badge-status" 
                          style="${statusStyle}" 
                          onclick="changeTaskStatusFromList(event, '${board.id}', '${col.id}', ${index})"
                          title="Нажмите, чтобы изменить статус">
                        ${col.name}
                    </span>
                </td>
                <td style="text-align: left;"><div class="list-task-text" id="task-text-${board.id}-${col.id}-${index}">${escapeHtml(task.text)}</div></td>
                <td>
                    <div class="list-actions">
                        <button class="list-action-btn" onclick="startEdit('${board.id}', '${col.id}', ${index}, 'list')" title="Редактировать">✏️</button>
                        <button class="list-action-btn" onclick="deleteTask('${board.id}', '${col.id}', ${index})" title="Удалить">✕</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
    if (tbody.innerHTML === '') {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 30px; color:#888;">На этой доске пока нет задач.</td></tr>`;
    }
}

function addTaskFromList() {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    if (!board) return;

    const firstColId = board.columns[0].id;
    const textInput = document.getElementById('list-new-task-text');
    const text = textInput.value.trim();

    if (text) {
        if (!board.tasks[firstColId]) board.tasks[firstColId] = [];
        board.tasks[firstColId].push({ 
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5), 
            text: text 
        });
        
        textInput.value = '';
        saveData();
        renderList();
        renderTasks(board.id);
        textInput.focus();
    }
}

function changeTaskStatusFromList(event, boardId, currentStatusId, taskIndex) {
    event.stopPropagation();

    const board = appData.boards.find(b => b.id === boardId);
    if (!board) return;

    const availableCols = board.columns.filter(c => c.id !== currentStatusId);
    if (availableCols.length === 0) return;

    const task = board.tasks[currentStatusId][taskIndex];

    if (board.columns.length === 2) {
        const targetCol = availableCols[0];
        
        board.tasks[currentStatusId].splice(taskIndex, 1);
        if (!board.tasks[targetCol.id]) board.tasks[targetCol.id] = [];
        board.tasks[targetCol.id].push(task);

        saveData();
        renderList();
        renderTasks(boardId);
        return;
    }

    const existingMenu = document.querySelector('.status-dropdown');
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement('div');
    menu.className = 'status-dropdown';

    availableCols.forEach(col => {
        const colorData = COLOR_PALETTE.find(c => c.id === col.colorId) || COLOR_PALETTE[0];
        
        const item = document.createElement('div');
        item.className = 'status-dropdown-item';
        item.textContent = col.name;
        item.style.color = colorData.accent; 
        
        item.onclick = (e) => {
            e.stopPropagation();
            
            board.tasks[currentStatusId].splice(taskIndex, 1);
            if (!board.tasks[col.id]) board.tasks[col.id] = [];
            board.tasks[col.id].push(task);

            saveData();
            menu.remove();
            renderList();
            renderTasks(boardId);
        };
        
        menu.appendChild(item);
    });

    document.body.appendChild(menu);

    const rect = event.currentTarget.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY + 5}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;

    const closeMenu = (e) => {
        if (!menu.contains(e.target)) {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }
    };
    setTimeout(() => document.addEventListener('click', closeMenu), 10);
}

/* ==========================================================================
   БЛОК 6: ЗАДАЧИ
   ========================================================================== */

function addTask(boardId, status) {
    const board = appData.boards.find(b => b.id === boardId);
    if (!board) return;
    const input = document.getElementById(`input-${boardId}-${status}`);
    const text = input.value.trim();
    if (text) {
        if (!board.tasks[status]) board.tasks[status] = [];
        board.tasks[status].push({ id: Date.now().toString() + Math.random().toString(36).substr(2, 5), text: text });
        input.value = '';
        saveData();
        renderTasks(boardId);
        if (currentView === 'list') renderList();
    }
}

function deleteTask(boardId, status, index) {
    if(confirm('Удалить эту задачу?')) {
        const board = appData.boards.find(b => b.id === boardId);
        board.tasks[status].splice(index, 1);
        saveData();
        if (currentView === 'list') renderList();
        else renderTasks(boardId);
    }
}

function startEdit(boardId, status, index, source) {
    const board = appData.boards.find(b => b.id === boardId);
    const task = board.tasks[status][index];
    const col = board.columns.find(c => c.id === status);
    const colorData = COLOR_PALETTE.find(c => c.id === col.colorId) || COLOR_PALETTE[0];
    const colAccent = colorData.accent;
    let targetContainer;

    if (source === 'board') {
        const container = document.getElementById(`${boardId}-${status}`);
        const card = container.children[index];
        targetContainer = card;
        card.draggable = false;
        card.querySelector('.card-actions').style.display = 'none';
    } else {
        const textDiv = document.getElementById(`task-text-${boardId}-${status}-${index}`);
        targetContainer = textDiv;
        textDiv.innerHTML = '';
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'edit-wrapper';
    wrapper.style.setProperty('--col-accent', colAccent);
    if (source === 'list') { wrapper.style.boxShadow = 'none'; wrapper.style.padding = '10px 0'; wrapper.style.background = 'transparent'; wrapper.style.border = 'none'; }

    const textarea = document.createElement('textarea');
    textarea.className = 'edit-input';
    textarea.value = task.text;
    textarea.rows = Math.max(3, task.text.split('\n').length);
    const hint = document.createElement('span');
    hint.className = 'edit-hint';
    hint.textContent = 'Enter — новая строка | Ctrl+Enter — сохранить';
    wrapper.appendChild(textarea);
    wrapper.appendChild(hint);
    targetContainer.appendChild(wrapper);
    
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    const saveEdit = () => {
        const newText = textarea.value.trim();
        if (newText) { task.text = newText; saveData(); }
        renderApp();
    };

    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); saveEdit(); }
        else if (e.key === 'Escape') { renderApp(); }
    });
    textarea.addEventListener('blur', saveEdit);
    textarea.addEventListener('mousedown', (e) => e.stopPropagation());
}

/* ==========================================================================
   БЛОК 7: УПРАВЛЕНИЕ ДОСКАМИ
   ========================================================================== */

function switchBoard(boardId) {
    appData.activeBoardId = boardId;
    saveData();
    renderApp();
}

function createNewBoard() {
    const name = prompt('Введите название новой доски:', 'Новая доска');
    if (!name) return;
    const id = 'board_' + Date.now();
    appData.boards.push({
        id: id, name: name, iconId: 'star', viewMode: 'boards',
        columns: [
            { id: 'todo_'+Date.now(), name: 'Сделать', colorId: 'blue' },
            { id: 'progress_'+Date.now(), name: 'В процессе', colorId: 'purple' },
            { id: 'done_'+Date.now(), name: 'Готово', colorId: 'green' }
        ],
        tasks: {}
    });
    appData.activeBoardId = id;
    saveData();
    renderApp();
}

function editBoard(boardId) {
    const board = appData.boards.find(b => b.id === boardId);
    if (!board) return;
    const newName = prompt('Изменить название доски:', board.name);
    if (newName === null) return;
    board.name = newName.trim() || board.name;
    saveData();
    renderApp();
}

function deleteBoard(boardId) {
    if (appData.boards.length <= 1) return alert('Нельзя удалить единственную доску!');
    const board = appData.boards.find(b => b.id === boardId);
    if (confirm(`Удалить доску "${board.name}"?`)) {
        appData.boards = appData.boards.filter(b => b.id !== boardId);
        if (appData.activeBoardId === boardId) appData.activeBoardId = appData.boards[0].id;
        saveData();
        renderApp();
    }
}

/* ==========================================================================
   БЛОК 8: НАСТРОЙКИ СТАТУСОВ (КОЛОНОК)
   ========================================================================== */

function openColumnsSettings(scrollToColId = null) {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    const list = document.getElementById('col-settings-list');
    list.innerHTML = '';

    board.columns.forEach((col) => {
        const row = document.createElement('div');
        row.className = 'col-settings-row';
        row.id = `setting-row-${col.id}`; 
        
        let paletteHTML = '<div class="color-palette">';
        COLOR_PALETTE.forEach(color => {
            const isSelected = col.colorId === color.id ? 'selected' : '';
            paletteHTML += `<div class="color-swatch ${isSelected}" 
                                 style="background-color: ${color.bg}; border-color: ${color.accent};" 
                                 onclick="updateColColor('${col.id}', '${color.id}')" 
                                 title="${color.id}"></div>`;
        });
        paletteHTML += '</div>';

        row.innerHTML = `
            <button class="remove-col-btn" onclick="removeColumn('${col.id}')" ${board.columns.length <= 1 ? 'disabled' : ''} title="Удалить статус">✕</button>
            <input type="text" value="${col.name}" onchange="updateColProp('${col.id}', 'name', this.value)" placeholder="Название">
            ${paletteHTML}
        `;
        list.appendChild(row);
    });
    
    document.getElementById('columns-modal').classList.add('active');

    if (scrollToColId) {
        setTimeout(() => {
            const targetRow = document.getElementById(`setting-row-${scrollToColId}`);
            if (targetRow) {
                targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetRow.style.transition = 'background-color 0.3s';
                targetRow.style.backgroundColor = 'rgba(26, 91, 156, 0.1)';
                setTimeout(() => targetRow.style.backgroundColor = '', 1000);
            }
        }, 100);
    }
}

function closeColumnsSettings() {
    document.getElementById('columns-modal').classList.remove('active');
    renderApp();
}

function updateColProp(colId, prop, value) {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    const col = board.columns.find(c => c.id === colId);
    if (col) {
        col[prop] = value;
        saveData();
        renderApp();
    }
}

function updateColColor(colId, colorId) {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    const col = board.columns.find(c => c.id === colId);
    if (col) {
        col.colorId = colorId;
        saveData();
        openColumnsSettings(colId); // Передаем ID, чтобы остаться на этой же колонке
        renderApp();
    }
}

function addNewColumn() {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    if (board.columns.length >= 8) return alert('Максимум 8 статусов.');
    const newId = 'col_' + Date.now();
    board.columns.push({ id: newId, name: 'Новый статус', colorId: 'blue' });
    board.tasks[newId] = [];
    saveData();
    openColumnsSettings(newId); // Прокручиваем к новому статусу
}

function removeColumn(colId) {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    if (board.columns.length <= 1) return;
    if (confirm('Удалить этот статус вместе со всеми задачами?')) {
        board.columns = board.columns.filter(c => c.id !== colId);
        delete board.tasks[colId];
        saveData();
        openColumnsSettings();
    }
}

/* ==========================================================================
   БЛОК 8.5: НАСТРОЙКА ИКОНКИ ДОСКИ
   ========================================================================== */

function openIconSettings(boardId) {
    editingBoardIdForIcon = boardId;
    const grid = document.getElementById('icon-picker-grid');
    grid.innerHTML = '';

    const board = appData.boards.find(b => b.id === boardId);
    if(!board) return;

    Object.keys(ICON_SET).forEach(iconId => {
        const div = document.createElement('div');
        div.className = `icon-picker-item ${board.iconId === iconId ? 'selected' : ''}`;
        div.innerHTML = ICON_SET[iconId];
        div.title = iconId;
        div.onclick = () => selectNewIcon(iconId);
        grid.appendChild(div);
    });

    document.getElementById('icon-modal').classList.add('active');
}

function closeIconSettings() {
    document.getElementById('icon-modal').classList.remove('active');
    editingBoardIdForIcon = null;
}

function selectNewIcon(iconId) {
    if (!editingBoardIdForIcon) return;
    const board = appData.boards.find(b => b.id === editingBoardIdForIcon);
    if (board) {
        board.iconId = iconId;
        saveData();
        closeIconSettings();
        renderApp();
    }
}

/* ==========================================================================
   БЛОК 9: DRAG & DROP
   ========================================================================== */

let draggedCardId = null;
let draggedFromBoard = null;
let draggedFromStatus = null;

function handleDragStart(e) {
    if (e.target.tagName === 'TEXTAREA') { e.preventDefault(); return; }
    const card = e.target;
    draggedCardId = card.dataset.id;
    draggedFromBoard = card.dataset.board;
    draggedFromStatus = card.dataset.status;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => card.style.display = 'none', 0);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    e.target.style.display = 'block';
    document.querySelectorAll('.tasks-container').forEach(c => c.style.backgroundColor = 'transparent');
}

function attachDragAndDrop() {
    document.querySelectorAll('.tasks-container').forEach(container => {
        container.addEventListener('dragover', (e) => {
            const parts = container.id.split('-');
            const dropStatus = parts.pop();
            const dropBoardId = parts.join('-');
            if (dropBoardId === draggedFromBoard) {
                e.preventDefault(); 
                e.dataTransfer.dropEffect = 'move';
                container.style.backgroundColor = 'rgba(0,0,0,0.05)';
            }
        });
        container.addEventListener('dragleave', () => { container.style.backgroundColor = 'transparent'; });
        container.addEventListener('drop', (e) => {
            e.preventDefault();
            container.style.backgroundColor = 'transparent';
            const parts = container.id.split('-');
            const dropStatus = parts.pop();
            const dropBoardId = parts.join('-');
            if (draggedFromBoard !== dropBoardId || draggedFromStatus === dropStatus) return;
            const board = appData.boards.find(b => b.id === draggedFromBoard);
            const taskIndex = board.tasks[draggedFromStatus].findIndex(t => t.id === draggedCardId);
            if (taskIndex > -1) {
                const [movedTask] = board.tasks[draggedFromStatus].splice(taskIndex, 1);
                if (!board.tasks[dropStatus]) board.tasks[dropStatus] = [];
                board.tasks[dropStatus].push(movedTask);
                saveData();
                renderTasks(dropBoardId);
                if (currentView === 'list') renderList();
            }
        });
    });
}

let touchCard = null;
let touchStartX = 0;
let touchStartY = 0;
let touchOffsetX = 0;
let touchOffsetY = 0;
let scrollInterval = null;
let autoScrollSpeed = 0;
const scrollZone = 60;

function handleTouchStart(e) {
    if (e.target.closest('.card-actions')) return; 

    touchCard = e.currentTarget;
    const touch = e.touches[0];
    const rect = touchCard.getBoundingClientRect();

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchOffsetX = touch.clientX - rect.left;
    touchOffsetY = touch.clientY - rect.top;

    const clone = touchCard.cloneNode(true);
    clone.classList.add('touch-drag-clone');
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    document.body.appendChild(clone);

    touchCard.style.opacity = '0.3';
    touchCard.dataset.isDragging = 'true';
    touchCard.clone = clone; 

    document.body.style.overflow = 'hidden';

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);
}

function handleTouchMove(e) {
    if (!touchCard || !touchCard.clone) return;
    e.preventDefault(); 
    
    const touch = e.touches[0];
    const clientX = touch.clientX;
    const clientY = touch.clientY;

    touchCard.clone.style.left = `${clientX - touchOffsetX}px`;
    touchCard.clone.style.top = `${clientY - touchOffsetY}px`;

    const scrollWrapper = document.getElementById('board-scroll-wrapper');
    const screenWidth = window.innerWidth;

    if (scrollInterval) clearInterval(scrollInterval);
    autoScrollSpeed = 0;

    if (clientX < scrollZone) autoScrollSpeed = -15; 
    else if (clientX > screenWidth - scrollZone) autoScrollSpeed = 15; 

    if (autoScrollSpeed !== 0) {
        scrollInterval = setInterval(() => {
            scrollWrapper.scrollLeft += autoScrollSpeed;
        }, 16); 
    }

    const elementUnderFinger = document.elementFromPoint(clientX, clientY);
    const targetContainer = elementUnderFinger ? elementUnderFinger.closest('.tasks-container') : null;

    document.querySelectorAll('.tasks-container').forEach(c => c.style.backgroundColor = 'transparent');
    if (targetContainer) targetContainer.style.backgroundColor = 'rgba(0,0,0,0.1)';
}

function handleTouchEnd(e) {
    if (!touchCard) return;
    if (scrollInterval) clearInterval(scrollInterval);
    
    document.body.style.overflow = '';
    touchCard.style.opacity = '1';
    touchCard.removeAttribute('data-is-dragging');
    document.querySelectorAll('.tasks-container').forEach(c => c.style.backgroundColor = 'transparent');

    const touch = e.changedTouches[0];
    const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetContainer = elementUnderFinger ? elementUnderFinger.closest('.tasks-container') : null;

    if (targetContainer) {
        const parts = targetContainer.id.split('-');
        const dropStatus = parts.pop();
        const dropBoardId = parts.join('-');

        const sourceBoardId = touchCard.dataset.board;
        const sourceStatus = touchCard.dataset.status;
        const cardId = touchCard.dataset.id;

        if (sourceBoardId === dropBoardId && sourceStatus !== dropStatus) {
            const board = appData.boards.find(b => b.id === sourceBoardId);
            const taskIndex = board.tasks[sourceStatus].findIndex(t => t.id === cardId);
            
            if (taskIndex > -1) {
                const [movedTask] = board.tasks[sourceStatus].splice(taskIndex, 1);
                if (!board.tasks[dropStatus]) board.tasks[dropStatus] = [];
                board.tasks[dropStatus].push(movedTask);
                saveData();
                renderTasks(dropBoardId); 
                if (currentView === 'list') renderList();
            }
        }
    }

    if (touchCard.clone) {
        touchCard.clone.remove();
        touchCard.clone = null;
    }
    touchCard = null;

    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('touchcancel', handleTouchEnd);
}

/* ==========================================================================
   БЛОК 10: УТИЛИТЫ / ЭКСПОРТ
   ========================================================================== */

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function attachEnterListeners() {
    document.querySelectorAll('.add-task-form textarea').forEach(textarea => {
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const parts = textarea.id.replace('input-', '').split('-');
                const status = parts.pop();
                const boardId = parts.join('-');
                addTask(boardId, status);
            }
        });
    });
}

function exportData() {
    const dataStr = JSON.stringify(appData, null, 2);
    const blob = new Blob([dataStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const date = new Date().toISOString().slice(0,10);
    a.download = `kanban_backup_${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const rawData = JSON.parse(e.target.result);
            if (rawData.boards && Array.isArray(rawData.boards)) {
                rawData.boards.forEach(b => b.columns.forEach(c => delete c.width));
                if(confirm('Загрузить данные? Все текущие доски будут заменены.')) {
                    appData = rawData;
                    saveData();
                    if(currentView === 'list') toggleListView();
                    renderApp();
                    alert('Данные успешно загружены!');
                }
            } else {
                alert('Ошибка: неверный формат файла.');
            }
        } catch (error) {
            console.error(error);
            alert('Ошибка при чтении файла.');
        }
        event.target.value = '';
    };
    reader.readAsText(file);
}

/* ==========================================================================
   СТАРТ
   ========================================================================== */

initTheme();
renderApp();