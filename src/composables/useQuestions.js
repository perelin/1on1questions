import { ref, watch } from "vue";
import allQuestions from "assets/questions.json";

const DEFAULT_COUNT = 4;
const STORAGE_KEY = "1on1-session";

function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

function pickRandom(pool, count, excludeIds = []) {
  const available = pool.filter((q) => !excludeIds.includes(q.id));
  const n = Math.min(count, available.length);
  const result = [];

  for (let i = 0; i < n; i++) {
    const idx = randomIndex(available.length);
    result.push({ ...available[idx], done: false, pinned: false });
    available.splice(idx, 1);
  }

  return result;
}

function saveSession(questions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useQuestions() {
  const randomQuestions = ref([]);
  let questionCount = DEFAULT_COUNT;

  function init() {
    const saved = loadSession();
    if (saved && saved.length > 0) {
      randomQuestions.value = saved;
      questionCount = saved.length;
    } else {
      randomQuestions.value = pickRandom(allQuestions, questionCount);
    }
  }

  function pinQuestion(question) {
    question.pinned = !question.pinned;
  }

  function removeQuestion(id) {
    const idx = randomQuestions.value.findIndex((q) => q.id === id);
    if (idx !== -1) {
      randomQuestions.value.splice(idx, 1);
      questionCount = randomQuestions.value.length;
    }
  }

  function addQuestion() {
    const displayedIds = randomQuestions.value.map((q) => q.id);
    const added = pickRandom(allQuestions, 1, displayedIds);
    if (added.length > 0) {
      randomQuestions.value.unshift(added[0]);
      questionCount = randomQuestions.value.length;
    }
  }

  function reloadQuestions() {
    const pinned = randomQuestions.value.filter((q) => q.pinned);
    const pinnedIds = pinned.map((q) => q.id);
    const fresh = pickRandom(
      allQuestions,
      questionCount - pinned.length,
      pinnedIds,
    );
    randomQuestions.value = [...fresh, ...pinned];
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
    questionCount = DEFAULT_COUNT;
    randomQuestions.value = pickRandom(allQuestions, questionCount);
  }

  watch(randomQuestions, (val) => saveSession(val), { deep: true });

  return {
    randomQuestions,
    init,
    pinQuestion,
    removeQuestion,
    addQuestion,
    reloadQuestions,
    clearSession,
  };
}
