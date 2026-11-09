// 1. Инициализация
let appData = JSON.parse(localStorage.getItem('kanban_app_data_v3')) || {
    boards: [
        {
            id: 'work',
            name: 'РАБОЧИЕ ЗАДАЧИ',
            icon: '💼',
            columns: [
                { id: 'todo', name: 'Сделать', bgColor: '#e0f0ff', accentColor: '#a3c8f0' },
                { id: 'progress', name: 'В процессе', bgColor: '#f0e2fc', accentColor: '#d0a3f0' },
                { id: 'review', name: 'На проверке', bgColor: '#fdf2e0', accentColor: '#f0d0a3' },
                { id: 'done', name: 'Готово', bgColor: '#dff6e8', accentColor: '#a3f0c8' }
            ],
            tasks: { todo: [], progress: [], review: [], done: [] }
        }
    ],
    activeBoardId: 'work'
};

appData.boards.forEach(board => {
    if(board.columns) board.columns.forEach(col => { delete col.width; });
});

let currentView = 'boards';

function saveData() {
    localStorage.setItem('kanban_app_data_v3', JSON.stringify(appData));
}

// 2. Отрисовка
function renderApp() {
    renderTabs();
    if (currentView === 'boards') {
        renderBoards();
        renderList(); 
    } else {
        renderList();
    }
}

function renderTabs() {
    const switcher = document.getElementById('board-switcher');
    const addBtn = switcher.querySelector('.add-board-btn');
    switcher.innerHTML = '';

    appData.boards.forEach(board => {
        const tabWrapper = document.createElement('div');
        tabWrapper.className = 'tab-wrapper';
        
        const btn = document.createElement('button');
        btn.className = `switch-btn ${board.id === appData.activeBoardId && currentView === 'boards' ? 'active' : ''}`;
        btn.innerHTML = `<span>${board.icon}</span> ${board.name}`;
        btn.onclick = () => {
            if(currentView === 'list') toggleListView(); 
            switchBoard(board.id);
        };

        const tabActions = document.createElement('div');
        tabActions.className = 'tab-actions';
        
        const editTabBtn = document.createElement('button');
        editTabBtn.className = 'tab-action-btn';
        editTabBtn.innerHTML = '✏️';
        editTabBtn.onclick = (e) => { e.stopPropagation(); editBoard(board.id); };

        const delTabBtn = document.createElement('button');
        delTabBtn.className = 'tab-action-btn';
        delTabBtn.innerHTML = '✕';
        delTabBtn.onclick = (e) => { e.stopPropagation(); deleteBoard(board.id); };

        tabActions.appendChild(editTabBtn);
        if (appData.boards.length > 1) tabActions.appendChild(delTabBtn);

        tabWrapper.appendChild(btn);
        tabWrapper.appendChild(tabActions);
        switcher.appendChild(tabWrapper);
    });

    switcher.appendChild(addBtn);
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
            const style = `--col-accent: ${col.accentColor}; background-color: ${col.bgColor};`;
            boardHTML += `
                <div class="column" style="${style}" data-col-id="${col.id}">
                    <div class="column-header">${col.name}</div>
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
    if (activeBoard) {
        document.getElementById('board-title-text').textContent = `${activeBoard.icon} ${activeBoard.name}`;
    }

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
            container.appendChild(card);
        });
    });
}

// 3. Отрисовка СПИСКА
function renderList() {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    if (!board) return;

    document.getElementById('list-header-title').innerHTML = `<span>${board.icon}</span> Список задач доски: ${board.name}`;
    const tbody = document.getElementById('list-view-tbody');
    tbody.innerHTML = '';

    board.columns.forEach(col => {
        const tasks = board.tasks[col.id] || [];
        
        tasks.forEach((task, index) => {
            const tr = document.createElement('tr');
            tr.dataset.boardId = board.id;
            tr.dataset.colId = col.id;
            tr.dataset.taskIndex = index;

            const statusStyle = `background-color: ${col.bgColor}; color: ${col.accentColor}; border: 1px solid ${col.accentColor}50;`;

            tr.innerHTML = `
                <td style="text-align: left;">
                    <span class="badge-status" style="${statusStyle}">${col.name}</span>
                </td>
                <td style="text-align: left;">
                    <div class="list-task-text" id="task-text-${board.id}-${col.id}-${index}">${escapeHtml(task.text)}</div>
                </td>
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

// 4. Универсальное редактирование
function startEdit(boardId, status, index, source) {
    const board = appData.boards.find(b => b.id === boardId);
    const task = board.tasks[status][index];
    const col = board.columns.find(c => c.id === status);
    const colAccent = col ? col.accentColor : '#a3c8f0';

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

    if (source === 'list') {
        wrapper.style.boxShadow = 'none';
        wrapper.style.padding = '10px 0';
    }

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
        if (newText) {
            task.text = newText;
            saveData();
        }
        renderApp();
    };

    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            saveEdit();
        } else if (e.key === 'Escape') {
            renderApp();
        }
    });

    textarea.addEventListener('blur', saveEdit);
    textarea.addEventListener('mousedown', (e) => e.stopPropagation());
}

// 5. Переключение видов
function toggleListView() {
    currentView = currentView === 'boards' ? 'list' : 'boards';
    
    const boardWrapper = document.getElementById('board-scroll-wrapper');
    const listContainer = document.getElementById('list-view-container');
    const btn = document.getElementById('list-toggle-btn');
    const headerArea = document.getElementById('board-header-area');

    if (currentView === 'list') {
        boardWrapper.style.display = 'none';
        headerArea.style.display = 'none';
        listContainer.classList.add('active');
        btn.classList.add('active');
        btn.innerHTML = '📋 Вернуться к доске';
        renderList();
    } else {
        boardWrapper.style.display = 'block';
        headerArea.style.display = 'flex';
        listContainer.classList.remove('active');
        btn.classList.remove('active');
        btn.innerHTML = '📋 Список задач';
        renderApp();
    }
}

// 6. Управление досками
function switchBoard(boardId) {
    appData.activeBoardId = boardId;
    saveData();
    renderApp();
}

function createNewBoard() {
    const name = prompt('Введите название новой доски:', 'Новая доска');
    if (!name) return;
    const icon = prompt('Введите иконку (эмодзи):', '📋') || '📋';
    const id = 'board_' + Date.now();

    appData.boards.push({
        id: id,
        name: name,
        icon: icon,
        columns: [
            { id: 'todo_'+Date.now(), name: 'Сделать', bgColor: '#e0f0ff', accentColor: '#a3c8f0' },
            { id: 'progress_'+Date.now(), name: 'В процессе', bgColor: '#f0e2fc', accentColor: '#d0a3f0' },
            { id: 'done_'+Date.now(), name: 'Готово', bgColor: '#dff6e8', accentColor: '#a3f0c8' }
        ],
        tasks: {}
    });

    appData.activeBoardId = id;
    saveData();
    if(currentView === 'list') toggleListView();
    renderApp();
}

function editBoard(boardId) {
    const board = appData.boards.find(b => b.id === boardId);
    if (!board) return;
    const newName = prompt('Изменить название доски:', board.name);
    if (newName === null) return;
    const newIcon = prompt('Изменить иконку (эмодзи):', board.icon);
    if (newIcon === null) return;

    board.name = newName.trim() || board.name;
    board.icon = newIcon.trim() || board.icon;
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

// 7. Настройка колонок
function openColumnsSettings() {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    const list = document.getElementById('col-settings-list');
    list.innerHTML = '';

    board.columns.forEach((col, index) => {
        const row = document.createElement('div');
        row.className = 'col-settings-row';
        
        row.innerHTML = `
            <input type="text" value="${col.name}" onchange="updateColProp('${col.id}', 'name', this.value)" placeholder="Название">
            <div style="display:flex; flex-direction:column; align-items:center;">
                <span>Фон</span>
                <input type="color" value="${col.bgColor}" onchange="updateColProp('${col.id}', 'bgColor', this.value)">
            </div>
            <div style="display:flex; flex-direction:column; align-items:center;">
                <span>Полоска</span>
                <input type="color" value="${col.accentColor}" onchange="updateColProp('${col.id}', 'accentColor', this.value)">
            </div>
            <button class="remove-col-btn" onclick="removeColumn('${col.id}')" ${board.columns.length <= 1 ? 'disabled' : ''}>✕</button>
        `;
        list.appendChild(row);
    });

    document.getElementById('columns-modal').classList.add('active');
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
        if (prop === 'bgColor' || prop === 'accentColor') {
            const colEl = document.querySelector(`#grid-${board.id} [data-col-id="${colId}"]`);
            if(colEl) {
                if(prop === 'bgColor') colEl.style.backgroundColor = value;
                if(prop === 'accentColor') colEl.style.setProperty('--col-accent', value);
            }
        }
    }
}

function addNewColumn() {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    if (board.columns.length >= 8) return alert('Максимум 8 колонок для удобства.');
    const newId = 'col_' + Date.now();
    board.columns.push({
        id: newId,
        name: 'Новая колонка',
        bgColor: '#f0f0f0',
        accentColor: '#cccccc'
    });
    board.tasks[newId] = [];
    saveData();
    openColumnsSettings();
}

function removeColumn(colId) {
    const board = appData.boards.find(b => b.id === appData.activeBoardId);
    if (board.columns.length <= 1) return;

    if (confirm('Удалить эту колонку вместе со всеми задачами?')) {
        board.columns = board.columns.filter(c => c.id !== colId);
        delete board.tasks[colId];
        saveData();
        openColumnsSettings();
    }
}

// 8. Работа с задачами
function addTask(boardId, status) {
    const board = appData.boards.find(b => b.id === boardId);
    if (!board) return;
    const input = document.getElementById(`input-${boardId}-${status}`);
    const text = input.value.trim();
    
    if (text) {
        if (!board.tasks[status]) board.tasks[status] = [];
        board.tasks[status].push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            text: text
        });
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
        if (currentView === 'list') {
            renderList();
        } else {
            renderTasks(boardId);
        }
    }
}

// 9. Drag & Drop
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

// 10. Вспомогательные
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function attachEnterListeners() {
    document.querySelectorAll('textarea').forEach(textarea => {
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

// 11. ЭКСПОРТ / ИМПОРТ
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
            } 
            else if (rawData.work && rawData.home) {
                if(confirm('Обнаружен файл СТАРОГО формата. Автоматически конвертировать его в новый вид?')) {
                    const newAppData = {
                        boards: [
                            {
                                id: 'work',
                                name: 'РАБОЧИЕ ЗАДАЧИ',
                                icon: '💼',
                                columns: [
                                    { id: 'todo', name: 'Сделать', bgColor: '#e0f0ff', accentColor: '#a3c8f0' },
                                    { id: 'progress', name: 'В процессе', bgColor: '#f0e2fc', accentColor: '#d0a3f0' },
                                    { id: 'review', name: 'На проверке', bgColor: '#fdf2e0', accentColor: '#f0d0a3' },
                                    { id: 'done', name: 'Готово', bgColor: '#dff6e8', accentColor: '#a3f0c8' }
                                ],
                                tasks: rawData.work
                            },
                            {
                                id: 'home',
                                name: 'ДОМАШНИЕ ЗАДАЧИ',
                                icon: '🏠',
                                columns: [
                                    { id: 'todo', name: 'Сделать', bgColor: '#e0f0ff', accentColor: '#a3c8f0' },
                                    { id: 'progress', name: 'В процессе', bgColor: '#f0e2fc', accentColor: '#d0a3f0' },
                                    { id: 'review', name: 'На проверке', bgColor: '#fdf2e0', accentColor: '#f0d0a3' },
                                    { id: 'done', name: 'Готово', bgColor: '#dff6e8', accentColor: '#a3f0c8' }
                                ],
                                tasks: rawData.home
                            }
                        ],
                        activeBoardId: 'work'
                    };
                    appData = newAppData;
                    saveData();
                    if(currentView === 'list') toggleListView();
                    renderApp();
                    alert('Старые данные успешно перенесены!');
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

// Запуск
renderApp();