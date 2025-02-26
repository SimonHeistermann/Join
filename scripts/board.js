const boardCategories = ["to_do", "in_progress", "awaiting_feedback", "done"];
let tasksInStatusToDo;
let tasksInStatusProgress;
let tasksInStatusAwaitingFeedback;
let tasksInStatusDone;

let currentDraggedTask;
let highlightElement = null;
let draggedElementSize = { width: 0, height: 0 };
let currentHighlightContainer = null;

async function initBoard() {
  try {
      await init();
      initFlatpickr();
      getAllTasksIn();
      renderBoardContent();
      renderContactList(contacts);
      renderTaskCategoryList();
      renderSubtasks();
  } catch (error) {
      console.error("Error initializing app:", error);
  }
}

function getAllTasksIn() {
  getTasksInStatusToDo();
  getTasksInStatusProgress();
  getTasksInStatusAwaitingFeedback();
  getTasksInStatusDone();
}

function getTasksInStatusToDo() {
  tasksInStatusToDo = tasks.filter(task => task.status === "to-do");
}

function getTasksInStatusProgress() {
  tasksInStatusProgress = tasks.filter(task => task.status === "in-progress");
}

function getTasksInStatusAwaitingFeedback() {
  tasksInStatusAwaitingFeedback = tasks.filter(task => task.status === "await-feedback");
}

function getTasksInStatusDone() {
  tasksInStatusDone = tasks.filter(task => task.status === "done");
}

function renderBoardContent() {
  boardCategories.forEach(element => {
    let currentTasks = getTasksIn(element);
    const columnRef = document.getElementById(`${element}_content`);
    columnRef.innerHTML = "";
    if(currentTasks.length > 0) {
      for (let i = 0; i < currentTasks.length; i++) {
        columnRef.innerHTML += renderHTMLBoardCard(currentTasks[i], i);
        renderBoardAssingedToBadges(currentTasks[i], i);
      }
    } else columnRef.innerHTML = renderHTMLNoCardInBoard();
  });
}

function getTasksIn(element) {
  if(element === "to_do") return tasksInStatusToDo;
  if(element === "in_progress") return tasksInStatusProgress;
  if(element === "awaiting_feedback") return tasksInStatusAwaitingFeedback;
  if(element === "done") return tasksInStatusDone;
  return [];
}

function renderBoardAssingedToBadges(task, i) {
  const bagdesContainerRef = document.getElementById(`badges_container_${task.name}_${i}_${task.description}_${task.due_date}`);
  bagdesContainerRef.innerHTML = "";
  if(task) {
    for (let i = 0; i < task.assigned_to.length; i++) {
      bagdesContainerRef.innerHTML += renderHTMLBoardAssingedToBadges(task.assigned_to[i]);
    }
  }
}

/**
 * Counts the number of subtasks with a status of 1.
 * @param {Array} subtasks - The list of subtasks.
 * @returns {number} - The number of completed subtasks.
 */
function countCompletedSubtasks(subtasks) {
  if (!Array.isArray(subtasks)) return 0;
  return subtasks.filter(subtask => subtask.status === 1).length;
}

/**
 * Calculates the percentage of completed subtasks.
 * @param {Array} subtasks - The list of subtasks.
 * @returns {number} - The completion percentage rounded to one decimal place.
 */
function calculateCompletionPercentage(subtasks) {
  if (!Array.isArray(subtasks) || subtasks.length === 0) return 0;
  const completed = countCompletedSubtasks(subtasks);
  return Math.round((completed / subtasks.length) * 1000) / 10;
}

function getPrioIcon(prio) {
  if(prio === 1) return 'low_icon_green';
  if(prio === 2) return 'medium_icon_orange';
  if(prio === 3) return 'urgent_icon_red';
}

function getTaskCategory(category) {
  if(category === "us") return 'User Story';
  if(category === "tt") return 'Technical Task';
}

function getTaskCategoryCSSClass(category) {
  if(category === "us") return 'user__story';
  if(category === "tt") return 'technical__task';
}

function openAddTask() {
  if(isMobile()) openAddTaskWebsite();
  toggleDnoneFromBoardOverlay();
  const buttonRef = document.getElementById('open_add_task_button');
  buttonRef.classList.add('add__contact__button__active');
  const containerRef = document.getElementById('add_task_overlay');
  addActiveOverviewStyling(containerRef);
  fixateScrollingOnBody();
}

/**
 * Toggles the "d__none" class on the board overlay element to show or hide it.
 */
function toggleDnoneFromBoardOverlay() {
  const overlayRef = document.getElementById('add_task_overlay_board');
  if (overlayRef) overlayRef.classList.toggle('d__none');
}

/**
 * Adds active styling to a given content container.
 * @param {HTMLElement} contentRef - The container element.
 */
function addActiveOverviewStyling(contentRef) {
  setTimeout(() => {
    contentRef.classList.add('add__task__overlay__content__active');
}, 125); 
}

/**
 * Closes the contact overlay and resets styles.
 */
function closeAddTaskOverlay() {
  toggleDnoneFromBoardOverlay();
  const containerRef = document.getElementById('add_task_overlay');
  removeActiveOverviewStyling(containerRef);
  releaseScrollOnBody();
}

/**
 * Removes active styling from a given content container.
 * @param {HTMLElement} contentRef - The container element.
 */
function removeActiveOverviewStyling(contentRef) {
  contentRef.classList.remove('add__task__overlay__content__active');
}

function allowDrop(event) {
  if(event) event.preventDefault();
}

function highlight(id) {
  const areaRef = document.getElementById(id);
  if (!areaRef) return;
  createHighlightElement();
  updateHighlightContainer(areaRef);
  setHighlightSize();
}

function createHighlightElement() {
  if (!highlightElement) {
    highlightElement = document.createElement("div");
    highlightElement.classList.add("area__highlight");
  }
}

function updateHighlightContainer(areaRef) {
  if (currentHighlightContainer !== areaRef) {
    currentHighlightContainer?.contains(highlightElement) && currentHighlightContainer.removeChild(highlightElement);
    areaRef.appendChild(highlightElement);
    currentHighlightContainer = areaRef;
  }
}

function setHighlightSize() {
  Object.assign(highlightElement.style, {
    width: `${draggedElementSize.width}px`,
    height: `${draggedElementSize.height}px`,
    display: "block"
  });
}

function removeHighlight() {
  if (highlightElement && currentHighlightContainer) {
      currentHighlightContainer.removeChild(highlightElement);
      highlightElement = null;
      currentHighlightContainer = null;
  }
}

function startDragging(taskElement) {
  const taskData = JSON.parse(taskElement.getAttribute('data-task'));
  currentDraggedTask = taskData;
  setDraggedElementSize(taskElement);
  taskElement.style.opacity = "0.8";
  taskElement.classList.add("dragging");
}

function setDraggedElementSize(taskElement) {
  const rect = taskElement.getBoundingClientRect();
  draggedElementSize.width = rect.width;
  draggedElementSize.height = rect.height;
}

function stopDragging(taskElement) {
  if (taskElement) {
    taskElement.style.opacity = "1";
    taskElement.classList.remove("dragging");
  }
}

async function moveTo(status) {
  if (!currentDraggedTask || !status) return;
  const task = tasks.find(task => 
    task.name === currentDraggedTask.name &&
    task.description === currentDraggedTask.description &&
    task.due_date === currentDraggedTask.due_date
  );
  if (task) task.status = status;
  await putData("tasks", tasks);
  getAllTasksIn();
  renderBoardContent();
}

function openTaskDetails(taskElement, skip, taskData) {
  if(taskElement) {
    openTaskDetailsWithElement(taskElement);
  } if(taskData) {
    openTaskDetailsWithData(taskData);
  }
  const containerRef = document.getElementById('task_details_overlay');
  addActiveOverviewStyling(containerRef, skip);
  fixateScrollingOnBody();
}

function openTaskDetailsWithElement(taskElement) {
  const taskData = JSON.parse(taskElement.getAttribute('data-task'));
  const contentRef = document.getElementById('task_details_overlay_content_board');
  toggleDnoneFromTaskDetailsOverlay();
  renderTaskDetailsOverlayContent(contentRef, taskData);
  renderTaskDetailsAssignedTo(taskData);
  renderTaskDetailsSubTasks(taskData);
}

function openTaskDetailsWithData(taskData) {
  const contentRef = document.getElementById('task_details_overlay_content_board');
  toggleDnoneFromTaskDetailsOverlay();
  renderTaskDetailsOverlayContent(contentRef, taskData);
  renderTaskDetailsAssignedTo(taskData);
  renderTaskDetailsSubTasks(taskData);
}

/**
 * Toggles the "d__none" class on the task details overlay element to show or hide it.
 */
function toggleDnoneFromTaskDetailsOverlay() {
  const overlayRef = document.getElementById('task_details_overlay_board');
  if (overlayRef) overlayRef.classList.toggle('d__none');
}

function renderTaskDetailsOverlayContent(contentRef, task) {
  contentRef.innerHTML = "";
  contentRef.innerHTML += renderHTMLTaskDetails(task);
}

function renderTaskDetailsAssignedTo(task) {
  const contentRef = document.getElementById('details_assigned_to');
  if(contentRef) {
    contentRef.innerHTML = "";
    for (let i = 0; i < task.assigned_to.length; i++) {
      contentRef.innerHTML += renderHTMLTaskDetailsAssignedTo(task.assigned_to[i]);
    }
  }
}

function renderTaskDetailsSubTasks(task) {
  const contentRef = document.getElementById('details_subtasks');
  if(contentRef) {
    contentRef.innerHTML = "";
    for (let i = 0; i < task.subtasks.length; i++) {
      contentRef.innerHTML += renderHTMLTaskDetailsSubTask(task.subtasks[i], task);
    }
  }
}

/**
 * Adds active styling to a given content container.
 * @param {HTMLElement} contentRef - The container element.
 */
function addActiveOverviewStyling(contentRef, skip) {
  if(skip) {
    contentRef.classList.add('add__task__overlay__content__active');
  } else {
    setTimeout(() => {
      contentRef.classList.add('add__task__overlay__content__active');
  }, 125); 
  }
}

/**
 * Closes the contact overlay and resets styles.
 */
function closeTaskDetailsOverlay() {
  toggleDnoneFromTaskDetailsOverlay();
  const containerRef = document.getElementById('task_details_overlay');
  removeActiveOverviewStyling(containerRef);
  releaseScrollOnBody();
}

/**
 * Removes active styling from a given content container.
 * @param {HTMLElement} contentRef - The container element.
 */
function removeActiveOverviewStyling(contentRef) {
  contentRef.classList.remove('add__task__overlay__content__active');
}

function formatTaskDueDateBoard(isoDate) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

function getPrioText(prio) {
  if(prio === 1) return "Low";
  if(prio === 2) return "Medium";
  if(prio === 3) return "Urgent";
  else return "";
}

async function updateSubTask(taskElement, subTaskID) {
  const taskData = getTaskData(taskElement);
  if (!taskData) return;
  toggleSubTaskStatus(taskData, subTaskID);
  const task = findMatchingTask(taskData);
  if (!task) return;
  task.subtasks = taskData.subtasks;
  await saveAndUpdate(taskData);
}

function toggleSubTaskStatus(taskData, subTaskID) {
  const subTask = taskData.subtasks.find(sub => sub.id === subTaskID);
  if (subTask) subTask.status = subTask.status === 0 ? 1 : 0;
}

function findMatchingTask(taskData) {
  return tasks.find(task => 
    task.name === taskData.name &&
    task.description === taskData.description &&
    task.due_date === taskData.due_date
  ) || null;
}

async function saveAndUpdate(taskData) {
  await putData("tasks", tasks);
  await fetchTasks();
  getAllTasksIn();
  closeTaskDetailsOverlay();
  renderBoardContent();
  openTaskDetails(null, true, taskData);
}

async function deleteTask(taskElement) {
  const taskData = getTaskData(taskElement);
  if (!taskData) return;
  const task = findMatchingTask(taskData);
  if (!task) return;
  tasks = tasks.filter(t => t !== task);
  await saveAndReload();
}

async function saveAndReload() {
  await putData("tasks", tasks);
  await fetchTasks();
  getAllTasksIn();
  closeTaskDetailsOverlay();
  renderBoardContent();
}

